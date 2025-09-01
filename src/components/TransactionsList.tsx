import { FaClipboardList, FaPlus } from "react-icons/fa";
import Button from "./shared/Button";
import Transaction from "./Transaction";
import { useLocation, useNavigate } from "react-router-dom";
import AddExpenseModal from "./AddExpenseModal";
import { useEffect, useState } from "react";
import type { ExpenseData, FilterProps } from "../models/models";
import { API_ENDPOINTS } from "../config/apiConfig";

const TransactionsList = ({ filters }: { filters: FilterProps }) => {
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

  const filteredExpenses = !isDashboard
    ? expenses.filter((expense) => {
        const amount = Number(expense.amount);
        const expenseDate = new Date(expense.date);

        return (
          (!filters.category || expense.category === filters.category) &&
          (!filters.minPrice || amount >= Number(filters.minPrice)) &&
          (!filters.maxPrice || amount <= Number(filters.maxPrice)) &&
          (!filters.minDate || expenseDate >= new Date(filters.minDate)) &&
          (!filters.maxDate || expenseDate <= new Date(filters.maxDate))
        );
      })
    : [];

  const transactionsToDisplay = isDashboard ? expenses : filteredExpenses;

  return (
    <div className="z-40 w-full rounded-t-lg">
      {isDashboard && (
        <div className="mt-4 flex flex-col items-center justify-between p-6 sm:flex-row sm:p-8">
          <h2 className="mb-4 text-2xl font-medium text-gray-800 sm:mb-0 sm:text-3xl">
            Last Transactions
          </h2>
          <Button
            icon={<FaPlus size={20} />}
            className="!rounded text-sm sm:text-base"
            onClick={() => setIsModalOpen(true)}
          />
          <AddExpenseModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
          />
        </div>
      )}

      <div>
        {transactionsToDisplay.length > 0 ? (
          transactionsToDisplay.slice(0, 5).map((expense) => (
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
          <div className="mt-6">
            <div className="flex justify-center">
              <Button
                icon={<FaClipboardList size={20} />}
                text="View All Transactions"
                className="my-8 rounded text-center text-sm sm:text-base"
                onClick={() => navigate("/expenses")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
