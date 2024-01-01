import styled from "styled-components";

export const TileContainer = styled.div`
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
