import { useNavigate } from "react-router-dom";

const PaymentSection = ({ applicationId }) => {
  const navigate = useNavigate();
  const handlePayment = () => {
    navigate(`/payment/partner/${applicationId}`);
  };

  return (
    <div className="text-center space-y-4">
      <p className="text-green-400 font-semibold">
        ✅ Approved! Complete payment to become a partner.
      </p>

      <button onClick={handlePayment} className="btn-primary-gradient">
        Pay Now ($49.99)
      </button>
    </div>
  );
};

export default PaymentSection;
