const FaqSection = () => {
  const faqData = [
    {
      id: 1,
      question: "How does the CineTrade licensing system work for buyers?",
      answer:
        "When you purchase a film on CineTrade, you are granted a secure digital usage license rather than just a downloadable file. Each transaction is recorded within our system, ensuring verified ownership and seamless access to high-quality streaming and download options through your personal dashboard at any time.",
    },
    {
      id: 2,
      question: "What are the specific requirements to become a Moderator?",
      answer:
        "To apply, users must have a verified account and a strong transaction history. Applications are reviewed by our admin team, with a focus on users who demonstrate both analytical thinking and a solid understanding of digital marketplace dynamics.",
    },
    {
      id: 3,
      question: "Are my financial transactions and personal data encrypted?",
      answer:
        "Yes, all transactions and personal data are protected using industry-standard SSL encryption and secure authentication protocols. CineTrade does not store sensitive payment details such as full credit card information, ensuring your financial and personal data remains private and secure at all times.",
    },
    {
      id: 4,
      question: "Can I sell my own film content on the CineTrade marketplace?",
      answer:
        "Yes, CineTrade operates under an admin-managed ecosystem. Users who wish to sell content must first apply for Moderator access by paying a fixed platform fee. Once approved, moderators are granted permission to upload films, set pricing, and manage their listings. All sales are subject to a predefined revenue-sharing model, where a percentage of each transaction is allocated to the platform.",
    },
    {
      id: 5,
      question:
        "What happens if a digital asset I purchased is no longer available?",
      answer:
        "All content on CineTrade is centrally managed and monitored by the admin team. If a film is removed from the marketplace, users who have already purchased it will continue to have access through their personal library whenever possible. In cases where access cannot be maintained due to technical or licensing issues, the platform ensures fair resolution through compensation or refunds as per our policy.",
    },
  ];

  return (
    <section className="py-20 bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic">
            Frequently Asked{" "}
            <span className="text-sky-500 border-b-2 border-sky-500">
              Questions
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mt-4 leading-relaxed">
            Everything you need to know about the CineTrade ecosystem, from
            licensing to security.
          </p>
        </div>

        {/* DaisyUI Accordion Group */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="collapse collapse-arrow bg-[#0f0f0f] border border-gray-800 rounded-xl"
            >
              <input type="radio" name="faq-accordion" />

              <div className="collapse-title text-xl font-semibold py-5 px-6">
                {item.question}
              </div>

              <div className="collapse-content px-6">
                <p className="text-gray-300 leading-relaxed pb-5">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;