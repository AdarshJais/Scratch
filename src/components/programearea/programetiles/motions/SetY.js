import React, { useState } from "react";
import { setToY } from "../../utils";
import { MoveButton, StyledInput } from "./MoveX";

const SetY = ({ character, comp_id }) => {
  const [steps, setSteps] = useState(0);

  const handleClick = React.useCallback(() => {
    setToY(steps);
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
      set y to{" "}
      <StyledInput
        type="number"
        value={steps}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => setSteps(parseInt(e.target.value))}
      />
    </MoveButton>
  );
};

export default SetY;
