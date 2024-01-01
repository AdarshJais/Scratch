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
import { replayHistoryAction } from "./redux/playhistory/action";

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
const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const ReplayButton = styled.button`
background-color: #ffffff;
color: #3498db;
padding: 5px 8px;
border: 1.5px solid #3498db;
border-radius: 20px;
cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
display: flex;
align-items: center;
font-size: 12px;
font-weight: bold;
transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease,
box-shadow 0.3s ease;
opacity:  ${(props) => (props.disabled ? 0.5 : 1)};
&:hover {
background-color: ${(props) => (props.disabled ? "#ffffff" : "#3498db30")};
border-color: ${(props) => (props.disabled ? "#3498db" : "#2980b9")};
box-shadow: ${(props) =>
  props.disabled ? "none" : "0 2px 4px rgba(0, 0, 0, 0.1)"};
}
:`;

const ReplayIcon = styled.span`
  margin-right: 8px;
`;

const App = () => {
  const dispatch = useDispatch();
  const complist = useSelector((state) => state.list.midAreaCompound);
  const progList = useSelector((state) => state.list.programeAreaCompound);
  const historyList = useSelector((state) => state.playHistory.history);

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

  const replayHistory = () => {
    dispatch(replayHistoryAction());
  };
  return (
    <Container>
      <SectionContainer>
        <ReplayButton
          disabled={historyList.length <= 0}
          onClick={replayHistory}
        >
          <ReplayIcon>&#x21bb;</ReplayIcon>Replay
        </ReplayButton>
      </SectionContainer>

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
