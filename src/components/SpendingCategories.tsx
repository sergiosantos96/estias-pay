import SpendingCategory from "./SpendingCategory";

const SpendingCategories = () => {
  return (
    <div className="my-7 rounded border border-gray-200 bg-white p-4 py-5 text-gray-600 shadow-md sm:p-6 md:p-7">
      <h2 className="mb-4 text-center text-2xl font-medium text-gray-800 sm:text-3xl">
        Spending Categories
      </h2>
      <div className="space-y-4">
        <SpendingCategory category="Housing" expense={-750} />
        <SpendingCategory category="Food & Drinking" expense={-120} />
        <SpendingCategory category="Utilities" expense={-70} />
      </div>
    </div>
  );
};

export default SpendingCategories;
