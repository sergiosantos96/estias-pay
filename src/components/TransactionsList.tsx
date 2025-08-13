import { FaClipboardList, FaPlus } from "react-icons/fa";
import Button from "./shared/Button";
import Transaction from "./Transaction";
import { useLocation, useNavigate } from "react-router-dom";
import SpendingCategories from "./SpendingCategories";
import AddExpenseModal from "./AddExpenseModal";
import { useEffect, useState } from "react";
import type { ExpenseData } from "../models/models";
import { API_ENDPOINTS } from "../config/apiConfig";

const TransactionsList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_EXPENSES, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      alert("Could not load expenses.");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (data: ExpenseData) => {
    try {
      const response = await fetch(API_ENDPOINTS.ADD_EXPENSE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to add expense");
      }

      console.log("Expense added successfully");
      setIsModalOpen(false);
      fetchExpenses();
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to add expense. Try again.");
    }
  };
  return (
    <div className="z-40 w-full rounded-t-lg">
      {isDashboard && (
        <div className="mt-4 flex items-center justify-between p-8">
          <h2 className="text-3xl font-medium text-gray-800">
            Last Transactions
          </h2>
          <Button
            icon={<FaPlus size={22} />}
            className="!rounded"
            onClick={() => setIsModalOpen(true)}
          />
          <AddExpenseModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
          />
        </div>
      )}

      <div className="px-8">
        {expenses.length > 0 ? (
          expenses.slice(0, 5).map((expense) => (
            <Transaction
              key={expense.id}
              category={expense.category}
              amount={`${Number(expense.amount).toFixed(2)}€`}
              date={new Date(expense.date).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              notes={expense.notes}
            />
          ))
        ) : (
          <p className="text-gray-500">No transactions yet.</p>
        )}

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
