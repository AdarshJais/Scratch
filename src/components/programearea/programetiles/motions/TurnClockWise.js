import React, { useState } from "react";
import styled from "styled-components";
import { turnAntiClockWise, turnClockWise } from "../../utils";
import { MoveButton, StyledInput } from "./MoveX";

const TurnClockWise = ({ comp_id }) => {
  const [angle, setAngle] = useState(0);

  const handleClick = React.useCallback(() => {
    turnClockWise(angle);
  }, [angle]);

  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    buttonRef.current.addEventListener("click", handleClick);

    return () => {
      buttonRef?.current?.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return (
    <MoveButton id={comp_id} ref={buttonRef}>
      turn{" "}
      <StyledInput
        type="number"
        value={angle}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => setAngle(parseInt(e.target.value))}
      />
      ClockWise
    </MoveButton>
  );
};

export default TurnClockWise;
