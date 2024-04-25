import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

const JournalLayout = ({ children }) => {
  const { activeNote, messageDeleted } = useSelector((state) => state.journal);

  return (
    <div className=" flex h-screen flex-col bg-gray-900">
      <Navbar />

      {!!activeNote || messageDeleted === "deleted" ? (
        <div className="flex mt-[85px] pt-[20px] px-[35px] w-full  h-[calc(100vh-85px)] flex-row  gap-5 rounded-xl  ">
          <Sidebar />

          <div className="w-4/5 h-[95%] ">{children}</div>
        </div>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default JournalLayout;
