import React, { createRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import bgImg from "../assets/bannerBg.jpg";
import GoogleLogin from "./GoogleLogin";
import { PiEyeBold, PiEyeClosed } from "react-icons/pi";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser, forgotPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = createRef();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then((result) => {
        toast.success("Login successful!");
        navigate(location.state || "/");
      })
      .catch((err) => {
        toast.error("Invalid email or password");
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    if (!email) {
      return toast.error("Please enter your email");
    }
    forgotPassword(email);
    toast.success("Password reset link sent to your email");
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 border border-white/30 text-white p-8 rounded-2xl backdrop-blur-md shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                placeholder="••••••••"
                required
              />

              {/* Show Password */}
              <button
                type="button"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <PiEyeBold size={20} />
                ) : (
                  <PiEyeClosed size={20} />
                )}
              </button>
            </div>
            <p
              onClick={handleForgotPassword}
              className="text-xs pt-3 inline-block hover:underline underline-offset-3 cursor-pointer text-white/80"
            >
              Forgot password?
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 mt-2 rounded-md hover:bg-gray-200 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <GoogleLogin title="Sign in with Google"></GoogleLogin>

        {/* Extra */}
        <p className="text-center text-sm mt-6 text-white/80">
          Don’t have an account?{" "}
          <Link to="/register" className="text-teal-300 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
