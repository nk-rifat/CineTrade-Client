import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Shared/Loading";
import Error from "../../Components/Shared/Error";
import Payment from "../stripe-payment/Payment";
import PaymentForm from "../stripe-payment/PaymentForm";
import { useEffect } from "react";

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

  useEffect(() => {
    document.title = "CineTrade - Partner Payment";
  }, []);

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
        successRedirect="/become-partner"
      />
    </Payment>
  );
};

export default PartnerPaymentPage;
