import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import {
  getProgFunction,
  playMolecule,
  renderProgrameTiles,
} from "../../programearea/utils";
import TileAtom from "../tileatom";
import convertLayerAtRulesToControlComments from "tailwindcss/lib/lib/convertLayerAtRulesToControlComments";
import { historyEnqueueAction } from "../../../redux/playhistory/action";

const DraggabeMolecule = styled.div`
  // margin: 2px;
  // padding: 8px;
  background-color: ${(props) => (props?.clicked ? "#F6F795" : "")};
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  transition: background-color 0.5s ease; /* Add a transition effect to the background-color property */
`;

const DropableList = styled.div`
  background-color: ${(props) => (props?.isDraggingOver ? "#cecdce" : "")};
  padding: 8px;
  margin: 4px;
  border-radius: 4px;
  display: flex;
  align-self: flex-start;
  flex-direction: column;
`;

const StyledButton = styled.button`
  background-color: #1a237e; /* Dark color */
  color: #fff;
  padding: 3px 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-bottom: 5px;
  // width: fit-content; /* Make it only take space of its content */

  &:hover {
    background-color: #0d47a1; /* Dark color on hover */
  }
`;
const runMoleculeProg = async (atoms, event) => {
  for (const atom of atoms) {
    let func = getProgFunction(atom.prog);
    await func(atom.param, false);
  }
};

export default function TileMolecule({ moleculeId, atoms, index }) {
  const dispatch = useDispatch();
  const [clicked, setClicked] = React.useState(false);

  const handleClick = () => {
    setClicked(true);
    runMoleculeProg(atoms);
    dispatch(
      historyEnqueueAction({
        molecule: {
          moleculeId: moleculeId,
          atoms: atoms,
        },
      })
    );
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  return (
    <Draggable
      key={`draggable_${moleculeId}`}
      draggableId={`draggable_${moleculeId}`}
      index={index}
    >
      {(provided) => (
        <DraggabeMolecule
          // onClick={(e) => handleClick()}
          // onClick={(e) => handleClick(atoms, e)}
          clicked={clicked}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={`${moleculeId}`} type="atoms">
            {(provided, snapshot) => (
              <DropableList
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot?.isDraggingOver}
              >
                <StyledButton onClick={handleClick}>Play</StyledButton>
                {atoms?.map((atom, index) => {
                  return (
                    <TileAtom
                      atom={atom}
                      index={index}
                      key={index}
                      moleculeId={moleculeId}
                      // getChildDetails={getChildDetails}
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
