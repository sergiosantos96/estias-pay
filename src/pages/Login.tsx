import EstiasLogo from "../assets/EstiasLogo.png";
import Button from "../components/Button";

export const Login = () => {
  return (
    <div className="bg-gray-600 flex justify-center items-center h-screen w-screen">
      <div className="bg-gray-800 flex justify-center items-center gap-5 flex-col rounded-sm px-8 w-85 text-white p-10">
        <img className="block" src={EstiasLogo} alt="Estias-Heart-Logo" />
        <h2 className="text-teal-100 font-medium text-lg">
          Sign in to your account
        </h2>
        <form className="w-full" method="post">
          <div className="flex flex-col gap-4">
            <input
              className="bg-gray-600 rounded-md p-1 pl-4 pr-6"
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              required
            />
            <input
              className="bg-gray-600 rounded-md p-1 pl-4 pr-6"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
            <Button text="Sign in" onClick={() => console.log("something")} />
          </div>
        </form>
        <p>
          Don't have an account?
          <span className="text-teal-600 cursor-pointer"> Sign up</span>
        </p>
      </div>
    </div>
  );
};
