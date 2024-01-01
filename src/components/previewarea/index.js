import React from "react";
import styled from "styled-components";
import CatSprite from "../../assets/svg/CatSprite";
import CatSpriteHistory from "../../assets/svg/CatSpritHistory";

const CatParent = styled.div`
  height: 100vh;
  width: 30%;
  background-color: white;
  border-top-left-radius: 10px; /* Adjust the value as needed */
  border-bottom-left-radius: 10px; /* Adjust the value as needed */
  border-width: 2px; /* Adjust the border width as needed */
  border-style: solid; /* Specify the border style (e.
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

    let cat_history = document.getElementById("cat-history");
    cat_history.style.position = "absolute";
    cat_history.style.left = initialX + "px";
    cat_history.style.top = initialY + "px";
    cat_history.style.display = "block";
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
