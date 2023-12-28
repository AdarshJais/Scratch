import React, { useState } from "react";
import styled from "styled-components";
import { moveXSteps } from "../../utils";

// Styled components
const StyledPaper = styled.div`
  // background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  // padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  // align-self: flex-start;
`;

export const MoveButton = styled.div`
  text-align: center;
  border-radius: 4px;
  background-color: #4c97fe;
  color: #fff;
  padding: 0.5rem 0.3rem;
  cursor: pointer;
  font-size: 12px;
  flex: 1;
  pointer-events: none;
  input {
    pointer-events: auto; // Restore pointer-events for input elements
  }
`;

export const StyledInput = styled.input`
  text-align: center;
  width: 50px;
  margin: 0 8px;
  color: black;
`;

const MoveX = ({ character, comp_id }) => {
  const [steps, setSteps] = useState(0);

  const handleClick = React.useCallback(() => {
    // console.log("handleClick", steps);
    moveXSteps(steps);
  }, [steps]);

  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    buttonRef.current.addEventListener("click", handleClick);

    return () => {
      buttonRef?.current?.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return (
    // <StyledPaper>
    <MoveButton id={comp_id} ref={buttonRef}>
      move X ,
      <StyledInput
        type="number"
        value={steps}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          e.stopPropagation();
          setSteps(parseInt(e.target.value));
        }}
      />
      steps
    </MoveButton>
    // </StyledPaper>
  );
};

export default MoveX;
