import {
  ACTION,
  ADD_NOTE,
  DELETE_NOTE,
  LOAD_NOTES,
  UPDATE_NOTE,
} from "../constants/actions.types";
import { NotesInitialState } from "../constants/notes.types";

const actionMap = new Map([
  [
    LOAD_NOTES,
    (state: NotesInitialState, action: ACTION) => {
      if (action.type === `LOAD_NOTES`) {
       
        return { ...state, notes: [...action.payload.notes] };
      }
      return state;
    },
  ],
  [
    ADD_NOTE,
    (state: NotesInitialState, action: ACTION) => {
      if (action.type === `ADD_NOTE`) {
        return { ...state, notes: state.notes.concat(action.payload.note) };
      }
      return state;
    },
  ],
  [
    DELETE_NOTE,
    (state: NotesInitialState, action: ACTION) => {
      if (action.type === `DELETE_NOTE`) {
        return {
          ...state,
          notes: state.notes.filter(
            (note) => note._id !== action.payload.noteId
          ),
        };
      }
      return state;
    },
  ],
  [
    UPDATE_NOTE,
    (state: NotesInitialState, action: ACTION) => {
      if (action.type === `UPDATE_NOTE`) {
        return {
          ...state,
          notes: state.notes.map((note) => {
            if (note._id === action.payload.note._id) {
              return { ...action.payload.note };
            }
            return note;
          }),
        };
      }
      return state;
    },
  ],
]);

export const notesReducer = (state: NotesInitialState, action: ACTION) => {
  const mappedAction = actionMap.get(action.type);
  return mappedAction ? mappedAction(state, action) : state;
};
