import React, { useState } from "react";
import { DoubleInputTile } from "./shared/DoubleInputTile";

const MoveXY = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  return (
    <DoubleInputTile
      actionText={["move x", "y"]}
      param={param}
      atomId={atomId}
      moleculeId={moleculeId}
    />
  );
};

export default MoveXY;
