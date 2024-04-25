import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  backHomePage,
  setActiveNote,
  viewNote,
} from "../../store/journal/journalSlice";
import { useClickOutside } from "../../hooks/useClickOutside";
import ImageGallery from "../components/ImageGallery";
import Slideshow from "./Slideshow";

const NoteViewFullScreen = () => {
  const { readNote } = useSelector((state) => state.journal);
  const { title, body, date, imageUrls, id, updatedDate, type } = readNote;
  const [showGallery, setShowGallery] = useState(false);
  const [index, setIndex] = useState(0);
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const navigateHome = () => {
    dispatch(backHomePage());
  };

  const selectNote = () => {
    dispatch(
      setActiveNote({ title, body, id, date, imageUrls, updatedDate, type })
    );
    dispatch(viewNote(null));
  };

  const { showMenu, menuRef, setShowMenu } = useClickOutside();

  return (
    <div
      className={` ${
        expand ? "w-screen h-full" : "w-3/5 h-[90%] "
      } px-[75px] pt-[20px] self-center rounded-xl flex gap-2 overflow-auto animate__animated animate__fadeIn animate__faster flex-col bg-gray-700 bg-opacity-30 shadow shadow-gray-500`}
    >
      <div className="flex w-full justify-between">
        <button
          onClick={navigateHome}
          className="opacity-75 hover:opacity-100 p-[5px] rounded-full"
        >
          <svg
            className="w-4 h-4 text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
            />
          </svg>
        </button>
        <div className="flex gap-3 justify-center items-center">
          <button onClick={selectNote}>
            <svg
              className="w-4 h-4 text-gray-300 hover:text-primary"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z" />
            </svg>
          </button>
          {expand ? (
            <button onClick={() => setExpand(!expand)}>
              <svg
                class="w-4 h-4 text-gray-300 opacity-75 hover:opacity-100"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M18 .989a1.016 1.016 0 0 0-.056-.277c-.011-.034-.009-.073-.023-.1a.786.786 0 0 0-.066-.1.979.979 0 0 0-.156-.224l-.007-.01a.873.873 0 0 0-.116-.073.985.985 0 0 0-.2-.128.959.959 0 0 0-.231-.047A.925.925 0 0 0 17 0h-4a1 1 0 1 0 0 2h1.664l-3.388 3.552a1 1 0 0 0 1.448 1.381L16 3.5V5a1 1 0 0 0 2 0V.989ZM17 12a1 1 0 0 0-1 1v1.586l-3.293-3.293a1 1 0 0 0-1.414 1.414L14.586 16H13a1 1 0 0 0 0 2h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1ZM3.414 2H5a1 1 0 0 0 0-2H1a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V3.414l3.536 3.535A1 1 0 0 0 6.95 5.535L3.414 2Zm2.139 9.276L2 14.665V13a1 1 0 1 0-2 0v4c.006.046.015.09.027.135.006.08.022.16.048.235a.954.954 0 0 0 .128.2.95.95 0 0 0 .073.117l.01.007A.983.983 0 0 0 1 18h4a1 1 0 0 0 0-2H3.5l3.436-3.276a1 1 0 0 0-1.38-1.448h-.003Z" />
              </svg>
            </button>
          ) : (
            <button onClick={() => setExpand(!expand)}>
              <svg
                class="w-4 h-4 text-gray-300 opacity-75 hover:opacity-100"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M7 1a1 1 0 0 0-1 1v2.586L2.707 1.293a1 1 0 0 0-1.414 1.414L4.586 6H2a1 1 0 0 0 0 2h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Zm0 11H2a1 1 0 1 0 0 2h2.586l-3.293 3.293a1 1 0 1 0 1.414 1.414L6 15.414V18a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1Zm11-6h-2.586l3.293-3.293a1 1 0 1 0-1.414-1.414L14 4.586V2a1 1 0 0 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 1 0 0-2Zm1 7a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-2.586l3.293 3.293a1 1 0 0 0 1.414-1.414L15.414 14H18a1 1 0 0 0 1-1Z" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col pb-5  cursor-default gap-3">
        <p className="text-gray-500 self-end flex text-sm">{dateString}</p>

        <h1 className="text-gray-200 text-xl ">{title}</h1>
        <div class="inline-flex items-center justify-center w-full">
          <hr class="w-full h-[1px] mb-5 bg-gray-200 border-0 rounded dark:bg-primary" />
        </div>
        {type === "blank" ? (
          <p className="text-gray-400 whitespace-pre-line text-ellipsis text-sm">
            {body}
          </p>
        ) : (
          body.map((item) =>
            !item.done ? (
              <p className="text-gray-400 whitespace-pre-line text-ellipsis text-sm">
                {item.text}
              </p>
            ) : (
              <p className="line-through decoration-gray-500 text-gray-500 whitespace-pre-line text-ellipsis text-sm">
                <div className="flex gap-2">
                  {item.text}
                  <svg
                    class="w-4 h-4 text-primary"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </div>
              </p>
            )
          )
        )}
      </div>

      {readNote.imageUrls.length > 0 && (
        <div
          className={`${
            showGallery ? "h-1/3" : "h-fit "
          } sticky bottom-0 rounded-b-xl  bg-gray-900`}
        >
          <button
            onClick={() => setShowGallery(!showGallery)}
            className={`h-[15%]  p-2 hover:bg-opacity-30 w-full bg-gray-600 bg-opacity-25 flex justify-center items-center ${
              !showGallery ? "rounded-b-xl  h-full" : ""
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

          <div
            className={` bg-gray-600 bg-opacity-25 h-[85%] rounded-b-xl  ${
              !showGallery
                ? "hidden "
                : "animate__animated animate__fadeIn animate__faster"
            } `}
          >
            <div className={` p-3 h-full rounded-b-xl  `}>
              <ImageGallery
                images={readNote.imageUrls}
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
            images={readNote.imageUrls}
          />
        </div>
      )}
    </div>
  );
};

export default NoteViewFullScreen;
