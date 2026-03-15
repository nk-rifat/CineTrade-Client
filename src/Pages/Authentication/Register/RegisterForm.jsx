import { Link } from "react-router-dom";
import Field from "../../Shared/components/Field";

const RegisterForm = () => {
  return (
    <form className="space-y-4 pb-10 lg:pb-[60px]">
      <Field label="First Name">
        <input
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-slate-400"
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Enter your First Name"
        />
      </Field>
      <Field label="Last Name">
        <input
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-slate-400"
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Enter your Last Name"
        />
      </Field>
      <Field label="Email">
        <input
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-slate-400"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
        />
      </Field>

      <Field label="Password">
        <input
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-slate-400"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
        />
      </Field>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-sky-500/25 transition-all active:scale-[0.98] focus:ring-4 focus:ring-sky-500/20"
        >
          Register
        </button>
      </div>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-sky-600 hover:text-sky-500 transition-colors underline underline-offset-4"
          >
            Login Your Account
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
