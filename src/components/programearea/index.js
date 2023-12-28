import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  motionComponents,
  looksComponents,
  controlComponents,
  eventsComponents,
} from "./Constants.js";
import styled from "styled-components";
import { renderProgrameTiles } from "./utils";

// Styled components
const SidebarContainer = styled.div`
  height: 100%;
  width: 25%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const SidebarHeader = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  padding: 2px;
  width: auto;
`;

const SectionTitle = styled.div`
  font-weight: bold;
`;

const StyledDroppable = styled(Droppable)`
  &.my-3 {
    margin: 10px 0;
  }
`;

const StyledDraggable = styled(Draggable)`
  &.my-2 {
    margin: 5px 0;
  }
`;

const ProgrameArea = () => {
  return (
    <SidebarContainer>
      <StyledDroppable droppableId="sideArea-motion" type="COMPONENTS">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {motionComponents.map((x, i) => (
              <StyledDraggable
                key={`${x}-sideArea`}
                draggableId={`${x}-sideArea`}
                index={i}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {renderProgrameTiles(x, i, i)}
                  </div>
                )}
              </StyledDraggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StyledDroppable>
    </SidebarContainer>
  );
};

export default ProgrameArea;
