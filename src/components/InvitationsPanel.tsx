import { useState } from 'react'

type Invitation = {
  id: number
  urgency: 'urgent' | 'high' | 'normal'
  expiresLabel: string
  title: string
  screenerMins: string
  totalQs: number
  pm: string
  expires: string
  topics: string[]
}

const invitations: Invitation[] = [
  {
    id: 1,
    urgency: 'urgent',
    expiresLabel: 'Expires Today',
    title: 'GLP-1s Side-effects & Alternatives',
    screenerMins: '3-5 mins',
    totalQs: 15,
    pm: 'Abby Chen',
    expires: '4/28',
    topics: ['Managing GLP-1 side effects', 'Treatment options for patients'],
  },
  {
    id: 2,
    urgency: 'high',
    expiresLabel: 'Expires in 24 hrs',
    title: 'Oncology Diagnostics Trends 2026',
    screenerMins: '3-5 mins',
    totalQs: 12,
    pm: 'Abby Chen',
    expires: '4/29',
    topics: ['Diagnostic innovation pipeline', 'Reimbursement landscape'],
  },
  {
    id: 3,
    urgency: 'normal',
    expiresLabel: '3 days left',
    title: 'Hologic P&L Software Platform',
    screenerMins: '5-7 mins',
    totalQs: 18,
    pm: 'Sarah Kim',
    expires: '5/1',
    topics: ['Clinical workflow integration', 'Software adoption challenges'],
  },
  {
    id: 4,
    urgency: 'normal',
    expiresLabel: '5 days left',
    title: 'MedTech Regulatory Strategy 2025',
    screenerMins: '3-5 mins',
    totalQs: 10,
    pm: 'James Park',
    expires: '5/3',
    topics: ['510(k) pathway updates', 'FDA engagement strategy'],
  },
]

const urgencyConfig = {
  urgent: { dot: '#ef4444', badge: '#fee2e2', badgeText: '#dc2626', label: 'Urgent' },
  high:   { dot: '#f97316', badge: '#ffedd5', badgeText: '#c2410c', label: 'High' },
  normal: { dot: '#3b82f6', badge: '#eff6ff', badgeText: '#1d4ed8', label: 'Open' },
}

export default function InvitationsPanel() {
  const [expanded, setExpanded] = useState<number | null>(1)
  const [dismissed, setDismissed] = useState<number[]>([])

  const visible = invitations.filter(i => !dismissed.includes(i.id))

  return (
    <div className="bg-white border border-[#ececea] rounded-2xl px-[21px] py-[19px] flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm text-[#1a1d29]">New Invitations</p>
          <span className="bg-[#ffcd00] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none shrink-0">
            {visible.length}
          </span>
        </div>
        <span className="text-[11px] text-[#9ca3af]">sorted by urgency</span>
      </div>

      {/* List */}
      <div className="flex flex-col flex-1 overflow-y-auto gap-0 divide-y divide-[#f4f5f7]">
        {visible.map(inv => {
          const cfg = urgencyConfig[inv.urgency]
          const isExpanded = expanded === inv.id

          return (
            <div key={inv.id} className="py-3 first:pt-0">
              {/* Row summary */}
              <button
                className="w-full text-left flex items-start gap-3"
                onClick={() => setExpanded(isExpanded ? null : inv.id)}
              >
                {/* Urgency dot */}
                <span
                  className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                  style={{ backgroundColor: cfg.dot }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-[#1a1d29] leading-tight">{inv.title}</span>
                    <span
                      className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: cfg.badge, color: cfg.badgeText }}
                    >
                      {inv.expiresLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-[10px] text-[#9ca3af]">⏱ {inv.screenerMins}</span>
                    <span className="text-[10px] text-[#9ca3af]">❓ {inv.totalQs} Qs</span>
                    <span className="text-[10px] text-[#9ca3af]">👤 {inv.pm}</span>
                    <span className="text-[10px] text-[#9ca3af]">📅 {inv.expires}</span>
                  </div>
                </div>
                {/* Chevron */}
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className={`shrink-0 mt-1 transition-transform text-[#9ca3af] ${isExpanded ? 'rotate-180' : ''}`}
                >
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="mt-2 ml-5 flex flex-col gap-2">
                  {/* Topics */}
                  <ul className="flex flex-col gap-1">
                    {inv.topics.map((t, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-[#4b5563]">
                        <span className="text-[#9ca3af] mt-0.5">•</span>
                        {t}
                      </li>
                    ))}
                  </ul>

                  {/* Details strip */}
                  <div className="grid grid-cols-4 gap-1 bg-[#f9fafb] rounded-lg px-2 py-1.5">
                    {[
                      { label: 'Expires', val: inv.expires },
                      { label: 'Screener', val: inv.screenerMins },
                      { label: "Q's", val: String(inv.totalQs) },
                      { label: 'PM', val: inv.pm },
                    ].map(d => (
                      <div key={d.label}>
                        <p className="text-[9px] font-semibold text-[#9ca3af] uppercase tracking-wide">{d.label}</p>
                        <p className="text-[10px] font-semibold text-[#1a1d29] truncate">{d.val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDismissed(p => [...p, inv.id])}
                      className="w-8 h-8 rounded-lg border border-[#e5e7eb] flex items-center justify-center text-[#9ca3af] hover:border-red-300 hover:text-red-400 transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setDismissed(p => [...p, inv.id])}
                      className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center text-white hover:bg-[#047857] transition-colors"
                    >
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="text-[11px] font-semibold text-[#1155a6] underline ml-1">
                      Review Questions
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {visible.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-[#9ca3af]">All invitations handled</p>
          </div>
        )}
      </div>

      <button className="text-sm font-semibold text-[#1a1d29] underline mt-3 text-left shrink-0">
        View All Invitations
      </button>
    </div>
  )
}
