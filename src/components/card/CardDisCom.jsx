import React from "react";
import { BsCart3 } from "react-icons/bs";

export default function CardDisCom({
  uuid,
  thumbnail,
  name,
  brand,
  priceOut,
  disPrice,
  dis,
}) {
  return (
    <div className="bg-white border rounded-[15px]  p-5 relative hover:shadow-[0px_1px_5px_rgba(0,0,0,0.15)]">
      {/* Discount Badge */}
      {dis > 0 && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-[12px] font-bold px-2 py-1 rounded-full">
          {dis}% OFF
        </div>
      )}
      <a href={`/product-detail/${uuid}`}>
        <img
          className="rounded-t-md h-[180px] w-full object-contain"
          src={thumbnail}
          alt={name}
        />
      </a>
      <div className="px-1 pb-3 text-left ">
        <div className="flex items-center justify-between gap-2 mt-4 relative">
          <a href="#">
            <p className="text-[16px] font-OpenSanBold text-primary inline line-clamp-custom-1">
              {name}
            </p>
          </a>
          <button className="bg-secondary text-white p-2 rounded-full">
            <BsCart3 />
          </button>
        </div>
        <p className="text-gray-600 mt-1 text-[14px]">{brand}</p>
        <div className="flex items-center mt-2">
          <span className=" font-OpenSanBold sm:text-base md:text-base  text-gray-900 
         md:mx-0 xl:mx-0 2xl:mx-0">
            ${disPrice}
          </span>
          {dis > 0 && (
           <del del className="text-sm font-OpenSanBold sm:font sm:text-base md:text-base text-accent_1 mx-2 sm:mx-8 md:mx-5 lg:mx-24 xl:mx-16 2xl:mx-24">
              ${priceOut}
            </del>
          )}
        </div>
      </div>
    </div>
  );
}
