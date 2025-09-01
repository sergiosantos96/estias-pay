import type { SpendingCategoryProps } from "../models/models";
import ProgressBar from "./shared/ProgressBar";

const SpendingCategory: React.FC<SpendingCategoryProps> = ({
  category,
  expense,
  percentage,
}) => {
  return (
    <div>
      <div className="mx-auto flex w-full flex-row items-center justify-between">
        <h3 className="text-xl font-medium text-gray-600 capitalize sm:text-2xl">
          {category}
        </h3>
        <h3 className="mt-3 text-xl font-semibold text-pink-600 sm:mt-0 sm:text-2xl">
          {expense.toFixed(2)}€
        </h3>
      </div>
      <div className="mt-3">
        <ProgressBar barColor="#EC4899" width={percentage} />
        <p className="mt-1 text-right text-sm text-gray-500">
          {percentage.toFixed(1)}%
        </p>
      </div>
    </div>
  );
};

export default SpendingCategory;
