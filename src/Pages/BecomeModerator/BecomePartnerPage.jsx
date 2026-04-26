import BecomePartner from "./BecomePartner";

const BecomePartnerPage = () => {
  return (
    <div className="w-full min-h-screen bg-linear-to-br from-black via-slate-900 to-black py-6 px-4 sm:py-10 sm:px-6 flex items-center justify-center">
      <div className="max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
        {/* Left Side: Marketing Info */}

        <div className="w-full lg:w-[40%] bg-slate-950 p-8 sm:p-12 text-white flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 relative">
          <div className="mb-6 sm:mb-8">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-amber-500 font-bold bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
              Content Partner
            </span>
            <h2 className="text-4xl sm:text-5xl font-black mt-6 italic tracking-tighter text-white leading-tight">
              CineTrade <span className="text-amber-500">PRO</span>
            </h2>
          </div>

          <p className="text-gray-400 mb-8 sm:mb-10 text-sm sm:text-base leading-relaxed">
            Join the elite network of content partners. Upload your cinema
            projects, pass professional review, and earn 80% on every sale.
          </p>

          <ul className="space-y-6 sm:space-y-8">
            <li className="flex items-start gap-4">
              <span className="text-amber-500 text-xl mt-1 shrink-0">✓</span>
              <div>
                <span className="block font-bold text-white text-md sm:text-lg tracking-tight">
                  Revenue Sharing
                </span>
                <span className="text-xs sm:text-sm text-gray-400 mt-1 block leading-snug">
                  Earn 80% profit share on every verified purchase of your
                  films.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="text-amber-500 text-xl mt-1 shrink-0">✓</span>
              <div>
                <span className="block font-bold text-white text-md sm:text-lg tracking-tight">
                  Global Publishing
                </span>
                <span className="text-xs sm:text-sm text-gray-400 mt-1 block leading-snug">
                  Distribute your content to a worldwide audience of cinema
                  fans.
                </span>
              </div>
            </li>
          </ul>

          <div className="mt-10 sm:mt-14 p-5 sm:p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-inner">
            <p className="text-[9px] sm:text-[10px] uppercase text-amber-500 font-bold mb-1 tracking-widest">
              Partner Onboarding Fee
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-light text-white">
                $49.99
              </span>
              <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-tighter">
                One-time payment
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: The Form Integration */}
        <div className="w-full lg:w-[60%] p-8 sm:p-12 bg-transparent">
          <h3 className="text-xl sm:text-2xl font-bold text-amber-500  mb-6">
            Partner Application
          </h3>
          <div className="w-full">
            <BecomePartner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomePartnerPage;
