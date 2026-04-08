import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ApplicationRow from "./ApplicationRow";
import Swal from "sweetalert2";

const PartnerApplications = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["partner-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/partner-applications");
      return res.data?.success ? res.data.data : [];
    },
  });

  //handle status update - Approve or Reject

  const handleUpdateStatus = async (id, status) => {
  const actionText = status === "approved" ? "Approve" : "Reject";

  Swal.fire({
    title: `${actionText} this application?`,
    icon: status === "approved" ? "info" : "warning",
    showCancelButton: true,
    confirmButtonColor: status === "approved" ? "#38bdf8" : "#ef4444",
    cancelButtonColor: "#64748b",
    confirmButtonText: `Yes, ${actionText}`,
    background: "#0f172a",
    color: "#f1f5f9",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(
          `/application-update-status/${id}`,
          { status }
        );

        if (res.data.success) {
          refetch();

          Swal.fire({
            title: "Updated!",
            text: `Application ${status}`,
            icon: "success",
            background: "#0f172a",
            color: "#f1f5f9",
          });
        }
      } catch (error) {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  });
};

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
              <ApplicationRow
                handleUpdateStatus={handleUpdateStatus}
                key={app._id}
                application={app}
                index={index}
              />
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
