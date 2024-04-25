import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoteCard from "./NoteCard";
import { startNewNote } from "../../store/journal/thunks";
import { TextField } from "@mui/material";
import { searchNote } from "../../store/journal/journalSlice";
import { Opacity } from "@mui/icons-material";

const CardList = () => {
  const { notes, pinNote } = useSelector((state) => state.journal);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterNotes, setFilterNotes] = useState([]);
  const [unfiltered, setUnfiltered] = useState([]);
  const [searchNotes, setSearchNotes] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();

  const onClickOpenMenu = () => {
    setShowMenu(!showMenu);
  };

  const onClickNewNote = (type) => {
    dispatch(startNewNote(type));
  };

  useEffect(() => {
    setFilterNotes(notes.filter((note) => note.pin === true));
    setUnfiltered(notes.filter((note) => note.pin !== true));
  }, [notes, pinNote]);

  const onChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value !== "") {
      setSearchNotes(
        notes.filter((note) =>
          note.title.toLowerCase().includes(e.target.value.toLowerCase().trim())
        )
      );
    } else {
      setSearchNotes([]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-fit  py-[20px] flex-col items-center justify-center gap-10  w-5/6 ">
      <div className="w-4/5 bg-gray-900 p-1 pb-2 fixed top-[85px] z-20 flex justify-center items-center ">
        <form className="w-2/5 relative" onSubmit={onSubmit}>
          <input
            type="text"
            className="text-gray-300 w-full text-sm placeholder-gray-300 p-2 px-5 focus:shadow-sm focus:shadow-gray-500 rounded-3xl outline-none bg-gray-800  opacity-60  focus:opacity-90"
            placeholder="Buscar"
            value={searchQuery}
            onChange={onChange}
          />
          <div className="absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-1">
            <svg
              className="w-4 h-4 text-gray-300 opacity-70 focus:opacity-100"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </form>
      </div>

      <div className="mt-[90px]">
        {searchNotes.length > 0 ? (
          <div className="flex justify-center flex-wrap items-center gap-7">
            {searchNotes.map((note) => (
              <NoteCard {...note} key={note.id} />
            ))}
          </div>
        ) : searchNotes.length === 0 && searchQuery !== "" ? (
          <p className="text-gray-400">No se encontraron resultados</p>
        ) : (
          <>
            <div
              className={`flex gap-7 flex-col  justify-center items-center ${
                filterNotes.length <= 0
                  ? "hidden"
                  : "animate__animated animate__fadeIn animate__faster"
              }`}
            >
              <div className="flex  justify-center flex-wrap items-center gap-7">
                {filterNotes.map((note) => (
                  <NoteCard {...note} key={note.id} />
                ))}
              </div>

              <hr className="h-px w-full my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>

            <div className=" flex gap-7 justify-center  items-center flex-wrap animate__animated animate__fadeIn animate__faster">
              <div
                className={`bg-primary rounded-[20px] border  shadow shadow-gray-400 ${
                  showMenu
                    ? "bg-opacity-0  border-primary shadow shadow-primary"
                    : "border-transparent"
                }`}
              >
                <div
                  className="flex flex-col gap-5 justify-center items-center w-[227px] h-[344.5px] p-5   rounded-[20px]   bg-opacity-90 hover:bg-opacity-100 text-gray-200 cursor-pointer"
                  onClick={onClickOpenMenu}
                >
                  <svg
                    className="w-10 h-10 text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M15 17v1a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2M6 1v4a1 1 0 0 1-1 1H1m13.14.772 2.745 2.746M18.1 5.612a2.086 2.086 0 0 1 0 2.953l-6.65 6.646-3.693.739.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"
                    />
                  </svg>
                  {showMenu ? (
                    <div
                      className={`
                   
                  }  flex-col gap-3  w-full h-fit p-5 flex justify-center items-center   rounded-[20px]  text-gray-300 animate__animated animate__fadeIn animate__faster`}
                    >
                      <button
                        className="bg-gray-300 bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-1 w-full rounded-xl"
                        onClick={() => onClickNewNote("blank")}
                      >
                        En blanco
                      </button>
                      <button
                        className="bg-primary text-gray-300 bg-opacity-90 hover:bg-opacity-100 p-1 w-full rounded-xl"
                        onClick={() => onClickNewNote("todo")}
                      >
                        To-do
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-300 ">Crear nota nueva</p>
                  )}
                </div>
                {/* {showMenu ? (
                  <div
                    className={`
                   
                  }  flex-col gap-3 bg-gray-900 bg-opacity-35 w-[227px] h-fit p-5 flex justify-center items-center shadow shadow-gray-400  rounded-[20px]  text-gray-300 animate__animated animate__fadeIn animate__faster`}
                  >
                    <button
                      className="bg-gray-300 text-gray-800 p-1 w-full rounded"
                      onClick={() => onClickNewNote("blank")}
                    >
                      En blanco
                    </button>
                    <button
                      className="bg-pink-700 text-gray-300 p-1 w-full rounded"
                      onClick={() => onClickNewNote("todo")}
                    >
                      ToDo
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex flex-col gap-5 justify-center items-center w-[227px] h-[344.5px] p-5  shadow shadow-gray-400  rounded-[20px]   bg-opacity-90 hover:bg-opacity-100 text-gray-200 cursor-pointer"
                    onClick={onClickOpenMenu}
                  >
                    <svg
                      className="w-10 h-10 text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M15 17v1a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2M6 1v4a1 1 0 0 1-1 1H1m13.14.772 2.745 2.746M18.1 5.612a2.086 2.086 0 0 1 0 2.953l-6.65 6.646-3.693.739.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"
                      />
                    </svg>
                    <p className="text-gray-300 ">Crear nota nueva</p>
                  </div>
                )} */}
              </div>

              {unfiltered.map((note) => (
                <NoteCard {...note} key={note.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardList;
