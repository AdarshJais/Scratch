import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateParamOfAtom } from "../../../../redux/midarea/action";
import { moveToY, moveYSteps } from "../../utils";
import { MoveButton, StyledInput } from "./MoveX";

const MoveY = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  // const [steps, setSteps] = useState(0);

  const dispatch = useDispatch();

  const handleClick = React.useCallback(() => {
    moveYSteps(param);
  }, [param]);

  // const buttonRef = React.useRef(null);

  // React.useEffect(() => {
  //   buttonRef.current.addEventListener("click", handleClick);

  //   return () => {
  //     buttonRef?.current?.removeEventListener("click", handleClick);
  //   };
  // }, [handleClick]);

  return (
    <MoveButton id={atomId} onClick={() => handleClick()}>
      move Y{" "}
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
          // setSteps(parseInt(e.target.value))
        }}
      />{" "}
      steps
    </MoveButton>
  );
};

export default MoveY;
