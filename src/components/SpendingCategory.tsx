import ProgressBar from "./shared/ProgressBar";

interface SpendingCategory {
  category: string;
  expense: number;
}

const SpendingCategory: React.FC<SpendingCategory> = ({
  category,
  expense,
}) => {
  return (
    <div>
      <div className="flex w-full justify-between">
        <h3 className="text-2xl font-medium text-gray-600 capitalize">
          {category}
        </h3>
        <h3 className="text-2xl font-semibold text-pink-600">{expense}€</h3>
      </div>
      <div className="mt-3">
        <ProgressBar barColor="#EC4899" width={70} />
      </div>
    </div>
  );
};

export default SpendingCategory;
