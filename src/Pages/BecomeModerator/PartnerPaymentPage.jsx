import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Payment from "../Stripe Payment/Payment";
import PaymentForm from "../Stripe Payment/PaymentForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PartnerPaymentPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: application = {} } = useQuery({
    queryKey: ["application", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/partner/applications/${id}`);
      return res.data;
    },
  });

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
