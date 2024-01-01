import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateParamOfAtom } from "../../../redux/midarea/action";
import { moveXSteps, sayMessage, thinkMessage } from "../../../utils";
import { LookTileContainer, StyledInput } from "./components";

const Think = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  // const [message, setMessage] = useState("hello");

  const dispatch = useDispatch();
  const handleClick = React.useCallback(() => {
    thinkMessage(param);
  }, [param]);

  // const buttonRef = React.useRef(null);

  // React.useEffect(() => {
  //   buttonRef.current.addEventListener("click", handleClick);

  //   return () => {
  //     buttonRef?.current?.removeEventListener("click", handleClick);
  //   };
  // }, [handleClick]);

  return (
    // <StyledPaper>
    <LookTileContainer id={atomId} onClick={handleClick}>
      think
      <StyledInput
        type="text"
        value={param}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          e.target.value.length > 0 &&
            dispatch(
              updateParamOfAtom({
                moleculeId: moleculeId,
                atomId: atomId,
                param: e.target.value,
              })
            );
        }}
      />
    </LookTileContainer>
    // </StyledPaper>
  );
};

export default Think;
