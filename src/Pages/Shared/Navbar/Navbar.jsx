import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Logo from "../components/Logo";
import NavDropdown from "./NavDropDown";
import { useAuth } from "../../../hooks/useAuth";
import { useGenres } from "../../../hooks/useGenres";
import Search from "../../../Components/Search/Search";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [searchParams] = useSearchParams();
  const { data: genres } = useGenres();

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const handleLogOut = async () => {
    await logOut();
    navigate("/login");
  };

  const activeClass = (path) =>
    location.pathname === path
      ? "text-sky-400 font-bold bg-sky-500/10 px-4 py-2 rounded-lg"
      : "text-gray-100 hover:text-sky-400 transition-colors px-4 py-2 rounded-lg";

  const navLinks = (
    <>
      <li>
        <Link to="/" className={activeClass("/")}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/all-movies" className={activeClass("/all-movies")}>
          All Movies
        </Link>
      </li>
      <NavDropdown
        title="Explore"
        genres={genres || []}
        currentFilter={searchParams.get("category")}
      />
    </>
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-b from-[#0f0f1a] to-black border-b border-sky-500/20 shadow-[0_4px_30px_rgba(56,189,248,0.1)] w-full">
      <div className="navbar max-w-full mx-auto px-4 sm:px-8">
        {/* mobile menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white lg:hidden"
            >
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
              className="menu menu-sm dropdown-content bg-black rounded-box z-10 mt-3 w-52 p-2 shadow-lg border border-slate-100"
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
                <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-md">
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full bg-sky-600 flex items-center justify-center text-white font-bold text-lg hover:bg-sky-500 transition-colors duration-200">
                      {getInitial(user.fullName)}
                    </div>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-30 p-2 shadow-2xl bg-white dark:bg-slate-800 rounded-box w-52 border border-slate-100 dark:border-slate-700"
              >
                <li>
                  <Link to="dashboard/edit-profile">My Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                {user && user?.role !== "admin" && (
                  <li>
                    <Link
                      to="/become-partner"
                      className="text-sky-500 font-semibold"
                    >
                      Become a Partner
                    </Link>
                  </li>
                )}
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={handleLogOut}
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
