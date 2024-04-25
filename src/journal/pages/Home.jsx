import React from "react";
import { useSelector } from "react-redux";
import CardList from "./CardList";
import NoteViewFullScreen from "../views/NoteViewFullScreen";

const Home = () => {
  const { readNote } = useSelector((state) => state.journal);

  return (
    <div className="w-screen h-screen mt-[85px] mb-[15px] overflow-auto flex  justify-center ">
      {!!readNote ? <NoteViewFullScreen /> : <CardList />}
    </div>
  );
};

export default Home;
