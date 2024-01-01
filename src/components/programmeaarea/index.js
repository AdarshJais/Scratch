import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ProgIdeTileMolecule from "./tilemolecule/ProgIdeTileMolecule";
import ProgTileMolecules from "./tilemolecule/ProgTypeTileMolecules";

const DroppableContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: "100%";
  width: 100%;
  overflow-y: auto;
`;

const ProgTypeContainer = styled.div`
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

const ProgTypeHeading = styled.div`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 12pt;
  fill: #575E75;
  font-weight: bold;
}`;

const ProgrammeArea = () => {
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
            <ProgTypeContainer>
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
            </ProgTypeContainer>

            <ProgIdeContainer>
              {midAreaCompound?.map((moleculeDetails, index) => {
                if (moleculeDetails?.atoms.length) {
                  return (
                    <ProgIdeTileMolecule
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

export default ProgrammeArea;
