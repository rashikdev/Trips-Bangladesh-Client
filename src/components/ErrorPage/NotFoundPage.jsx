import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4 text-white">
      <div className="text-center space-y-6 animate-fade-in-up">
        <h1 className="text-8xl font-extrabold text-primary">404</h1>
        <h2 className="text-3xl md:text-4xl font-semibold">
          Oops! Page not found.
        </h2>
        <p className="text-gray-300 max-w-md mx-auto">
          The page you’re looking for doesn’t exist or has been moved. But don’t
          worry, let’s get you back home.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-white hover:text-primary transition duration-300"
        >
          Take Me Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
