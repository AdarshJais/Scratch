import React, { useState } from "react";
import { moveXAndYSteps } from "../../utils";
import { MoveButton, StyledInput } from "./MoveX";

const MoveXY = ({ character, comp_id }) => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });

  const handleClick = React.useCallback(() => {
    moveXAndYSteps({
      xSteps: state.x,
      ySteps: state.y,
    });
  }, [state.x, state.y]);

  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    buttonRef.current.addEventListener("click", handleClick);

    return () => {
      buttonRef?.current?.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return (
    <MoveButton id={comp_id} ref={buttonRef}>
      move x
      <StyledInput
        type="number"
        value={state.x}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          parseInt(e.target.value) !== 0 &&
            setState({ ...state, x: parseInt(e.target.value) });
        }}
      />
      Y
      <StyledInput
        type="number"
        value={state.y}
        onChange={(e) => {
          parseInt(e.target.value) !== 0 &&
            setState({ ...state, y: parseInt(e.target.value) });
        }}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
      />
    </MoveButton>
  );
};

export default MoveXY;
