import './index.css'
import Sidebar from './components/Sidebar'
import TopNav from './components/TopNav'
import MobileNav from './components/MobileNav'
import WelcomeRow from './components/WelcomeRow'
import UpcomingEventsRow from './components/UpcomingEventsRow'
import AvailabilityPanel from './components/AvailabilityPanel'
import NeedsAttention from './components/NeedsAttention'
import CalendarMessagesPanel from './components/CalendarMessagesPanel'
import YourProfile from './components/YourProfile'

function App() {
  return (
    <div className="flex flex-col h-screen bg-[#f5f5f0] overflow-hidden">
      {/* Top nav — full width, desktop only */}
      <div className="hidden md:block">
        <TopNav />
      </div>
      {/* Mobile top nav */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      <div className="flex flex-1 md:overflow-hidden" style={{ minHeight: 0 }}>
        {/* Sidebar — desktop only */}
        <div className="hidden md:flex self-stretch">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
        {/* Desktop layout */}
        <main className="hidden md:flex flex-col flex-1 overflow-y-auto h-full px-4 py-4" style={{ gap: '16px' }}>
          {/* Row 1: Welcome + Stats */}
          <div className="shrink-0">
            <WelcomeRow />
          </div>

          {/* Row 2: Upcoming Calls + Availability — same grid as Row 3 */}
          <div className="grid grid-cols-[1fr_360px] gap-4 shrink-0 items-stretch">
            <UpcomingEventsRow />
            <AvailabilityPanel />
          </div>

          {/* Row 3: Needs Attention + Messages */}
          <div className="grid grid-cols-[1fr_360px] gap-4 shrink-0 overflow-hidden" style={{ height: '480px' }}>
            <div className="overflow-hidden h-full"><NeedsAttention /></div>
            <div className="overflow-hidden h-full"><CalendarMessagesPanel /></div>
          </div>

          {/* Row 4: Profile — full width */}
          <div className="shrink-0">
            <YourProfile />
          </div>

          {/* Bottom padding */}
          <div className="shrink-0 h-4" />
        </main>

        {/* Mobile layout */}
        <main className="md:hidden flex-1 overflow-y-auto">
          <div className="flex flex-col gap-3 px-4 pt-4 pb-8">
            <WelcomeRow />
            <UpcomingEventsRow />
            <NeedsAttention />
            <CalendarMessagesPanel />
            <YourProfile />
          </div>
        </main>
        </div>
      </div>
    </div>
  )
}

export default App
