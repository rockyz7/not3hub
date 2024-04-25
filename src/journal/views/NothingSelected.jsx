import { Create } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React from "react";

const NothingSelected = () => {
  return (
    <div className="flex justify-center items-center w-full h-full flex-col rounded-xl gap-5 shadow-lg shadow-gray-800">
      <div>
        <svg
          className="w-[75px] h-[75px] text-primary"
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
      </div>
      <div className="text-gray-400 ">
        <p className="text-lg ">Selecciona o crea una entrada</p>
      </div>
    </div>
  );
};

export default NothingSelected;
