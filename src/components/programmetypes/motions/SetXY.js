import React, { useState } from "react";
import { DoubleInputTile } from "./shared/DoubleInputTile";

const SetXY = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  return (
    <DoubleInputTile
      actionText={["set x", "y"]}
      param={param}
      atomId={atomId}
      moleculeId={moleculeId}
    />
  );
};

export default SetXY;
