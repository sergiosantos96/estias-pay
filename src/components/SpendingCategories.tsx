import { useMemo } from "react";
import {
  topLevelCategoryMap,
  type SpendingCategoriesProps,
} from "../models/models";
import SpendingCategory from "./SpendingCategory";

const SpendingCategories: React.FC<SpendingCategoriesProps> = ({
  expenses,
}) => {
  /* Add more categories */
  const categoryStats = useMemo(() => {
    const totals: Record<string, number> = {
      Housing: 0,
      "Food & Drinking": 0,
      Utilities: 0,
    };

    expenses.forEach(({ category, amount }) => {
      const topCategory = topLevelCategoryMap[category];
      if (topCategory) {
        totals[topCategory] += Math.abs(Number(amount));
      }
    });

    const totalSpent = Object.values(totals).reduce((acc, val) => acc + val, 0);

    return Object.entries(totals).map(([category, amount]) => ({
      category,
      expense: -amount,
      percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0,
    }));
  }, [expenses]);

  return (
    <div className="my-7 rounded border border-gray-200 bg-white p-4 py-5 text-gray-600 shadow-md sm:p-6 md:p-7">
      <h2 className="mb-4 text-center text-2xl font-medium text-gray-800 sm:text-3xl">
        Spending Categories
      </h2>
      <div className="space-y-4">
        {categoryStats.map(({ category, expense, percentage }) => (
          <SpendingCategory
            key={category}
            category={category}
            expense={expense}
            percentage={percentage}
          />
        ))}
      </div>
    </div>
  );
};

export default SpendingCategories;
