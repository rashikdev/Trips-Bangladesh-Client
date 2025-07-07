import React, { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import bgImg from "../assets/bannerBg.jpg";
import GoogleLogin from "./GoogleLogin";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { PiEyeBold, PiEyeClosed } from "react-icons/pi";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const file = data.image[0];

    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      image: file,
    };

    console.log(formData);
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 border border-white/30 text-white p-8 rounded-2xl backdrop-blur-md shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.name && (
              <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm mb-1">
              Upload Profile Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image", {
                required: "Profile image is required",
              })}
              className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white file:text-white file:bg-teal-500 file:border-none file:px-4 file:py-1 file:rounded file:cursor-pointer focus:outline-none"
            />
            {errors.image && (
              <p className="text-sm text-red-400 mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    message:
                      "Min 8 characters with uppercase, lowercase, number, and special character",
                  },
                })}
                className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <PiEyeBold size={20} /> : <PiEyeClosed size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-400 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition cursor-pointer"
          >
            Register
          </button>
        </form>

        {/* Google Login */}
        <GoogleLogin title="Sign up with Google" />

        <p className="text-center text-sm mt-6 text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-300 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
