import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-base-200 mt-16">

      {/* Main Footer */}
      <div className="footer footer-center p-10 text-base-content">
        
        <Logo />

        {/* Links */}
        <nav className="grid grid-flow-col gap-6">
          <Link to="/community" className="link link-hover">Community</Link>
          <Link to="/privacy" className="link link-hover">Privacy</Link>
          <Link to="/terms" className="link link-hover">Terms</Link>
          <Link to="/contact" className="link link-hover">Contact</Link>
        </nav>

        {/* Social Media */}
        <nav>
          <div className="grid grid-flow-col gap-5">

            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="currentColor" viewBox="0 0 24 24"
                className="hover:text-primary">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 
                2 12c0 4.991 3.657 9.128 8.438 
                9.878v-6.987h-2.54V12h2.54V9.797
                c0-2.506 1.492-3.89 3.777-3.89 
                1.094 0 2.238.195 2.238.195v2.46
                h-1.26c-1.243 0-1.63.771-1.63 
                1.562V12h2.773l-.443 
                2.89h-2.33v6.988C18.343 
                21.128 22 16.991 22 12z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="currentColor" viewBox="0 0 24 24"
                className="hover:text-primary">
                <path d="M7.75 2C4.678 2 2 4.678 2 
                7.75v8.5C2 19.322 4.678 22 7.75 
                22h8.5C19.322 22 22 19.322 22 
                16.25v-8.5C22 4.678 19.322 2 
                16.25 2h-8.5zm0 2h8.5C18.216 4 
                20 5.784 20 7.75v8.5C20 
                18.216 18.216 20 16.25 
                20h-8.5C5.784 20 4 
                18.216 4 16.25v-8.5C4 
                5.784 5.784 4 7.75 
                4zm8.75 1a1 1 0 100 
                2 1 1 0 000-2zM12 
                7a5 5 0 100 10 5 5 
                0 000-10zm0 2a3 3 
                0 110 6 3 3 0 
                010-6z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="currentColor" viewBox="0 0 24 24"
                className="hover:text-primary">
                <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8
                -1.7-.8-2.1-.9C15.9 4.9 12 
                4.9 12 4.9s-3.9 0-6.9.2c-.4 
                0-1.3.1-2.1.9-.6.6-.8 
                2-.8 2S2 9.6 2 
                11.3v1.4c0 1.7.2 
                3.3.2 3.3s.2 1.4.8 
                2c.8.8 1.9.8 2.4.9 
                1.7.2 6.6.2 6.6.2s3.9 
                0 6.9-.2c.4 0 1.3-.1 
                2.1-.9.6-.6.8-2 
                .8-2s.2-1.6.2-3.3v-1.4C22 
                9.6 21.8 8 21.8 8zM10 
                14.7V9.3l5.2 
                2.7L10 14.7z"/>
              </svg>
            </a>

          </div>
        </nav>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-base-300 text-center py-4 text-sm">
        © {year} CineTrade — All rights reserved
      </div>

    </footer>
  );
};

export default Footer;