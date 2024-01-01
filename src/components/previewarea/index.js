import React from "react";
import styled from "styled-components";
import CatSprite from "../../assets/svg/CatSprite";
import CatSpriteHistory from "../../assets/svg/CatSpritHistory";
import { setCatAtInitial, setCatHistoryAtInitial } from "../../utils";

const CatParent = styled.div`
  height: 100vh;
  width: 30%;
  background-color: white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-width: 2px;
  border-style: solid;
`;

export default function PreviewArea() {
  React.useEffect(() => {
    setCatAtInitial();
    setCatHistoryAtInitial();
  }, []);

  return (
    <>
      <CatParent id={"cat-parent"}>
        <CatSprite id={"cat"} />
        <CatSpriteHistory id={"cat-history"} />
      </CatParent>
    </>
  );
}
