import { useState } from 'react';
import { useTripsContext } from '../context/TripsContext';
import { Timeline } from '../components/Timeline';

export function TimelinePage() {
  const { trips } = useTripsContext();
  const now = new Date().getFullYear();
  const [year, setYear] = useState(now);
  const years = [now, now - 1, now - 2];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-text-tertiary font-medium uppercase tracking-wider">Timeline</p>
        <div className="flex gap-1">
          {years.map(y => (
            <button key={y} onClick={() => setYear(y)}
              className={`px-3 py-1 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                y === year ? 'bg-accent text-white' : 'bg-surface-overlay text-text-tertiary hover:text-text-secondary'
              }`}>{y}</button>
          ))}
        </div>
      </div>
      <div className="bg-surface-raised rounded-2xl p-5 border border-border-subtle card-glow">
        <Timeline trips={trips} year={year} />
      </div>
    </div>
  );
}
