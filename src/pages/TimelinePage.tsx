import { useState } from 'react';
import { useTripsContext } from '../context/TripsContext';
import { Timeline } from '../components/Timeline';

export function TimelinePage() {
  const { trips } = useTripsContext();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const years = Array.from(
    new Set([currentYear, currentYear - 1, currentYear - 2])
  ).sort((a, b) => b - a);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-100">Timeline</h2>
        <div className="flex gap-2">
          {years.map(y => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                y === year
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <Timeline trips={trips} year={year} />
      </div>
    </div>
  );
}
