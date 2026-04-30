import { useState } from 'react'

type Message = {
  id: number
  project: string
  pm: string
  pmInitials: string
  pmColor: string
  time: string
  preview: string
  body: string
  unread: boolean
  tag: 'Action Required' | 'Update' | 'Info'
  tagBg: string
  tagText: string
}

const messages: Message[] = [
  {
    id: 1,
    project: 'GLP-1s Side-Effects & Alternatives',
    pm: 'Abby Chen',
    pmInitials: 'AC',
    pmColor: '#1155a6',
    time: '9:41 AM',
    preview: 'Hi Matt, compliance is pending your e-signature...',
    body: 'Hi Matt, compliance is pending your e-signature before we can confirm the call. Please check your email for the DocuSign link — it should take less than 2 minutes. Let me know if you run into any issues!',
    unread: true,
    tag: 'Action Required',
    tagBg: '#fee2e2',
    tagText: '#dc2626',
  },
  {
    id: 2,
    project: 'Oncology Diagnostics Trends 2026',
    pm: 'Sarah Kim',
    pmInitials: 'SK',
    pmColor: '#059669',
    time: 'Yesterday',
    preview: "Your screener has been reviewed — great answers!",
    body: "Your screener has been reviewed — great answers! The client loved your background in diagnostics. We're now matching you with a call slot. Expected scheduling by end of week.",
    unread: true,
    tag: 'Update',
    tagBg: '#e7f1fc',
    tagText: '#1155a6',
  },
  {
    id: 3,
    project: 'Hologic P&L Software Platform',
    pm: 'James Park',
    pmInitials: 'JP',
    pmColor: '#7c3aed',
    time: 'Apr 11',
    preview: 'Payment of $450 has been submitted for processing.',
    body: 'Payment of $450 has been submitted for processing. You should see it in your account within 5–7 business days. Thank you for participating in this project — the client was very happy with the session!',
    unread: false,
    tag: 'Info',
    tagBg: '#f3f4f6',
    tagText: '#6b7280',
  },
  {
    id: 4,
    project: 'MedTech Regulatory Strategy 2025',
    pm: 'Abby Chen',
    pmInitials: 'AC',
    pmColor: '#1155a6',
    time: 'Apr 9',
    preview: 'Invitation sent — screener closes May 3rd.',
    body: "Invitation sent — screener closes May 3rd. This is a great fit for your FDA background. The client is looking for experts with 510(k) pathway experience. Let me know if you have questions!",
    unread: false,
    tag: 'Info',
    tagBg: '#f3f4f6',
    tagText: '#6b7280',
  },
]

export default function ProjectMessages() {
  const [expanded, setExpanded] = useState<number | null>(1)

  const unreadCount = messages.filter(m => m.unread).length

  return (
    <div className="bg-white border border-[#ebebea] shadow-[0_1px_6px_rgba(0,0,0,0.06)] rounded-2xl px-[21px] py-[19px] flex flex-col md:h-full md:overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm text-[#1a1d29]">Messages</p>
          {unreadCount > 0 && (
            <span className="bg-[#1155a6] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none shrink-0">
              {unreadCount}
            </span>
          )}
        </div>
        <span className="text-[11px] text-[#9ca3af]">from your PMs</span>
      </div>

      {/* Message list */}
      <div className="flex flex-col md:flex-1 md:overflow-y-auto md:min-h-0 divide-y divide-[#f4f5f7]">
        {messages.map(msg => {
          const isExpanded = expanded === msg.id
          return (
            <div key={msg.id} className="py-3 first:pt-0">
              <button
                className="w-full text-left flex items-start gap-3"
                onClick={() => setExpanded(isExpanded ? null : msg.id)}
              >
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                  style={{ backgroundColor: msg.pmColor }}
                >
                  {msg.pmInitials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-xs font-semibold truncate ${msg.unread ? 'text-[#1a1d29]' : 'text-[#6b7280]'}`}>
                      {msg.pm}
                    </span>
                    <span className="text-[10px] text-[#9ca3af] shrink-0">{msg.time}</span>
                  </div>
                  <p className="text-[10px] text-[#9ca3af] truncate mt-0.5">{msg.project}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {msg.unread && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1155a6] shrink-0" />
                    )}
                    <p className={`text-[11px] truncate ${msg.unread ? 'text-[#1a1d29] font-medium' : 'text-[#9ca3af]'}`}>
                      {msg.preview}
                    </p>
                  </div>
                </div>

                {/* Tag + chevron */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: msg.tagBg, color: msg.tagText }}
                  >
                    {msg.tag}
                  </span>
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    className={`text-[#9ca3af] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  >
                    <path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              {/* Expanded body */}
              {isExpanded && (
                <div className="mt-2 ml-11 flex flex-col gap-2">
                  <p className="text-[11px] text-[#4b5563] leading-relaxed">{msg.body}</p>
                  <div className="flex items-center gap-2">
                    <button className="bg-[#1a1d29] text-white rounded-xl px-3 py-1.5 text-[11px] font-semibold hover:bg-[#2a2e3c] transition-colors">
                      Reply
                    </button>
                    <button className="text-[11px] font-semibold text-[#1155a6]">
                      View Project
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <button className="text-sm font-semibold text-[#1a1d29] underline mt-3 text-left shrink-0">
        View All Messages
      </button>
    </div>
  )
}
