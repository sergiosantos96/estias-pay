import { useState, useEffect } from "react";
import type { FilterProps, ExpenseData } from "../models/models";
import ExpensesHeader from "../components/ExpensesHeader";
import CurrentBalance from "../components/CurrentBalance";
import TransactionsList from "../components/TransactionsList";
import { API_ENDPOINTS } from "../config/apiConfig";

export const ExpensesPage = () => {
  const [filters, setFilters] = useState<FilterProps>({
    category: "",
    minPrice: "",
    maxPrice: "",
    minDate: "",
    maxDate: "",
  });

  const [expenses, setExpenses] = useState<ExpenseData[]>([]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_EXPENSES, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch expenses");
      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="flex w-dvw flex-col items-center justify-center p-8">
      <ExpensesHeader onSubmitFilters={setFilters} />
      <CurrentBalance expenses={2651} income={4000} />
      <TransactionsList
        expenses={expenses}
        refetchExpenses={fetchExpenses}
        filters={filters}
      />
    </div>
  );
};
