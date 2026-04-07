import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";


const PaymentForm = ({ type, referenceId, amount, successRedirect }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    try {
      // Step 1: Create Payment Method
      const { error: pmError } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (pmError) {
        setError(pmError.message);
        setLoading(false);
        return;
      }

      setError("");

      // Step 2: Create Payment Intent
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount,
        type,
        referenceId,
      });

      const clientSecret = data?.clientSecret;

      // Step 3: Confirm Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }

      // Step 4: Success
      if (result?.paymentIntent?.status === "succeeded") {
        setError("");
        const paymentData = {
          email: user?.email,
          amount,
          type,
          referenceId,
          transactionId: result?.paymentIntent?.id,
          status: "success",
          createdAt: new Date(),
        };

        await axiosSecure.post("/payments", paymentData);

        await Swal.fire({
          title: "🎉 Payment Successful!",
          text: "Transaction completed successfully",
          icon: "success",
          confirmButtonColor: "#22c55e",
        });

        navigate(successRedirect || "/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md max-w-md mx-auto"
    >
      <CardElement className="p-3 border rounded-lg" />

      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn bg-green-500 text-white w-full rounded-xl"
      >
        {loading ? "Processing..." : `Pay ${amount} Tk`}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default PaymentForm;
