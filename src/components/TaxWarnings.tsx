import type { Trip } from '../types';
import { daysPerCountryInYear, taxResidencyWarnings } from '../utils/tax';

interface Props {
  trips: Trip[];
}

export function TaxWarnings({ trips }: Props) {
  const year = new Date().getFullYear();
  const warnings = taxResidencyWarnings(trips, year);
  const topCountries = daysPerCountryInYear(trips, year).slice(0, 3);

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-slate-100 mb-1">Tax Residency</h3>
      <p className="text-xs text-slate-500 mb-4">Calendar year {year}</p>

      {warnings.length > 0 && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm font-medium text-red-400 mb-2">
            183+ day residency threshold reached:
          </p>
          {warnings.map(w => (
            <div key={w.country} className="flex justify-between text-sm">
              <span className="text-red-300">{w.country}</span>
              <span className="text-red-400 font-medium">{w.days} days</span>
            </div>
          ))}
        </div>
      )}

      {warnings.length === 0 && (
        <p className="text-sm text-emerald-400 mb-4">
          No tax residency thresholds reached
        </p>
      )}

      {topCountries.length > 0 && (
        <div>
          <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Top countries this year</p>
          <div className="space-y-2">
            {topCountries.map(cd => (
              <div key={cd.country} className="flex items-center justify-between">
                <span className="text-sm text-slate-300">{cd.country}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-violet-500 h-full rounded-full"
                      style={{ width: `${Math.min(100, (cd.days / 183) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-400 w-12 text-right">{cd.days}d</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {topCountries.length === 0 && (
        <p className="text-sm text-slate-500">No trips recorded this year</p>
      )}
    </div>
  );
}
