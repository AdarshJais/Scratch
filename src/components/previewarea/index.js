import React from "react";
import styled from "styled-components";
import CatSprite from "../../assets/svg/CatSprite";

const CatParent = styled.div`
  height: 100vh;
  width: 30%;
  background-color: #f9f9f9;
`;

const CAT_WIDTH = 95.17898101806641;
const CAT_HEIGHT = 100.04156036376953;

export default function PreviewArea() {
  React.useEffect(() => {
    let elParent = document.getElementById("cat-parent");
    var offsetsParent = elParent.getBoundingClientRect();
    let initialX =
      offsetsParent.left + (offsetsParent.width / 2 - CAT_WIDTH / 2);
    let initialY = offsetsParent.height / 2 - CAT_HEIGHT / 2;

    let cat = document.getElementById("cat");
    cat.style.position = "absolute";
    cat.style.left = initialX + "px";
    cat.style.top = initialY + "px";
  }, []);

  return (
    <CatParent id={"cat-parent"}>
      <CatSprite id={"cat"} />
    </CatParent>
  );
}
