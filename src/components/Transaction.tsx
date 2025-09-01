import { useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";
import type { ExpenseData } from "../models/models";
import { categoryIcons } from "../constants/categoryIcons";
import useWindowSize from "../hooks/useWindowsResize";

const Transaction = ({ category, amount, date, notes }: ExpenseData) => {
  const [showNotes, setShowNotes] = useState(true);
  const windowWidth = useWindowSize();

  const {
    icon: IconComponent,
    bgColorClass,
    iconColorClass,
  } = categoryIcons[category] || {
    icon: AiFillThunderbolt,
    bgColorClass: "bg-pink-100",
    iconColorClass: "text-pink-600",
  };

  return (
    <div className="my-7 rounded border border-gray-200 bg-white p-4 py-5 text-gray-600 shadow-md sm:p-5 md:p-7">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="mb-4 flex flex-row items-center gap-x-4 sm:mb-0">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-lg sm:h-16 sm:w-16 ${bgColorClass}`}
          >
            <IconComponent
              className={iconColorClass}
              size={windowWidth <= 470 ? 26 : 32}
            />
          </div>
          <div className="flex flex-col justify-center gap-y-1">
            <h2 className="text-lg font-medium text-gray-600 capitalize sm:text-2xl">
              {category}
            </h2>
            <div className="text-sm sm:text-base">{date}</div>
          </div>
        </div>
        <div className="flex items-center gap-x-2 text-right">
          <h2
            className={`text-xl font-semibold sm:text-3xl ${
              amount.trim().startsWith("-") ? "text-pink-600" : "text-teal-500"
            }`}
          >
            {amount}
          </h2>
          {notes?.trim() && (
            <IoChevronDown
              onClick={() => setShowNotes((prev) => !prev)}
              className={`cursor-pointer transition-transform duration-300 ${
                showNotes ? "rotate-180" : ""
              }`}
              size={28}
            />
          )}
        </div>
      </div>
      {notes?.trim() && showNotes && (
        <div className="mt-5 flex flex-col border-t-2 border-gray-300">
          <h2 className="mt-3 font-medium text-gray-800">Notes:</h2>
          <p>{notes}</p>
        </div>
      )}
    </div>
  );
};

export default Transaction;
