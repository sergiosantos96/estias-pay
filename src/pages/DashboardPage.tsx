import DashboardHeader from "../components/DashboardHeader";
import PageContainer from "../components/PageContainer";
import TransactionsList from "../components/TransactionsList";

const DashboardPage = () => {
  return (
    <div className="flex w-dvw flex-col items-center justify-center text-white">
      <PageContainer>
        <DashboardHeader />
        <TransactionsList />
      </PageContainer>
    </div>
  );
};

export default DashboardPage;
