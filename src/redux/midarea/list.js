import {
  ADD_MOLECULE,
  SET_LIST,
  MOVE_ATOM,
  MOVE_NEW_ATOM,
  DELETE_ATOM,
  UPDATE_PARAM_VALUE,
} from "./types";
import { v4 as uuidv4 } from "uuid";
const getInitialParam = (prog) => {
  switch (key) {
    case "MOVE_X": {
      return 0;
    }
    default:
      return 0;
  }
};
const initialState = {
  midAreaCompound: [
    // each molecules is a dropable so dropableId = moleculeId
    // which is further wrapper by a dragable s0 dragableId = draggable_moleculeId
    // {
    //   id: `molecule_${uuidv4()}`,
    //   atoms: [
    //     {
    //       id: `atom${uuidv4()}`,
    //       prog: "MOVE_Y",
    //     },
    //     {
    //       id: `atom_${uuidv4()}`,
    //       prog: "MOVE",
    //     },
    //   ],
    // },
    // {
    //   id: `molecule_${uuidv4()}`,
    //   atoms: [
    //     {
    //       id: `atom_${uuidv4()}`,
    //       prog: "MOVE_Y",
    //     },
    //     {
    //       id: `atom_${uuidv4()}`,
    //       prog: "MOVE",
    //     },
    //     {
    //       id: `atom_${uuidv4()}`,
    //       prog: "MOVE",
    //     },
    //   ],
    // },
  ],

  programeAreaCompound: [
    {
      id: "motion",
      atoms: [
        {
          id: `atom_${uuidv4()}`,
          prog: "MOVE_X",
          param: 0,
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "MOVE_Y",
          param: 0,
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "MOVE_XY",
          param: {
            x: 0,
            y: 0,
          },
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "SET_X",
          param: 0,
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "SET_Y",
          param: 0,
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "SET_XY",
          param: {
            x: 0,
            y: 0,
          },
        },
        // {
        //   id: `atom_${uuidv4()}`,
        //   prog: "SET_XY_AFTER",
        // },
        {
          id: `atom_${uuidv4()}`,
          prog: "TURN_ANTI_CLOCKWISE",
          param: 0,
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "TURN_CLOCKWISE",
          param: 0,
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "POINT_TOWARDS",
          param: 0,
        },
      ],
    },
    {
      id: "look",
      atoms: [
        {
          id: `atom_${uuidv4()}`,
          prog: "SAY",
          param: "hello",
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "SAY_TILL_TIME",
          param: {
            message: "heo",
            time: 2000,
          },
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "THINK",
          param: "hello",
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "THINK_TILL_TIME",
          param: {
            message: "adf",
            time: 2000,
          },
        },
      ],
    },
  ],
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST: {
      let index = state.midAreaCompound.findIndex((x) => x.id === action.id);
      let all_lists = state.midAreaCompound;
      let [item] = all_lists.splice(index, 1);
      item.comps = action.list;
      all_lists.splice(index, 0, item);

      return {
        midAreaCompound: all_lists,
      };
    }

    case MOVE_ATOM: {
      const {
        destinationMoleculeId,
        atomIndexInDestinationMolecule,
        sourceMoleculeId,
        atomIndexInSourceMolecule,
        sourceMoleculeIndex,
        destinationMoleculeIndex,
      } = action.payload;

      // Clone the state to avoid mutating the original state
      let newStateMidAreaCompound = [...state.midAreaCompound];
      // If source and destination molecules are the same
      if (sourceMoleculeId === destinationMoleculeId) {
        const atoms = newStateMidAreaCompound[sourceMoleculeIndex].atoms;
        const temp = atoms[atomIndexInSourceMolecule];
        atoms[atomIndexInSourceMolecule] =
          atoms[atomIndexInDestinationMolecule];
        atoms[atomIndexInDestinationMolecule] = temp;
      } else {
        const removedAtom = newStateMidAreaCompound[
          sourceMoleculeIndex
        ].atoms.splice(atomIndexInSourceMolecule, 1)[0];

        newStateMidAreaCompound[destinationMoleculeIndex].atoms.splice(
          atomIndexInDestinationMolecule,
          0,
          removedAtom
        );

        // Check if the source molecule becomes empty after the move, then remove it
        if (newStateMidAreaCompound[sourceMoleculeIndex].atoms.length === 0) {
          newStateMidAreaCompound.splice(sourceMoleculeIndex, 1);
        }
      }

      return {
        ...state,
        midAreaCompound: [...newStateMidAreaCompound],
      };
    }

    case MOVE_NEW_ATOM: {
      const {
        destinationMoleculeId,
        atomIndexInDestinationMolecule,
        sourceMoleculeId,
        atomIndexInSourceMolecule,
        sourceMoleculeIndex,
        destinationMoleculeIndex,
      } = action.payload;
      const newStateMidAreaCompound = [...state.midAreaCompound];
      const newStateProgrameAreaCompound = [...state.programeAreaCompound];
      if (sourceMoleculeId !== destinationMoleculeId) {
        let existingAtomFromSource =
          newStateProgrameAreaCompound[sourceMoleculeIndex].atoms[
            atomIndexInSourceMolecule
          ];
        console.log("existingAtomFromSource", existingAtomFromSource?.prog);
        let newAtom = {
          id: `atom_${uuidv4()}`,
          prog: existingAtomFromSource?.prog,
          param: existingAtomFromSource?.param,
        };

        newStateMidAreaCompound[destinationMoleculeIndex].atoms.splice(
          atomIndexInDestinationMolecule,
          0,
          newAtom
        );
      }
      return {
        ...state,
        midAreaCompound: newStateMidAreaCompound,
      };
    }

    case ADD_MOLECULE: {
      const { sourceMoleculeId, sourceAtomId } = action.payload;

      let atomDetail = null;
      if (sourceMoleculeId == "motion" || sourceMoleculeId == "look") {
        atomDetail = state.programeAreaCompound
          .find((molecule) => molecule.id === sourceMoleculeId)
          .atoms.find((atom) => atom.id === sourceAtomId);
      } else {
        atomDetail = state.midAreaCompound
          .find((molecule) => molecule.id === sourceMoleculeId)
          .atoms.find((atom) => atom.id === sourceAtomId);
      }
      // Fetch the atom prog from the existing list using moleculeSourceId and atomId

      // Create a new molecule
      const newMolecule = {
        id: `molecule_${uuidv4()}`,
        atoms: [
          {
            id: `atom_${uuidv4()}`,
            prog: atomDetail?.prog,
            param: atomDetail?.param,
          },
        ],
      };

      // Update the midAreaCompound based on the source
      const updatedMidAreaCompound = state.midAreaCompound
        .map((molecule) => {
          if (molecule.id === sourceMoleculeId) {
            // Remove the atom from the source molecule using atomId
            const updatedAtoms = molecule.atoms.filter(
              (atom) => atom.id !== sourceAtomId
            );

            // If the source molecule becomes empty, remove it
            if (updatedAtoms.length === 0) {
              return null;
            }

            return { ...molecule, atoms: updatedAtoms };
          }
          return molecule;
        })
        .filter((molecule) => molecule !== null); // Remove null entries

      return {
        ...state,
        midAreaCompound: [...updatedMidAreaCompound, newMolecule],
      };
    }

    case DELETE_ATOM: {
      const {
        destinationMoleculeId,
        atomIndexInDestinationMolecule,
        sourceMoleculeId,
        atomIndexInSourceMolecule,
        sourceMoleculeIndex,
        destinationMoleculeIndex,
      } = action.payload;
      console.log("state.midAreaCompound", state.midAreaCompound);

      let newStateMidAreaCompound = [...state.midAreaCompound];
      const removedAtom = newStateMidAreaCompound[
        sourceMoleculeIndex
      ].atoms.splice(atomIndexInSourceMolecule, 1)[0];

      if (newStateMidAreaCompound[sourceMoleculeIndex].atoms.length === 0) {
        newStateMidAreaCompound.splice(sourceMoleculeIndex, 1);
      }

      return {
        ...state,
        midAreaCompound: newStateMidAreaCompound,
      };
    }

    case UPDATE_PARAM_VALUE: {
      return {
        ...state,
        midAreaCompound: state.midAreaCompound.map((molecule) =>
          molecule.id === action.payload.moleculeId
            ? {
                ...molecule,
                atoms: molecule.atoms.map((atom) =>
                  atom.id === action.payload.atomId
                    ? { ...atom, param: action.payload.param }
                    : atom
                ),
              }
            : molecule
        ),
        programeAreaCompound: state.programeAreaCompound.map((molecule) =>
          molecule.id === action.payload.moleculeId
            ? {
                ...molecule,
                atoms: molecule.atoms.map((atom) =>
                  atom.id === action.payload.atomId
                    ? { ...atom, param: action.payload.param }
                    : atom
                ),
              }
            : molecule
        ),
      };
    }

    default:
      return state;
  }
};
