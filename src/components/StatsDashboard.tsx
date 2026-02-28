import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { Trip } from '../types';
import { daysPerCountryInYear } from '../utils/tax';
import { getCountryColor } from '../utils/colors';

interface Props { trips: Trip[] }

export function StatsDashboard({ trips }: Props) {
  const year = new Date().getFullYear();

  const stats = useMemo(() => {
    const countryDays = daysPerCountryInYear(trips, year);
    const totalDays = countryDays.reduce((sum, cd) => sum + cd.days, 0);
    return { countryDays, totalDays, countriesVisited: countryDays.length };
  }, [trips, year]);

  const chartData = stats.countryDays.slice(0, 8).map(cd => ({
    country: cd.country.length > 10 ? cd.country.slice(0, 9) + '…' : cd.country,
    fullName: cd.country,
    days: cd.days,
  }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface-raised rounded-2xl p-5 border border-border-subtle text-center card-glow">
          <p className="text-[32px] font-bold tracking-tight tabular-nums text-accent">{stats.countriesVisited}</p>
          <p className="text-[12px] text-text-tertiary mt-1">Countries in {year}</p>
        </div>
        <div className="bg-surface-raised rounded-2xl p-5 border border-border-subtle text-center card-glow">
          <p className="text-[32px] font-bold tracking-tight tabular-nums text-accent">{stats.totalDays}</p>
          <p className="text-[12px] text-text-tertiary mt-1">Days tracked</p>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="bg-surface-raised rounded-2xl p-5 border border-border-subtle card-glow">
          <p className="text-[13px] text-text-tertiary font-medium uppercase tracking-wider mb-4">Days per Country</p>
          <ResponsiveContainer width="100%" height={Math.max(160, chartData.length * 36)}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
              <XAxis type="number" tick={{ fill: '#55556a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="country" tick={{ fill: '#8a8a9a', fontSize: 11 }} width={80} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a25', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#ededf0', fontSize: 13 }}
                formatter={(v: number | string | undefined) => [`${v ?? 0} days`, '']}
              />
              <Bar dataKey="days" radius={[0, 6, 6, 0]}>
                {chartData.map(e => <Cell key={e.fullName} fill={getCountryColor(e.fullName)} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
