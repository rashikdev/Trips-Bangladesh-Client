import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../Shared/Logo";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#0d1b2a] to-[#1b263b] text-white py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-3 text-2xl">
          <Logo />
          <p className="text-white/70 text-sm max-w-xs">
            Explore Bangladesh with us. Discover hidden gems, local stories, and
            unforgettable adventures.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/trips" className="hover:text-primary transition">
                Packages
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center gap-3">
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <div className="flex gap-5 text-xl">
            <a
              href="https://github.com/rashikdev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/rashikdev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/RashikKhan513"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 mt-10 pt-4 text-center text-sm text-white/50">
        &copy; {new Date().getFullYear()} Trips. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
