import {
  getProgFunction,
  moveXSteps,
} from "../../components/programearea/utils";
import { HISTORY_DEQUEUE, HISTORY_ENQUEUE, REPLAY_HISTORY } from "./types";

const initialState = {
  history: [],
};

export const playHistory = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_ENQUEUE: {
      const { payload } = action;
      let copyHistory = [...state.history];
      copyHistory.push(payload.molecule);
      return {
        ...state,
        history: copyHistory,
      };
    }
    case HISTORY_DEQUEUE: {
    }
    case REPLAY_HISTORY: {
      let cat_history = document.getElementById("cat-history");

      cat_history.style.display = "block";

      let copyHistory = [...state.history];

      async function processAtoms() {
        for (const eachMolecule of copyHistory) {
          for (const atom of eachMolecule.atoms) {
            console.log("Atom", atom);
            let func = getProgFunction(atom.prog);
            await func(atom.param, true);
          }
        }
      }

      processAtoms();

      return {
        ...state,
        history: [],
      };
    }
    default: {
      return state;
    }
  }
};
