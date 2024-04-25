import { ImageList, ImageListItem } from "@mui/material";
import React from "react";

const ImageGallery = ({ images, setShowMenu, setIndex }) => {
  return (
    <div className="h-full flex justify-evenly cursor-pointer ">
      {images?.length >= 8
        ? images.slice(0, 8).map((image, i) => (
            <img
              src={`${image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="Imagen de la nota"
              loading="lazy"
              className="object-cover w-[10%] rounded-lg opacity-80 hover:opacity-100"
              key={image}
              onClick={() => {
                setIndex(i);
                setShowMenu(true);
              }}
            />
          ))
        : images?.map((image, i) => (
            <img
              src={`${image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="Imagen de la nota"
              loading="lazy"
              className="object-cover w-[10%] rounded-lg opacity-80 hover:opacity-100"
              key={image}
              onClick={() => {
                setIndex(i);
                setShowMenu(true);
              }}
            />
          ))}
      <div
        className={`${
          images?.length >= 8 ? "" : "hidden"
        } bg-gray-900 bg-opacity-75 hover:bg-opacity-100 w-[10%] flex justify-center items-center rounded-lg cursor-pointer `}
        onClick={() => setShowMenu(true)}
      >
        <p className="text-gray-300">Ver más</p>
      </div>
    </div>
  );
};

export default ImageGallery;
