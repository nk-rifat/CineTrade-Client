const ApplicationRow = ({ application, index, handleApprove }) => {
  const { _id, fullName, email, applied_at, paymentStatus, status } =
    application;

  return (
    <tr className="hover:bg-gray-800/40 transition-colors group">
      <td className="pl-8 py-4 text-gray-500 font-mono text-sm">{index + 1}</td>

      <td className="py-4">
        <div className="flex flex-col text-left">
          <span className="font-bold text-slate-200 group-hover:text-sky-400 transition-colors">
            {fullName}
          </span>
          <span className="text-xs text-slate-500 font-mono">{email}</span>
        </div>
      </td>

      <td className="py-4 text-slate-300 text-sm text-left">
        {applied_at ? new Date(applied_at).toLocaleDateString() : "N/A"}
      </td>

      <td className="py-4 text-left">
        <span
          className={`badge badge-md font-semibold rounded-md border-none uppercase ${
            paymentStatus === "paid"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-rose-500/20 text-rose-400"
          }`}
        >
          {paymentStatus}
        </span>
      </td>

      <td className="py-4 text-left">
        <span
          className={`badge badge-md font-semibold rounded-md border-none uppercase r ${
            status === "approve"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-rose-500/20 text-rose-400"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="pr-8 py-4">
        <div className="flex justify-center gap-2">
          {status === "pending" ? (
            <button
              onClick={() => handleApprove(_id)}
              className="btn btn-sm bg-sky-400 hover:bg-sky-500 text-slate-900 rounded-md border-none transition-all"
            >
              Approve
            </button>
          ) : (
            <span className="text-emerald-500 font-bold text-[10px] uppercase py-1 px-2 border border-emerald-500/20 rounded bg-emerald-500/5">
              Completed
            </span>
          )}
          <button className="btn btn-sm btn-outline border-white/20 text-gray-300 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400 transition-all">
            Details
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ApplicationRow;
