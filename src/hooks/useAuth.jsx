import React, { use } from "react";
import { authContext } from "../context/AuthProvider";

const useAuth = () => {
  const userInfo = use(authContext);
  return userInfo;
};

export default useAuth;
