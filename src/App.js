import React from "react";
import ProgrammeArea from "./components/programmeaarea";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addMolecules,
  deleteAtom,
  moveAtom,
  moveNewAtom,
} from "./redux/midarea/action";
import PreviewArea from "./components/previewarea";
import Header from "./components/header";

const Container = styled.div`
  background-color: #e5f0ff;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  display: flex;
`;
const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  flex-direction: row;
  display: flex;
  overflow: hidden;
`;

const LeftContainer = styled.div`
  height: 99.9%;
  width: 70%;
  display: flex;
  background-color: #f9f9f9;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-width: 1.4px;
  border-style: solid;
  margin-right: 30px;
  border-color: #00000026;
`;

const App = () => {
  const dispatch = useDispatch();
  const complist = useSelector((state) => state.list.midAreaCompound);
  const progList = useSelector((state) => state.list.programeAreaCompound);

  const onDragEnd = (result) => {
    let { source, destination, draggableId, combine, type } = result;
    if (type == "atoms") {
      if (source.droppableId == "motion" || source.droppableId == "look") {
        if (!destination) {
          dispatch(
            addMolecules({
              sourceMoleculeId: source.droppableId,
              sourceAtomId: draggableId,
            })
          );
        } else {
          let sourceMoleculeId = source?.droppableId;
          let sourceMoleculeIndex = progList.findIndex((molecule) => {
            return molecule.id == source?.droppableId;
          });

          let sourceAtomId = draggableId;
          let atomIndexInSourceMolecule = source?.index;
          let destinationMoleculeId = destination?.droppableId;
          let destinationMoleculeIndex = complist.findIndex((molecule) => {
            return molecule.id == destination?.droppableId;
          });
          let atomIndexInDestinationMolecule = destination?.index;
          dispatch(
            moveNewAtom({
              destinationMoleculeId,
              atomIndexInDestinationMolecule,
              sourceMoleculeId,
              atomIndexInSourceMolecule,
              sourceMoleculeIndex,
              destinationMoleculeIndex,
            })
          );
        }
      } else {
        if (source) {
          let sourceMoleculeId = source?.droppableId;
          let sourceMoleculeIndex = complist.findIndex((molecule) => {
            return molecule.id == source?.droppableId;
          });

          let sourceAtomId = draggableId;
          let atomIndexInSourceMolecule = source?.index;

          if (destination) {
            let destinationMoleculeId = destination?.droppableId;
            let destinationMoleculeIndex = complist.findIndex((molecule) => {
              return molecule.id == destination?.droppableId;
            });
            let atomIndexInDestinationMolecule = destination?.index;

            if (
              destinationMoleculeId == "motion" ||
              destinationMoleculeId == "look"
            ) {
              dispatch(
                deleteAtom({
                  atomIndexInSourceMolecule,
                  sourceMoleculeId,
                  sourceMoleculeIndex,
                })
              );
            } else {
              dispatch(
                moveAtom({
                  destinationMoleculeId,
                  atomIndexInDestinationMolecule,
                  sourceMoleculeId,
                  atomIndexInSourceMolecule,
                  sourceMoleculeIndex,
                  destinationMoleculeIndex,
                })
              );
            }
          }
          if (!destination) {
            dispatch(
              addMolecules({
                sourceMoleculeId: sourceMoleculeId,
                sourceAtomId: sourceAtomId,
              })
            );
          }
        }
      }
    }
  };

  return (
    <Container>
      <Header />
      <MainContainer>
        <LeftContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            <ProgrammeArea />
          </DragDropContext>
        </LeftContainer>

        <PreviewArea />
      </MainContainer>
    </Container>
  );
};

export default App;
