import React from "react";
import { useSelector } from "react-redux";

const Icon = () => {
  const { status } = useSelector((state) => state.auth);

  return (
    <>
      <div className="text-xl flex justify-center items-center text-gray-200  decoration underline-offset-8 tracking-wide  decoration-primary">
        not
        <p className="text-primary">ξ</p>
        <p className="ml-[-5px] mb-[-8px] text-primary translate-y-3 rotate-180 translate-x-[-20px] skew-y-6 ">
          🖍
        </p>
      </div>
      <p
        className={`${
          status === "checking" ? "icon" : ""
        } bg-gray-800 text-xl border decoration-transparent ml-[-12px] border-primary text-primary font-bold rounded-lg p-1  shadow-lg shadow-primary/100`}
      >
        Hub
      </p>
    </>
  );
};

export default Icon;
