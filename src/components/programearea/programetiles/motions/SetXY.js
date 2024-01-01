import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateParamOfAtom } from "../../../../redux/midarea/action";
import { setToXAndY } from "../../utils";
import { MoveButton, StyledInput } from "./MoveX";

const SetXY = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  // const [state, setState] = useState({
  //   x: 0,
  //   y: 0,
  // });
  const dispatch = useDispatch();

  const handleClick = React.useCallback(() => {
    setToXAndY({
      x: param.x,
      y: param.y,
    });
  }, [param.x, param.y]);

  const buttonRef = React.useRef(null);

  // React.useEffect(() => {
  //   buttonRef.current.addEventListener("click", handleClick);

  //   return () => {
  //     buttonRef?.current?.removeEventListener("click", handleClick);
  //   };
  // }, [handleClick]);

  return (
    <MoveButton id={atomId} onClick={handleClick}>
      set x
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
                  x: parseInt(e.target.value),
                  y: param.y,
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

export default SetXY;
