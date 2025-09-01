import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EstiasLogo from "../assets/EstiasLogo.png";
import Button from "../components/shared/Button";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint =
      mode === "login"
        ? "http://localhost/EstiasPay/server/Login.php"
        : "http://localhost/EstiasPay/server/Register.php";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

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
    <div className="flex h-screen w-screen items-center justify-center bg-gray-600 px-4">
      <div className="flex w-85 flex-col items-center justify-center gap-5 rounded-sm bg-gray-800 p-10 px-8 py-7 text-white">
        <img className="block" src={EstiasLogo} alt="Estias-Heart-Logo" />
        <h2 className="text-lg font-medium text-teal-100">
          {mode === "login" ? "Sign in to your account" : "Create an account"}
        </h2>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              className="w-full rounded-md bg-gray-600 p-1 pr-6 pl-4"
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full rounded-md bg-gray-600 p-1 pr-6 pl-4"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex gap-x-1">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="text-sm" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <Button
              text={mode === "login" ? "Sign in" : "Sign up"}
              type="submit"
            />
          </div>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>

        <p className="text-sm">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span
            className="ml-1 cursor-pointer text-teal-600"
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
