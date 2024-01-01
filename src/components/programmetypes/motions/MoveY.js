import React, { useState } from "react";
import { SingleInputTile } from "./shared/SingleInputTile";

const MoveY = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  return (
    <SingleInputTile
      actionText={["move y"]}
      param={param}
      atomId={atomId}
      moleculeId={moleculeId}
    />
  );
};

export default MoveY;
