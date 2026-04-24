import { HiOutlineRefresh, HiOutlineExclamationCircle } from "react-icons/hi";

const Error = ({
  message = "Something went wrong while fetching data.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[400px] p-6 text-center border border-red-500/20 bg-[#050505]">
      <HiOutlineExclamationCircle className="text-red-500 mb-4" size={50} />
      <h3 className="text-xl font-bold text-white mb-2">
        Oops! Execution Error
      </h3>
      <p className="text-zinc-400 text-sm max-w-xs mb-6">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all active:scale-95"
        >
          <HiOutlineRefresh size={18} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;
