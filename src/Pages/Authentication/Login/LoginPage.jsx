import Lottie from "lottie-react";
import loginAnimation from "../../../../src/assets/animations/Login.json";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-black via-slate-900 to-black">
      {/* Left: Lottie Animation */}
      <div className="hidden lg:flex relative items-center justify-center p-12 bg-slate-900 border-r border-white/10">
        <div className="max-w-lg text-center flex flex-col items-center gap-6">
          {/* Lottie Container */}
          <div className="absolute inset-0 opacity-20">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>

          <div className="relative max-w-lg text-center flex flex-col items-center gap-6">
            <h1 className="text-4xl font-black text-white tracking-tight">
              Welcome Back!
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed">
              Step back into the world’s most intuitive movie marketplace. Your
              collection is waiting for you.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Sign In</h2>
            <p className="text-gray-400 text-sm mt-1">
              Please enter your details to continue.
            </p>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
