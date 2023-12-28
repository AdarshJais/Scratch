import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { renderProgrameTiles } from "../../programearea/utils";
import TileAtom from "../tileatom";

const DraggabeMolecule = styled.div`
  // margin: 2px;
  // padding: 8px;
  // background-color: yellow;
  display: flex;
  align-self: flex-start;
  flex-direction: column;
`;

const DropableList = styled.div`
  // background-color: pink;
  padding: 8px;
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  // Apply margin to all direct children
  > * {
    margin-bottom: 15px;
  }
`;

export default function ProgTileMolecules({ moleculeId, atoms, index }) {
  return (
    <Draggable
      key={`draggable_${moleculeId}`}
      draggableId={`draggable_${moleculeId}`}
      index={index}
    >
      {(provided) => (
        <DraggabeMolecule
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={`${moleculeId}`} type="atoms">
            {(provided) => (
              <DropableList
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {atoms?.map((atom, index) => {
                  return <TileAtom atom={atom} index={index} key={index} />;
                })}

                {provided.placeholder}
              </DropableList>
            )}
          </Droppable>
          {provided.placeholder}
        </DraggabeMolecule>
      )}
    </Draggable>
  );
}
