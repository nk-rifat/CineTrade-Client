import Lottie from "lottie-react";
import registrationAnimation from "../../../../src/assets/animations/form registration.json";

const RegisterPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Left: Animation */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-lg text-center flex flex-col items-center gap-6">
          <div className="w-full max-w-[450px]">
            <Lottie
              animationData={registrationAnimation}
              loop={true}
              className="drop-shadow-2xl"
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
              Join the Club!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Create your CineTrade account today and start trading your
              favorite movie insights with the world.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl lg:shadow-none lg:bg-transparent">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Create Account
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
