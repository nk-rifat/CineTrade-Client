const StatCard = ({ title, value, icon, color, detail }) => (
  <div className="relative group p-[1px] rounded-3xl overflow-hidden transition-all hover:scale-[1.03]">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-30`}
    ></div>
    <div className="relative bg-[#0f1115] p-6 rounded-[23px] h-full border border-white/5">
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl mb-4 shadow-lg`}
      >
        {icon}
      </div>
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
        {title}
      </p>
      <h3 className="text-2xl font-black mt-1">{value}</h3>
      {detail && (
        <p className="text-[9px] mt-2 text-slate-400 bg-white/5 px-2 py-1 rounded-md inline-block">
          {detail}
        </p>
      )}
    </div>
  </div>
);

export default StatCard;
