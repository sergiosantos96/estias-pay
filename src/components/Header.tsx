import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { FaCoins } from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import EstiasLogo from "../assets/EstiasLogoTextless.png";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="z-20 w-full bg-gradient-to-r from-teal-500 to-[#184C49]">
      <div className="container mx-auto flex w-full items-center justify-between p-8">
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
        {/* Todo: Replace hard coded string */}
        <h2 className="text-5xl font-bold text-white">1349,50 €</h2>
      </div>
      <div className="my-4 space-x-2 text-center text-teal-100">
        <span>2651€ spent</span>
        <span>•</span>
        <span>4000€ budgeted</span>
      </div>
      <ProgressBar barColor="#90EE90" />
      <div className="mb-6 flex justify-center">
        <Button
          icon={<FaCoins />}
          text="Set Monthly Budget"
          onClick={() => console.log("clicked")}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
