import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = ({children}) => {
  return (
    <Elements stripe={stripePromise} >
      {children}
    </Elements>
  );
};

export default Payment;
