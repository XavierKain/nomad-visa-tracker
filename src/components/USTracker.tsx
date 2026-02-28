import { subDays, format } from 'date-fns';
import type { Trip } from '../types';
import { usDaysUsed } from '../utils/us';

interface Props { trips: Trip[] }

export function USTracker({ trips }: Props) {
  const today = new Date();
  const daysUsed = usDaysUsed(trips, today);
  const daysRemaining = Math.max(0, 90 - daysUsed);
  const pct = Math.min(100, (daysUsed / 90) * 100);
  const windowStart = subDays(today, 179);

  const isDanger = daysUsed >= 85;
  const isWarning = daysUsed >= 75;
  const barColor = isDanger ? '#f87171' : isWarning ? '#fbbf24' : '#3b82f6';

  return (
    <div className="bg-surface-raised rounded-2xl p-5 border border-border-subtle card-glow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[13px] text-text-tertiary font-medium uppercase tracking-wider">US B1/B2</p>
          <p className="text-[11px] text-text-tertiary mt-0.5">
            {format(windowStart, 'MMM d')} – {format(today, 'MMM d, yyyy')}
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <span className="text-blue-400 text-sm">US</span>
        </div>
      </div>

      <div className="flex items-baseline gap-1.5 mb-4">
        <span className="text-[40px] font-bold tracking-tight tabular-nums leading-none">{daysUsed}</span>
        <span className="text-text-tertiary text-sm">/ 90</span>
      </div>

      <div className="w-full bg-surface-overlay rounded-full h-1.5 mb-3 overflow-hidden">
        <div
          className="h-full rounded-full progress-fill"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>

      <p className="text-[13px] font-medium" style={{ color: barColor === '#3b82f6' ? '#34d399' : barColor }}>
        {daysRemaining} days remaining
        {isDanger && ' · Near limit'}
        {isWarning && !isDanger && ' · Approaching'}
      </p>
    </div>
  );
}
