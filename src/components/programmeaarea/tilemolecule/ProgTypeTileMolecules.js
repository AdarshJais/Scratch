import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import TileAtom from "../tileatom";

const DraggabeMolecule = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
`;

const DropableList = styled.div`
  padding: 8px;
  display: flex;
  align-self: flex-start;
  flex-direction: column;
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
                  return (
                    <TileAtom
                      atom={atom}
                      index={index}
                      key={index}
                      moleculeId={moleculeId}
                    />
                  );
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
