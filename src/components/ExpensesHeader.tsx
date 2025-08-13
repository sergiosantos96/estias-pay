import { FaPlus } from "react-icons/fa6";
import Button from "./shared/Button";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFilter } from "react-icons/fa";
import { useState } from "react";
import AddExpenseModal from "./AddExpenseModal";
import type { ExpenseData } from "../models/models";
import { API_ENDPOINTS } from "../config/apiConfig";

const ExpensesHeader = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to add expense. Try again.");
    }
  };

  return (
    <nav className="relative mt-5 flex w-11/12 items-center justify-between bg-white text-teal-600">
      <div>
        <Button
          icon={<FaArrowLeft size={25} />}
          className="!rounded"
          onClick={() => navigate("/dashboard")}
        />
      </div>

      <h2 className="absolute left-1/2 -translate-x-1/2 text-3xl font-semibold">
        Expenses
      </h2>

      <div className="flex gap-x-2">
        <Button
          icon={<FaPlus size={25} />}
          className="!rounded"
          onClick={() => setIsModalOpen(true)}
        />
        <Button
          icon={<FaFilter size={25} />}
          className="!rounded"
          onClick={() => console.log("clicked")}
        />

        <AddExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </div>
    </nav>
  );
};

export default ExpensesHeader;
