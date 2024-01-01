import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateParamOfAtom } from "../../../../redux/midarea/action";
import { MoveButton, StyledInput, TileContainer } from "./styledcomp/index";

export const SingleInputTile = ({ actionText, param, atomId, moleculeId }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (e.target.value.length > 0) {
      dispatch(
        updateParamOfAtom({
          moleculeId: moleculeId,
          atomId: atomId,
          param: parseInt(e.target.value),
        })
      );
    }
  };

  return (
    <TileContainer id={atomId}>
      {actionText[0]}
      <StyledInput
        type="number"
        value={param}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={handleInputChange}
      />
    </TileContainer>
  );
};
