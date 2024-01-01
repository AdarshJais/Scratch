import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateParamOfAtom } from "../../../../redux/midarea/action";
import { setToY } from "../../utils";
import { MoveButton, StyledInput } from "./MoveX";

const SetY = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  // const [steps, setSteps] = useState(0);

  const dispatch = useDispatch();

  const handleClick = React.useCallback(() => {
    setToY(param);
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
      set y to{" "}
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

export default SetY;
