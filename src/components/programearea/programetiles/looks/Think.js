import React, { useState } from "react";
import styled from "styled-components";
import { moveXSteps, sayMessage, thinkMessage } from "../../utils";

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

const Think = ({ character, comp_id }) => {
  const [message, setMessage] = useState("hello");

  const handleClick = React.useCallback(() => {
    thinkMessage(message);
  }, [message]);

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
      think
      <StyledInput
        type="text"
        value={message}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          e.target.value.length > 0 && setMessage(e.target.value);
        }}
      />
    </LookTileContainer>
    // </StyledPaper>
  );
};

export default Think;
