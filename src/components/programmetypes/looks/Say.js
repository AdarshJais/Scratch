import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateParamOfAtom } from "../../../redux/midarea/action";
import { sayMessage } from "../../../utils";
import { LookTileContainer, StyledInput } from "./components";

const Say = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  const dispatch = useDispatch();
  const handleClick = React.useCallback(() => {
    sayMessage(param);
  }, [param]);

  return (
    // <StyledPaper>
    <LookTileContainer id={atomId} onClick={handleClick}>
      say
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

export default Say;
