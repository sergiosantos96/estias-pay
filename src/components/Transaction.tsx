import { AiFillThunderbolt } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";

interface TransactionProps {
  category: string;
  price: string;
  date: string;
  notes?: string;
}

const Transaction = ({ category, price, date, notes }: TransactionProps) => {
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
          <h2 className="text-3xl font-semibold text-pink-600">{price} </h2>
          <IoChevronDown
            className="cursor-pointer transition duration-350 ease-in-out active:rotate-x-180"
            size={28}
          />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
