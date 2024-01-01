import React, { useState } from "react";
import { SingleInputTile } from "./shared/SingleInputTile";

const MoveX = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  return (
    <SingleInputTile
      actionText={["move x"]}
      param={param}
      atomId={atomId}
      moleculeId={moleculeId}
    />
  );
};

export default MoveX;
