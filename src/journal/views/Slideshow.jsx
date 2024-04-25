import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

const Slideshow = ({ menuRef, index, images }) => {
  const [thumb, setThumb] = useState();

  return (
    <div
      ref={menuRef}
      className="slider w-3/5 bg-gray-800  flex flex-col  gap-2 relative justify-center items-center self-center rounded-xl"
    >
      <Swiper
        initialSlide={index}
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs, EffectFade, Pagination]}
        pagination={{ el: ".swiper-pagination", type: "fraction" }}
        effect={"fade"}
        speed={500}
        grabCursor={true}
        className="slider-img overflow-hidden top-0 left-0 h-[80%] w-full relative  rounded-lg"
        thumbs={{
          swiper: thumb && !thumb.destroyed ? thumb : null,
        }}
      >
        {images.map((item, i) => (
          <SwiperSlide
            className="overflow-hidden  w-full py-2 rounded-xl "
            key={i}
          >
            <div className="bg-gray-800">
              <img
                src={item}
                className="w-full rounded-sm h-[450px] object-scale-down"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-pagination text-gray-500 count"></div>

      <div className=" w-full  bg-gray-900 bg-opacity-50 rounded-b-xl px-2 py-1 cursor-pointer">
        <Swiper
          loop={true}
          onSwiper={setThumb}
          spaceBetween={10}
          slidesPerView={7}
          modules={[Navigation, Thumbs]}
          className="slider-img-thumbs w-full h-[150px]"
        >
          {images.map((item, i) => (
            <SwiperSlide key={i} className="w-[15%]  h-[150px]">
              <img src={item} className="w-full h-full object-scale-down" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slideshow;
