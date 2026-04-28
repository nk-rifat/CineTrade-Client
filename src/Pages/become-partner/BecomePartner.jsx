import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosPublic from "../../api/axios";

import BecomePartnerForm from "./BecomePartnerForm";
import PartnerStatus from "./PartnerStatus";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../Components/Shared/Loading";
import Error from "../../Components/Shared/Error";

const BecomePartner = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get application
  const {
    data: application,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["partnerApplication"],
    queryFn: async () => {
      const res = await axiosPublic.get("/my-application");
      return res.data;
    },
  });

  // Submit application
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const payload = {
        fullName: formData?.fullName,
        reason: formData?.reason,
      };
      const res = await axiosPublic.post("/apply/become-partner", payload);
      return res.data;
    },

    onSuccess: () => {
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        text: "Your request is under review by admin.",
      });
      queryClient.invalidateQueries({ queryKey: ["partnerApplication"] });
    },

    onError: (err) => {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.message || "Something went wrong",
      });
    },
  });

  const handleSubmit = (data) => {
    Swal.fire({
      title: "Submitting...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    mutate(data);
  };

  if (isLoading)
    return <Loading message="Checking Status..." fullPage={true} />;

  if (isError) return <Error message={error.message} onRetry={refetch} />;

  if (user?.role === "admin") return;

  return (
    <div className="space-y-6">
      <PartnerStatus application={application} />

      {!application && (
        <BecomePartnerForm onSubmit={handleSubmit} isPending={isPending} />
      )}
    </div>
  );
};

export default BecomePartner;
