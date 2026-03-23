import Lottie from "lottie-react";
import registrationAnimation from "../../../../src/assets/animations/form registration.json";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-black via-slate-900 to-black">
      {/* Left: Animation with overlay text */}
      <div className="hidden lg:flex relative items-center justify-center p-12 bg-slate-900 border-r border-white/10">
        {/* Animation as subtle background */}
        <div className="absolute inset-0 opacity-20">
          <Lottie animationData={registrationAnimation} loop />
        </div>

        {/* Overlay text */}
        <div className="relative max-w-lg text-center flex flex-col items-center gap-6">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Join the Club!
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed">
            Create your CineTrade account today and start trading your favorite
            movie insights with the world.
          </p>
        </div>
      </div>

      {/* Right: Registration Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
          </div>

          {/* Form */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
