import { Link } from "react-router-dom";

const NavDropdown = ({ title, items, currentFilter }) => (
  <li className="dropdown dropdown-bottom lg:dropdown-hover">
    <div
      tabIndex={0}
      role="button"
      className="text-white hover:text-sky-500 flex items-center gap-1 transition-colors px-4 py-2 rounded-lg cursor-pointer"
    >
      {title}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
    <div
      tabIndex={0}
      className="dropdown-content menu bg-white rounded-box z-[20] w-[350px] p-4 shadow-2xl border border-slate-100 mt-2"
    >
      <ul className="grid grid-cols-2 gap-1">
        {items.map((item) => (
          <li key={item}>
            <Link
              to={`/movies?genre=${item}`}
              className={`text-sm py-2 hover:text-sky-500 ${currentFilter === item ? "text-sky-500 font-bold bg-sky-50" : ""}`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </li>
);

export default NavDropdown;
