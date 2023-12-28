import React, { useState } from "react";
import styled from "styled-components";

// Define your styled components
const StyledElevationDiv = styled.div`
  // Add your div styles here
  // box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16); /* Adjust shadow values as needed */
`;

const Container = styled.div`
  &.text-center {
    text-align: center;
  }

  &.rounded {
    border-radius: 4px;
  }

  &.bg-blue-500 {
    background-color: #3498db; /* Replace with your desired color */
  }

  // Add more styles as needed
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 10px 0;
`;

const StyledInput = styled.input`
  text-align: center;
  width: 40px;
  margin: 0 8px;
  color: black;
`;

const ActionButton = styled.div`
  // Add your button styles here
`;
const TileContainer = styled.div`
  text-align: center;
  border-radius: 4px;
  background-color: #2196f3;
  color: #fff;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  font-size: 12px;
  display: inline-block;
  flex: 1;
  &:hover {
    background-color: #1565c0;
  }
`;
const CAT_WIDTH = 95.17898101806641;
const CAT_HEIGHT = 100.04156036376953;
const GotoXY = ({ character, comp_id, index }) => {
  const [state, setState] = useState({
    goto_x: 0,
    goto_y: 0,
  });

  const gotoXY = () => {
    let elParent = document.getElementById("cat-parent");
    var offsetsParent = elParent.getBoundingClientRect();
    let initialX =
      offsetsParent.left + (offsetsParent.width / 2 - CAT_WIDTH / 2);
    let initialY = offsetsParent.height / 2 - CAT_HEIGHT / 2;

    console.log("initialX", initialX);
    const el = document.getElementById("cat");
    el.style.position = "absolute";
    console.log(initialX + state.goto_x + "px");
    el.style.left = initialX + state.goto_x + "px";
    el.style.top = initialY + state.goto_y + "px";
  };

  return (
    <TileContainer onClick={() => gotoXY()}>
      go to X :{" "}
      <StyledInput
        type="number"
        value={state.goto_x}
        onChange={(e) => {
          parseInt(e.target.value) !== 0 &&
            setState({ ...state, goto_x: parseInt(e.target.value) });
        }}
      />{" "}
      Y :{" "}
      <StyledInput
        type="number"
        value={state.goto_y}
        onChange={(e) => {
          parseInt(e.target.value) !== 0 &&
            setState({ ...state, goto_y: parseInt(e.target.value) });
        }}
      />
    </TileContainer>
    // <StyledElevationDiv>
    //   <Container className="text-center rounded bg-blue-500 p-2">
    //     <GridContainer>
    //       <div className="text-white"> {index}</div>
    //       <div className="text-white"> X</div>
    //       <StyledInput
    //         type="number"
    //         value={state.goto_x}
    //         onChange={(e) => {
    //           parseInt(e.target.value) !== 0 &&
    //             setState({ ...state, goto_x: parseInt(e.target.value) });
    //         }}
    //       />
    //     </GridContainer>
    //     <GridContainer>
    //       <div className="text-white">Y</div>
    //       <StyledInput
    //         type="number"
    //         value={state.goto_y}
    //         onChange={(e) => {
    //           parseInt(e.target.value) !== 0 &&
    //             setState({ ...state, goto_y: parseInt(e.target.value) });
    //         }}
    //       />
    //     </GridContainer>
    //     <ActionButton
    //       id={comp_id}
    //       className="text-center bg-blue-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
    //       onClick={() => gotoXY()}
    //     >
    //       Go to X : {state.goto_x} Y : {state.goto_y}
    //     </ActionButton>
    //   </Container>
    // </StyledElevationDiv>
  );
};

export default GotoXY;
