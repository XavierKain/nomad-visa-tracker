import { NavLink, Outlet } from 'react-router-dom';
import { TripsProvider } from '../context/TripsContext';

export function Layout() {
  return (
    <TripsProvider>
      <div className="min-h-screen bg-slate-900">
        <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-bold text-violet-400 tracking-tight">
              🌍 Nomad Visa Tracker
            </h1>
            <div className="flex gap-1 sm:gap-4">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-violet-600/20 text-violet-300'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/trips"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-violet-600/20 text-violet-300'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                  }`
                }
              >
                Trips
              </NavLink>
              <NavLink
                to="/timeline"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-violet-600/20 text-violet-300'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                  }`
                }
              >
                Timeline
              </NavLink>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-4 py-6">
          <Outlet />
        </main>
      </div>
    </TripsProvider>
  );
}
