import type { SpendingCategory } from "../models/models";
import ProgressBar from "./shared/ProgressBar";

const SpendingCategory: React.FC<SpendingCategory> = ({
  category,
  expense,
}) => {
  return (
    <div>
      <div className="mx-auto flex w-full flex-row items-center justify-between">
        <h3 className="text-xl font-medium text-gray-600 capitalize sm:text-2xl">
          {category}
        </h3>
        <h3 className="mt-3 text-xl font-semibold text-pink-600 sm:mt-0 sm:text-2xl">
          {expense}€
        </h3>
      </div>
      <div className="mt-3">
        <ProgressBar barColor="#EC4899" width={70} />
      </div>
    </div>
  );
};

export default SpendingCategory;
