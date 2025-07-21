import { RiErrorWarningFill } from "react-icons/ri";
import Button from "../components/Button";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 flex justify-center items-center h-screen">
      <div className="bg-white flex justify-center items-center gap-2 flex-col p-10 rounded-md w-1/4 shadow-md">
        <RiErrorWarningFill color="red" size={63} />
        <h1 className="font-bold text-8xl text-gray-700">404</h1>
        <h2 className="font-medium text-2xl text-gray-700">Page Not Found</h2>
        <p className="text-gray-500 text-center my-4">
          Oops! It looks like the page you're looking for doesn't exist. Please
          check the URL or go back to the home page.
        </p>
        <Button
          icon={<FaHome size={20} />}
          text="Go To Homepage"
          onClick={() => navigate("/")}
          className="rounded-xl p-4"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
