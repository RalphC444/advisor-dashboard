// Mobile nav reuses the same dark Guidepoint bar
export default function MobileNav() {
  return (
    <header className="bg-[#1b2530] h-12 flex items-center justify-between px-3 shrink-0">
      {/* Hamburger */}
      <button className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full">
        <span className="block w-4 h-[1.5px] bg-white/80 rounded" />
        <span className="block w-4 h-[1.5px] bg-white/80 rounded" />
        <span className="block w-4 h-[1.5px] bg-white/80 rounded" />
      </button>

      {/* Logo */}
      <div className="flex-1 flex justify-center">
        <span className="text-white font-bold text-[17px] tracking-[-0.2px]">
          Guidepoint<span className="text-[#ffcd00]">.</span>
        </span>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-1">
        {/* Bell with notification */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2a6 6 0 0 0-6 6v3l-1.5 2.5h15L16 11V8a6 6 0 0 0-6-6Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M8.5 16.5a1.5 1.5 0 0 0 3 0" stroke="white" strokeWidth="1.5"/>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#ffcd00] rounded-full text-[9px] font-bold text-black flex items-center justify-center leading-none">1</span>
        </button>
        {/* Avatar */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full">
          <div className="w-7 h-7 rounded-full bg-[#e7f1fc] flex items-center justify-center text-[#1b2530] text-xs font-semibold">R</div>
        </button>
      </div>
    </header>
  )
}
