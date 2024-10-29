import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/Input/PasswordInput";
import { validateEmail } from "../../utils/helpers";
import axiosIntance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    try {
      const response = await axiosIntance.post("/login", {
        email,
        password,
      });
      const data = response.data;

      if (data && data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        navigate("/");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-cyan-50 overflow-hidden relative">
      {/* UI Decorative Elements - Hidden on mobile */}
      <div className="hidden md:block login-ui-box right-10 -top-40" />
      <div className="hidden md:block login-ui-box bg-cyan-200" />

      <div className="container min-h-screen mx-auto px-4 md:px-20">
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
          
          {/* Left side - Image (Hidden on mobile) */}
          <div className="hidden md:flex md:w-1/2 h-[90vh] items-end bg-[url(./src/assets/images/bg-image.png)] bg-cover bg-center rounded-lg p-10 z-50">
            <div>
              <h4 className="text-3xl md:text-5xl text-white font-semibold leading-tight md:leading-[58px]">
                Capture Your <br /> Journeys
              </h4>
              <p className="text-sm md:text-[15px] text-white leading-6 pr-7 mt-4">
                Record your travel experience and memories in your personal travel
                journal
              </p>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full md:w-1/2 bg-white rounded-lg md:rounded-l-none md:rounded-r-lg relative p-6 md:p-16 shadow-lg shadow-cyan-200/60">
            <form onSubmit={handleLogin} className="max-w-md mx-auto">
              <h4 className="text-xl md:text-2xl font-semibold mb-7">LOGIN</h4>

              <input
                type="text"
                placeholder="Email"
                className="input-box w-full mb-4"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />

              <PasswordInput
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
              />

              {error && (
                <p className="text-red-500 text-xs pb-1 mt-2">{error}</p>
              )}

              <button type="submit" className="btn-primary w-full mt-6">
                LOGIN
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-xs text-slate-500">
                    Or
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn-primary btn-light w-full"
                onClick={() => navigate("/signup")}
              >
                CREATE ACCOUNT
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;