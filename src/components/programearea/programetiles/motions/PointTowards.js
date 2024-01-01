import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateParamOfAtom } from "../../../../redux/midarea/action";

import { pointTowards } from "../../utils";
import { MoveButton, StyledInput } from "./MoveX";

const PointTowards = ({
  character,
  atomId,
  getChildDetails,
  moleculeId,
  param,
}) => {
  // const [param, setAngle] = useState(0);
  const dispatch = useDispatch();
  const handleClick = React.useCallback(() => {
    pointTowards(param);
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
      Point towards{" "}
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
          // setAngle(parseInt(e.target.value))
        }}
      />
    </MoveButton>
  );
};

export default PointTowards;
