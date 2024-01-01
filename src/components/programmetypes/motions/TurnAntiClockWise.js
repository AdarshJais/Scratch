import React, { useState } from "react";
import { SingleInputTile } from "./shared/SingleInputTile";

const TurnAntiClockWise = ({
  character,
  atomId,
  getChildDetails,
  moleculeId,
  param,
}) => {
  return (
    <SingleInputTile
      actionText={["rotate anti-clockwise"]}
      param={param}
      atomId={atomId}
      moleculeId={moleculeId}
    />
  );
};

export default TurnAntiClockWise;
