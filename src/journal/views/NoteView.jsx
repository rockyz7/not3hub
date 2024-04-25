import { DeleteOutline, SaveOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ImageGallery from "../components/ImageGallery";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";
import {
  startDeletingNote,
  startSavingNote,
  startUploadingFiles,
} from "../../store/journal/thunks";

import Alert from "../components/Alert";
import { useClickOutside } from "../../hooks/useClickOutside";
import Slideshow from "./Slideshow";
import Todo from "../components/Todo";

const NoteView = () => {
  const { activeNote, messageSaved, isSaving, notes } = useSelector(
    (state) => state.journal
  );

  const dispatch = useDispatch();
  const { body, title, onChange, formState, date, updatedDate, onResetForm } =
    useForm(activeNote);
  const [showGallery, setShowGallery] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [index, setIndex] = useState(0);
  const [saveChanges, setSaveChanges] = useState(false);

  const { showMenu, menuRef, setShowMenu } = useClickOutside();

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const updatedDateString = useMemo(() => {
    const newDate = new Date(updatedDate);
    return newDate.toUTCString();
  }, [updatedDate]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      setShowAlert(true);
      openAlert();
      setSaveChanges(false);
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  const onFileInputChange = (event) => {
    if (event.target.files.length === 0) return;

    dispatch(startUploadingFiles(event.target.files));
    setSaveChanges(true);
    setShowGallery(true);
  };

  const onDelete = () => {
    const info = {
      id: activeNote.id,
      message: "deleted",
    };
    dispatch(startDeletingNote(info));
  };

  const openAlert = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    setShowAlert(true);
  };

  const fileInputRef = useRef();

  return (
    <div className=" p-2 w-full  h-full max-h-full overflow-hidden	 bg-gray-600 bg-opacity-30  rounded-xl  shadow shadow-gray-600 animate__animated animate__fadeIn animate__faster">
      <div className="w-full h-[8%] flex flex-row-reverse justify-between p-2 items-center z-10">
        <div className="flex  flex-row justify-end gap-1">
          <input
            type="file"
            multiple
            onChange={onFileInputChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />

          <button
            disabled={isSaving}
            onClick={() => fileInputRef.current.click()}
            type="button"
            class="p-2 text-gray-300 rounded-[10px] shadow shadow-gray-700 bg-gray-800 cursor-pointer opacity-75 hover:opacity-100"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
            <span class="sr-only">Upload image</span>
          </button>
          <button
            onClick={onSaveNote}
            className="text-white  text-sm relative shadow shadow-gray-700 flex flex-row justify-between pl-3 items-center w-fit  rounded-[10px] bg-gray-800 cursor-pointer opacity-75 hover:opacity-100"
          >
            Guardar
            <div className=" flex justify-center items-center text-white w-[40px] h-[40px] ">
              <SaveOutlined fontSize="small" />
            </div>
            {saveChanges && (
              <div className="h-[10px] w-[10px]  bg-primary rounded-full absolute right-[-2px] top-[-2px]"></div>
            )}
          </button>
          <button
            onClick={onDelete}
            className="text-white  flex justify-center items-center w-fit hover:bg-opacity-100 bg-opacity-80 rounded-[10px] bg-primary "
          >
            <div className=" flex justify-center items-center text-white w-[40px] ">
              <DeleteOutline fontSize="small" />
            </div>
          </button>
        </div>
        <div className="text-gray-400 text-sm">
          {dateString}
          {!!updatedDate && (
            <p className="text-gray-500  ">
              Última edición <span>{updatedDateString}</span>
            </p>
          )}
        </div>
      </div>

      <div
        className={`rounded-xl h-[85%] overflow-auto flex flex-col shadow-gray-900 mt-2 `}
      >
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          name="title"
          value={title}
          autoFocus
          onChange={onChange}
          sx={{
            input: {
              color: "#d1ced0",
              fontSize: "22px",
            },
          }}
        />
        {activeNote.type === "blank" ? (
          <TextField
            inputProps={{
              style: {
                color: "#d1d5db",
                fontSize: "16px",
                opacity: "90%",
              },
            }}
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="¿Qué sucedió en el día de hoy?"
            minRows={10}
            name="body"
            value={body}
            onChange={onChange}
          />
        ) : (
          <Todo
            body={body}
            onChange={onChange}
            onResetForm={onResetForm}
            formState={formState}
            setSaveChanges={setSaveChanges}
          />
        )}
      </div>

      <div
        className={` w-fit absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          !showAlert
            ? "hidden"
            : "animate__animated animate__fadeIn animate__faster"
        }`}
      >
        <Alert message="Nota guardada" />
      </div>
      {activeNote.imageUrls.length > 0 && (
        <div
          className={`${
            showGallery ? "h-1/3" : "h-fit "
          } sticky bottom-[-10px] rounded-b-xl bg-gray-900`}
        >
          <button
            onClick={() => setShowGallery(!showGallery)}
            className={`h-[15%]  p-2 hover:bg-opacity-30 w-full bg-gray-600 bg-opacity-25 flex justify-center items-center ${
              !showGallery ? "rounded-b-xl" : ""
            }`}
          >
            {showGallery ? (
              <svg
                className="w-5 h-5 text-gray-800 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 8"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-800  dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 8"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
                />
              </svg>
            )}
          </button>

          <div className="bg-gray-600 bg-opacity-25 h-[85%] rounded-b-xl">
            <div
              className={` p-3 h-full rounded-b-xl  ${
                !showGallery
                  ? "hidden "
                  : "animate__animated animate__fadeIn animate__faster"
              } `}
            >
              <ImageGallery
                images={activeNote.imageUrls}
                setShowMenu={setShowMenu}
                setIndex={setIndex}
              />
            </div>
          </div>
        </div>
      )}
      {showMenu && (
        <div
          className={`animate__animated animate__fadeIn animate__faster
            
         bg-gray-950 bg-opacity-70 h-full w-full flex justify-center rounded-xl absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        >
          <Slideshow
            menuRef={menuRef}
            index={index}
            images={activeNote.imageUrls}
          />
        </div>
      )}
    </div>
  );
};

export default NoteView;
