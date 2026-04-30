type Engagement = { label: string; count: number }

type Stat = {
  label: string
  value?: string
  sub?: string
  subLabel?: string
  valueColor?: string
  subBg?: string
  subTextColor?: string
  engagements?: Engagement[]
  wide?: boolean
}

const stats: Stat[] = [
  {
    label: 'Engagements (30d)',
    wide: true,
    engagements: [
      { label: 'Consultations', count: 12 },
      { label: 'Surveys',       count: 4  },
      { label: 'Quick Polls',   count: 2  },
    ],
  },
  {
    label: 'Acceptance Rate',
    value: '71%',
    sub: 'GLP-1 & Weight Loss',
    subLabel: 'Top Topic',
    valueColor: '#1a1d29',
    subBg: '#f3f4f6',
    subTextColor: '#6b7280',
  },
  {
    label: 'Avg Response Time',
    value: '1.8 hrs',
    sub: '↘ Faster than avg',
    valueColor: '#1a1d29',
    subBg: '#f3f4f6',
    subTextColor: '#6b7280',
  },
]

export default function WelcomeRow() {
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const dayStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="flex flex-col gap-3 md:grid md:grid-cols-[1fr_auto] md:gap-4 md:items-stretch md:min-h-[100px]">
      {/* Greeting */}
      <div
        className="rounded-2xl px-5 py-4 md:px-6 md:py-5 flex flex-col justify-between gap-2"
        style={{ background: 'linear-gradient(139.61deg, #1a1d29 0%, #2a2e3c 100%)' }}
      >
        <p className="text-white/50 text-xs font-medium">{dayStr}</p>
        <div>
          <h2 className="text-white font-bold text-xl md:text-2xl leading-tight">
            {greeting}, <span className="text-[#ffd23f]">Matt</span> 👋
          </h2>
          <p className="text-white/60 text-sm mt-1">
            <span className="text-white font-semibold">$900</span> in pending payments · <span className="text-white font-semibold">12 consultations</span> completed this month — <span className="text-[#ffd23f] font-semibold">4 invitations</span> need your response.
          </p>
        </div>
      </div>

      {/* Stat cards — 2-col mobile, 4-col desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`rounded-2xl px-4 py-4 flex flex-col justify-between border border-[#ebebea] shadow-[0_1px_6px_rgba(0,0,0,0.06)] bg-white ${s.wide ? 'col-span-2' : 'md:min-w-[140px]'}`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af]">
              {s.label}
            </p>

            {s.engagements ? (
              /* Engagements breakdown — compact row list */
              <div className="flex flex-col gap-1.5 mt-3">
                {s.engagements.map(e => (
                  <div key={e.label} className="flex items-center justify-between">
                    <span className="text-[10px] text-[#9ca3af] font-medium">{e.label}</span>
                    <span className="text-[13px] font-bold text-[#1a1d29]">{e.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-2xl font-bold leading-tight" style={{ color: s.valueColor }}>
                  {s.value}
                </p>
                <div className="mt-1">
                  {s.subLabel && (
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[#9ca3af] mb-0.5">{s.subLabel}</p>
                  )}
                  <span
                    className="inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: s.subBg, color: s.subTextColor }}
                  >
                    {s.sub}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
