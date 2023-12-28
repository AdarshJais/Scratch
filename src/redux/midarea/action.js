import {
  SET_LIST,
  ADD_LIST,
  ADD_MOLECULE,
  MOVE_ATOM,
  MOVE_NEW_ATOM,
  DELETE_ATOM,
} from "./types";

export const updateList = (id, new_list) => {
  return {
    type: SET_LIST,
    list: new_list,
    id: id,
  };
};

export const addMolecules = (payload) => {
  return {
    type: ADD_MOLECULE,
    payload: payload,
  };
};

export const moveAtom = (payload) => {
  return {
    type: MOVE_ATOM,
    payload: payload,
  };
};

export const moveNewAtom = (payload) => {
  return {
    type: MOVE_NEW_ATOM,
    payload: payload,
  };
};

export const deleteAtom = (payload) => {
  return {
    type: DELETE_ATOM,
    payload: payload,
  };
};
