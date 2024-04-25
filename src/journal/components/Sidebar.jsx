import { AddOutlined, TurnedInNot } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBarItem from "./SideBarItem";
import { startNewNote } from "../../store/journal/thunks";
import { useClickOutside } from "../../hooks/useClickOutside";

const Sidebar = () => {
  const { displayName, isSaving } = useSelector((state) => state.auth);
  const { notes, activeNote } = useSelector((state) => state.journal);
  // const [showMenu, setShowMenu] = useState(false);
  const { showMenu, menuRef, setShowMenu } = useClickOutside();
  const dispatch = useDispatch();

  const onClickOpenMenu = () => {
    setShowMenu(!showMenu);
  };

  const onClickNewNote = (type) => {
    dispatch(startNewNote(type));
  };

  return (
    <div className="w-1/5 h-[95%]  relative bg-gray-700 flex flex-col shadow shadow-gray-600 rounded-xl bg-opacity-25 text-white">
      {/* <h6>{displayName}</h6> */}

      <div className="flex flex-col h-[95%] w-full overflow-auto">
        {notes.map((note) => (
          <SideBarItem
            key={note.id}
            {...note}
            active={note.id === activeNote?.id ? true : false}
          />
        ))}
      </div>
      <div
        onClick={onClickOpenMenu}
        disabled={isSaving}
        className="mb-2 mr-2 h-fit flex self-end rounded-full bg-primary p-4  w-fit cursor-pointer opacity-100 hover:opacity-90"
      >
        <svg
          class="w-4 h-4 text-gray-300 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </div>
      <div
        ref={menuRef}
        className={`${
          showMenu
            ? "animate__animated animate__fadeIn animate__faster"
            : "hidden"
        } flex flex-col rounded-lg gap-2 border py-5 border-gray-800 shadow shadow-gray-700 bg-gray-900 w-fit p-3 absolute bottom-10 right-[-65px] z-50`}
      >
        <button
          className="bg-primary rounded px-2"
          onClick={() => onClickNewNote("todo")}
        >
          {" "}
          To-do
        </button>
        <button
          className="bg-gray-300 rounded text-gray-800 px-2"
          onClick={() => onClickNewNote("blank")}
        >
          Blanco
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
