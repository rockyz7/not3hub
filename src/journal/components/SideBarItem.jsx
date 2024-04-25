import {
  TurnedInNot,
  Article,
  FormatListBulleted,
  Notes,
} from "@mui/icons-material";
import {
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";
import { useClickOutside } from "../../hooks/useClickOutside";

const SideBarItem = ({
  title = "",
  body,
  id,
  date,
  imageUrls = [],
  pin,
  active,
  updatedDate,
  type,
}) => {
  const dispatch = useDispatch();

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

  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0, 17) + "..."
      : title.length === 0
      ? "Sin título"
      : title;
  }, [title]);

  const newBody = useMemo(() => {
    if (type === "blank") {
      return body?.length > 75 ? body?.substring(0, 75) + "..." : body;
    } else {
      return body[0]?.text?.length > 75
        ? "- " + body[0]?.text.substring(0, 75) + "..."
        : body[0]?.text === undefined
        ? ""
        : "- " + body[0]?.text;
    }
  }, [body]);

  return (
    <div
      onClick={selectNote}
      className={` text-gray-200 rounded-[10px]   ${
        active ? "bg-primary" : " "
      }`}
    >
      <div
        className={`flex p-2  items-center gap-3 cursor-pointer bg-opacity-90 hover:bg-opacity-100 ${
          !active ? "hover:bg-gray-800" : "text-gray-900"
        }`}
      >
        {type === "blank" ? (
          <Notes sx={{ color: "white", width: "25px" }} />
        ) : (
          <FormatListBulleted sx={{ color: "white", width: "25px" }} />
        )}

        <div>
          <p className="text-gray-200 text-sm">{newTitle}</p>
          <p className=" text-[14px]">{newBody}</p>
        </div>
      </div>
      <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
};

export default SideBarItem;
