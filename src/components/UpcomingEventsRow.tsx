type Event = {
  id: number
  timeLabel: string
  timeSub: string
  urgent: boolean
  title: string
  client: string
  type: string
  duration: string
  pm: string
  primaryAction: string
  primaryStyle: 'yellow' | 'outline'
  secondaryAction?: string
}

const events: Event[] = [
  { id: 1, timeLabel: 'Live in 3 min', timeSub: 'Today · 2:00 PM', urgent: true,  title: 'Hologic P&L Experience',      client: 'Hologic Inc.',     type: 'Phone', duration: '60 min', pm: 'James Park', primaryAction: 'Join',        primaryStyle: 'yellow', secondaryAction: 'Read Brief'  },
  { id: 2, timeLabel: 'In 2 hrs',      timeSub: 'Today · 4:00 PM', urgent: false, title: 'GLP-1s Side-effects Review',  client: 'Pharma Trends',    type: 'Video', duration: '45 min', pm: 'Abby Chen',  primaryAction: 'Read Brief',  primaryStyle: 'outline', secondaryAction: 'Contact PM' },
  { id: 3, timeLabel: 'Tomorrow',      timeSub: 'Apr 30 · 10 AM',  urgent: false, title: 'Oncology Diagnostics Trends', client: 'BioAnalytica',     type: 'Phone', duration: '60 min', pm: 'Sarah Kim',  primaryAction: 'Read Brief',  primaryStyle: 'outline' },
  { id: 4, timeLabel: 'Apr 30',        timeSub: 'Apr 30 · 2:00 PM',urgent: false, title: 'MedTech Regulatory Strategy', client: 'MedTech Advisors', type: 'Phone', duration: '45 min', pm: 'James Park', primaryAction: 'Read Brief',  primaryStyle: 'outline' },
  { id: 5, timeLabel: 'May 2',         timeSub: 'May 2 · 9:00 AM', urgent: false, title: 'APAC Logistics Software',     client: 'Sterling & Co.',   type: 'Video', duration: '60 min', pm: 'Mia Torres', primaryAction: 'Read Brief',  primaryStyle: 'outline' },
]

export default function UpcomingEventsRow() {
  return (
    <div className="bg-white border border-[#ebebea] shadow-[0_1px_6px_rgba(0,0,0,0.06)] rounded-2xl px-[21px] py-[14px]">

      {/* Desktop layout */}
      <div className="hidden md:block">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2.5">
          <p className="font-semibold text-sm text-[#1a1d29]">Upcoming Calls</p>
          <span className="bg-[#1a1d29] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none shrink-0">
            {events.length}
          </span>
        </div>

        {/* Scrollable calls list */}
        <div
          className="overflow-y-auto flex flex-col"
          style={{ height: '200px', scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb transparent' }}
        >
          {events.map((ev) => (
            <div
              key={ev.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors shrink-0 border ${
                ev.urgent
                  ? 'bg-[#fff4e8] border-[#fcd9a8]'
                  : 'border-transparent hover:bg-[#fafaf9]'
              }`}
            >
              {/* Time */}
              <div className="w-[90px] shrink-0">
                <div className="flex items-center gap-1.5">
                  {ev.urgent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] shrink-0 animate-pulse" />
                  )}
                  <p className={`text-xs font-bold leading-none ${ev.urgent ? 'text-[#c2410c]' : 'text-[#1a1d29]'}`}>
                    {ev.timeLabel}
                  </p>
                </div>
                <p className={`text-[10px] mt-0.5 ${ev.urgent ? 'text-[#f97316]/70' : 'text-[#9ca3af]'}`}>{ev.timeSub}</p>
              </div>

              {/* Divider */}
              <div className={`w-px self-stretch shrink-0 ${ev.urgent ? 'bg-[#fcd9a8]' : 'bg-[#f0f0ee]'}`} />

              {/* Title + meta */}
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold leading-tight truncate ${ev.urgent ? 'text-[#7c2d12]' : 'text-[#1a1d29]'}`}>
                  {ev.title}
                </p>
                <div className={`flex items-center gap-1 mt-0.5 text-[10px] flex-wrap ${ev.urgent ? 'text-[#c2410c]/60' : 'text-[#9ca3af]'}`}>
                  <span className="font-medium">{ev.client}</span>
                  <span className="opacity-30">·</span>
                  <span>{ev.type}</span>
                  <span className="opacity-30">·</span>
                  <span>{ev.duration}</span>
                  <span className="opacity-30">·</span>
                  <span>{ev.pm}</span>
                </div>
              </div>

              {/* Actions — fixed width column */}
              <div className="flex items-center justify-end gap-3 shrink-0 w-[200px]">
                {ev.secondaryAction && (
                  <button className="text-xs text-[#9ca3af] hover:text-[#1a1d29] transition-colors leading-none capitalize whitespace-nowrap">
                    {ev.secondaryAction}
                  </button>
                )}
                <button className={`text-xs font-semibold px-3 py-1.5 rounded-xl leading-none capitalize whitespace-nowrap transition-colors ${
                  ev.urgent
                    ? 'bg-[#1a1d29] text-white hover:bg-[#2a2e3c]'
                    : 'border border-[#e5e7eb] text-[#1a1d29] bg-white hover:border-[#1a1d29]'
                }`}>
                  {ev.primaryAction}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden">
        <div className="flex items-center gap-2 mb-3">
          <p className="font-semibold text-sm text-[#1a1d29]">Upcoming Calls</p>
          <span className="bg-[#1a1d29] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none shrink-0">
            {events.length}
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1">
          {events.map(ev => (
            <div
              key={ev.id}
              className={`shrink-0 w-[200px] rounded-xl p-3 flex flex-col gap-2 border ${
                ev.urgent ? 'border-[#1a1d29] bg-[#1a1d29]' : 'bg-white border-[#ebebea]'
              }`}
            >
              <div>
                <p className={`text-sm font-bold ${ev.urgent ? 'text-[#ffd23f]' : 'text-[#1a1d29]'}`}>{ev.timeLabel}</p>
                <p className={`text-[10px] mt-0.5 ${ev.urgent ? 'text-white/50' : 'text-[#9ca3af]'}`}>{ev.timeSub}</p>
              </div>
              <div className="flex-1">
                <p className={`text-xs font-semibold ${ev.urgent ? 'text-white' : 'text-[#1a1d29]'}`}>{ev.title}</p>
                <p className={`text-[10px] mt-0.5 ${ev.urgent ? 'text-white/50' : 'text-[#9ca3af]'}`}>{ev.client}</p>
              </div>
              <div className="flex gap-1.5">
                {ev.primaryStyle === 'yellow'
                  ? <button className="bg-[#ffd23f] text-[#1a1d29] text-xs font-semibold px-3 py-1.5 rounded-xl leading-none">{ev.primaryAction}</button>
                  : <button className="border border-[#e5e7eb] bg-white text-[#1a1d29] text-xs font-semibold px-3 py-1.5 rounded-xl leading-none">{ev.primaryAction}</button>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
