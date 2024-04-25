import { StarRateSharp } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    messageDeleted: "",
    notes: [],
    pinNote: [],
    activeNote: null,
    readNote: null,
    searchWord: "",
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload;

      state.messageSaved = "";
      state.messageDeleted = "";
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
      state.messageDeleted = "";
    },
    updatedNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      state.messageSaved = ` ${action.payload.title}, guardada correctamente`;
      state.messageDeleted = "";
    },
    setPhotosToActiveNote: (state, action) => {
      state.activeNote.imageUrls = [
        ...state.activeNote.imageUrls,
        ...action.payload,
      ];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.activeNote = null;
      state.readNote = null;
      state.messageDeleted = "";
    },
    deleteNoteById: (state, action) => {
      state.activeNote = null;
      state.readNote = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
      state.messageDeleted = action.payload.message;
    },
    backHomePage: (state) => {
      state.activeNote = null;
      state.readNote = null;
      state.messageDeleted = "";
    },
    viewNote: (state, action) => {
      state.readNote = action.payload;
    },
    pinNotes: (state, action) => {
      state.pinNote = action.payload;
    },
    updateNotesWithPinInfo: (state, action) => {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
    },
    searchNote: (state, action) => {
      state.searchWord = action.payload;
    },
  },
});

export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updatedNote,
  deleteNoteById,
  setPhotosToActiveNote,
  clearNotesLogout,
  backHomePage,
  viewNote,
  pinNotes,
  updateNotesWithPinInfo,
  searchNote,
} = journalSlice.actions;
