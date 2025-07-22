import { RiErrorWarningFill } from "react-icons/ri";
import Button from "../components/Button";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="flex w-1/4 flex-col items-center justify-center gap-2 rounded-md bg-white p-10 shadow-md">
        <RiErrorWarningFill color="red" size={63} />
        <h1 className="text-8xl font-bold text-gray-700">404</h1>
        <h2 className="text-2xl font-medium text-gray-700">Page Not Found</h2>
        <p className="my-4 text-center text-gray-500">
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
