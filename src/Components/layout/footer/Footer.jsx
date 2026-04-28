import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Logo from "../../shared/Logo";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-[#0f0f1a] to-black">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-col md:flex-row md:justify-between md:items-center gap-6">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <Logo />
        </div>

        {/* Links */}
        <nav className="flex  sm:flex-row justify-center items-center gap-4 md:gap-6 text-white">
          <Link
            to="/"
            className="text-white hover:text-sky-400 transition-colors"
          >
            Privacy
          </Link>
          <Link
            to="/"
            className="text-white hover:text-sky-400 transition-colors"
          >
            Terms
          </Link>
          <Link
            to="/"
            className="text-white hover:text-sky-400 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Social Media */}
        <div className="flex justify-center md:justify-end gap-5">
          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebookF className="text-gray-400 hover:text-blue-500 transition duration-300 text-xl" />
          </a>

          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="text-gray-400 hover:text-pink-500 transition duration-300 text-xl" />
          </a>

          {/* YouTube */}
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <FaYoutube className="text-gray-400 hover:text-red-500 transition duration-300 text-xl" />
          </a>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-base-300 text-center py-4 text-sm text-white">
        © {year} CineTrade — All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
