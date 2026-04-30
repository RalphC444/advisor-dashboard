import { useState } from 'react'

type Action = {
  icon: string
  iconBg: string
  title: string
  desc: string
  cta: string
  badge?: string
}

type JobRecord = {
  title: string
  company: string
  period: string
  current?: boolean
}

const actions: Action[] = [
  { icon: '⚡', iconBg: '#f3f4f6', title: 'Verify your identity',          desc: 'IDV required before your next consultation.',      cta: 'Start IDV',    badge: 'Required'    },
  { icon: '📅', iconBg: '#f3f4f6', title: 'Update your availability',      desc: "PMs can't book you — your schedule is outdated.", cta: 'Set times',    badge: 'Recommended' },
  { icon: '🤝', iconBg: '#f3f4f6', title: 'Customer relationship context', desc: 'Add client relationship details to stand out.',    cta: 'Add context'                        },
  { icon: '💼', iconBg: '#f3f4f6', title: 'Update work history',           desc: 'Keep your experience current for better matches.', cta: 'Edit history'                       },
]

const jobHistory: JobRecord[] = [
  { title: 'VP Clinical Affairs',          company: 'Hologic Inc.',      period: '2019 – Present', current: true },
  { title: 'Sr. Director Medical Affairs', company: 'BD Biosciences',    period: '2014 – 2019' },
  { title: 'Clinical Research Manager',    company: 'Abbott Diagnostics', period: '2010 – 2014' },
]

const DEFAULT_BIO = `Board-certified physician with 15+ years of experience in clinical affairs, medical devices, and diagnostics. Deep expertise in oncology diagnostics, GLP-1 pharmacotherapy, and FDA regulatory strategy. Have led clinical evaluations for major MedTech platforms and advised investment firms on diagnostics market dynamics.`

const availabilitySlots = ['Weekday mornings', 'Weekday evenings', 'Weekends']
const sections = ['Biography', 'Job History', 'Preferences']

export default function YourProfile() {
  const [activeSection, setActiveSection] = useState('Biography')
  const [bio, setBio] = useState(DEFAULT_BIO)
  const [editingBio, setEditingBio] = useState(false)
  const [availability, setAvailability] = useState(['Weekday mornings'])
  const [editingAvail, setEditingAvail] = useState(false)
  const [editingHistory, setEditingHistory] = useState(false)
  const [consultMode, setConsultMode] = useState<'phone' | 'video' | 'in-person'>('phone')

  const pct = 29

  return (
    <div className="bg-white border border-[#ebebea] shadow-[0_1px_6px_rgba(0,0,0,0.06)] rounded-2xl px-[21px] py-[19px]">
      <div className="flex gap-10">

        {/* ── LEFT: header + progress + tabs + content ── */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-sm text-[#1a1d29]">Your Profile</p>
          </div>

          {/* Tabs */}
          <div className="bg-[#f8f8f6] rounded-xl p-1 flex gap-0.5 mb-4 self-start">
            {sections.map(s => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                  activeSection === s ? 'bg-[#1a1d29] text-white' : 'text-[#9ca3af] hover:text-[#1a1d29]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* ── BIOGRAPHY ── */}
          {activeSection === 'Biography' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">About Matt</p>
                <button
                  onClick={() => setEditingBio(e => !e)}
                  className="text-[11px] font-semibold text-[#1a1d29] border border-[#e5e7eb] px-2.5 py-1 rounded-lg hover:border-[#1a1d29] transition-colors"
                >
                  {editingBio ? 'Save' : 'Edit'}
                </button>
              </div>
              {editingBio ? (
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full border border-[#e5e7eb] rounded-xl px-4 py-3 text-sm text-[#1a1d29] leading-relaxed resize-none focus:outline-none focus:border-[#1a1d29] transition-colors"
                  rows={5}
                />
              ) : (
                <p className="text-sm text-[#4b5563] leading-relaxed">{bio}</p>
              )}

              <div className="mt-1">
                <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Expertise Areas</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Oncology Diagnostics', 'Clinical Affairs', 'Regulatory Strategy', 'Medical Devices'].map(tag => (
                    <span key={tag} className="text-[10px] font-medium bg-[#f3f4f6] text-[#6b7280] px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                  <button className="text-[10px] font-medium bg-[#f3f4f6] text-[#9ca3af] px-2.5 py-1 rounded-full hover:text-[#1a1d29] transition-colors">+ Add</button>
                </div>
              </div>
            </div>
          )}

          {/* ── JOB HISTORY ── */}
          {activeSection === 'Job History' && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Work Experience</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingHistory(e => !e)}
                    className="text-[11px] font-semibold text-[#1a1d29] border border-[#e5e7eb] px-2.5 py-1 rounded-lg hover:border-[#1a1d29] transition-colors"
                  >
                    {editingHistory ? 'Done' : 'Edit'}
                  </button>
                  <button className="text-[11px] font-semibold text-[#1a1d29] border border-[#e5e7eb] px-2.5 py-1 rounded-lg hover:border-[#1a1d29] transition-colors">+ Add</button>
                </div>
              </div>
              {jobHistory.map((job, i) => (
                <div key={i} className="flex gap-3 py-3 border-b border-[#f8f8f6] last:border-0">
                  <div className="w-8 h-8 rounded-lg bg-[#f3f4f6] flex items-center justify-center shrink-0 text-[10px] font-bold text-[#6b7280]">
                    {job.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-[#1a1d29] leading-tight">{job.title}</p>
                        <p className="text-[11px] text-[#6b7280] mt-0.5">{job.company}</p>
                        <p className="text-[10px] text-[#9ca3af] mt-0.5">{job.period}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {job.current && (
                          <span className="text-[9px] font-semibold bg-[#f3f4f6] text-[#6b7280] px-1.5 py-0.5 rounded-full">Current</span>
                        )}
                        {editingHistory && (
                          <button className="text-[10px] text-[#9ca3af] hover:text-[#1a1d29] transition-colors border border-[#e5e7eb] px-2 py-0.5 rounded">Edit</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── PREFERENCES ── */}
          {activeSection === 'Preferences' && (
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 bg-[#f9fafb] border border-[#f0f0ee] rounded-xl">
                  <div>
                    <p className="text-xs font-semibold text-[#1a1d29]">Available for consultations</p>
                    <p className="text-[10px] text-[#6b7280] mt-0.5">Currently accepting new projects</p>
                  </div>
                  <div className="w-10 h-6 bg-[#1a1d29] rounded-full relative cursor-pointer shrink-0">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Consultation Format</p>
                  <div className="flex gap-2">
                    {(['phone', 'video', 'in-person'] as const).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setConsultMode(mode)}
                        className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-colors ${
                          consultMode === mode ? 'bg-[#1a1d29] text-white' : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#ebebea]'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Available Time Slots</p>
                    <button onClick={() => setEditingAvail(!editingAvail)} className="text-[11px] font-semibold text-[#1a1d29] border border-[#e5e7eb] px-2.5 py-1 rounded-lg hover:border-[#1a1d29] transition-colors">
                      {editingAvail ? 'Done' : 'Edit'}
                    </button>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {availabilitySlots.map(slot => {
                      const active = availability.includes(slot)
                      return (
                        <button
                          key={slot}
                          onClick={() => {
                            if (!editingAvail) return
                            setAvailability(prev => active ? prev.filter(s => s !== slot) : [...prev, slot])
                          }}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                            active ? 'bg-[#f3f4f6] border-[#d1d5db] text-[#1a1d29]' : 'bg-[#f9fafb] border-[#e5e7eb] text-[#9ca3af]'
                          } ${editingAvail ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                          <span>{slot}</span>
                          {active && (
                            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                              <path d="M1 5l3.5 3.5L11 1" stroke="#1a1d29" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Minimum Notice</p>
                  <div className="flex gap-2">
                    {['24h', '48h', '72h'].map(n => (
                      <button key={n} className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                        n === '48h' ? 'bg-[#1a1d29] text-white' : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#ebebea]'
                      }`}>{n}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <button className="text-sm font-semibold text-[#1a1d29] underline mt-4 text-left shrink-0">
            View Full Profile
          </button>
        </div>

        {/* ── RIGHT: stats + actions ── */}
        <div className="hidden md:flex flex-col w-[300px] shrink-0">
          {/* Stats */}
          <div className="flex items-start gap-4 pb-4 mb-4 border-b border-[#f4f5f7]">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-[#1a1d29] tracking-tight">12</span>
                <span className="text-[10px] font-semibold text-[#9ca3af]">↗3</span>
              </div>
              <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mt-0.5">Views</p>
            </div>
            <div className="w-px self-stretch bg-[#f4f5f7]" />
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-[#1a1d29] tracking-tight">28</span>
                <span className="text-[10px] font-semibold text-[#9ca3af]">↗6</span>
              </div>
              <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mt-0.5">Searches</p>
            </div>
            <div className="w-px self-stretch bg-[#f4f5f7]" />
            <div>
              <span className="text-xl font-bold text-[#1a1d29] tracking-tight block">2</span>
              <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mt-0.5">Shortlists</p>
            </div>
          </div>

          {/* Profile Actions */}
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-3">Profile Actions</p>
          {actions.map((a, i) => (
            <div key={i} className="flex items-center gap-2.5 py-2.5 border-b border-[#f4f5f7] last:border-0">
              <span className="text-base shrink-0">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-[#1a1d29] leading-tight truncate">{a.title}</p>
                {a.badge && <p className="text-[10px] text-[#9ca3af] mt-0.5">{a.badge}</p>}
              </div>
              <button className="text-[11px] font-semibold text-[#1a1d29] hover:underline underline-offset-2 whitespace-nowrap shrink-0 transition-colors">
                {a.cta} →
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
