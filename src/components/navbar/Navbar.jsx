import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Shared/Logo";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import MobileMenu from "./MobileMenu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "motion/react";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // scrolling down
      setShowNavbar(false);
    } else {
      // scrolling up
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);
  
  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("access-token");
      toast.success("Logout successful.");
      setDropdownOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to logout. Try again.");
    }
  };

  const containerRef = useRef(null);
  useGSAP(() => {
    gsap.from(".logo", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.from(".li", {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.2,
      ease: "power2.inOut",
    });
  }, [containerRef]);

  const menuItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-primary li" : "hover:text-primary li"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/community/stories"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-primary li" : "hover:text-primary li"
        }
      >
        Community
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-primary li" : "hover:text-primary li"
        }
      >
        About Us
      </NavLink>
      <NavLink
        to="/trips"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-primary li" : "hover:text-primary li"
        }
      >
        Trips
      </NavLink>
    </>
  );

  return (
    <nav
      className={`fixed top-5 left-0 right-0 z-50 w-full px-6 md:px-10  ${
        showNavbar ? "translate-y-0" : "-translate-y-24"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-xl px-4 py-3 flex items-center justify-between shadow-lg border border-white/20 min-h-[65px]">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-xl text-white hover:text-primary logo"
        >
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center font-medium text-white">
          {menuItems}
        </div>

        {/* Right Side - Auth & Dropdown */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <NavLink
              to="/login"
              className="px-4 py-[3px] rounded-full text-white font-semibold shadow-md hover:bg-white hover:text-primary border-2 border-primary transition-all duration-300"
            >
              Login
            </NavLink>
          ) : (
            <div className="relative group">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className="absolute right-0 mt-5 w-56 border border-white/10 shadow-xl rounded-lg z-50 p-4 bg-black/30 text-white space-y-2"
                >
                  <p className="text-sm font-semibold">{user.displayName}</p>
                  <p className="text-xs text-gray-300">{user.email}</p>
                  <hr className="border-white/20" />
                  <Link
                    to="/dashboard"
                    className="block hover:text-primary transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/offers"
                    className="block hover:text-primary transition"
                  >
                    Offer Announcements
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-500 hover:underline mt-2"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-3">
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="User"
              className="w-8 h-8 rounded-full object-cover border-2 border-primary"
            />
          )}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
