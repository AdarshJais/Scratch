import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateParamOfAtom } from "../../../../redux/midarea/action";
import { MoveButton, StyledInput, TileContainer } from "./styledcomp/index";

export const DoubleInputTile = ({ actionText, param, atomId, moleculeId }) => {
  const dispatch = useDispatch();

  const handleInputXChange = (e) => {
    if (parseInt(e.target.value) !== 0) {
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
    }
  };

  const handleInputYChange = (e) => {
    if (parseInt(e.target.value) !== 0) {
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
    }
  };

  return (
    <TileContainer id={atomId}>
      {actionText[0]}
      <StyledInput
        type="number"
        value={param.x}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={handleInputXChange}
      />
      {actionText[1]}
      <StyledInput
        type="number"
        value={param.y}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={handleInputYChange}
      />
    </TileContainer>
  );
};
