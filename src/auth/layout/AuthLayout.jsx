import React from "react";
import { Grid, Typography } from "@mui/material";
import Icon from "../../ui/components/Icon";

const AuthLayout = ({ children, title = "" }) => {
  return (
    <div className="bg-gray-900 w-screen h-screen flex flex-col gap-5 justify-center items-center ">
      <div className="w-[400px] bg-gray-800  p-5 rounded-xl bg-opacity-40 shadow shadow-gray-600">
        <div className="flex scale-105 justify-center pb-5">
          <Icon />
        </div>
        <h2 className="text-gray-300  mb-3 text-lg">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
