import PaymentSection from "./PaymentSection";

const PartnerStatus = ({ application }) => {
  if (!application) return null;

  if (application?.status === "pending") {
    return <p className="text-yellow-400">⏳ Waiting for approval</p>;
  }

  if (
    application?.status === "approved" &&
    application?.paymentStatus === "unpaid"
  ) {
    return <PaymentSection />;
  }

  if (application?.status === "approved") {
    return (
      <p className="text-green-400 font-semibold">
        🎉 You are now a Partner!
      </p>
    );
  }

  if (application?.status === "rejected") {
    return <p className="text-red-400">❌ Application rejected</p>;
  }

  return null;
};

export default PartnerStatus;