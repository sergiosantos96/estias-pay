import CurrentBalance from "../components/CurrentBalance";
import ExpensesHeader from "../components/ExpensesHeader";
import TransactionsList from "../components/TransactionsList";
import type { FilterProps } from "../models/models";
import { useState } from "react";

export const ExpensesPage = () => {
  const [filters, setFilters] = useState<FilterProps>({
    category: "",
    minPrice: "",
    maxPrice: "",
    minDate: "",
    maxDate: "",
  });

  return (
    <div className="flex w-dvw flex-col items-center justify-center p-8">
      <ExpensesHeader onSubmitFilters={setFilters} />
      <CurrentBalance expenses={2651} income={4000} />
      <TransactionsList filters={filters} />
    </div>
  );
};
