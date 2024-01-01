import React, { useState } from "react";
import { SingleInputTile } from "./shared/SingleInputTile";

const SetX = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  return (
    <SingleInputTile
      actionText={["set x"]}
      param={param}
      atomId={atomId}
      moleculeId={moleculeId}
    />
  );
};

export default SetX;
