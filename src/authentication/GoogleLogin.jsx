import React from "react";
import useAuth from "../hooks/useAuth";
import { TbBrandGoogle } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = ({ title }) => {
  const { googleSignIn } = useAuth();
  const handleGoogleLogin = async () => {
    await googleSignIn()
      .then((res) => {
        console.log(res.data);
        alert("sign in successful");
      })
      .catch((err) => console.log(err));
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
