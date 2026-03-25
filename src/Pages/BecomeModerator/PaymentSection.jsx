const PaymentSection = () => {
  const handlePayment = () => {
    // Later integrate Stripe 
    console.log("Redirect to payment");
  };

  return (
    <div className="text-center space-y-4">
      <p className="text-green-400 font-semibold">
        ✅ Approved! Complete payment to become a partner.
      </p>

      <button
        onClick={handlePayment}
        className="w-full py-3 bg-gradient-to-r from-sky-600 to-indigo-700 text-white font-bold rounded-xl"
      >
        Pay Now ($49.99)
      </button>
    </div>
  );
};

export default PaymentSection;