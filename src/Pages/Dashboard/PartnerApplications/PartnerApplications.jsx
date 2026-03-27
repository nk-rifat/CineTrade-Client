import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PartnerApplications = () => {
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["partner-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/partner-applications");

      if (res.data && res.data.success) return res.data.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl text-amber-500 font-bold mb-6">
        Partner Applications ({applications.length})
      </h2>

      <div className="overflow-x-auto bg-slate-900 rounded-lg shadow-md border border-slate-800">
        <table className="table w-full border-collapse">
          {/* Head  */}
          <thead className="bg-slate-800/50 text-sky-400 uppercase tracking-widest text-xs">
            <tr>
              <th className="py-5 pl-8 w-20 text-left">#</th>
              <th className="py-5 text-left">Applicant</th>
              <th className="py-5 text-left">Applied Date</th>
              <th className="py-5 text-left">Payment</th>
              <th className="py-5 text-left">Status</th>
              <th className="py-5 pr-8 text-center">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-800">
            {applications.map((application, index) => (
              <tr
                key={application?._id}
                className="hover:bg-gray-800/40 transition-colors group"
              >
                <td className="pl-8 py-4 text-gray-500 font-mono text-sm">
                  {index + 1}
                </td>

                <td className="py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-200 group-hover:text-sky-400 transition-colors">
                      {application?.fullName}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {application?.email}
                    </span>
                  </div>
                </td>

                <td className="py-4 text-slate-300 text-sm">
                  {application?.applied_at
                    ? new Date(application?.applied_at).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="py-4">
                  <span
                    className={`badge badge-md font-semibold rounded-md border-none ${
                      application?.paymentStatus === "paid"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    {application?.paymentStatus}
                  </span>
                </td>

                <td className="py-4">
                  <span
                    className={`badge badge-md font-semibold rounded-md border-none ${
                      application?.status === "approve"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    {application?.status}
                  </span>
                </td>

                <td className="pr-8 py-4">
                  <div className="flex justify-center gap-2">
                    {application?.status === "pending" ? (
                      <button
                        className={`btn btn-sm bg-sky-400 rounded-md border-none transition-all`}
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-emerald-500 font-bold btn-disabled text-[10px] uppercase py-1">
                        Completed
                      </span>
                    )}
                    <button className="btn btn-sm btn-outline border-white/20 py-2.5 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400">
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartnerApplications;