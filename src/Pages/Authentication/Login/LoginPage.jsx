import Lottie from "lottie-react";
import loginAnimation from "../../../../src/assets/animations/Login.json";

const LoginPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Left: Lottie Animation */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-lg text-center flex flex-col items-center gap-6">
          {/* Lottie Container */}
          <div className="w-full max-w-[450px]">
            <Lottie
              animationData={loginAnimation}
              loop={true}
              className="drop-shadow-2xl"
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
              Welcome Back!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Step back into the world’s most intuitive movie marketplace. Your
              collection is waiting for you.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl lg:shadow-none lg:bg-transparent">
          <div className="mb-8">    
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Sign In
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Please enter your details to continue.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-center"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
