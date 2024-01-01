import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateParamOfAtom } from "../../../../redux/midarea/action";
import { setToX } from "../../utils";
import { MoveButton, StyledInput } from "./MoveX";

const SetX = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  // const [param, setSteps] = useState(0);
  const dispatch = useDispatch();
  const handleClick = React.useCallback(() => {
    setToX(param);
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
      set x to{" "}
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
      />
    </MoveButton>
  );
};

export default SetX;
