import { NavLink, Outlet } from "react-router-dom";
import {
  FaFilm,
  FaHistory,
  FaUserEdit,
  FaHome,
  FaUserShield,
  FaHandshake,
  FaUsers,
  FaChartLine,
  FaCogs,
} from "react-icons/fa";
import Logo from "../Pages/Shared/components/Logo";
import { useAuth } from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-red-600 text-white shadow-md"
        : "hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-slate-950 text-white lg:hidden shadow-md">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <span className="ml-2 font-bold text-lg text-amber-500 tracking-wide">
            CineTrade Dashboard
          </span>
        </div>

        {/* Page Content */}
        <div className="p-4 bg-gradient-to-br from-black via-slate-900 to-black min-h-screen text-white">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <ul className="menu bg-slate-950 backdrop-blur-md text-gray-200 min-h-full w-72 p-4 space-y-2 border-r border-slate-800">
          {/* Logo */}
          <div className="mb-6">
            <Logo />
          </div>

          {/* Navigation */}
          <li>
            <NavLink to="/" className={navLinkClass}>
              <FaHome /> Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/my-movies" className={navLinkClass}>
              <FaFilm /> My Movies
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile" className={navLinkClass}>
              <FaUserEdit /> Profile Settings
            </NavLink>
          </li>
          {/* Admin links */}
          {user?.role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin" className={navLinkClass}>
                  <FaUserShield /> Admin Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users" className={navLinkClass}>
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/partner-applications"
                  className={navLinkClass}
                >
                  <FaHandshake /> Partner Applications    
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-movies" className={navLinkClass}>
                  <FaFilm /> Manage Movies
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/reports" className={navLinkClass}>
                  <FaChartLine /> Reports & Analytics
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
