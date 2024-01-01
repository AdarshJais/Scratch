import React from "react";
import styled from "styled-components";
import {
  deleteHistoryAction,
  replayHistoryAction,
} from "../../redux/playhistory/action";
import { useDispatch, useSelector } from "react-redux";

const SectionContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const BaseButtonStyles = `
  padding: 5px 8px;
  border-radius: 20px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
`;

const ReplayButton = styled.button`
  ${BaseButtonStyles}
  background-color: #ffffff;
  color: #3498db;
  border: 1.5px solid #3498db;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  &:hover {
    background-color: ${(props) => (props.disabled ? "#ffffff" : "#3498db30")};
    border-color: ${(props) => (props.disabled ? "#3498db" : "#2980b9")};
    box-shadow: ${(props) =>
      props.disabled ? "none" : "0 2px 4px rgba(0, 0, 0, 0.1)"};
  }
`;

const DeleteButton = styled.button`
  ${BaseButtonStyles}
  margin-left:20px;
  background-color: #ffffff;
  color: ${(props) => (props.disabled ? "#ccc" : "#e74c3c")};
  border: 1.5px solid ${(props) => (props.disabled ? "#ccc" : "#e74c3c")};
  &:hover {
    background-color: ${(props) => (props.disabled ? "#ffffff" : "#e74c3c30")};
    border-color: ${(props) => (props.disabled ? "#ccc" : "#c0392b")};
    box-shadow: ${(props) =>
      props.disabled ? "none" : "0 2px 4px rgba(0, 0, 0, 0.1)"};
  }
`;

const ButtonIcon = styled.span`
  margin-right: 8px;
`;

export default function Header() {
  const dispatch = useDispatch();
  const historyList = useSelector((state) => state.playHistory.history);

  const replayHistory = () => {
    dispatch(replayHistoryAction());
  };

  const deleteHistory = () => {
    dispatch(deleteHistoryAction());
  };
  return (
    <SectionContainer>
      <ReplayButton disabled={historyList.length <= 0} onClick={replayHistory}>
        <ButtonIcon>&#x21bb;</ButtonIcon>Replay History
      </ReplayButton>

      {/* <DeleteButton
          disabled={historyList.length <= 0}
          onClick={deleteHistory}
        >
          <ButtonIcon>&#x1F5D1;</ButtonIcon>Reset
        </DeleteButton> */}
    </SectionContainer>
  );
}
