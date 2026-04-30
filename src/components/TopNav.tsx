const MONTHLY_EARNINGS = 1284.50
const EARNINGS_THRESHOLD = 500

export default function TopNav() {
  const showEarnings = MONTHLY_EARNINGS > EARNINGS_THRESHOLD

  return (
    <header className="bg-[#1b2530] h-12 flex items-center pr-3 shrink-0">
      {/* Hamburger */}
      <button className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full shrink-0 ml-1">
        <span className="block w-[18px] h-[1.5px] bg-white/80 rounded" />
        <span className="block w-[18px] h-[1.5px] bg-white/80 rounded" />
        <span className="block w-[18px] h-[1.5px] bg-white/80 rounded" />
      </button>

      {/* Logo */}
      <div className="flex flex-1 items-center px-6">
        <span className="text-white font-bold text-[17px] tracking-[-0.2px]">
          Guidepoint<span className="text-[#ffcd00]">.</span>
        </span>
      </div>

      {/* Earnings pill — shown when earnings > $500 */}
      {showEarnings && (
        <div className="hidden md:flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-3 py-1 mr-3">
          <span className="text-white/50 text-[11px] font-medium">Earnings this month</span>
          <span className="text-[#ffd23f] text-[12px] font-bold tracking-tight">
            ${MONTHLY_EARNINGS.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      )}

      {/* Bell */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2.5A5 5 0 0 0 5 7.5v3.75L3.75 13.75h12.5L15 11.25V7.5A5 5 0 0 0 10 2.5Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M8.25 13.75a1.75 1.75 0 0 0 3.5 0" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
        </svg>
      </button>

      {/* Help */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
          <path d="M7.5 7.5C7.5 6.12 8.62 5 10 5s2.5 1.12 2.5 2.5c0 1.5-2.5 2-2.5 3" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="10" cy="14" r="0.75" fill="rgba(255,255,255,0.6)"/>
        </svg>
      </button>

      {/* Avatar */}
      <button className="flex items-center justify-center px-1">
        <div className="w-7 h-7 rounded-full bg-[#e7f1fc] flex items-center justify-center text-[#1b2530] text-sm font-semibold">
          R
        </div>
      </button>
    </header>
  )
}
