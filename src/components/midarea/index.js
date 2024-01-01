import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { renderProgrameTiles } from "../programearea/utils";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import TileMolecule from "./tilemolecule";
import ProgrameArea from "../programearea";
import ProgTileMolecules from "./tilemolecule/ProgTileMolecules";
import { replayHistory } from "../../redux/playhistory/action";
// Styled components
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   width: 100%;
//   overflow: auto;
//   padding: 1.5rem;
// `;

const DroppableContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: "100%";
  width: 100%;
  overflow-y: auto;
  // background-color: red;
  // box-sizing: border-box;
`;

const ProgAreaContainer = styled.div`
  // background-color: pink;
  height: 100%;
  width: 25%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const ProgIdeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 100%;
  // background-color: red;
  padding: 12px;
  width: 80%;
  border-left: 1px solid #cecdce; /* 1px solid black border on the left side */

  overflow-y: auto;
  flex-wrap: wrap;
`;

const ProgContainer = styled.div``;

const Button = styled.button`
  margin: 0;
  padding: 0.5rem;
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ProgTypeHeading = styled.div`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 12pt;
  fill: #575E75;
  font-weight: bold;
}`;

const RunButton = styled(Button)`
  background-color: #673ab7;
  font-size: 13px;
  &:hover {
    background-color: #512da8;
  }
`;

const MidArea = () => {
  const midAreaCompound = useSelector((state) => state.list.midAreaCompound);
  const programeAreaCompound = useSelector(
    (state) => state.list.programeAreaCompound
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        // backgroundColor: "yellow",
      }}
    >
      <Droppable
        isCombineEnabled
        droppableId={"midarea-dropable"}
        type="molecules"
        direction="horizontal"
      >
        {(provided) => (
          <DroppableContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <ProgAreaContainer>
              {programeAreaCompound?.map((molecule) => {
                return (
                  <>
                    <ProgTypeHeading>{molecule.id}</ProgTypeHeading>
                    <ProgContainer>
                      <ProgTileMolecules
                        moleculeId={molecule?.id}
                        atoms={molecule?.atoms}
                        index={molecule.id}
                        key={molecule.id}
                      />
                    </ProgContainer>
                  </>
                );
              })}
            </ProgAreaContainer>

            <ProgIdeContainer>
              {midAreaCompound?.map((moleculeDetails, index) => {
                if (moleculeDetails?.atoms.length) {
                  return (
                    <TileMolecule
                      moleculeId={moleculeDetails?.id}
                      atoms={moleculeDetails?.atoms}
                      index={index}
                      key={moleculeDetails?.id}
                    />
                  );
                }
              })}
            </ProgIdeContainer>

            {provided.placeholder}
          </DroppableContainer>
        )}
      </Droppable>
    </div>
  );
};

export default MidArea;
