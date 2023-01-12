import React from 'react';
import styled from "styled-components";

type WProps= {
  item: {sickNm:string},
  searchWord: string,
}

export default function RecoWord({item: {sickNm}, searchWord}: WProps) {
  return sickNm.includes(searchWord) ? (
    <>
      <img
        src={require("../images/searchGray.png")}
        alt="돋보기 이미지"
      />
      {sickNm?.split(searchWord)[0]}
      <ItemBold>{searchWord}</ItemBold>
      {sickNm?.split(searchWord)[1]} 
    </>
  ) : null;
}

const ItemBold = styled.span`
  font-weight: bold;
`;
