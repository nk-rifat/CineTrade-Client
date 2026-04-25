import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex flex-col group transition-all active:scale-95">
      <div className="text-2xl font-black tracking-tighter flex items-center gap-1">
        <span className="bg-gradient-to-tr from-sky-500 to-indigo-600 bg-clip-text text-transparent">
          Cine
        </span>
        <span className="text-gray-200  ">Trade</span>
      </div>
      <div className="text-[9px] tracking-[0.3em] font-bold text-slate-400 dark:text-slate-500 uppercase -mt-1">
        Movies • Markets
      </div>
    </Link>
  );
};

export default Logo;
