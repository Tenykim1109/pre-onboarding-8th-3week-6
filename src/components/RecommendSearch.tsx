import styled from "styled-components";
import { useEffect, useState } from "react";
import { RegExp } from "../util/RegExp";
import fetchSick from "../lib/fetchSick";
import RecoWord from "./RecoWord";

import type { KeyLIEvent, SickInfo } from "../types";

interface childProps {
  isFocus: boolean;
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  focusHandler: (type: string) => void;
  localStorageData: string[] | undefined;
  setlocalStorageData: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >;
  keyInUse: boolean;
}

export const RecommendSearch = ({
  isFocus,
  searchWord,
  setSearchWord,
  focusHandler,
  localStorageData,
  setlocalStorageData,
  keyInUse,
}: childProps) => {
  const [recommendWord, setRecommendWord] = useState<Array<SickInfo>>([]);

  useEffect(() => {
    if (
      searchWord?.length > 0 &&
      !RegExp.blankPattern(searchWord) && // not only blank
      keyInUse === false
    ) {
      if (
        searchWord?.length <= 1 &&
        RegExp.pattern(searchWord) // not each String
      ) {
        return;
      } else {
        fetchSick(searchWord, setRecommendWord);
      }
    }
    if (searchWord?.length === 0) setRecommendWord([]);
  }, [searchWord, keyInUse]);

  // delete recent list
  const deleteSearchedWord = (value: string) => {
    let newLocalData = localStorageData?.filter((item) => item !== value);
    localStorage.setItem("searched", `${newLocalData}`);
    setlocalStorageData(newLocalData);
  };

  // tabIndex logic
  const [focusItem, setFocusItem] = useState<string>('');
  console.log(focusItem);

  const focusListSearch = (e: KeyboardEvent, focusItem: string) => {
    if (e.code === 'Enter') {
      setSearchWord(focusItem);
      let searchListId = document.getElementById('#searchList');
      searchListId?.blur();
      let searchInputId = document.getElementById('searchInput');
      searchInputId?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) =>
      focusListSearch(e, focusItem)
    );
    return () => {
      document.removeEventListener('keydown', (e: KeyboardEvent) =>
        focusListSearch(e, focusItem)
      );
    };
  }, [focusItem]);

  // tabIndex ArrowKey contral
  const focusContralArrow = (
    e: KeyLIEvent,
    index: number,
    listLength: number
  ) => {
    document.getElementById(`searchList${index}`)?.blur();
    if (e.code === 'ArrowDown') {
      if (index === listLength - 1) {
        document.getElementById(`searchList${0}`)?.focus();
      } else {
        document.getElementById(`searchList${index + 1}`)?.focus();
      }
    } else if (e.code === 'ArrowUp') {
      if (index === 0) {
        document.getElementById(`searchList${listLength - 1}`)?.focus();
      } else {
        document.getElementById(`searchList${index - 1}`)?.focus();
      }
    }
  };

  return (
    <>
      {isFocus ? (
        <Container onClick={(e) => e.stopPropagation()}>
          {searchWord?.length === 0 ? (
            <CardBox>
              <SearchCate>최근 검색어</SearchCate>
              <RecommendList>
                {localStorageData?.length ? (
                  localStorageData.map((item: string, index: number) => {
                    return (
                      <li
                        key={index}
                        id={`searchList${index}`}
                        tabIndex={0}
                        onClick={() => {
                          setSearchWord(item);
                          focusHandler('blur');
                        }}
                        onKeyDown={(e) =>
                          focusContralArrow(e, index, localStorageData.length)
                        }
                        onFocus={() => setFocusItem(item)}
                      >
                        <ListItemWrap>
                          <img
                            src={require('../images/searchGray.png')}
                            alt='돋보기 이미지'
                          />
                          <span>{item}</span>
                        </ListItemWrap>
                        <CancelBtn
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSearchedWord(item);
                          }}
                          src={require('../images/cancel.png')}
                          alt='최근 검색어 삭제'
                        />
                      </li>
                    );
                  })
                ) : (
                  <p>최근 검색어가 없습니다.</p>
                )}
              </RecommendList>
            </CardBox>
          ) : (
            <CardBox>
              <SearchCate>추천 검색어</SearchCate>
              <RecommendList>
                {recommendWord?.length ? (
                  recommendWord.map((item, index) => {
                    return (
                      <li
                        key={item.sickCd}
                        id={`searchList${index}`}
                        tabIndex={0}
                        onClick={() => {
                          setSearchWord(item.sickNm);
                          focusHandler('blur');
                        }}
                        onKeyDown={(e) =>
                          focusContralArrow(e, index, recommendWord?.length)
                        }
                        onFocus={() => setFocusItem(item.sickNm)}
                      >
                        <ListItemWrap>
                          <RecoWord item={item} searchWord={searchWord} />
                        </ListItemWrap>
                      </li>
                    );
                  })
                ) : (
                  <p>추천 검색어가 없습니다.</p>
                )}
              </RecommendList>
            </CardBox>
          )}
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  position: absolute;
  top: 350px;
  width: 490px;
  max-height: 500px;
  overflow-y: auto;
  background-color: white;
  box-shadow: 1px 1px 4px 1px lightgray;
  border-radius: 20px;
`;

const CardBox = styled.div`
  padding: 10px;
  & p {
    color: #a3a3a3;
    font-weight: bold;
  }
`;

const SearchCate = styled.span`
  margin-bottom: 10px;
  color: gray;
  font-size: 0.8rem;
  font-weight: bold;
`;

const RecommendList = styled.ul`
  padding: 0;
  & li {
    margin: 15px 0 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    &:focus {
      outline: none;
      background-color: #cae9ff;
    }
  }
  & img {
    margin-right: 7px;
    width: 20px;
    height: 20px;
  }
`;
const ListItemWrap = styled.div`
  display: flex;
  align-items: center;
`;

const CancelBtn = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  cursor: pointer;
`;
