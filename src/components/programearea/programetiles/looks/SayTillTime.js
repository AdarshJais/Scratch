import React, { useState } from "react";
import styled from "styled-components";
import { moveXSteps, sayMessage, sayMessageTillTime } from "../../utils";

export const LookTileContainer = styled.div`
  text-align: center;
  border-radius: 4px;
  background-color: #9966fe;
  color: #fff;
  padding: 0.5rem 0.3rem;
  cursor: pointer;
  font-size: 12px;
  flex: 1;
`;

export const StyledInput = styled.input`
  text-align: center;
  width: 50px;
  margin: 0 8px;
  color: black;
`;

const SayTillTime = ({ character, comp_id }) => {
  const [state, setState] = useState({
    message: "hello",
    time: 2000,
  });

  const handleClick = React.useCallback(() => {
    sayMessageTillTime({
      message: state.message,
      time: state.time,
    });
  }, [state.message, state.time]);

  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    buttonRef.current.addEventListener("click", handleClick);

    return () => {
      buttonRef?.current?.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return (
    // <StyledPaper>
    <LookTileContainer id={comp_id} ref={buttonRef}>
      say
      <StyledInput
        type="text"
        value={state.message}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          e.target.value.length > 0 &&
            setState({ ...state, message: e.target.value });
        }}
      />
      for
      <StyledInput
        type="number"
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        value={state.time / 1000}
        onChange={(e) => {
          parseInt(e.target.value) !== 0 &&
            setState({ ...state, time: parseInt(e.target.value * 1000) });
        }}
      />
      sec
    </LookTileContainer>
    // </StyledPaper>
  );
};

export default SayTillTime;
