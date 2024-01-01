import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { renderProgrameTiles } from "../../../utils";

const ProgTileContainer = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
`;

export default function TileAtom({ atom, index, getChildDetails, moleculeId }) {
  let tile = `${atom?.prog}`;
  let atomId = `${atom?.id}`;
  let param = atom?.param;

  return (
    <Draggable key={`${atomId}`} draggableId={`${atomId}`} index={index}>
      {(provided) => (
        <ProgTileContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {renderProgrameTiles(
            tile,
            atomId,
            getChildDetails,
            moleculeId,
            param
          )}
          {/* {provided.placeholder} */}
        </ProgTileContainer>
      )}
    </Draggable>
  );
}
