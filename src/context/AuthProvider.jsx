import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, use, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

const provider = new GoogleAuthProvider();

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const forgotPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        axios
          .post("https://trips-bangladesh-server.vercel.app/jwt", {
            email: currentUser.email,
          })
          .then((res) => {
            localStorage.setItem("access-token", res.data.token);
          })
          .catch((err) => {
            console.error("Failed to get JWT:", err);
          });
      } else {
        localStorage.removeItem("access-token");
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUser = (updateData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateData);
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logoutUser,
    googleSignIn,
    updateUser,
    forgotPassword,
    setLoading,
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
