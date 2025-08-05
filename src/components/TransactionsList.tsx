import { FaClipboardList, FaPlus } from "react-icons/fa";
import Button from "./shared/Button";
import Transaction from "./Transaction";
import { useLocation, useNavigate } from "react-router-dom";
import SpendingCategories from "./SpendingCategories";

const TransactionsList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="z-50 w-full rounded-t-lg">
      {isDashboard && (
        <div className="mt-4 flex items-center justify-between p-8">
          <h2 className="text-3xl font-medium text-gray-800">
            Last Transactions
          </h2>
          <Button
            icon={<FaPlus size={22} />}
            className="!rounded"
            onClick={() => console.log("clicked")}
          />
        </div>
      )}

      <div className="px-8">
        <Transaction
          category="electricity"
          price="-70,00€"
          date="08 Jul 2025 9:43"
          notes="Paid via bank transfer"
        />
        <Transaction
          category="electricity"
          price="-70,00€"
          date="08 Jul 2025 9:43"
          notes="Paid via bank transfer"
        />
        {isDashboard && (
          <div>
            <div className="flex justify-center">
              <Button
                icon={<FaClipboardList size={22} />}
                text="View All Transactions"
                className="my-8 rounded text-center"
                onClick={() => navigate("/expenses")}
              />
            </div>
            <SpendingCategories />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
