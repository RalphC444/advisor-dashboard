type ProjectUpdate = {
  label: string
  date: string
  done: boolean
}

type Project = {
  id: number
  title: string
  client: string
  pm: string
  status: 'Selected' | 'In Screener' | 'Compliance' | 'Scheduled' | 'Complete' | 'Invited'
  statusColor: string
  statusBg: string
  progress: number          // 0–100
  fee: string
  callDate?: string
  updates: ProjectUpdate[]
}

const projects: Project[] = [
  {
    id: 1,
    title: 'GLP-1s Side-Effects & Alternative Care',
    client: 'Pharma Trends',
    pm: 'Abby Chen',
    status: 'Selected',
    statusColor: '#059669',
    statusBg: '#d1fae5',
    progress: 60,
    fee: '$450',
    callDate: 'Apr 30 · 2:00 PM',
    updates: [
      { label: 'Invitation accepted', date: 'Apr 23', done: true },
      { label: 'Screener submitted', date: 'Apr 24', done: true },
      { label: 'Compliance pending', date: 'Apr 26', done: false },
      { label: 'Call scheduled', date: 'Apr 30', done: false },
    ],
  },
  {
    id: 2,
    title: 'Oncology Diagnostics Trends 2026',
    client: 'BioAnalytica',
    pm: 'Sarah Kim',
    status: 'In Screener',
    statusColor: '#cc680b',
    statusBg: '#ffedd5',
    progress: 25,
    fee: '$600',
    updates: [
      { label: 'Invitation accepted', date: 'Apr 25', done: true },
      { label: 'Screener in progress', date: 'Apr 26', done: false },
      { label: 'Expert review', date: 'TBD', done: false },
      { label: 'Call scheduled', date: 'TBD', done: false },
    ],
  },
  {
    id: 3,
    title: 'Hologic P&L Software Platform',
    client: 'Hologic Inc.',
    pm: 'James Park',
    status: 'Complete',
    statusColor: '#6b7280',
    statusBg: '#f3f4f6',
    progress: 100,
    fee: '$450',
    callDate: 'Apr 11 · 3:00 PM',
    updates: [
      { label: 'Invitation accepted', date: 'Apr 5', done: true },
      { label: 'Screener submitted', date: 'Apr 6', done: true },
      { label: 'Compliance passed', date: 'Apr 9', done: true },
      { label: 'Call completed', date: 'Apr 11', done: true },
    ],
  },
]

const stages = ['Invited', 'Screener', 'Compliance', 'Call']

function stageIndex(status: Project['status']) {
  if (status === 'Selected' || status === 'Invited') return 0
  if (status === 'In Screener') return 1
  if (status === 'Compliance') return 2
  if (status === 'Scheduled') return 3
  if (status === 'Complete') return 4
  return 0
}

export default function ProjectStatus() {
  return (
    <div className="bg-white border border-[#ececea] rounded-2xl px-[21px] py-[19px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold text-sm text-[#1a1d29]">Project Status</p>
        <span className="text-[11px] text-[#9ca3af]">{projects.length} active</span>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[1fr_120px_160px_90px_90px] gap-3 pb-2 border-b border-[#f4f5f7] mb-1">
        {['Project', 'Status', 'Timeline', 'Call Date', 'Fee'].map(h => (
          <span key={h} className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">{h}</span>
        ))}
      </div>

      {/* Rows */}
      <div className="flex flex-col divide-y divide-[#f8f8f6]">
        {projects.map(p => {
          const idx = stageIndex(p.status)
          return (
            <div key={p.id} className="grid grid-cols-[1fr_120px_160px_90px_90px] gap-3 py-3 items-center">

              {/* Project info */}
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#1a1d29] truncate">{p.title}</p>
                <p className="text-[10px] text-[#9ca3af] mt-0.5">{p.client} · {p.pm}</p>
                {/* Mini update log */}
                <div className="flex items-center gap-1 mt-1">
                  {p.updates.map((u, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 text-[9px]"
                      title={`${u.label} — ${u.date}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${u.done ? 'bg-[#059669]' : 'bg-[#e5e7eb]'}`} />
                      {i < p.updates.length - 1 && (
                        <span className="w-3 h-px bg-[#e5e7eb] inline-block" />
                      )}
                    </div>
                  ))}
                  <span className="text-[9px] text-[#9ca3af] ml-1">{p.updates.filter(u => u.done).length}/{p.updates.length} steps</span>
                </div>
              </div>

              {/* Status badge */}
              <div>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: p.statusBg, color: p.statusColor }}
                >
                  {p.status}
                </span>
              </div>

              {/* Stage pipeline */}
              <div className="flex items-center gap-0.5">
                {stages.map((stage, si) => {
                  const done = si < idx
                  const active = si === idx && p.status !== 'Complete'
                  const completed = p.status === 'Complete'
                  return (
                    <div key={stage} className="flex items-center gap-0.5 flex-1 min-w-0">
                      <div
                        className={`flex-1 h-1 rounded-full ${
                          done || completed ? 'bg-[#059669]' :
                          active ? 'bg-[#87b7f0]' :
                          'bg-[#e5e7eb]'
                        }`}
                      />
                      {si < stages.length - 1 && (
                        <div className={`w-0.5 h-0.5 rounded-full ${done || completed ? 'bg-[#059669]' : 'bg-[#e5e7eb]'}`} />
                      )}
                    </div>
                  )
                })}
                <span className="text-[9px] text-[#9ca3af] ml-1 shrink-0">{p.progress}%</span>
              </div>

              {/* Call date */}
              <span className="text-[10px] text-[#6b7280]">{p.callDate ?? '—'}</span>

              {/* Fee */}
              <span className="text-[10px] font-semibold text-[#1a1d29]">{p.fee}</span>
            </div>
          )
        })}
      </div>

      <button className="text-sm font-semibold text-[#1a1d29] underline mt-3 text-left">
        View All Projects
      </button>
    </div>
  )
}
