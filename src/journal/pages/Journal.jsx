import React from "react";
import JournalLayout from "../JournalLayout";
import NothingSelected from "../views/NothingSelected";
import NoteView from "../views/NoteView";
import { useSelector } from "react-redux";

const Journal = () => {
  const { isSaving, activeNote } = useSelector((state) => state.journal);

  return (
    <JournalLayout>
      {!!activeNote ? <NoteView /> : <NothingSelected />}
    </JournalLayout>
  );
};

export default Journal;
