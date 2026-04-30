function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 6.5L8 2l6 4.5V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6.5Z" stroke="#ffcd00" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M5.5 15v-5h5v5" stroke="#ffcd00" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1.5 4.5A1 1 0 0 1 2.5 3.5h3.25L7 5.5h7a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1V4.5Z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  )
}

function CompletedFolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1.5 4.5A1 1 0 0 1 2.5 3.5h3.25L7 5.5h7a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1V4.5Z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M5 10l2 2 4-4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.3"/>
      <path d="M1.5 6.5h13" stroke="rgba(255,255,255,0.6)" strokeWidth="1.3"/>
      <path d="M4 10.5h3" stroke="rgba(255,255,255,0.6)" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

export default function Sidebar() {
  return (
    <aside className="w-[216px] h-full bg-[#1b2530] flex flex-col shrink-0 px-2 py-3">
      {/* Home */}
      <div className="flex items-center gap-2 px-2 py-2 rounded-lg w-full">
        <div className="flex flex-1 items-center gap-3 min-w-0">
          <HomeIcon />
          <span className="text-[#ffcd00] text-xs leading-5 font-normal">Home</span>
        </div>
        <div className="bg-[#ffcd00] flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full shrink-0">
          <span className="text-black text-xs font-medium leading-none">3</span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10 my-1" />

      {/* Projects header */}
      <div className="px-2 py-1 mt-1">
        <span className="text-white text-base font-semibold leading-[26px]">Projects</span>
      </div>

      {/* Active Projects */}
      <button className="flex items-center gap-3 px-2 py-2 rounded-lg w-full hover:bg-white/5 transition-colors text-left">
        <FolderIcon />
        <span className="text-white text-xs leading-5 font-normal">Active Projects</span>
      </button>

      {/* Completed Projects */}
      <button className="flex items-center gap-3 px-2 py-2 rounded-lg w-full hover:bg-white/5 transition-colors text-left">
        <CompletedFolderIcon />
        <span className="text-white text-xs leading-5 font-normal">Completed Projects</span>
      </button>

      {/* Past Payments */}
      <button className="flex items-center gap-3 px-2 py-2 rounded-lg w-full hover:bg-white/5 transition-colors text-left">
        <CardIcon />
        <span className="text-white text-xs leading-5 font-normal">Past Payments</span>
      </button>
    </aside>
  )
}
