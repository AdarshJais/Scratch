import React, { useState } from "react";
import { SingleInputTile } from "./shared/SingleInputTile";

const PointTowards = ({
  character,
  atomId,
  getChildDetails,
  moleculeId,
  param,
}) => {
  return (
    <SingleInputTile
      actionText={["point at angle"]}
      param={param}
      atomId={atomId}
      moleculeId={moleculeId}
    />
  );
};

export default PointTowards;
