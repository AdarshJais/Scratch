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

export default function TileAtom({ atom, index, getChildDetails, moleculeId }) {
  let tile = `${atom?.prog}`;
  let atomId = `${atom?.id}`;
  let param = atom?.param;

  console.log("tileAtom", getChildDetails);
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
