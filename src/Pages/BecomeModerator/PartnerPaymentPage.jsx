import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Payment from "../Stripe Payment/Payment";
import PaymentForm from "../Stripe Payment/PaymentForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Shared/Loading";
import Error from "../../Components/Shared/Error";

const PartnerPaymentPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: application = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["application", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/partner/applications/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <Loading message="Secure Checkout Initializing..." fullPage={true} />
    );
  }
  if (isError) {
    return (
      <div className="max-w-2xl mx-auto py-20">
        <Error
          message={error.message || "Could not retrieve application details."}
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <Payment>
      <PaymentForm
        type="partner"
        referenceId={application?._id}
        amount={49.99}
        successRedirect="/dashboard"
      />
    </Payment>
  );
};

export default PartnerPaymentPage;
