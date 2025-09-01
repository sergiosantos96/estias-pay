import DashboardHeader from "../components/DashboardHeader";
import SpendingCategories from "../components/SpendingCategories";
import TransactionsList from "../components/TransactionsList";

const DashboardPage = () => {
  return (
    <div className="flex w-dvw flex-col items-center justify-center text-white">
      <DashboardHeader />
      <div className="w-full px-8">
        <TransactionsList />
        <SpendingCategories />
      </div>
    </div>
  );
};

export default DashboardPage;
