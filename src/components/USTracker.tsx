import { subDays, format } from 'date-fns';
import type { Trip } from '../types';
import { usDaysUsed } from '../utils/us';

interface Props {
  trips: Trip[];
}

export function USTracker({ trips }: Props) {
  const today = new Date();
  const daysUsed = usDaysUsed(trips, today);
  const daysRemaining = Math.max(0, 90 - daysUsed);
  const percentage = Math.min(100, (daysUsed / 90) * 100);
  const windowStart = subDays(today, 179);

  const isWarning = daysUsed >= 75;
  const isDanger = daysUsed >= 85;

  const barColor = isDanger ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-blue-500';
  const statusColor = isDanger ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-emerald-400';

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-semibold text-slate-100">US B1/B2 Visa</h3>
        <span className="text-xs text-slate-500 bg-slate-700 px-2 py-1 rounded">
          90/180 rule
        </span>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        {format(windowStart, 'MMM d, yyyy')} → {format(today, 'MMM d, yyyy')}
      </p>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-4xl font-bold text-slate-100">{daysUsed}</span>
        <span className="text-slate-400">/ 90 days used</span>
      </div>

      <div className="w-full bg-slate-700 rounded-full h-3 mb-3 overflow-hidden">
        <div
          className={`${barColor} h-full rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className={`text-sm font-medium ${statusColor}`}>
        {daysRemaining} days remaining
        {isWarning && !isDanger && ' — Approaching limit'}
        {isDanger && ' — Near limit!'}
      </p>
    </div>
  );
}
