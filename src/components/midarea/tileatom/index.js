import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { renderProgrameTiles } from "../../programearea/utils";
import styled from "styled-components";

const ProgTileContainer = styled.div`
  //margin: 2px;
  // padding: 1px;
  // background-color: yellow;
  display: flex;
  align-self: flex-start;
  flex-direction: column;
`;

export default function TileAtom({ atom, index }) {
  let tile = `${atom?.prog}`;
  let atom_id = `${atom?.id}`;

  return (
    <Draggable key={`${atom_id}`} draggableId={`${atom_id}`} index={index}>
      {(provided) => (
        <ProgTileContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {renderProgrameTiles(tile, atom_id)}
          {/* {provided.placeholder} */}
        </ProgTileContainer>
      )}
    </Draggable>
  );
}
