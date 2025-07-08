import React from "react";
import useAuth from "../hooks/useAuth";
import { TbBrandGoogle } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const GoogleLogin = ({ title }) => {
  const { googleSignIn } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = async () => {
    try {
      const res = await googleSignIn();
      const user = res.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role: "tourist",
      };

      axiosSecure.post("/users", userData);
      toast.success("Sign in successful");
    } catch (error) {
      toast.error("something went wrong try again");
    }
  };
  return (
    <div>
      <div className="flex items-center w-full my-4">
        <hr className="w-full" />
        <p className="px-3">OR</p>
        <hr className="w-full" />
      </div>
      <button
        onClick={handleGoogleLogin}
        aria-label="Login with Google"
        type="button"
        className="flex items-center justify-center w-full space-x-3 border bg-white rounded-md py-2 mt-5 text-black cursor-pointer"
      >
        <FcGoogle size={20} />
        <p>{title}</p>
      </button>
    </div>
  );
};

export default GoogleLogin;
