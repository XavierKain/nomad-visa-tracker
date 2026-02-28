import { useMemo } from 'react';
import {
  parseISO, format, startOfYear, endOfYear,
  eachMonthOfInterval, startOfMonth, endOfMonth,
  differenceInDays, max, min, eachDayOfInterval,
} from 'date-fns';
import type { Trip } from '../types';
import { getCountryColor } from '../utils/colors';

interface Props {
  trips: Trip[];
  year: number;
}

interface DayEntry {
  date: string;
  country: string;
}

export function Timeline({ trips, year }: Props) {
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(new Date(year, 0, 1));
  const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });

  const dayMap = useMemo(() => {
    const map = new Map<string, DayEntry>();
    const sorted = [...trips].sort((a, b) => a.entryDate.localeCompare(b.entryDate));

    for (const trip of sorted) {
      const entry = parseISO(trip.entryDate);
      const exit = parseISO(trip.exitDate);
      const overlapStart = max([entry, yearStart]);
      const overlapEnd = min([exit, yearEnd]);

      if (overlapStart <= overlapEnd) {
        eachDayOfInterval({ start: overlapStart, end: overlapEnd }).forEach(d => {
          const key = format(d, 'yyyy-MM-dd');
          map.set(key, { date: key, country: trip.country });
        });
      }
    }
    return map;
  }, [trips, year, yearStart, yearEnd]);

  const legendCountries = useMemo(() => {
    const countries = new Set<string>();
    dayMap.forEach(entry => countries.add(entry.country));
    return Array.from(countries).sort();
  }, [dayMap]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {months.map(month => {
          const monthStart = startOfMonth(month);
          const monthEnd = endOfMonth(month);
          const daysInMonth = differenceInDays(monthEnd, monthStart) + 1;

          return (
            <div key={format(month, 'MMM')} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-8 text-right flex-shrink-0">
                {format(month, 'MMM')}
              </span>
              <div className="flex-1 flex gap-px">
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const dayStr = format(
                    new Date(year, month.getMonth(), i + 1),
                    'yyyy-MM-dd'
                  );
                  const entry = dayMap.get(dayStr);
                  return (
                    <div
                      key={dayStr}
                      className="flex-1 h-6 rounded-sm transition-colors"
                      style={{
                        backgroundColor: entry
                          ? getCountryColor(entry.country)
                          : '#1e293b',
                        minWidth: '2px',
                      }}
                      title={
                        entry
                          ? `${entry.country} — ${format(parseISO(dayStr), 'MMM d')}`
                          : format(parseISO(dayStr), 'MMM d')
                      }
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {legendCountries.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {legendCountries.map(country => (
            <div key={country} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: getCountryColor(country) }}
              />
              <span className="text-xs text-slate-400">{country}</span>
            </div>
          ))}
        </div>
      )}

      {legendCountries.length === 0 && (
        <p className="text-sm text-slate-500 text-center">No trips in {year}</p>
      )}
    </div>
  );
}
