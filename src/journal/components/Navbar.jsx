import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import { useClickOutside } from "../../hooks/useClickOutside";
import { backHomePage } from "../../store/journal/journalSlice";
import { useEffect, useState } from "react";
import Icon from "../../ui/components/Icon";

const Navbar = () => {
  const dispatch = useDispatch();
  const { displayName, photoURL, email } = useSelector((state) => state.auth);
  const { showMenu, menuRef, setShowMenu } = useClickOutside();

  const onLogout = () => {
    dispatch(startLogout());
  };

  const navigateHome = () => {
    dispatch(backHomePage());
  };

  const onProfileClick = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <nav
      className="w-screen z-40 fixed flex justify-between px-[60px] h-fit bg-transparent py-[20px] text-gray-200 
      "
    >
      <div
        className={`  hover:cursor-pointer self-center  flex h-fit w-fit justify-center items-center`}
        onClick={navigateHome}
      >
        <Icon />
      </div>

      <div
        className="bg-transparent hover:border-2 border-2 border-transparent hover:border-primary cursor-pointer flex justify-center items-center relative w-[50px] h-[50px] rounded-full  hover:shadow-lg hover:shadow-primary/100"
        onClick={onProfileClick}
        ref={menuRef}
      >
        <div className="w-[45px] h-[45px] text-gray-300 hover:text-gray-200 bg-gray-800 rounded-full flex justify-center items-center ">
          {photoURL !== null ? (
            <img className="rounded-full" src={photoURL} alt="Profile photo" />
          ) : (
            <p className=" font-medium h-full flex items-center justify-center text-xl">
              {displayName?.slice(0, 1)}
            </p>
          )}
        </div>

        <div
          className={`bg-gray-800  absolute flex flex-col justify-center items-center p-5 z-40 right-5 top-[60px] shadow shadow-gray-600  rounded-xl w-[250px] ${
            !showMenu
              ? "hidden"
              : "animate__animated animate__slideInDown animate__faster"
          }`}
        >
          <h3 className="text-gray-300 ">{displayName}</h3>
          <p className="text-xs text-gray-400 ">{email}</p>
          <hr className="h-px w-full mt-3 bg-gray-200 border-0 dark:bg-gray-700" />
          <button
            className="bg-primary flex gap-2 justify-center items-center bg-opacity-75 hover:bg-opacity-100 w-full rounded-md mt-3 p-[6px] text-sm"
            onClick={onLogout}
          >
            Cerrar sesión
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 15"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
