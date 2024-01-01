import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateParamOfAtom } from "../../../../redux/midarea/action";
import { moveXSteps } from "../../utils";

export const MoveButton = styled.div`
  text-align: center;
  border-radius: 4px;
  background-color: #4c97fe;
  color: #fff;
  padding: 0.5rem 0.3rem;
  cursor: pointer;
  font-size: 12px;
  flex: 1;
  pointer-events: none;
  input {
    pointer-events: auto; // Restore pointer-events for input elements
  }
`;

export const StyledInput = styled.input`
  text-align: center;
  width: 50px;
  margin: 0 8px;
  color: black;
`;

const MoveX = ({ character, atomId, getChildDetails, moleculeId, param }) => {
  // console.log("MoveX", getChildDetails);
  // console.log(param);
  const dispatch = useDispatch();
  // const [param, setSteps] = useState(param);

  // const getParameters = React.useCallback(() => {
  //   return param;
  // }, [param]);
  const handleClick = React.useCallback(async () => {
    try {
      await moveXSteps(param);
      console.log("MoveX completed!");
    } catch (error) {
      console.error("Error in moveXSteps:", error);
    }
  }, [param]);

  // const buttonRef = React.useRef(null);

  // React.useEffect(() => {
  //   buttonRef.current.addEventListener("click", handleClick);

  //   return () => {
  //     buttonRef?.current?.removeEventListener("click", handleClick);
  //   };
  // }, [handleClick]);

  return (
    // <StyledPaper>
    <MoveButton id={atomId} onClick={() => handleClick()}>
      move X ,
      <StyledInput
        type="number"
        value={param}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          e.stopPropagation();
          dispatch(
            updateParamOfAtom({
              moleculeId: moleculeId,
              atomId: atomId,
              param: parseInt(e.target.value),
            })
          );
          // setSteps(parseInt(e.target.value));
        }}
      />
      steps
    </MoveButton>
    // </StyledPaper>
  );
};

export default MoveX;
