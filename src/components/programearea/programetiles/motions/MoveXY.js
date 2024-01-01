import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateParamOfAtom } from "../../../../redux/midarea/action";
import { moveXAndYSteps } from "../../utils";
import { MoveButton, StyledInput } from "./MoveX";

const MoveXY = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  const dispatch = useDispatch();
  // const [state, setState] = useState({
  //   x: 0,
  //   y: 0,
  // });

  const handleClick = React.useCallback(() => {
    moveXAndYSteps({
      x: param.x,
      y: param.y,
    });
  }, [param.x, param.y]);

  // const buttonRef = React.useRef(null);

  // React.useEffect(() => {
  //   buttonRef.current.addEventListener("click", handleClick);

  //   return () => {
  //     buttonRef?.current?.removeEventListener("click", handleClick);
  //   };
  // }, [handleClick]);

  return (
    <MoveButton id={atomId} onClick={handleClick}>
      move x
      <StyledInput
        type="number"
        value={param.x}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          parseInt(e.target.value) !== 0 &&
            dispatch(
              updateParamOfAtom({
                moleculeId: moleculeId,
                atomId: atomId,
                param: {
                  y: param.y,
                  x: parseInt(e.target.value),
                },
              })
            );
          // setState({ ...state, x: parseInt(e.target.value) });
        }}
      />
      Y
      <StyledInput
        type="number"
        value={param.y}
        onChange={(e) => {
          parseInt(e.target.value) !== 0 &&
            dispatch(
              updateParamOfAtom({
                moleculeId: moleculeId,
                atomId: atomId,
                param: {
                  x: param.x,
                  y: parseInt(e.target.value),
                },
              })
            );
          // setState({ ...state, y: parseInt(e.target.value) });
        }}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
      />
    </MoveButton>
  );
};

export default MoveXY;
