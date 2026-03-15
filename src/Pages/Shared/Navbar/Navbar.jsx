import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Logo from "../components/Logo";
import Search from "../components/Search";
import { categoryList } from "./navData";
import NavDropdown from "./NavDropDown";

const Navbar = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // TODO: replace with real auth user .
  const [user, setUser] = useState({
    displayName: "Admin",
    photoURL:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  });

  const activeClass = (path) =>
    location.pathname === path
      ? "text-sky-500 font-bold bg-sky-50 dark:bg-slate-800 px-4 py-2 rounded-lg"
      : "text-slate-600 dark:text-slate-300 hover:text-sky-500 transition-colors px-4 py-2 rounded-lg";

  const navLinks = (
    <>
      <li>
        <Link to="/" className={activeClass("/")}>
          Home
        </Link>
      </li>
      <NavDropdown
        title="Explore"
        items={categoryList}
        currentFilter={searchParams.get("category")}
      />
      <li>
        <Link to="/top-movies" className={activeClass("/top-movies")}>
          Top Rated
        </Link>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 w-full">
      <div className="navbar max-w-full mx-auto px-4 sm:px-8">
        {/* mobile menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white dark:bg-slate-800 rounded-box z-10 mt-3 w-52 p-2 shadow-lg border border-slate-100 dark:border-slate-700"
            >
              {navLinks}
            </ul>
          </div>

          <Logo />
        </div>

        {/* CENTER: Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 font-semibold">
            {navLinks}
          </ul>
        </div>

        {/* RIGHT: Search & Profile */}
        <div className="navbar-end gap-4">
          <Search />

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-sky-500"
              >
                <div className="w-10 rounded-full border border-white">
                  <img src={user.photoURL} alt="Profile" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-30 p-2 shadow-2xl bg-white dark:bg-slate-800 rounded-box w-52 border border-slate-100 dark:border-slate-700"
              >
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link
                    to="/become-moderator"
                    className="text-sky-500 font-semibold"
                  >
                    Become a Moderator
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={() => setUser(null)}
                    className="text-red-500 font-medium"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm bg-sky-500 hover:bg-sky-600 border-none text-white rounded-full px-8"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;