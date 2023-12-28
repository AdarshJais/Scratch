import React from "react";
import MidArea from "./components/MidArea";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  addMolecules,
  deleteAtom,
  moveAtom,
  moveNewAtom,
} from "./redux/midarea/action";
import PreviewArea from "./components/previewarea";

const App = () => {
  const dispatch = useDispatch();

  const complist = useSelector((state) => state.list.midAreaCompound);
  const progList = useSelector((state) => state.list.programeAreaCompound);
  const onDragEnd = (result) => {
    let { source, destination, draggableId, combine, type } = result;
    console.log("result", result);
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
    // <AppContainer>
    //   <FlexContainer>
    <DragDropContext onDragEnd={onDragEnd}>
      {/* <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2"> */}
      {/* <ProgrameArea /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <MidArea />
        <PreviewArea />
      </div>

      {/* </div> */}
      {/* <div className="w-1/3 relative h-screen overflow-scroll flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea />
          </div> */}
    </DragDropContext>
    //   </FlexContainer>
    // </AppContainer>
  );
};

export default App;
