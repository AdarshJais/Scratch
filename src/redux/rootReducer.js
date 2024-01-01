import { combineReducers } from "redux";
// import { characterReducer } from "./character/characterReducer";
// import { eventReducer } from "./events/eventReducer";
import { listReducer } from "./midarea/list";
import { playHistory } from "./playhistory/history";

export const rootReducer = combineReducers({
  //   character: characterReducer,
  list: listReducer,
  playHistory: playHistory,
  //   event: eventReducer,
});
