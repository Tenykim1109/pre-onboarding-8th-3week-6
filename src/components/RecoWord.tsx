import React from "react";

type WProps = {
  item: { sickNm: string };
  searchWord: string;
};

export default function RecoWord({ item: { sickNm }, searchWord }: WProps) {
  return sickNm.includes(searchWord) ? (
    <>
      <img src={require("../images/searchGray.png")} alt="돋보기 이미지" />
      <p style={{ color: "black", fontWeight: "normal" }}>
        {sickNm?.split(searchWord)[0]}
        <b>{searchWord}</b>
        {sickNm?.split(searchWord)[1]}
      </p>
    </>
  ) : null;
}
