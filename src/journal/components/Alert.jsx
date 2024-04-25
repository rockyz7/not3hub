import React from "react";
import { useSelector } from "react-redux";

const Alert = ({ message }) => {
  const { messageSaved } = useSelector((state) => state.journal);

  return (
    <div className="w-[450px] h-[250px] border-t border-t-gray-600 shadow shadow-gray-600 rounded-xl gap-3 flex flex-col justify-center items-center bg-gray-900">
      <svg
        className="w-12 h-12 text-primary"
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
      <p className="text-gray-200 text-lg">{message}</p>
      <hr className="h-px w-2/3 mt-3 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
      <p className="text-gray-400 text-sm ">
        {" "}
        <span className="font-bold text-gray-300">
          {messageSaved.split(",")[0]}
        </span>
        {messageSaved.split(",")[1]}
      </p>
    </div>
  );
};

export default Alert;
