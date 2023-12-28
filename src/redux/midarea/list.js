import {
  ADD_MOLECULE,
  SET_LIST,
  MOVE_ATOM,
  MOVE_NEW_ATOM,
  DELETE_ATOM,
} from "./types";
import { v4 as uuidv4 } from "uuid";

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
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "MOVE_Y",
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "MOVE_XY",
        },

        {
          id: `atom_${uuidv4()}`,
          prog: "SET_X",
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "SET_Y",
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "SET_XY",
        },
        // {
        //   id: `atom_${uuidv4()}`,
        //   prog: "SET_XY_AFTER",
        // },
        {
          id: `atom_${uuidv4()}`,
          prog: "TURN_ANTI_CLOCKWISE",
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "TURN_CLOCKWISE",
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "POINT_TOWARDS",
        },
      ],
    },
    {
      id: "look",
      atoms: [
        {
          id: `atom_${uuidv4()}`,
          prog: "SAY",
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "SAY_TILL_TIME",
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "THINK",
        },
        {
          id: `atom_${uuidv4()}`,
          prog: "THINK_TILL_TIME",
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

      let atomValue = null;
      if (sourceMoleculeId == "motion" || sourceMoleculeId == "look") {
        atomValue = state.programeAreaCompound
          .find((molecule) => molecule.id === sourceMoleculeId)
          .atoms.find((atom) => atom.id === sourceAtomId)?.prog;
      } else {
        atomValue = state.midAreaCompound
          .find((molecule) => molecule.id === sourceMoleculeId)
          .atoms.find((atom) => atom.id === sourceAtomId)?.prog;
      }
      // Fetch the atom prog from the existing list using moleculeSourceId and atomId

      // Create a new molecule
      const newMolecule = {
        id: `molecule_${uuidv4()}`,
        atoms: [{ id: `atom_${uuidv4()}`, prog: atomValue }],
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

    default:
      return state;
  }
};
