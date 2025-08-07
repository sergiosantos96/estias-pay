import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { FaCoins } from "react-icons/fa";
import ProgressBar from "./shared/ProgressBar";
import Button from "./shared/Button";
import EstiasLogo from "../assets/EstiasLogoTextless.png";
import { useEffect, useState } from "react";
import BudgetModal from "./BudgetModal";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budget, setBudget] = useState<number | null>(null);

  const handleSetBudget = async (amount: string) => {
    try {
      const response = await fetch(
        "http://localhost/EstiasPay/server/api/Set-Budget.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ amount }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Budget set successfully:", data);
      } else {
        console.error("Failed to set budget:", data.message || data.error);
        alert("Failed to set budget: " + (data.message || data.error));
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error: " + error);
    }
  };

  useEffect(() => {
    async function fetchBudget() {
      try {
        const response = await fetch(
          "http://localhost/EstiasPay/server/api/Get-Budget.php",
          {
            credentials: "include",
          },
        );

        if (!response.ok) throw new Error("Failed to fetch budget");

        const data = await response.json();

        console.log("Fetched budget data:", data);

        if (data && data.budget !== undefined) {
          const parsedBudget = Number(data.budget);
          if (!isNaN(parsedBudget)) {
            setBudget(parsedBudget);
            console.log("Valid budget:", parsedBudget);
          } else {
            setBudget(0);
            console.log("Invalid budget value received:", data.budget);
          }
        } else {
          setBudget(0);
          console.log("No budget found in response");
        }
      } catch (err) {
        console.error("Error fetching budget:", err);
      }
    }
    fetchBudget();
  }, []);

  return (
    <div className="z-20 w-full bg-gradient-to-r from-teal-500 to-[#184C49] py-5">
      <div className="flex w-full items-center justify-between p-8">
        <img src={EstiasLogo} alt="Estias-Logo" />
        <div
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center gap-x-1"
        >
          <IoIosLogOut color="white" size={25} />
          <h2 className="text-2xl text-white">Logout</h2>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-5xl font-bold text-white">
          {budget !== null ? `${budget.toFixed(2)} €` : "0.00"}
        </h2>
      </div>
      <div className="my-4 space-x-2 text-center text-teal-100">
        <span>2651€ spent</span>
        <span>•</span>
        <span>4000€ budgeted</span>
      </div>
      <div className="mx-auto w-4/5">
        <ProgressBar barColor="#90EE90" width={65} />
      </div>
      <div className="mb-5 flex justify-center">
        <Button
          icon={<FaCoins />}
          text="Set Monthly Budget"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSetBudget}
      />
    </div>
  );
};

export default DashboardHeader;
