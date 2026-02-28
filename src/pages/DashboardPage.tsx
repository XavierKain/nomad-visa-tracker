import { useTripsContext } from '../context/TripsContext';
import { SchengenTracker } from '../components/SchengenTracker';
import { USTracker } from '../components/USTracker';
import { TaxWarnings } from '../components/TaxWarnings';
import { StatsDashboard } from '../components/StatsDashboard';

export function DashboardPage() {
  const { trips } = useTripsContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-100">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SchengenTracker trips={trips} />
        <USTracker trips={trips} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TaxWarnings trips={trips} />
        <StatsDashboard trips={trips} />
      </div>
    </div>
  );
}
