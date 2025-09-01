import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import SpendingCategories from "../components/SpendingCategories";
import TransactionsList from "../components/TransactionsList";
import type { ExpenseData } from "../models/models";
import { API_ENDPOINTS } from "../config/apiConfig";

const DashboardPage = () => {
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

  return (
    <div className="flex w-dvw flex-col items-center justify-center text-white">
      <DashboardHeader />
      <div className="w-full px-8">
        <TransactionsList expenses={expenses} refetchExpenses={fetchExpenses} />
        <SpendingCategories expenses={expenses} />
      </div>
    </div>
  );
};

export default DashboardPage;
