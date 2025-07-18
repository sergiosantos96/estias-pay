import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EstiasLogo from "../assets/EstiasLogo.png";
import Button from "../components/Button";

export const Login = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint =
      mode === "login"
        ? "http://localhost/EstiasPay/server/Login.php"
        : "http://localhost/EstiasPay/server/Register.php";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      if (mode === "login") {
        navigate("/dashboard");
      } else {
        alert("Account created. You can now log in.");
        setMode("login");
      }
    } else {
      setError(data.message || "Something went wrong.");
    }
  };

  return (
    <div className="bg-gray-600 flex justify-center items-center h-screen w-screen">
      <div className="bg-gray-800 flex justify-center items-center gap-5 flex-col rounded-sm px-8 w-85 text-white p-10">
        <img className="block" src={EstiasLogo} alt="Estias-Heart-Logo" />
        <h2 className="text-teal-100 font-medium text-lg">
          {mode === "login" ? "Sign in to your account" : "Create an account"}
        </h2>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              className="bg-gray-600 rounded-md p-1 pl-4 pr-6"
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="bg-gray-600 rounded-md p-1 pl-4 pr-6"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              text={mode === "login" ? "Sign in" : "Sign up"}
              type="submit"
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <p className="text-sm">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span
            className="text-teal-600 cursor-pointer ml-1"
            onClick={() => {
              setError("");
              setMode(mode === "login" ? "register" : "login");
            }}
          >
            {mode === "login" ? " Sign up " : " Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
};
