import { NavLink, Outlet } from 'react-router-dom';
import { TripsProvider } from '../context/TripsContext';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/trips', label: 'Trips' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/settings', label: 'Settings' },
];

export function Layout() {
  return (
    <TripsProvider>
      <div className="min-h-screen bg-surface">
        <header className="border-b border-border-subtle sticky top-0 z-10 bg-surface/80 backdrop-blur-xl">
          <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
            <span className="text-[15px] font-semibold tracking-tight text-text-primary">Nomad Tracker</span>
            <nav className="flex gap-1">
              {navItems.map(({ to, label }) => (
                <NavLink key={to} to={to} end={to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                      isActive ? 'bg-accent-soft text-accent' : 'text-text-tertiary hover:text-text-secondary'
                    }`
                  }>{label}</NavLink>
              ))}
            </nav>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-5 py-8"><Outlet /></main>
      </div>
    </TripsProvider>
  );
}
