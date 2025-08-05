import SpendingCategory from "./SpendingCategory";

const SpendingCategories = () => {
  return (
    <div className="my-7 rounded border border-gray-200 bg-white p-7 py-5 text-gray-600 shadow-md">
      <h2 className="text-3xl font-medium text-gray-800">
        Spending Categories
      </h2>
      <div className="mt-7">
        <SpendingCategory category="Housing" expense={-750} />
        <SpendingCategory category="Food & Drinking" expense={-120} />
        <SpendingCategory category="Utilities" expense={-70} />
      </div>
    </div>
  );
};

export default SpendingCategories;
