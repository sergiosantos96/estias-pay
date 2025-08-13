import CurrentBalance from "../components/CurrentBalance";
import ExpensesHeader from "../components/ExpensesHeader";
import TransactionsList from "../components/TransactionsList";

export const ExpensesPage = () => {
  return (
    <div className="flex w-dvw flex-col items-center justify-center">
      <ExpensesHeader />
      <CurrentBalance expenses={2651} income={4000} />
      <TransactionsList />
    </div>
  );
};
