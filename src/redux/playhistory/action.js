import { HISTORY_DEQUEUE, HISTORY_ENQUEUE, REPLAY_HISTORY } from "./types";

export const historyEnqueueAction = (payload) => {
  return {
    type: HISTORY_ENQUEUE,
    payload: payload,
  };
};

export const historyDequeueAction = (payload) => {
  return {
    type: HISTORY_DEQUEUE,
    payload: payload,
  };
};

export const replayHistoryAction = () => {
  return {
    type: REPLAY_HISTORY,
  };
};
