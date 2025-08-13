import { FaWallet } from "react-icons/fa";
import { FaDownLong, FaUpLong } from "react-icons/fa6";
import type { CurrentBalance } from "../models/models";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/apiConfig";

const CurrentBalance: React.FC<CurrentBalance> = ({ expenses, income }) => {
  const [budget, setBudget] = useState<number | null>(null);

  const fetchBudget = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_BUDGET, {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch budget");

      const data = await response.json();

      const parsedBudget = Number(
        typeof data.amount === "string"
          ? data.amount.replace(",", ".")
          : data.amount,
      );

      if (data && data.amount !== undefined) {
        if (!isNaN(parsedBudget)) {
          setBudget(parsedBudget);
        } else {
          setBudget(0);
          console.log("Invalid budget value received:", data.amount);
        }
      } else {
        setBudget(0);
        console.log("No amount found in response");
      }
    } catch (err) {
      console.error("Error fetching budget:", err);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  return (
    <div className="mt-5 w-11/12 rounded border border-gray-200 bg-white px-6 py-5 text-gray-600 shadow-md">
      <div className="mb-5 flex flex-col items-center">
        <h3>Current balance</h3>
        <div className="mt-3 flex items-center gap-x-2">
          <FaWallet color="#00bba7" size={25} />
          <h2 className="text-3xl font-semibold text-teal-600">
            {budget !== null ? `${budget.toFixed(2)} €` : "0.00"}
          </h2>
        </div>

        <div className="mt-2 flex w-full items-center justify-between text-xl">
          <div className="flex items-center text-pink-600">
            <FaDownLong color="#AD1457" size={22} />
            <h3>Expenses: -{expenses}€</h3>
          </div>
          <div>
            <div className="flex items-center text-teal-600">
              <FaUpLong color="#009689" size={22} />
              <h3>Income: +{income}€</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBalance;
