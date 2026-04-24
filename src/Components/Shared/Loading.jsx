import { motion } from 'framer-motion';

const Loading = ({ message = "Loading...", fullPage = false }) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full gap-6 ${fullPage ? 'h-screen bg-black' : 'h-[300px]'}`}>
      <div className="relative">
        <motion.div
          className="w-16 h-16 rounded-full border-2 border-dashed border-sky-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 w-16 h-16 rounded-full border-t-2 border-l-2 border-sky-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Subtle, tracking-spaced text */}
      <p className="text-sky-300 font-bold text-xs tracking-[0.4em] uppercase opacity-70">
        {message}
      </p>
    </div>
  );
};

export default Loading;