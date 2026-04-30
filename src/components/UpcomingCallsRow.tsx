const starIcon = "https://www.figma.com/api/mcp/asset/40f5634d-f383-417c-a515-7df56f37a53c";
const trendUpIcon = "https://www.figma.com/api/mcp/asset/4e757695-16a3-44f6-b179-d60646e0a0f2";

export default function UpcomingCallsRow({ mobile }: { mobile?: boolean }) {
  const wrapClass = mobile
    ? "flex gap-3 w-max"
    : "grid grid-cols-4 gap-4 min-h-[158px]"
  const cardClass = mobile ? "w-[260px] shrink-0" : ""

  return (
    <div className={wrapClass}>
      {/* Live in 3 min */}
      <div
        className={`${cardClass} rounded-2xl p-4 flex flex-col justify-between`}
        style={{ background: 'linear-gradient(139.61deg, #1a1d29 0%, #2a2e3c 100%)' }}
      >
        <div>
          <p className="font-bold text-2xl leading-[38px] text-[#ffd23f]">Live in 3 min</p>
          <div className="mt-1">
            <p className="font-semibold text-sm text-white leading-[22px]">Hologic P&L Experience</p>
            <p className="text-xs text-white/50 leading-5">2:00 PM · Phone · 60 min</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-[#ffcd00] text-[#332900] text-[11px] font-semibold px-2 py-1.5 rounded-md leading-none">Join</button>
          <button className="border border-white text-white text-[11px] font-semibold px-2 py-1.5 rounded-md leading-none">Read Brief</button>
          <button className="text-white text-[11px] font-semibold leading-none">Contact PM</button>
        </div>
      </div>

      {/* In 2 hrs */}
      <div className={`${cardClass} rounded-2xl p-4 bg-white border border-[#ececea] flex flex-col justify-between`}>
        <div>
          <p className="font-bold text-2xl leading-[38px] text-[#242735]">In 2 hrs</p>
          <div className="mt-1">
            <p className="font-semibold text-sm text-black leading-[22px]">Hologic P&L Experience</p>
            <p className="text-xs text-black/50 leading-5">2:00 PM · Phone · 60 min</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-black text-black text-[11px] font-semibold px-2 py-1.5 rounded-md leading-none">Read Brief</button>
          <button className="text-black text-[11px] font-semibold leading-none">Contact PM</button>
        </div>
      </div>

      {/* PM Ratings */}
      <div className={`${cardClass} rounded-2xl p-4 bg-white border border-[#ececea] flex flex-col justify-between`}>
        <p className="font-semibold text-sm text-[#6b7280] leading-[22px]">PM Ratings</p>
        <div className="flex items-baseline gap-1.5">
          <div className="flex items-center gap-1">
            <img src={starIcon} alt="star" className="w-6 h-6" />
            <span className="font-semibold text-2xl text-[#ee8051] leading-[38px]">4.1/5</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={trendUpIcon} alt="trend" className="w-2.5 h-2.5" />
            <span className="font-semibold text-xs text-[#009e52]">+0.1</span>
          </div>
        </div>
        <div className="border-t border-[#f4f5f7] pt-2.5 grid grid-cols-2 gap-2">
          <div>
            <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wide">Acceptance</p>
            <p className="text-xs font-bold text-[#1a1d29] mt-0.5">87%</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wide">Avg. Reply Time</p>
            <p className="text-xs font-bold text-[#1a1d29] mt-0.5">1.4h</p>
          </div>
        </div>
      </div>

      {/* Profile Demand */}
      <div className={`${cardClass} rounded-2xl p-4 bg-white border border-[#ececea] flex flex-col justify-between`}>
        <p className="font-semibold text-sm text-[#6b7280] leading-[22px]">Profile demand · 7d</p>
        <div className="flex items-baseline gap-1.5">
          <span className="font-semibold text-2xl text-[#1a1d29] leading-[38px]">12</span>
          <div className="flex items-center gap-1">
            <img src={trendUpIcon} alt="trend" className="w-2.5 h-2.5" />
            <span className="font-semibold text-xs text-[#009e52]">+3 Views</span>
          </div>
        </div>
        <div className="border-t border-[#f4f5f7] pt-2.5 grid grid-cols-2 gap-2">
          <div>
            <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wide">Searches</p>
            <p className="text-xs font-bold text-[#1a1d29] mt-0.5">28</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wide">Shortlists</p>
            <p className="text-xs font-bold text-[#1a1d29] mt-0.5">2</p>
          </div>
        </div>
      </div>
    </div>
  )
}
