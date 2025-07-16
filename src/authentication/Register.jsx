import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import bgImg from "../assets/bannerBg.jpg";
import GoogleLogin from "./GoogleLogin";
import { PiEyeBold, PiEyeClosed } from "react-icons/pi";
import { getCloudinaryImgUrl } from "../utils/utils";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUser } = useAuth();
  const [uploadImage, setUploadImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedFile = watch("image");

  // Upload image on file select
  useEffect(() => {
    const upload = async () => {
      if (selectedFile && selectedFile[0]) {
        setIsUploading(true);
        const uploadPromises = Array.from(selectedFile).map((file) =>
          getCloudinaryImgUrl(file)
        );
        try {
          const urls = await Promise.all(uploadPromises);
          setUploadImage(urls[0]);
          setIsUploading(false);
        } catch (err) {
          console.log(err);
          setIsUploading(false);
        }
      }
    };
    upload();
  }, [selectedFile]);

  const onSubmit = (data) => {
    if (isUploading) {
      return toast.error("Please wait, image is uploading...");
    }
    if (!uploadImage) {
      return toast.error("Please upload an image.");
    }

    const formData = {
      name: data.name,
      email: data.email,
      image: uploadImage,
      role: "tourist",
    };

    // console.log(formData);
    createUser(data.email, data.password)
      .then((res) => {
        // console.log(res.user);
        updateUser({ displayName: data.name, photoURL: uploadImage })
          .then((res) => {
            axiosSecure
              .post("/users", formData)
              .then((res) => {
                if (res.data.inserted) {
                  toast.success("sign up successful");
                  navigate(location.state || "/");
                }
                console.log(res.data);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error("This email is already registered"));
  };
  console.log(uploadImage);

  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-8"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 mt-30 w-full max-w-md bg-white/10 border border-white/30 text-white p-8 rounded-2xl backdrop-blur-md shadow-xl">
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
              {...register("image", { required: "Profile image is required" })}
              className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white file:text-white file:bg-secondary file:border-none file:px-4 file:py-1 file:rounded file:cursor-pointer focus:outline-none"
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
                type={showPassword ? "text" : "password"}
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
                {showPassword ? (
                  <PiEyeBold size={20} />
                ) : (
                  <PiEyeClosed size={20} />
                )}
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
