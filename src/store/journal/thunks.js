import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNotesWithPinInfo,
  updatedNote,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = (type) => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;

    let newNote = {};

    if (type === "blank") {
      newNote = {
        title: "",
        body: "",
        imageUrls: [],
        date: new Date().getTime(),
        pin: false,
        type: "blank",
      };
    } else {
      newNote = {
        title: "",
        body: [],
        imageUrls: [],
        date: new Date().getTime(),
        pin: false,
        type: "todo",
      };
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;
    const updatedDate = new Date().getTime();
    const noteToFireStore = { ...activeNote, updatedDate };
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });
    const newActiveNote = { ...activeNote, updatedDate };
    dispatch(updatedNote(newActiveNote));
  };
};

export const startSavingPinNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { pinNote, notes, activeNote } = getState().journal;
    const noteToFireStore = { ...pinNote };
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${pinNote.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNotesWithPinInfo(pinNote));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = (info) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${info.id}`);
    await deleteDoc(docRef);
    dispatch(deleteNoteById(info));
  };
};
