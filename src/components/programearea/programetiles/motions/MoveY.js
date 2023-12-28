import React, { useState } from "react";
import styled from "styled-components";
import { moveToY, moveYSteps } from "../../utils";
import { MoveButton, StyledInput } from "./MoveX";

const MoveY = ({ comp_id }) => {
  const [steps, setSteps] = useState(0);

  const handleClick = React.useCallback(() => {
    moveYSteps(steps);
  }, [steps]);

  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    buttonRef.current.addEventListener("click", handleClick);

    return () => {
      buttonRef?.current?.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return (
    <MoveButton id={comp_id} ref={buttonRef}>
      move Y{" "}
      <StyledInput
        type="number"
        value={steps}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => setSteps(parseInt(e.target.value))}
      />{" "}
      steps
    </MoveButton>
  );
};

export default MoveY;
