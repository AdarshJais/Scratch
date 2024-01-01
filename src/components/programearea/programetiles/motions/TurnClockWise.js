import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateParamOfAtom } from "../../../../redux/midarea/action";
import { turnAntiClockWise, turnClockWise } from "../../utils";
import { MoveButton, StyledInput } from "./MoveX";

const TurnClockWise = ({
  character,
  atomId,
  getChildDetails,
  moleculeId,
  param,
}) => {
  const dispatch = useDispatch();

  // const [angle, setAngle] = useState(0);

  const handleClick = React.useCallback(() => {
    turnClockWise(param);
  }, [param]);

  // const buttonRef = React.useRef(null);

  // React.useEffect(() => {
  //   buttonRef.current.addEventListener("click", handleClick);

  //   return () => {
  //     buttonRef?.current?.removeEventListener("click", handleClick);
  //   };
  // }, [handleClick]);

  return (
    <MoveButton id={atomId} onClick={handleClick}>
      turn{" "}
      <StyledInput
        type="number"
        value={param}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          dispatch(
            updateParamOfAtom({
              moleculeId: moleculeId,
              atomId: atomId,
              param: parseInt(e.target.value),
            })
          );
          //setAngle(parseInt(e.target.value))
        }}
      />
      ClockWise
    </MoveButton>
  );
};

export default TurnClockWise;
