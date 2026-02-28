import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { Trip } from '../types';
import { daysPerCountryInYear } from '../utils/tax';
import { getCountryColor } from '../utils/colors';

interface Props {
  trips: Trip[];
}

export function StatsDashboard({ trips }: Props) {
  const year = new Date().getFullYear();

  const stats = useMemo(() => {
    const countryDays = daysPerCountryInYear(trips, year);
    const totalDays = countryDays.reduce((sum, cd) => sum + cd.days, 0);
    const countriesVisited = countryDays.length;
    return { countryDays, totalDays, countriesVisited };
  }, [trips, year]);

  const chartData = stats.countryDays.slice(0, 10).map(cd => ({
    country: cd.country.length > 12 ? cd.country.slice(0, 11) + '…' : cd.country,
    fullName: cd.country,
    days: cd.days,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 text-center">
          <p className="text-3xl font-bold text-violet-400">{stats.countriesVisited}</p>
          <p className="text-sm text-slate-400 mt-1">Countries in {year}</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 text-center">
          <p className="text-3xl font-bold text-violet-400">{stats.totalDays}</p>
          <p className="text-sm text-slate-400 mt-1">Days tracked in {year}</p>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Days per Country</h3>
          <ResponsiveContainer width="100%" height={Math.max(200, chartData.length * 40)}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20, top: 0, bottom: 0 }}>
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="country"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                width={90}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
                formatter={(value: number | string | undefined) => [
                  `${value ?? 0} days`,
                  '',
                ]}
              />
              <Bar dataKey="days" radius={[0, 4, 4, 0]}>
                {chartData.map((entry) => (
                  <Cell key={entry.fullName} fill={getCountryColor(entry.fullName)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
