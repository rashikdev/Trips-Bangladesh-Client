import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../Shared/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-gray-700 py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo + Website Name */}
        <div className="flex items-center gap-2">
          <Logo></Logo>
        </div>

        {/* Developer Social Links */}
        <div className="flex gap-5 text-xl">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      <div className="text-center text-sm mt-6 text-gray-500">
        &copy; {new Date().getFullYear()} BD Travel Guide. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
