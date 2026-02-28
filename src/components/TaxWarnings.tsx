import type { Trip } from '../types';
import { daysPerCountryInYear, taxResidencyWarnings } from '../utils/tax';

interface Props { trips: Trip[] }

export function TaxWarnings({ trips }: Props) {
  const year = new Date().getFullYear();
  const warnings = taxResidencyWarnings(trips, year);
  const topCountries = daysPerCountryInYear(trips, year).slice(0, 3);

  return (
    <div className="bg-surface-raised rounded-2xl p-5 border border-border-subtle card-glow">
      <div className="flex items-start justify-between mb-4">
        <p className="text-[13px] text-text-tertiary font-medium uppercase tracking-wider">Tax Residency {year}</p>
        <div className="w-8 h-8 rounded-lg bg-surface-overlay flex items-center justify-center">
          <span className="text-text-tertiary text-sm">⚖</span>
        </div>
      </div>

      {warnings.length > 0 ? (
        <div className="mb-4 p-3 bg-danger/5 border border-danger/20 rounded-xl">
          <p className="text-[12px] font-medium text-danger mb-2">183+ day threshold reached</p>
          {warnings.map(w => (
            <div key={w.country} className="flex justify-between text-[13px]">
              <span className="text-danger/80">{w.country}</span>
              <span className="text-danger font-semibold tabular-nums">{w.days}d</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[13px] text-success font-medium mb-4">No thresholds reached</p>
      )}

      {topCountries.length > 0 ? (
        <div className="space-y-2.5">
          <p className="text-[11px] text-text-tertiary uppercase tracking-wider">Top countries</p>
          {topCountries.map(cd => (
            <div key={cd.country} className="flex items-center justify-between gap-3">
              <span className="text-[13px] text-text-secondary truncate">{cd.country}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-surface-overlay rounded-full h-1 overflow-hidden">
                  <div className="bg-accent h-full rounded-full" style={{ width: `${Math.min(100, (cd.days / 183) * 100)}%` }} />
                </div>
                <span className="text-[12px] text-text-tertiary tabular-nums w-8 text-right">{cd.days}d</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[13px] text-text-tertiary">No trips in {year}</p>
      )}
    </div>
  );
}
