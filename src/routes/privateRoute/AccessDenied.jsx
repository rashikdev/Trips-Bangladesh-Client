import { TbShieldOff } from "react-icons/tb";
import { Link } from "react-router";

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-100 dark:bg-black text-gray-800 dark:text-white px-4">
      <TbShieldOff className="w-20 h-20 text-red-500 mb-6" />
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg md:text-xl mb-6 max-w-md">
        You do not have permission to access this page. This route is restricted
        to admin users only.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default AccessDenied;
