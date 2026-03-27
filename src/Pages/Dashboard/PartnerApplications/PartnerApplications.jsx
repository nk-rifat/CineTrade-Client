import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ApplicationRow from "./ApplicationRow";

const PartnerApplications = () => {
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["partner-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/partner-applications");
      return res.data?.success ? res.data.data : [];
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
          <thead className="bg-slate-800/50 text-sky-400 uppercase tracking-widest text-xs">
            <tr>
              <th className="py-5 pl-8 w-20 text-left">#</th>
              <th>Applicant</th>
              <th>Applied Date</th>
              <th>Payment</th>
              <th>Status</th>
              <th className="pr-8 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {applications.map((app, index) => (
              <ApplicationRow key={app._id} application={app} index={index} />
            ))}
          </tbody>
        </table>
        {applications.length === 0 && (
          <p className="text-center p-10 text-slate-500">
            No applications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PartnerApplications;
