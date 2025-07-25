import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { motion } from "motion/react";
const MobileMenu = () => {
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem("access-token");
    toast.success("Logout successful");
    navigate("/");
    setOpen(false);
  };

  const menuItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-orange-400" : "hover:text-orange-400"
        }
        onClick={() => setOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/community/stories"
        className={({ isActive }) =>
          isActive ? "text-orange-400" : "hover:text-orange-400"
        }
        onClick={() => setOpen(false)}
      >
        Community
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "text-orange-400" : "hover:text-orange-400"
        }
        onClick={() => setOpen(false)}
      >
        About Us
      </NavLink>
      <NavLink
        to="/trips"
        className={({ isActive }) =>
          isActive ? "text-orange-400" : "hover:text-orange-400"
        }
        onClick={() => setOpen(false)}
      >
        Trips
      </NavLink>
      {user && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-orange-400" : "hover:text-orange-400"
          }
          onClick={() => setOpen(false)}
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <div className="md:hidden relative">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="text-white text-2xl z-50"
      >
        <FiMenu />
      </button>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-0%" }}
          transition={{ duration: 0.5 }}
          className="absolute -right-12 -top-10 w-[105vw] h-[105vh] bg-black/90 text-white shadow-lg p-6 space-y-4 z-50 menu text-center pt-16"
        >
          {!user && (
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-6 text-red-500 text-3xl"
            >
              &times;
            </button>
          )}

          {/* User Info */}
          {user && (
            <div className="relative">
              <div className="mb-4 space-y-1 border-b pb-3 border-white/10">
                <div>
                  <p className="font-semibold text-secondary">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-sm text-white/70">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="absolute top-0 right-0 text-red-500"
              >
                <FiX size={24} />
              </button>
            </div>
          )}

          {/* Menu Links */}
          <nav className="flex flex-col space-y-3 text-lg font-medium">
            {menuItems}
          </nav>

          {/* Logout Button */}
          {user ? (
            <button
              onClick={handleLogout}
              className="w-1/3 mx-auto mt-4 py-1 text-red-50 bg-red-500 font-bold transition"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="w-1/3 mx-auto mt-4 py-1 text-red-50 bg-red-500 font-bold transition"
            >
              Login
            </NavLink>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MobileMenu;
