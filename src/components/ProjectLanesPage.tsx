import { useState } from 'react'

type Tag = 'EXECUTION' | 'DISCOVERY' | 'REVIEW'
type TabKey = 'TASKS' | 'MESSAGES' | 'MEETINGS' | 'DELIVERABLES' | 'ACTIVITY'

interface Task {
  id: string
  avatar: string
  title: string
  from: string
  duration: string
  due?: string
  action?: 'REVIEW' | 'CONFIRM'
  critical?: boolean
}

interface Lane {
  id: string
  num: string
  name: string
  subName: string
  client: string
  pm: string
  tag: Tag
  urgentCount: number
  progress: number
  hoursUsed: number
  hoursTotal: number
  openTasks: number
  critTasks: number
  blocked: number
  taskNote: string
  tasks: Task[]
  tabs: Record<TabKey, number>
}

interface InboxItem {
  id: string
  name: string
  project: string
  time: string
  preview: string
  critical?: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const LANES: Lane[] = [
  {
    id: 'atlas', num: '01', name: 'ATLAS', subName: 'Q3 Migration',
    client: 'Northwind Capital', pm: 'Theo Park', tag: 'EXECUTION',
    urgentCount: 2, progress: 68, hoursUsed: 42, hoursTotal: 80,
    openTasks: 3, critTasks: 2, blocked: 0, taskNote: '8 done · 1 in progress',
    tasks: [
      { id: 't1',  avatar: 'TP', title: 'Redlined SOW from Northwind legal', from: 'Theo Park', duration: '45m', due: 'Due today, 3:00 PM', action: 'REVIEW', critical: true },
      { id: 't2',  avatar: 'TP', title: 'Oct 14 cutover date — confirm with ops', from: 'Theo Park', duration: '28m', due: 'Due today', action: 'CONFIRM', critical: true },
      { id: 't3',  avatar: 'TP', title: 'Migration runbook v2', from: 'Theo Park', duration: '60m', due: 'Due Wed' },
      { id: 't3b', avatar: 'DR', title: 'Data mapping sign-off — legacy tables', from: 'Daniel Reyes', duration: '40m', due: 'Due Thu' },
      { id: 't3c', avatar: 'TP', title: 'Rollback plan review with infra team', from: 'Theo Park', duration: '30m', due: 'Due Fri' },
      { id: 't3d', avatar: 'DR', title: 'Update stakeholder status deck slide 8–12', from: 'Daniel Reyes', duration: '25m', due: 'Due Fri' },
      { id: 't3e', avatar: 'TP', title: 'QA sign-off on ETL pipeline v3', from: 'Theo Park', duration: '50m', due: 'Due Mon' },
      { id: 't3f', avatar: 'DR', title: 'Schedule cutover dry-run with Northwind IT', from: 'Daniel Reyes', duration: '15m', due: 'Due Mon' },
      { id: 't3g', avatar: 'TP', title: 'Final legal review — data processing agreement', from: 'Theo Park', duration: '35m', due: 'Due Tue' },
      { id: 't3h', avatar: 'DR', title: 'Archive legacy environment documentation', from: 'Daniel Reyes', duration: '20m', due: 'Due Tue' },
    ],
    tabs: { TASKS: 10, MESSAGES: 2, MEETINGS: 1, DELIVERABLES: 3, ACTIVITY: 4 },
  },
  {
    id: 'ember', num: '02', name: 'EMBER', subName: 'Risk Audit',
    client: 'Vega Holdings', pm: 'Marisol Chen', tag: 'DISCOVERY',
    urgentCount: 4, progress: 34, hoursUsed: 28, hoursTotal: 120,
    openTasks: 8, critTasks: 1, blocked: 1, taskNote: '3 done · 2 in progress',
    tasks: [
      { id: 't4',  avatar: 'MC', title: 'Sign off on Q3 risk matrix v4', from: 'Marisol Chen', duration: '30m', due: 'Today, 5:00 PM', action: 'REVIEW', critical: true },
      { id: 't5',  avatar: 'DC', title: 'Sterling deck — CFO note on slide 34', from: 'Daniel Chen', duration: '20m', due: 'Today' },
      { id: 't5b', avatar: 'MC', title: 'Interview Vega compliance lead re: exposure limits', from: 'Marisol Chen', duration: '60m', due: 'Due Wed' },
      { id: 't5c', avatar: 'DC', title: 'Reconcile audit trail gaps in Q2 report', from: 'Daniel Chen', duration: '45m', due: 'Due Thu' },
      { id: 't5d', avatar: 'MC', title: 'Finalize heat map — operational risk tier 2', from: 'Marisol Chen', duration: '35m', due: 'Due Thu' },
      { id: 't5e', avatar: 'DC', title: 'Prepare findings summary for partner review', from: 'Daniel Chen', duration: '50m', due: 'Due Fri' },
      { id: 't5f', avatar: 'MC', title: 'Review insurance coverage gaps flagged by legal', from: 'Marisol Chen', duration: '25m', due: 'Due Fri' },
      { id: 't5g', avatar: 'DC', title: 'Draft remediation roadmap — 6 items', from: 'Daniel Chen', duration: '70m', due: 'Due Mon' },
    ],
    tabs: { TASKS: 8, MESSAGES: 4, MEETINGS: 1, DELIVERABLES: 2, ACTIVITY: 3 },
  },
  {
    id: 'kite', num: '03', name: 'KITE', subName: 'Onboarding Flow',
    client: 'Sterling & Co.', pm: 'Laura Hess', tag: 'REVIEW',
    urgentCount: 0, progress: 91, hoursUsed: 55, hoursTotal: 60,
    openTasks: 5, critTasks: 0, blocked: 0, taskNote: '21 done · 45m remaining',
    tasks: [
      { id: 't6',  avatar: 'LH', title: 'Approve Sterling discovery deck', from: 'Laura Hess', duration: '20m', due: 'Tomorrow', action: 'REVIEW' },
      { id: 't6b', avatar: 'LH', title: 'Final pass — onboarding checklist v3', from: 'Laura Hess', duration: '15m', due: 'Due Wed' },
      { id: 't6c', avatar: 'AR', title: 'Confirm Sterling IT provisioning complete', from: 'Alex Russo', duration: '10m', due: 'Due Wed' },
      { id: 't6d', avatar: 'LH', title: 'Record walkthrough video for new users', from: 'Laura Hess', duration: '30m', due: 'Due Thu' },
      { id: 't6e', avatar: 'AR', title: 'Close out retro items from sprint 4', from: 'Alex Russo', duration: '20m', due: 'Due Thu' },
    ],
    tabs: { TASKS: 5, MESSAGES: 0, MEETINGS: 1, DELIVERABLES: 5, ACTIVITY: 2 },
  },
  {
    id: 'polar', num: '04', name: 'POLAR', subName: 'Compliance Review',
    client: 'Meridian Trust', pm: 'James Ryo', tag: 'DISCOVERY',
    urgentCount: 0, progress: 27, hoursUsed: 36, hoursTotal: 180,
    openTasks: 6, critTasks: 0, blocked: 0, taskNote: '6 done · next: tomorrow',
    tasks: [
      { id: 't7',  avatar: 'JR', title: 'Draft compliance memo for Meridian', from: 'James Ryo', duration: '90m', due: 'Tomorrow' },
      { id: 't7b', avatar: 'JR', title: 'Map regulatory requirements to process controls', from: 'James Ryo', duration: '60m', due: 'Due Wed' },
      { id: 't7c', avatar: 'NP', title: 'Collect evidence for SOC 2 type II gap analysis', from: 'Nina Park', duration: '45m', due: 'Due Thu' },
      { id: 't7d', avatar: 'JR', title: 'Schedule interview with Meridian CISO', from: 'James Ryo', duration: '15m', due: 'Due Thu' },
      { id: 't7e', avatar: 'NP', title: 'Review prior audit findings — 2023 report', from: 'Nina Park', duration: '30m', due: 'Due Fri' },
      { id: 't7f', avatar: 'JR', title: 'Draft remediation tracker v1', from: 'James Ryo', duration: '50m', due: 'Due Mon' },
    ],
    tabs: { TASKS: 6, MESSAGES: 1, MEETINGS: 0, DELIVERABLES: 1, ACTIVITY: 1 },
  },
]

const INBOX: InboxItem[] = [
  { id: 'i1', name: 'Marisol Chen', project: 'EMBER', time: '9m ago', preview: 'Pushed the v4 matrix — flagged three line items before the 4pm review.', critical: true },
  { id: 'i2', name: 'Theo Park', project: 'ATLAS', time: '1:06 PM', preview: 'Northwind asking about timeline. Can you confirm the Oct 14 cutover?' },
  { id: 'i3', name: 'Daniel Reyes', project: 'ATLAS', time: '12:50 PM', preview: 'Deck looks great. Small ask from CFO on slide 34.' },
]

const TAG_STYLES: Record<Tag, string> = {
  EXECUTION: 'text-stone-400 border border-stone-200',
  DISCOVERY: 'text-stone-400 border border-stone-200',
  REVIEW:    'text-stone-400 border border-stone-200',
}

const TABS: TabKey[] = ['TASKS', 'MESSAGES', 'MEETINGS', 'DELIVERABLES', 'ACTIVITY']

// ─── Sub-components ───────────────────────────────────────────────────────────

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-[9px] text-stone-500 font-mono shrink-0">
      {initials}
    </div>
  )
}

function TaskRow({ task }: { task: Task }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-stone-100 last:border-b-0">
      <Avatar initials={task.avatar} />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-stone-700 font-mono mb-1 leading-snug">{task.title}</div>
        <div className="flex gap-3 text-[10px] text-stone-400 font-mono">
          <span>{task.from}</span>
          {task.duration && <span>~{task.duration}</span>}
          {task.due && <span>{task.due}</span>}
        </div>
      </div>
      {task.action === 'REVIEW' && (
        <button className="text-[9px] tracking-widest px-2.5 py-1 bg-white text-stone-500 border border-stone-300 font-mono cursor-pointer shrink-0 hover:border-stone-400 transition-colors">
          REVIEW
        </button>
      )}
      {task.action === 'CONFIRM' && (
        <button className="text-[9px] tracking-widest px-2.5 py-1 bg-stone-700 text-white border-none font-mono cursor-pointer shrink-0 hover:bg-stone-800 transition-colors">
          CONFIRM
        </button>
      )}
    </div>
  )
}

function LaneTabs({ tabs, active, onSelect }: { tabs: Record<TabKey, number>; active: TabKey; onSelect: (t: TabKey) => void }) {
  return (
    <div className="flex px-4 pl-[72px]">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={(e) => { e.stopPropagation(); onSelect(tab) }}
          className={`flex items-center gap-1.5 py-2 mr-5 text-[9px] tracking-widest font-mono cursor-pointer bg-transparent border-none transition-colors border-b-2 -mb-px ${
            active === tab
              ? 'text-stone-700 border-b-stone-700'
              : 'text-stone-400 border-b-transparent hover:text-stone-500'
          }`}
        >
          {tab}
          {tabs[tab] > 0 && (
            <span className="text-[8px] px-1 rounded bg-stone-100 text-stone-400">
              {tabs[tab]}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

function LaneTableRow({ lane, defaultOpen }: { lane: Lane; defaultOpen: boolean }) {
  const [expanded, setExpanded] = useState(defaultOpen)
  const [activeTab, setActiveTab] = useState<TabKey>('TASKS')
  const criticalTasks = lane.tasks.filter(t => t.critical)

  return (
    <>
      <tr
        className="border-b border-stone-100 hover:bg-stone-50 cursor-pointer transition-colors group"
        onClick={() => setExpanded(v => !v)}
      >
        {/* # */}
        <td className="pl-6 py-4 w-12 align-top">
          <span className={`font-mono text-2xl font-bold tracking-tight leading-none ${expanded ? 'text-stone-800' : 'text-stone-200'}`}>
            {lane.num}
          </span>
        </td>

        {/* PROJECT */}
        <td className="px-4 py-4 align-top">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-mono text-[13px] font-semibold text-stone-800 tracking-wide">{lane.name}</span>
            <span className="text-[10px] text-stone-400 font-mono">{lane.subName}</span>
          </div>
          <div className="text-[10px] text-stone-400 font-mono mb-2">{lane.client} · {lane.pm}</div>
          <div className="flex items-center gap-2">
            <span className={`text-[8px] tracking-widest px-1.5 py-0.5 font-mono uppercase ${TAG_STYLES[lane.tag]}`}>
              {lane.tag}
            </span>
            {lane.urgentCount > 0 && (
              <span className="text-[9px] text-stone-400 font-mono">{lane.urgentCount} urgent</span>
            )}
          </div>
        </td>

        {/* PROGRESS */}
        <td className="px-4 py-4 align-top min-w-[120px]">
          <div className="text-[18px] font-mono font-semibold text-stone-700 tracking-tight leading-none mb-2">{lane.progress}%</div>
          <div className="h-px bg-stone-200 w-24 mb-1.5">
            <div className="h-full bg-stone-400" style={{ width: `${lane.progress}%` }} />
          </div>
          <div className="text-[10px] text-stone-400 font-mono">{lane.taskNote}</div>
        </td>

        {/* HOURS */}
        <td className="px-4 py-4 align-top">
          <div className="text-[18px] font-mono font-semibold text-stone-700 tracking-tight leading-none">
            {lane.hoursUsed}<span className="text-[12px] text-stone-300 font-normal">/{lane.hoursTotal}</span>
          </div>
          <div className="text-[10px] text-stone-400 font-mono mt-1">hrs</div>
        </td>

        {/* OPEN TASKS */}
        <td className="px-4 py-4 align-top">
          <div className="text-[18px] font-mono font-semibold text-stone-700 tracking-tight leading-none">{lane.openTasks}</div>
          {lane.critTasks > 0
            ? <div className="text-[10px] text-stone-500 font-mono mt-1">{lane.critTasks} critical</div>
            : <div className="text-[10px] text-stone-400 font-mono mt-1">on track</div>
          }
        </td>

        {/* BLOCKED */}
        <td className="px-4 py-4 align-top text-right pr-6">
          <div className={`text-[18px] font-mono font-semibold tracking-tight leading-none ${lane.blocked > 0 ? 'text-stone-600' : 'text-stone-200'}`}>
            {lane.blocked}
          </div>
        </td>

        {/* TOGGLE */}
        <td className="pr-6 py-4 align-top text-right w-8">
          <span className="text-stone-300 group-hover:text-stone-400 font-mono text-sm transition-colors">
            {expanded ? '↑' : '↓'}
          </span>
        </td>
      </tr>

      {/* EXPANDED */}
      {expanded && (
        <tr className="border-b border-stone-100">
          <td colSpan={7} className="bg-stone-50 px-0 py-0" style={{ height: '100vh' }}>
            <div className="flex flex-col h-full">
              {/* Fixed header strip */}
              {criticalTasks.length > 0 && (
                <div className="flex items-center gap-2 text-[9px] tracking-widest text-stone-500 bg-stone-100 border-b border-stone-200 px-6 py-2 font-mono shrink-0">
                  {criticalTasks.length} CRITICAL — HANDLE FIRST
                </div>
              )}

              {/* Scrollable task list */}
              <div className="flex-1 overflow-y-auto px-4 pl-[72px] pr-6 pt-1">
                {lane.tasks.map(task => <TaskRow key={task.id} task={task} />)}
              </div>

              {/* Fixed tab bar at bottom */}
              <div className="shrink-0 border-t border-stone-100">
                <LaneTabs tabs={lane.tabs} active={activeTab} onSelect={setActiveTab} />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectLanesPage() {
  return (
    <div
      className="flex flex-col h-screen bg-white text-stone-800 overflow-hidden"
      style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
    >
      {/* TOP BAR — minimal, recedes */}
      <div className="flex items-center h-8 border-b border-stone-100 px-6 text-[10px] tracking-widest text-stone-400 font-mono shrink-0">
        <span className="text-stone-500 mr-4">CMO/CTR</span>
        <span className="mr-4">L. OKONKWO</span>
        <span>08:31 EST · MON OCT 14</span>
        <div className="flex-1" />
        <span className="mr-3 text-stone-300">8 open</span>
        <span className="mr-3 text-stone-500 font-semibold">2 crit</span>
        <span className="text-stone-300">3 msg</span>
      </div>

      {/* NEXT UP — one clear action */}
      <div className="flex items-center gap-4 px-6 py-2 border-b border-stone-100 bg-stone-50 shrink-0">
        <span className="text-[9px] tracking-widest text-stone-400 font-mono shrink-0">NEXT UP</span>
        <span className="text-[12px] text-stone-700 font-mono flex-1">
          Northwind Q3 Cutover Review <span className="text-stone-400 text-[11px]">starts in 22 min · Theo Park · ATLAS</span>
        </span>
        <button className="text-[9px] tracking-widest px-3 py-1.5 bg-stone-700 text-white font-mono cursor-pointer border-none hover:bg-stone-800 transition-colors">
          JOIN →
        </button>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* MAIN TABLE — dominant */}
        <main className="flex-1 overflow-y-auto min-w-0 flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-stone-100 flex items-end justify-between">
            <div>
              <div className="text-[26px] font-bold font-mono text-stone-800 tracking-tight leading-none mb-1">
                FOUR LANES.
              </div>
              <div className="text-[9px] tracking-widest text-stone-400 font-mono">
                4 projects · 12 open · 0 meetings today
              </div>
            </div>
            <div className="flex items-center gap-3 text-[9px] font-mono text-stone-400 tracking-widest">
              <span className="text-stone-700 border-b border-stone-700 pb-px">TABLE</span>
              <span className="hover:text-stone-500 cursor-pointer">LANES</span>
              <span className="hover:text-stone-500 cursor-pointer">BOARD</span>
              <span className="ml-2 text-stone-300">│</span>
              <span className="hover:text-stone-500 cursor-pointer">URGENCY ↓</span>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="pl-6 py-2 text-left text-[9px] tracking-widest text-stone-300 font-normal font-mono w-12">#</th>
                <th className="px-4 py-2 text-left text-[9px] tracking-widest text-stone-300 font-normal font-mono">PROJECT</th>
                <th className="px-4 py-2 text-left text-[9px] tracking-widest text-stone-300 font-normal font-mono">PROGRESS</th>
                <th className="px-4 py-2 text-left text-[9px] tracking-widest text-stone-300 font-normal font-mono">HOURS</th>
                <th className="px-4 py-2 text-left text-[9px] tracking-widest text-stone-300 font-normal font-mono">OPEN TASKS</th>
                <th className="px-4 py-2 text-right text-[9px] tracking-widest text-stone-300 font-normal font-mono pr-6">BLOCKED</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {LANES.map((lane, i) => (
                <LaneTableRow key={lane.id} lane={lane} defaultOpen={i === 0} />
              ))}
            </tbody>
          </table>
        </main>

        {/* RIGHT PANEL — tertiary, very quiet */}
        <aside className="w-56 border-l border-stone-100 overflow-y-auto shrink-0 bg-stone-50">
          <div className="px-4 py-3 border-b border-stone-100">
            <span className="text-[9px] tracking-widest text-stone-400 font-mono">INBOX</span>
          </div>
          {INBOX.map(item => (
            <div key={item.id} className="px-4 py-3 border-b border-stone-100 cursor-pointer hover:bg-white transition-colors">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] text-stone-600 font-mono">{item.name}</span>
                <span className="text-[9px] text-stone-300 font-mono">{item.time}</span>
              </div>
              <div className="text-[9px] text-stone-400 font-mono mb-1 leading-snug">{item.project}</div>
              <div className="text-[10px] text-stone-500 font-mono leading-snug">{item.preview}</div>
              {item.critical && (
                <div className="mt-1.5 text-[8px] tracking-widest text-stone-400 font-mono">CRITICAL</div>
              )}
            </div>
          ))}

          <div className="px-4 py-3 border-b border-stone-100 mt-2">
            <span className="text-[9px] tracking-widest text-stone-400 font-mono">UPCOMING</span>
          </div>
          {[
            { code: 'ATL', title: 'Northwind Q3 Cutover Review', time: '4:00 PM · 3hr', highlight: true },
            { code: 'CMR', title: 'Vega Risk Matrix Walkthrough', time: '4:00 PM · 1hr', highlight: false },
            { code: 'ATL', title: 'Sterling Exec Discovery', time: 'Yesterday', highlight: false },
          ].map((item, i) => (
            <div key={i} className="px-4 py-3 border-b border-stone-100 cursor-pointer hover:bg-white transition-colors">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[9px] text-stone-400 font-mono">{item.code}</span>
                <span className={`text-[9px] font-mono ${item.highlight ? 'text-stone-600' : 'text-stone-300'}`}>{item.time}</span>
              </div>
              <div className="text-[10px] text-stone-600 font-mono leading-snug">{item.title}</div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}
