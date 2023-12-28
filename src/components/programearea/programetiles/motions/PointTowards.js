import React, { useState } from "react";

import { pointTowards } from "../../utils";
import { MoveButton, StyledInput } from "./MoveX";

const PointTowards = ({ comp_id }) => {
  const [angle, setAngle] = useState(0);

  const handleClick = React.useCallback(() => {
    pointTowards(angle);
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
      Point towards{" "}
      <StyledInput
        type="number"
        value={angle}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => setAngle(parseInt(e.target.value))}
      />
    </MoveButton>
  );
};

export default PointTowards;
