import { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Shared/Logo";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const menuItems = (
    <>
      <NavLink to="/" className="hover:text-primary">
        Home
      </NavLink>
      <NavLink to="/community/stories" className="hover:text-primary">
        Community
      </NavLink>
      <NavLink to="/about" className="hover:text-primary">
        About Us
      </NavLink>
      <NavLink to="/trips" className="hover:text-primary">
        Trips
      </NavLink>
    </>
  );

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 text-white w-11/12 mx-auto">
      <div className="py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">{menuItems}</div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <NavLink to="/login" className="hover:text-primary">
                Login
              </NavLink>
            </>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 border shadow-lg rounded-md z-50 p-3 space-y-1 backdrop-blur-md">
                  <p className="text-sm font-semibold">{user.displayName}</p>
                  <p className="text-xs text-gray-300">{user.email}</p>
                  <hr />
                  <Link to="/dashboard" className="block hover:text-primary">
                    Dashboard
                  </Link>
                  <Link to="/offers" className="block hover:text-primary">
                    Offer Announcements
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-500 hover:underline mt-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-5">
          <img
            src={user?.photoURL}
            alt=""
            className="w-8 h-8 rounded-full object-cover border-2 border-primary"
          />
          <MobileMenu></MobileMenu>
        </div>
      </div>

      {/* Optional: Add a mobile dropdown below if needed */}
    </nav>
  );
};

export default Navbar;
