import React, { useEffect, useMemo, useState } from "react";
import {
  pinNotes,
  setActiveNote,
  viewNote,
} from "../../store/journal/journalSlice";
import { useDispatch, useSelector } from "react-redux";
import { PushPin } from "@mui/icons-material";
import {
  startDeletingNote,
  startSavingPinNote,
} from "../../store/journal/thunks";

const Note = ({
  title = "",
  body,
  id,
  date,
  pin,
  imageUrls = [],
  updatedDate,
  type,
}) => {
  const [menu, setMenu] = useState(false);
  const { notes, pinNote } = useSelector((state) => state.journal);
  const dispatch = useDispatch();
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const selectNote = () => {
    dispatch(
      setActiveNote({
        title,
        body,
        id,
        date,
        imageUrls,
        pin,
        updatedDate,
        type,
      })
    );
  };

  const onDelete = (event) => {
    const info = {
      id: id,
      message: "deleted home",
    };
    event.stopPropagation();
    dispatch(startDeletingNote(info));
  };

  const readNote = () => {
    dispatch(viewNote({ title, body, id, date, imageUrls, updatedDate, type }));
  };

  const pinnedNote = (event) => {
    event.stopPropagation();
    const findNote = notes.find((note) => {
      if (note.id === id) {
        return { ...note, pin: !pin };
      }
    });

    const pinFindedNote = { ...findNote, pin: !pin };
    dispatch(pinNotes(pinFindedNote));

    dispatch(startSavingPinNote());
  };

  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0, 17) + "..."
      : title.length === 0
      ? "Sin título"
      : title;
  }, [title]);

  const newBody = useMemo(() => {
    if (type === "blank") {
      return body?.length > 275 ? body?.substring(0, 275) + "..." : body;
    } else {
      return body.map((item) => <p>• {item.text}</p>);
    }
  }, [body]);

  return (
    <div
      className="relative cursor-pointer rounded-[20px] "
      onMouseLeave={() => setMenu(false)}
      onClick={readNote}
    >
      <div
        className={`flex flex-col justify-center cursor-pointer bg-gray-700 items-center w-fit  p-3  rounded-[20px]  shadow-sm shadow-gray-700 bg-opacity-25`}
        onMouseOver={() => setMenu(true)}
      >
        <button
          className={`${
            pin ? "text-primary absolute z-40 top-0 right-0" : "hidden"
          } bg-gray-700 p-2 rounded-full bg-opacity-75 hover:bg-opacity-100`}
          onClick={pinnedNote}
        >
          <PushPin sx={{ width: "27px", height: "27px" }} />
        </button>
        <div className="w-[200px] h-[250px]  overflow-clip p-5 flex justify-center relative items-center flex-col bg-gray-500  rounded-[20px]  bg-opacity-25 text-white">
          <p className="text-gray-400 text-xs ">{newBody}</p>
          <div
            className={`bg-gray-900  rounded-b-[20px]  gap-2 absolute bottom-0 h-8 w-full flex justify-center items-center ${
              menu
                ? "animate__animated animate__fadeIn animate__faster"
                : "hidden"
            }`}
          >
            <button
              className={`${
                pin ? "hidden" : ""
              } bg-gray-700  rounded-full bg-opacity-75 hover:bg-opacity-100`}
              onClick={(event) => pinnedNote(event)}
            >
              <PushPin sx={{ width: "26px", height: "25px" }} />
            </button>

            <button
              className="bg-gray-700  p-1 rounded-full bg-opacity-75 hover:bg-opacity-100"
              onClick={selectNote}
            >
              <svg
                className="w-4 h-4 text-primary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z" />
              </svg>
            </button>
            <button
              className="bg-primary p-1 rounded-full bg-opacity-75 hover:bg-opacity-100"
              onClick={(e) => onDelete(e)}
            >
              <svg
                class="w-4 h-4 text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col mt-5">
          <h3 className="text-gray-200 text-sm pb-1 ">
            {title ? newTitle : "Sin título"}
          </h3>

          <p className="text-gray-400 text-xs">{dateString}</p>
        </div>
      </div>
    </div>
  );
};

export default Note;
