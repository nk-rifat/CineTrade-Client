const TermsBox = () => {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-[#111217] p-5">
      <p className="font-semibold text-amber-500 mb-3 uppercase">
        Distribution & Partner Agreement
      </p>

      <ul className="text-gray-300 space-y-2 text-sm">
        <li>1. One-time non-refundable fee of $49.99</li>
        <li>2. You must own rights to uploaded content</li>
        <li>3. Earn 80% revenue share</li>
        <li>4. Content reviewed before publishing</li>
        <li>5. Violations may lead to suspension</li>
      </ul>
    </div>
  );
};

export default TermsBox;
