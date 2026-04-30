import { useState } from 'react'

const chartLine = "https://www.figma.com/api/mcp/asset/0285b5a1-8533-4ed7-b48a-5536d0b2fbdb";
const chartFill = "https://www.figma.com/api/mcp/asset/f78e64f6-d231-4061-b331-deb6688f0d41";

type Payment = {
  date: string
  source: string
  status: 'Unpaid' | 'Processing' | 'Paid'
  action: string
  actionStyle: 'primary' | 'ghost'
}

const payments: Payment[] = [
  { date: 'Apr 25', source: 'Pharma Trends — $450', status: 'Unpaid', action: 'Request Payment', actionStyle: 'primary' },
  { date: 'Apr 23', source: 'Pharma Trends — $450', status: 'Processing', action: 'Contact Support', actionStyle: 'ghost' },
  { date: 'Apr 11', source: 'Pharma Trends — $450', status: 'Paid', action: 'Contact Support', actionStyle: 'ghost' },
  { date: 'Apr 1', source: 'Pharma Trends — $450', status: 'Paid', action: 'Open Invoice', actionStyle: 'ghost' },
]

const statusStyles: Record<string, { bg: string; text: string }> = {
  Unpaid: { bg: 'rgba(0,0,0,0.04)', text: '#000000' },
  Processing: { bg: '#fed7aa', text: '#9a3412' },
  Paid: { bg: '#d1fae5', text: '#059669' },
}

const periods = ['7d', '30d', '90d']

export default function EarningsPayments() {
  const [activePeriod, setActivePeriod] = useState('30d')

  return (
    <div className="bg-white border border-[#ebebea] shadow-[0_1px_6px_rgba(0,0,0,0.06)] rounded-2xl px-[21px] py-[19px] flex flex-col md:h-full md:overflow-hidden justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold text-sm text-[#1a1d29]">Earnings &amp; payments</p>
        <div className="flex items-center bg-[#f8f8f6] rounded-xl p-0.5">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                activePeriod === p ? 'bg-white shadow-sm text-[#1a1d29]' : 'text-[#9ca3af]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-end gap-2 mb-1">
        <span className="text-[30px] font-bold text-[#1a1d29] tracking-tight leading-none">$4,275</span>
        <span className="text-xs font-semibold text-[#059669] mb-0.5">↗ +18%</span>
      </div>
      <p className="text-xs text-[#6b7280] mb-3">$2,425 paid · $1,850 pending · 11d avg</p>

      {/* Chart */}
      <div className="relative h-12 mb-4 overflow-hidden">
        <img src={chartFill} alt="" className="absolute inset-0 w-full h-full object-fill" />
        <img src={chartLine} alt="" className="absolute inset-0 w-full h-full object-fill" />
      </div>

      {/* Table — desktop header only */}
      <div className="flex flex-col">
        <div className="hidden md:flex items-center border-b border-[#f4f5f7] pb-2">
          <span className="w-[54px] text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af]">Date</span>
          <span className="flex-1 text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af]">Source</span>
          <span className="w-[88px] text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af] text-right">Status</span>
          <span className="w-[140px] text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af] text-right">Actions</span>
        </div>

        {payments.map((row, i) => (
          <div key={i} className="border-b border-[#f8f8f6] py-3">
            {/* Desktop row */}
            <div className="hidden md:flex items-center">
              <span className="w-[54px] text-xs text-[#9ca3af]">{row.date}</span>
              <span className="flex-1 text-xs font-semibold text-[#1a1d29]">{row.source}</span>
              <div className="w-[88px] flex justify-end">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: statusStyles[row.status].bg, color: statusStyles[row.status].text }}>
                  {row.status}
                </span>
              </div>
              <div className="w-[140px] flex justify-end">
                {row.actionStyle === 'primary' ? (
                  <button className="bg-[#1a1d29] text-white text-xs font-semibold px-3 py-1.5 rounded-xl capitalize">{row.action}</button>
                ) : (
                  <button className="text-xs font-medium text-black underline capitalize">{row.action}</button>
                )}
              </div>
            </div>
            {/* Mobile card row */}
            <div className="md:hidden flex items-center justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#1a1d29] truncate">{row.source}</span>
                <span className="text-[10px] text-[#9ca3af] mt-0.5">{row.date}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: statusStyles[row.status].bg, color: statusStyles[row.status].text }}>
                  {row.status}
                </span>
                {row.actionStyle === 'primary' ? (
                  <button className="bg-[#1a1d29] text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl capitalize whitespace-nowrap">{row.action}</button>
                ) : (
                  <button className="text-xs font-medium text-black underline capitalize whitespace-nowrap">{row.action}</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="text-sm font-semibold text-[#1a1d29] underline mt-3 text-left">
        View All Payments
      </button>
    </div>
  )
}
