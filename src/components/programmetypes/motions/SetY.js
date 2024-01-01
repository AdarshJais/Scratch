import React, { useState } from "react";
import { SingleInputTile } from "./shared/SingleInputTile";

const SetY = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  return (
    <SingleInputTile
      actionText={["set x"]}
      param={param}
      atomId={atomId}
      moleculeId={moleculeId}
    />
  );
};

export default SetY;
