import { useState, useEffect } from 'react'

// ─── TYPES ───────────────────────────────────────────────────────────────────

type CriticalItem = {
  rank: number
  rankBg: string; rankText: string
  title: string
  badge?: { text: string; bgColor: string; textColor: string }
  status: string; statusColor: string
  type: string; duration: string; pm: string
  primaryAction: string; secondaryAction: string
  dimActions?: boolean
}

type ProjectUpdate = {
  id: number
  title: string
  client: string
  pm: string
  status: 'Selected' | 'In Screener' | 'Compliance' | 'Scheduled' | 'Complete'
  statusColor: string; statusBg: string
  progress: number
  fee: string
  callDate?: string
  lastUpdate: string
  lastUpdateColor: string
}

type ScreenerQuestion = {
  id: number
  text: string
  type: 'single' | 'multi' | 'text'
  options?: string[]
}

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
  company: string
  projectType: string
  rateCap: string
  questions: ScreenerQuestion[]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const criticalItems: CriticalItem[] = [
  // ── Project-stage tasks ──
  { rank: 1, rankBg: '#fccad0', rankText: '#c21b2f', title: 'Complete Screener – GLP-1s Side-effects',          badge: { text: 'Client awaiting your screener', bgColor: '#fccad0', textColor: '#c21b2f' }, status: 'Action Required', statusColor: '#c21b2f', type: 'Screener',    duration: '3-5 mins', pm: 'Abby Chen',        primaryAction: 'Start Screener',     secondaryAction: 'View Project'      },
  { rank: 2, rankBg: '#ffe8cc', rankText: '#cc680b', title: 'Complete Compliance Screener – Oncology Dx',        badge: { text: 'Required before call',          bgColor: '#ffe8cc', textColor: '#cc680b' }, status: 'Action Required', statusColor: '#cc680b', type: 'Compliance',  duration: '5-7 mins', pm: 'Sarah Kim',        primaryAction: 'Complete Now',       secondaryAction: 'Contact PM'        },
  { rank: 3, rankBg: '#e7f1fc', rankText: '#1155a6', title: 'Review Conflict of Interest & Send Availability',   badge: { text: 'Call scheduled Apr 30',         bgColor: '#e7f1fc', textColor: '#1155a6' }, status: 'Action Required', statusColor: '#1155a6', type: 'Pre-Call',    duration: '5 mins',   pm: 'Abby Chen',        primaryAction: 'Review Conflict',    secondaryAction: 'Send Availability' },
  { rank: 4, rankBg: '#d1fae5', rankText: '#059669', title: 'Submit Invoice – Hologic P&L ($450)',               badge: { text: 'Call completed Apr 11',         bgColor: '#d1fae5', textColor: '#059669' }, status: 'Pending',         statusColor: '#059669', type: 'Invoice',     duration: '2 mins',   pm: 'Finance Team',     primaryAction: 'Submit Invoice',     secondaryAction: 'View Details'      },
  // ── Compliance & admin tasks ──
  { rank: 5, rankBg: '#fccad0', rankText: '#c21b2f', title: 'Company Relationship Disclosure',                   badge: { text: 'Expires in 4 hrs',              bgColor: '#fccad0', textColor: '#c21b2f' }, status: 'Action Required', statusColor: '#c21b2f', type: 'Compliance',  duration: '5 mins',   pm: 'Compliance Team',  primaryAction: 'Complete',           secondaryAction: 'Learn More'        },
  { rank: 6, rankBg: '#ffe8cc', rankText: '#cc680b', title: 'Annual Compliance Tutorial',                         badge: { text: 'Due in 3 days',                 bgColor: '#ffe8cc', textColor: '#cc680b' }, status: 'Action Required', statusColor: '#cc680b', type: 'Training',    duration: '30 mins',  pm: 'Compliance Team',  primaryAction: 'Start',              secondaryAction: 'Learn More'        },
  { rank: 7, rankBg: '#fccad0', rankText: '#c21b2f', title: 'Identity Verification Pending',                     badge: { text: 'Expires in 24 hrs',             bgColor: '#fccad0', textColor: '#c21b2f' }, status: 'Action Required', statusColor: '#c21b2f', type: 'Verification', duration: '8 mins',  pm: 'Trust & Safety',   primaryAction: 'Verify',             secondaryAction: 'Learn More'        },
  { rank: 8, rankBg: '#f3f4f6', rankText: '#9ca3af', title: 'Download & Submit Tax Form (W-9)',                   badge: { text: 'Required for payment',          bgColor: '#fef3c7', textColor: '#d97706' }, status: 'Action Required', statusColor: '#d97706', type: 'Tax',         duration: '10 mins',  pm: 'Finance Team',     primaryAction: 'Download',           secondaryAction: 'Learn More'        },
]

const projectUpdates: ProjectUpdate[] = [
  { id: 1, title: 'GLP-1s Side-Effects & Alternative Care', client: 'Pharma Trends',    pm: 'Abby Chen',  status: 'Selected',    statusColor: '#059669', statusBg: '#d1fae5', progress: 20,  fee: '$450', callDate: 'Apr 30 · 2:00 PM', lastUpdate: 'Selected Apr 26',        lastUpdateColor: '#059669' },
  { id: 2, title: 'Oncology Diagnostics Trends 2026',       client: 'BioAnalytica',     pm: 'Sarah Kim',  status: 'In Screener', statusColor: '#cc680b', statusBg: '#ffedd5', progress: 40,  fee: '$600',                   lastUpdate: 'Screener in progress',   lastUpdateColor: '#cc680b' },
  { id: 3, title: 'APAC Logistics Software',                client: 'Sterling & Co.',   pm: 'Mia Torres', status: 'Scheduled',   statusColor: '#1155a6', statusBg: '#e7f1fc', progress: 75,  fee: '$500', callDate: 'May 2 · 9:00 AM',  lastUpdate: 'Call confirmed Apr 28',  lastUpdateColor: '#1155a6' },
  { id: 4, title: 'Hologic P&L Software Platform',          client: 'Hologic Inc.',     pm: 'James Park', status: 'Complete',    statusColor: '#6b7280', statusBg: '#f3f4f6', progress: 100, fee: '$450', callDate: 'Apr 11 · 3:00 PM', lastUpdate: 'Call completed Apr 11',  lastUpdateColor: '#6b7280' },
]

const invitations: Invitation[] = [
  {
    id: 1, urgency: 'urgent', expiresLabel: 'Urgent · Expires Today', title: 'GLP-1s Side-effects & Alternatives',
    screenerMins: '3-5 mins', totalQs: 4, pm: 'Abby Chen', expires: '4/28', company: 'Pharma Trends',
    projectType: 'Consultation', rateCap: '450 USD',
    topics: ['Looking for doctors with extensive expertise managing common side effects from GLP-1 medications, including nausea, pancreatitis risk, and muscle loss.', 'A solid grasp of treatment alternatives for patients reconsidering GLP-1s.'],
    questions: [
      { id: 1, text: 'How many years have you prescribed or managed GLP-1 medications?', type: 'single', options: ['< 1 year', '1–3 years', '3–5 years', '5+ years'] },
      { id: 2, text: 'Which GLP-1 medications have you prescribed most frequently?', type: 'multi', options: ['Ozempic / Semaglutide', 'Wegovy', 'Mounjaro / Tirzepatide', 'Victoza / Liraglutide', 'Trulicity'] },
      { id: 3, text: 'How often do you manage patients experiencing significant GLP-1 side effects?', type: 'single', options: ['Very frequently', 'Frequently', 'Occasionally', 'Rarely'] },
      { id: 4, text: 'Are you comfortable discussing evidence-based alternatives to GLP-1s?', type: 'single', options: ['Yes, in depth', 'Somewhat comfortable', 'Not my primary focus'] },
    ],
  },
  {
    id: 2, urgency: 'high', expiresLabel: 'Expires in 24 hrs', title: 'Oncology Diagnostics Trends 2026',
    screenerMins: '3-5 mins', totalQs: 3, pm: 'Abby Chen', expires: '4/29', company: 'BioAnalytica',
    projectType: 'Consultation', rateCap: '600 USD',
    topics: ['Deep expertise in the oncology diagnostic innovation pipeline, particularly liquid biopsy and AI-driven pathology.', 'Understanding of reimbursement challenges and payer dynamics in 2025–2026.'],
    questions: [
      { id: 1, text: 'What is your primary oncology specialty?', type: 'single', options: ['Breast', 'Lung / Thoracic', 'GI / Colorectal', 'Hematologic', 'Multi-specialty'] },
      { id: 2, text: 'Have you evaluated or adopted AI-powered diagnostic tools in your practice?', type: 'single', options: ['Yes, actively use them', 'Evaluated but not adopted', 'Planning to evaluate', 'No'] },
      { id: 3, text: 'How familiar are you with liquid biopsy and ctDNA technologies?', type: 'single', options: ['Expert — use regularly', 'Familiar with the technology', 'Some knowledge', 'Limited knowledge'] },
    ],
  },
  {
    id: 3, urgency: 'normal', expiresLabel: '3 days left', title: 'Hologic P&L Software Platform',
    screenerMins: '5-7 mins', totalQs: 3, pm: 'Sarah Kim', expires: '5/1', company: 'Hologic Inc.',
    projectType: 'Consultation', rateCap: '500 USD',
    topics: ['Clinical workflow integration experience with diagnostic or surgical software platforms.', 'Familiarity with hospital software adoption challenges and procurement cycles.'],
    questions: [
      { id: 1, text: 'What best describes your experience with diagnostic or surgical software?', type: 'single', options: ['Daily user — core workflow', 'Regular user', 'Occasional user', 'Limited experience'] },
      { id: 2, text: 'Have you been involved in hospital software adoption or procurement decisions?', type: 'single', options: ['Yes, led a project', 'Yes, contributed', 'No, but familiar with the process', 'No involvement'] },
      { id: 3, text: 'Briefly describe your clinical use of Hologic products, if any.', type: 'text' },
    ],
  },
  {
    id: 4, urgency: 'normal', expiresLabel: '5 days left', title: 'MedTech Regulatory Strategy 2025',
    screenerMins: '3-5 mins', totalQs: 3, pm: 'James Park', expires: '5/3', company: 'MedTech Advisors',
    projectType: 'Consultation', rateCap: '550 USD',
    topics: ['First-hand knowledge of 510(k) pathway updates and FDA engagement strategy for novel devices.', 'Perspectives on shifting regulatory timelines and pre-submission meeting best practices.'],
    questions: [
      { id: 1, text: 'What is your experience with the FDA 510(k) submission process?', type: 'single', options: ['Led multiple submissions', 'Contributed to submissions', 'Familiar with the process', 'Limited knowledge'] },
      { id: 2, text: 'Have you attended FDA pre-submission meetings?', type: 'single', options: ['Yes, multiple times', 'Yes, once', 'No, but familiar', 'No'] },
      { id: 3, text: 'What best describes your regulatory strategy role?', type: 'single', options: ['Principal investigator', 'Regulatory advisor / consultant', 'Clinical evaluator', 'Industry / manufacturer side'] },
    ],
  },
]

const urgencyCfg = {
  urgent: { dot: '#ef4444', badge: '#fee2e2', badgeText: '#dc2626' },
  high:   { dot: '#f97316', badge: '#ffedd5', badgeText: '#c2410c' },
  normal: { dot: '#3b82f6', badge: '#eff6ff', badgeText: '#1d4ed8' },
}

// Mirrors the Figma funnel: Invitation → Accepted → Selection → Scheduled → Complete
const stageLabels = ['Invited', 'Accepted', 'Selection', 'Scheduled', 'Complete']
function stageIdx(s: ProjectUpdate['status']) {
  // 'In Screener' & 'Compliance' are sub-steps inside the Accepted stage
  // 'Selected' means PM has chosen the advisor → now in Selection stage
  return { 'In Screener': 1, 'Compliance': 1, 'Selected': 2, 'Scheduled': 3, 'Complete': 4 }[s] ?? 0
}

// ─── CRITICAL ITEMS TAB ───────────────────────────────────────────────────────

function CriticalTab() {
  return (
    <div className="flex flex-col">
      {criticalItems.map(item => (
        <div key={item.rank} className="border-b border-[#f0f0ee] last:border-0 py-3 flex flex-col md:flex-row md:items-center md:justify-between md:gap-4 gap-2">
          <div className="flex items-start gap-3">
            {/* Neutral rank number */}
            <div className="w-[24px] h-[24px] rounded-full bg-[#f3f4f6] flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 text-[#6b7280]">
              {item.rank}
            </div>
            <div className="flex-1 min-w-0">
              {/* Title + badge text (no pill) */}
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-semibold text-sm text-[#1a1d29]">{item.title}</span>
                {item.badge && (
                  <span className="text-[10px] text-[#9ca3af]">{item.badge.text}</span>
                )}
              </div>
              {/* Meta */}
              <div className="flex items-center gap-1 mt-0.5 text-[11px] text-[#9ca3af]">
                <span>{item.type}</span><span>·</span><span>{item.duration}</span><span>·</span><span>{item.pm}</span>
              </div>
              {/* Mobile actions */}
              <div className="flex items-center gap-3 mt-2 md:hidden">
                <button className={`text-xs font-semibold px-3 py-1.5 rounded-xl capitalize transition-colors ${item.rank === 1 ? 'bg-[#1a1d29] text-white hover:bg-[#2a2e3c]' : 'border border-[#e5e7eb] text-[#1a1d29] bg-white hover:border-[#1a1d29]'}`}>{item.primaryAction}</button>
                <button className="text-xs text-[#9ca3af] hover:text-[#1a1d29] transition-colors">{item.secondaryAction}</button>
              </div>
            </div>
          </div>
          {/* Desktop actions — fixed width column */}
          <div className="hidden md:flex items-center justify-end gap-4 w-[220px] shrink-0">
            <button className="text-xs text-[#9ca3af] hover:text-[#1a1d29] transition-colors whitespace-nowrap">{item.secondaryAction}</button>
            <button className={`text-xs font-semibold px-3 py-1.5 rounded-xl capitalize transition-colors whitespace-nowrap ${item.rank === 1 ? 'bg-[#1a1d29] text-white hover:bg-[#2a2e3c]' : 'border border-[#e5e7eb] text-[#1a1d29] bg-white hover:border-[#1a1d29]'}`}>{item.primaryAction}</button>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── PROJECT STATUS TAB ───────────────────────────────────────────────────────

function ProjectStatusTab() {
  function getStageActions(status: ProjectUpdate['status']): { primary: string; secondary: string } {
    switch (status) {
      case 'Selected':    return { primary: 'Complete Screener',      secondary: 'Contact PM'       }
      case 'In Screener': return { primary: 'Continue Screener',      secondary: 'Contact PM'       }
      case 'Compliance':  return { primary: 'Complete Compliance',    secondary: 'Contact PM'       }
      case 'Scheduled':   return { primary: 'Review Conflict',        secondary: 'Send Availability' }
      case 'Complete':    return { primary: 'Submit Invoice',         secondary: 'View Summary'     }
      default:            return { primary: 'View',                   secondary: 'Contact PM'       }
    }
  }

  function rankStyle(_status: ProjectUpdate['status']): { bg: string; text: string } {
    return { bg: '#f3f4f6', text: '#6b7280' }
  }

  return (
    <div className="flex flex-col">
      {projectUpdates.map((p, idx) => {
        const actions = getStageActions(p.status)
        const rs = rankStyle(p.status)
        const si2 = stageIdx(p.status)
        const isComplete = p.status === 'Complete'
        return (
          <div key={p.id} className="border-b border-[#f0f0ee] last:border-0 py-3 flex flex-col md:flex-row md:items-center md:justify-between md:gap-4 gap-2">
            <div className="flex items-start gap-3">
              {/* Rank badge — checkmark icon for Complete */}
              <div
                className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5"
                style={{ backgroundColor: rs.bg, color: rs.text }}
              >
                {isComplete ? (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4.5l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : idx + 1}
              </div>

              <div className="flex-1 min-w-0">
                {/* Title + status + fee */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sm text-[#1a1d29]">{p.title}</span>
                  <span className="text-[10px] font-medium text-[#9ca3af]">{p.status}</span>
                  <span className="text-sm font-bold text-[#1a1d29]">{p.fee}</span>
                </div>

                {/* Client · PM · call date */}
                <div className="flex items-center gap-1 mt-0.5 text-[11px] text-[#9ca3af] flex-wrap">
                  <span>{p.client}</span><span>·</span><span>{p.pm}</span>
                  {p.callDate && (
                    <>
                      <span>·</span>
                      <span className="font-medium text-[#6b7280]">{p.callDate}</span>
                    </>
                  )}
                </div>

                {/* ── Minimal stage progress bar ── */}
                <div className="flex items-center gap-1 mt-2">
                  {stageLabels.map((stage, si) => {
                    const done   = si < si2 || isComplete
                    const active = si === si2 && !isComplete
                    return (
                      <div
                        key={stage}
                        className={`h-[3px] flex-1 rounded-full transition-colors ${
                          done || active ? 'bg-[#1a1d29]' : 'bg-[#e9eaec]'
                        }`}
                      />
                    )
                  })}
                  <span className="text-[10px] font-medium shrink-0 ml-1 text-[#9ca3af]">
                    {isComplete ? 'Complete' : stageLabels[Math.min(si2, stageLabels.length - 1)]}
                  </span>
                </div>

                {/* Mobile actions */}
                <div className="flex items-center gap-3 mt-2.5 md:hidden">
                  <button className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#e5e7eb] text-[#1a1d29] bg-white hover:border-[#1a1d29] transition-colors whitespace-nowrap">{actions.primary}</button>
                  <button className="text-xs text-[#9ca3af] hover:text-[#1a1d29] transition-colors whitespace-nowrap">{actions.secondary}</button>
                </div>
              </div>
            </div>

            {/* Desktop actions — fixed width column */}
            <div className="hidden md:flex items-center justify-end gap-4 w-[220px] shrink-0">
              <button className="text-xs text-[#9ca3af] hover:text-[#1a1d29] transition-colors whitespace-nowrap">{actions.secondary}</button>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors border border-[#e5e7eb] text-[#1a1d29] bg-white hover:border-[#1a1d29]">{actions.primary}</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── NEW INVITATIONS TAB ──────────────────────────────────────────────────────

const DECLINE_REASONS = ['Not qualified', 'Conflict of interest', 'Too busy', 'Topic not a fit', 'Other']

const DETAIL_ICONS = {
  projectType: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1.5" y="2" width="9" height="8" rx="1.5" stroke="#9ca3af" strokeWidth="1.2"/>
      <path d="M4 2V1M8 2V1" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M1.5 5h9" stroke="#9ca3af" strokeWidth="1.2"/>
    </svg>
  ),
  expires: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="#9ca3af" strokeWidth="1.2"/>
      <path d="M6 3.5V6l1.5 1.5" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  taskLength: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6.5" r="4" stroke="#9ca3af" strokeWidth="1.2"/>
      <path d="M6 4.5v2l1 1" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 1.5h3" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  rateCap: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1" y="3.5" width="10" height="6" rx="1.5" stroke="#9ca3af" strokeWidth="1.2"/>
      <path d="M1 5.5h10" stroke="#9ca3af" strokeWidth="1.2"/>
      <circle cx="4" cy="8" r="0.75" fill="#9ca3af"/>
    </svg>
  ),
  pm: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="4" r="2.5" stroke="#9ca3af" strokeWidth="1.2"/>
      <path d="M1.5 10.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
}

function InvitationsTab() {
  const [current, setCurrent] = useState(0)
  const [handled, setHandled] = useState<Record<number, 'accepted' | 'declined'>>({})
  const [view, setView] = useState<'card' | 'screener' | 'screener-done' | 'decline'>('card')
  const [screenerStep, setScreenerStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [declineReason, setDeclineReason] = useState('')
  const [declineNote, setDeclineNote] = useState('')
  // Slide-up animation state
  const [overlayVisible, setOverlayVisible] = useState(false)

  // Trigger entrance animation after mount
  useEffect(() => {
    if (view === 'screener' || view === 'screener-done') {
      const id = requestAnimationFrame(() => setOverlayVisible(true))
      return () => cancelAnimationFrame(id)
    } else {
      setOverlayVisible(false)
    }
  }, [view])

  const pending = invitations.filter(i => !handled[i.id])
  const inv = pending[current] ?? null

  function navigateTo(idx: number) {
    setCurrent(idx)
    setView('card')
  }

  function openScreener() {
    setScreenerStep(0)
    setAnswers({})
    setOverlayVisible(false)   // reset so animation re-fires
    setView('screener')
  }

  function openDecline() {
    setDeclineReason('')
    setDeclineNote('')
    setView('decline')
  }

  function confirmDecline() {
    if (!inv || !declineReason) return
    setHandled(h => ({ ...h, [inv.id]: 'declined' }))
    const newPending = pending.filter(i => i.id !== inv.id)
    setCurrent(c => Math.min(c, newPending.length - 1))
    setView('card')
  }

  function handleSkip() {
    if (!inv) return
    setCurrent(c => (c + 1) % pending.length)
    setView('card')
  }

  function toggleAnswer(qId: number, option: string, type: 'single' | 'multi') {
    setAnswers(prev => {
      const cur = prev[qId] ?? []
      if (type === 'single') return { ...prev, [qId]: [option] }
      return cur.includes(option)
        ? { ...prev, [qId]: cur.filter(x => x !== option) }
        : { ...prev, [qId]: [...cur, option] }
    })
  }

  // ── All handled ──────────────────────────────────────────────────────────────
  if (!inv) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <div className="w-12 h-12 rounded-full bg-[#d1fae5] flex items-center justify-center">
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
            <path d="M1.5 9l6 6 13-13" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-sm font-semibold text-[#1a1d29]">All invitations handled</p>
        <p className="text-xs text-[#9ca3af]">Check back later for new opportunities.</p>
      </div>
    )
  }

  const cfg = urgencyCfg[inv.urgency]
  const qs = inv.questions
  const currentQ = qs[screenerStep]

  // ── Screener overlay ─────────────────────────────────────────────────────────
  if (view === 'screener' || view === 'screener-done') {
    return (
      <div className={`fixed inset-0 z-[100] bg-white flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${overlayVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        {/* Top bar */}
        <div className="border-b border-[#ebebea] px-5 py-3.5 flex items-center gap-3 shrink-0">
          <button
            onClick={() => { setOverlayVisible(false); setTimeout(() => setView('card'), 280) }}
            className="w-8 h-8 rounded-lg border border-[#e5e7eb] flex items-center justify-center text-[#6b7280] hover:text-[#1a1d29] hover:border-[#1a1d29] transition-colors shrink-0"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M6.5 2L2.5 5l4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wide">Screener · {inv.company}</p>
            <p className="text-sm font-bold text-[#1a1d29] leading-tight truncate">{inv.title}</p>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0" style={{ backgroundColor: cfg.badge, color: cfg.badgeText }}>{inv.expiresLabel}</span>
        </div>

        {/* Done state */}
        {view === 'screener-done' ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8">
            <div className="w-16 h-16 rounded-full bg-[#d1fae5] flex items-center justify-center">
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                <path d="M2 11l8 8 16-16" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-center max-w-xs">
              <p className="text-xl font-bold text-[#1a1d29]">Screener submitted!</p>
              <p className="text-sm text-[#6b7280] mt-2 leading-relaxed">Your answers have been sent to {inv.pm}. You'll hear back within 24 hours.</p>
            </div>
            <button
              onClick={() => {
                setHandled(h => ({ ...h, [inv.id]: 'accepted' }))
                const newPending = pending.filter(i => i.id !== inv.id)
                setCurrent(c => Math.min(c, newPending.length - 1))
                setOverlayVisible(false)
                setTimeout(() => setView('card'), 280)
              }}
              className="mt-1 px-8 py-2.5 rounded-xl bg-[#1a1d29] text-white text-sm font-semibold hover:bg-[#2a2e3c] transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="px-5 pt-5 pb-3 shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-[#9ca3af]">Question {screenerStep + 1} of {qs.length}</span>
                <span className="text-[11px] font-bold text-[#1155a6]">{Math.round(((screenerStep + 1) / qs.length) * 100)}%</span>
              </div>
              <div className="h-1 bg-[#f3f4f6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1155a6] rounded-full transition-all duration-300"
                  style={{ width: `${((screenerStep + 1) / qs.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question body */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <p className="text-base font-bold text-[#1a1d29] leading-snug mb-5">{currentQ.text}</p>

              {currentQ.type === 'text' ? (
                <textarea
                  value={answers[currentQ.id]?.[0] ?? ''}
                  onChange={e => setAnswers(prev => ({ ...prev, [currentQ.id]: [e.target.value] }))}
                  placeholder="Type your answer here…"
                  className="w-full border border-[#e5e7eb] rounded-xl px-4 py-3 text-sm text-[#1a1d29] placeholder-[#c4c7cd] resize-none focus:outline-none focus:border-[#1155a6] transition-colors"
                  rows={5}
                />
              ) : (
                <div className="flex flex-col gap-2.5">
                  {currentQ.type === 'multi' && (
                    <p className="text-[11px] text-[#9ca3af] -mt-2 mb-1">Select all that apply</p>
                  )}
                  {currentQ.options?.map(opt => {
                    const selected = answers[currentQ.id]?.includes(opt) ?? false
                    return (
                      <button
                        key={opt}
                        onClick={() => toggleAnswer(currentQ.id, opt, currentQ.type as 'single' | 'multi')}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          selected
                            ? 'border-[#1155a6] bg-[#e7f1fc] text-[#1155a6]'
                            : 'border-[#e5e7eb] bg-white text-[#1a1d29] hover:border-[#1155a6]/40 hover:bg-[#f8fafd]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${selected ? 'border-[#1155a6] bg-[#1155a6]' : 'border-[#d1d5db]'}`}>
                            {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          {opt}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Nav */}
            <div className="border-t border-[#ebebea] px-5 py-4 flex items-center gap-2.5 shrink-0">
              {screenerStep > 0 && (
                <button
                  onClick={() => setScreenerStep(s => s - 1)}
                  className="px-5 py-2.5 rounded-xl border border-[#e5e7eb] text-sm font-semibold text-[#1a1d29] hover:border-[#1a1d29] transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (screenerStep < qs.length - 1) setScreenerStep(s => s + 1)
                  else setView('screener-done')
                }}
                disabled={currentQ.type !== 'text' && !answers[currentQ.id]?.length}
                className="flex-1 py-2.5 rounded-xl bg-[#1a1d29] text-white text-sm font-semibold disabled:opacity-40 hover:bg-[#2a2e3c] transition-colors"
              >
                {screenerStep < qs.length - 1 ? 'Next →' : 'Submit Screener'}
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  // ── Decline view ─────────────────────────────────────────────────────────────
  if (view === 'decline') {
    return (
      <div className="flex flex-col gap-3">
        <div className="border border-[#ebebea] rounded-xl overflow-hidden">
          <div className="px-4 pt-4 pb-3">
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-[#fee2e2] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#1a1d29]">Decline this invitation?</p>
                <p className="text-[11px] text-[#9ca3af] mt-0.5 truncate">{inv.title}</p>
              </div>
            </div>

            <p className="text-[11px] text-[#6b7280] mb-3 leading-relaxed">Please share why you're declining — this helps us find better matches for you in the future.</p>

            {/* Reason pills */}
            <div className="flex flex-wrap gap-2">
              {DECLINE_REASONS.map(r => (
                <button
                  key={r}
                  onClick={() => setDeclineReason(r)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                    declineReason === r
                      ? 'border-[#dc2626] bg-[#fee2e2] text-[#dc2626]'
                      : 'border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#dc2626]/40 hover:text-[#dc2626]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Optional note */}
            {declineReason && (
              <textarea
                value={declineNote}
                onChange={e => setDeclineNote(e.target.value)}
                placeholder="Any additional context? (optional)"
                className="w-full mt-3 border border-[#e5e7eb] rounded-xl px-3 py-2.5 text-[11px] text-[#1a1d29] placeholder-[#c4c7cd] resize-none focus:outline-none focus:border-[#dc2626]/40 transition-colors"
                rows={2}
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-[#ebebea]">
            <button
              onClick={confirmDecline}
              disabled={!declineReason}
              className="flex-1 py-2 rounded-xl bg-[#1a1d29] text-white text-xs font-semibold disabled:opacity-40 hover:bg-[#2a2e3c] transition-colors"
            >
              Confirm Decline
            </button>
            <button
              onClick={() => setView('card')}
              className="px-4 py-2 rounded-xl border border-[#e5e7eb] text-xs font-semibold text-[#1a1d29] hover:border-[#1a1d29] transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Card view (default) ───────────────────────────────────────────────────────
  const detailCols = [
    { label: 'Project Type', value: inv.projectType, icon: DETAIL_ICONS.projectType },
    { label: 'Expires',      value: inv.expires,     icon: DETAIL_ICONS.expires     },
    { label: 'Task Length',  value: inv.screenerMins, icon: DETAIL_ICONS.taskLength  },
    { label: 'Rate Cap',     value: inv.rateCap,     icon: DETAIL_ICONS.rateCap     },
    { label: 'Proj. Manager', value: inv.pm,          icon: DETAIL_ICONS.pm          },
  ]

  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Counter */}
      <div className="flex items-center justify-end shrink-0">
        <span className="text-[11px] text-[#9ca3af]">{current + 1} of {pending.length} invitations</span>
      </div>

      {/* Invitation card — fills remaining height */}
      <div className="flex-1 min-h-0 border border-[#ebebea] shadow-[0_1px_4px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden flex flex-col">

        {/* Card body — scrollable */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-4 pb-3" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb transparent' }}>
          {/* Urgency badge */}
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cfg.dot }} />
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: cfg.badge, color: cfg.badgeText }}>{inv.expiresLabel}</span>
          </div>
          {/* Title */}
          <h3 className="font-bold text-[15px] text-[#1a1d29] leading-snug mb-2.5">{inv.title}.</h3>
          {/* Description */}
          <div className="flex flex-col gap-1.5">
            {inv.topics.map((t, i) => (
              <p key={i} className="text-[11px] text-[#4b5563] leading-relaxed">{t}</p>
            ))}
          </div>
        </div>

        {/* Details row — 5 columns, pinned */}
        <div className="shrink-0 border-t border-b border-[#ebebea] grid grid-cols-5 divide-x divide-[#ebebea]">
          {detailCols.map(col => (
            <div key={col.label} className="flex flex-col items-center gap-1 px-1.5 py-2.5">
              {col.icon}
              <span className="text-[8.5px] font-semibold text-[#9ca3af] text-center leading-tight whitespace-nowrap">{col.label}</span>
              <span className="text-[9.5px] font-semibold text-[#1a1d29] text-center leading-tight">{col.value}</span>
            </div>
          ))}
        </div>

        {/* Actions — pinned */}
        <div className="shrink-0 flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Accept → opens screener */}
            <button
              onClick={openScreener}
              className="w-8 h-8 rounded-lg bg-[#f97316] flex items-center justify-center hover:bg-[#ea6c0a] transition-colors"
              title="Accept & start screener"
            >
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M1 5l3.5 3.5 6.5-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* Decline → opens decline view */}
            <button
              onClick={openDecline}
              className="w-8 h-8 rounded-lg border border-[#e5e7eb] bg-white flex items-center justify-center text-[#9ca3af] hover:border-red-300 hover:text-red-400 transition-colors"
              title="Decline"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {/* Skip */}
            <button
              onClick={handleSkip}
              className="w-8 h-8 rounded-lg border border-[#e5e7eb] bg-white flex items-center justify-center text-[#9ca3af] hover:border-[#1155a6] hover:text-[#1155a6] transition-colors"
              title="Skip"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5.5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <button className="text-[11px] font-semibold text-[#1155a6] hover:underline transition-colors whitespace-nowrap">
            Review Questions
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="shrink-0 flex items-center justify-center gap-1.5 pb-1">
        {pending.map((_, i) => (
          <button
            key={i}
            onClick={() => navigateTo(i)}
            className={`rounded-full transition-all ${i === current ? 'w-4 h-2 bg-[#1155a6]' : 'w-2 h-2 bg-[#e5e7eb] hover:bg-[#d1d5db]'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const tabs = [
  { id: 'critical', label: 'Critical Items', count: criticalItems.length, countBg: '#fccad0', countText: '#c21b2f' },
  { id: 'status',   label: 'Project Status Updates', count: projectUpdates.length, countBg: '#e7f1fc', countText: '#1155a6' },
  { id: 'invites',  label: 'New Invitations', count: invitations.length, countBg: '#ffcd00', countText: '#332900' },
]

export default function NeedsAttention() {
  const [activeTab, setActiveTab] = useState('critical')

  return (
    <div className="bg-white border border-[#ebebea] shadow-[0_1px_6px_rgba(0,0,0,0.06)] rounded-2xl px-[21px] py-[19px] flex flex-col md:overflow-hidden md:h-full">
      {/* Header */}
      <div className="flex items-center mb-3">
        <p className="font-semibold text-[13.7px] text-[#1a1d29] tracking-tight leading-none">Needs Attention</p>
      </div>

      {/* Tabs */}
      <div className="bg-[#f8f8f6] rounded-xl p-1 flex items-center gap-0.5 mb-4 flex-wrap">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeTab === t.id ? 'bg-[#1a1d29] text-white' : 'text-[#9ca3af] hover:text-[#1a1d29]'}`}
          >
            {t.label}
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none" style={{ backgroundColor: t.countBg, color: t.countText }}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className={`md:flex-1 md:min-h-0 ${activeTab === 'invites' ? 'flex flex-col' : 'md:overflow-y-auto'}`}>
        {activeTab === 'critical' && <CriticalTab />}
        {activeTab === 'status'   && <ProjectStatusTab />}
        {activeTab === 'invites'  && <InvitationsTab />}
      </div>
    </div>
  )
}
