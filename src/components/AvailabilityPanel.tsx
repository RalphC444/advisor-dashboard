import { useState } from 'react'

type TimeSlot = 't9' | 't11' | 't1' | 't3' | 't5'

const SLOT_ROWS: { id: TimeSlot; label: string }[] = [
  { id: 't9',  label: '9–11 AM' },
  { id: 't11', label: '11–1 PM' },
  { id: 't1',  label: '1–3 PM'  },
  { id: 't3',  label: '3–5 PM'  },
  { id: 't5',  label: '5–8 PM'  },
]

const MONTH = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const EMPTY: Record<TimeSlot, boolean> = { t9: false, t11: false, t1: false, t3: false, t5: false }

function dateKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

/** Returns n business days starting from `from` (inclusive) */
function bizDays(from: Date, n: number): Date[] {
  const out: Date[] = []
  const d = new Date(from)
  d.setHours(0, 0, 0, 0)
  while (out.length < n) {
    if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return out
}

/** Advance `from` by offset * 5 business days */
function advanceBizDays(from: Date, steps: number): Date {
  const d = new Date(from)
  let count = 0
  while (count < steps) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) count++
  }
  return d
}

export default function AvailabilityPanel() {
  // Always anchor to the real "today"
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [weekOffset, setWeekOffset] = useState(0)
  const [saved, setSaved] = useState(false)

  // Pre-populate the first window with realistic data
  const [availability, setAvailability] = useState<Record<string, Record<TimeSlot, boolean>>>(() => {
    const init: Record<string, Record<TimeSlot, boolean>> = {}
    const days = bizDays(today, 5)
    if (days[0]) init[dateKey(days[0])] = { t9: true,  t11: false, t1: true,  t3: true,  t5: false }
    if (days[1]) init[dateKey(days[1])] = { t9: true,  t11: true,  t1: true,  t3: false, t5: true  }
    if (days[2]) init[dateKey(days[2])] = { t9: false, t11: false, t1: true,  t3: false, t5: false }
    return init
  })

  // Compute which 5 business days to show for the current weekOffset
  const windowStart = weekOffset === 0 ? today : advanceBizDays(today, weekOffset * 5)
  const weekDays    = bizDays(windowStart, 5)
  const firstDay    = weekDays[0]
  const lastDay     = weekDays[weekDays.length - 1]

  const headerRange = firstDay.getMonth() === lastDay.getMonth()
    ? `${MONTH[firstDay.getMonth()]} ${firstDay.getDate()}–${lastDay.getDate()}`
    : `${MONTH[firstDay.getMonth()]} ${firstDay.getDate()} – ${MONTH[lastDay.getMonth()]} ${lastDay.getDate()}`

  const todayKey = dateKey(today)

  function toggle(date: Date, slot: TimeSlot) {
    const key = dateKey(date)
    setAvailability(prev => {
      const day = prev[key] ?? { ...EMPTY }
      return { ...prev, [key]: { ...day, [slot]: !day[slot] } }
    })
    setSaved(false)
  }

  async function save() {
    setSaved(true)
    await new Promise(r => setTimeout(r, 800))
    setSaved(false)
  }

  return (
    <div className="bg-white border border-[#ebebea] shadow-[0_1px_6px_rgba(0,0,0,0.06)] rounded-2xl px-[21px] py-[14px] flex flex-col h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-2.5 shrink-0">
        <p className="font-semibold text-sm text-[#1a1d29]">Availability</p>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#9ca3af] font-medium">{headerRange}</span>
          {/* Prev window — disabled when at current week */}
          <button
            onClick={() => setWeekOffset(o => Math.max(0, o - 1))}
            disabled={weekOffset === 0}
            className="w-5 h-5 rounded border border-[#e5e7eb] flex items-center justify-center text-[#9ca3af] disabled:opacity-25 hover:enabled:border-[#1a1d29] hover:enabled:text-[#1a1d29] transition-colors"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M5 1.5L2.5 4 5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Next window */}
          <button
            onClick={() => setWeekOffset(o => o + 1)}
            className="w-5 h-5 rounded border border-[#e5e7eb] flex items-center justify-center text-[#9ca3af] hover:border-[#1a1d29] hover:text-[#1a1d29] transition-colors"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M3 1.5L5.5 4 3 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Day column headers */}
      <div className="grid grid-cols-[44px_repeat(5,1fr)] gap-1.5 mb-2 shrink-0">
        <div />
        {weekDays.map(d => {
          const isToday = dateKey(d) === todayKey
          return (
            <div key={dateKey(d)} className="flex flex-col items-center gap-0.5">
              <span className={`text-[9px] font-semibold uppercase leading-none ${isToday ? 'text-[#1155a6]' : 'text-[#9ca3af]'}`}>
                {DAY[d.getDay()]}
              </span>
              <span className={`text-[11px] font-bold leading-none ${isToday ? 'text-[#1155a6]' : 'text-[#1a1d29]'}`}>
                {d.getDate()}
              </span>
              {isToday
                ? <span className="w-1 h-0.5 rounded-full bg-[#1155a6] mt-0.5" />
                : <span className="w-1 h-0.5 mt-0.5" />
              }
            </div>
          )
        })}
      </div>

      {/* Slot rows */}
      <div className="flex flex-col gap-1.5 flex-1 min-h-0">
        {SLOT_ROWS.map(row => (
          <div key={row.id} className="grid grid-cols-[44px_repeat(5,1fr)] gap-1.5 flex-1">
            <div className="flex items-center">
              <span className="text-[9px] font-semibold text-[#9ca3af] leading-tight whitespace-nowrap">{row.label}</span>
            </div>
            {weekDays.map(d => {
              const key    = dateKey(d)
              const active = (availability[key] ?? EMPTY)[row.id]
              return (
                <button
                  key={key}
                  onClick={() => toggle(d, row.id)}
                  className={`rounded-lg w-full h-full transition-all flex items-center justify-center ${
                    active ? 'bg-[#059669] hover:bg-[#047857]' : 'bg-[#f3f4f6] hover:bg-[#bbf7d0]'
                  }`}
                >
                  {active && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>

    </div>
  )
}
