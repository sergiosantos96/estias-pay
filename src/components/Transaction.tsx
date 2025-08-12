import { useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";
import type { ExpenseProps } from "../models/models";

const Transaction = ({ category, amount, date, notes }: ExpenseProps) => {
  const [showNotes, setShowNotes] = useState(true);

  return (
    <div className="my-7 rounded border border-gray-200 bg-white p-7 py-5 text-gray-600 shadow-md">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-pink-100">
            <AiFillThunderbolt color="#DB2777" size={38} />
          </div>
          <div className="flex flex-col justify-center gap-y-1">
            <h2 className="text-2xl font-medium text-gray-600 capitalize">
              {category}
            </h2>
            <div>{date}</div>
          </div>
        </div>
        <div className="flex items-center gap-x-2 text-right">
          <h2 className="text-3xl font-semibold text-pink-600">{amount} </h2>
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
