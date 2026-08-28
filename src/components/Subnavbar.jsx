import React from "react";
import { IoMenuOutline } from "react-icons/io5";

const Subnavbar = () => {
  const phoneBrands = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Xiaomi",
  "Redmi",
  "POCO",
  "Realme",
  "Vivo",
  "Oppo",
  "iQOO",
  "Motorola",
  "Google",
  "Nothing",
  "Nokia",
  "Sony",
  "Asus",
  "Honor",
  "Huawei",
  "Infinix",
  "Tecno",
  "Lava",
  "Micromax"
];
  return (
    <div className="bg-[#232F3E] h-14 text-white flex items-center px-4 overflow-x-auto whitespace-nowrap hide-scrollbar">
      <div className="flex items-center gap-2 font-semibold cursor-pointer hover:border border-white px-2 py-1">
        <IoMenuOutline size={24} />
        <span>All</span>
      </div>
      {phoneBrands.map((item) => (
        <div
          key={item}
          className="mx-3 text-sm cursor-pointer hover:border border-white px-2 py-1 hover:rounded-2xl"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Subnavbar;
