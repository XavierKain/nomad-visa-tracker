import { useMemo } from 'react';
import { parseISO, format, startOfYear, endOfYear, eachMonthOfInterval, startOfMonth, endOfMonth, differenceInDays, max, min, eachDayOfInterval } from 'date-fns';
import type { Trip } from '../types';
import { getCountryColor } from '../utils/colors';

interface Props { trips: Trip[]; year: number }

export function Timeline({ trips, year }: Props) {
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(new Date(year, 0, 1));
  const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });

  const dayMap = useMemo(() => {
    const map = new Map<string, string>();
    const sorted = [...trips].sort((a, b) => a.entryDate.localeCompare(b.entryDate));
    for (const trip of sorted) {
      const entry = parseISO(trip.entryDate);
      const exit = parseISO(trip.exitDate);
      const s = max([entry, yearStart]);
      const e = min([exit, yearEnd]);
      if (s <= e) eachDayOfInterval({ start: s, end: e }).forEach(d => map.set(format(d, 'yyyy-MM-dd'), trip.country));
    }
    return map;
  }, [trips, year, yearStart, yearEnd]);

  const legend = useMemo(() => {
    const c = new Set<string>();
    dayMap.forEach(v => c.add(v));
    return Array.from(c).sort();
  }, [dayMap]);

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        {months.map(month => {
          const mStart = startOfMonth(month);
          const mEnd = endOfMonth(month);
          const days = differenceInDays(mEnd, mStart) + 1;
          return (
            <div key={format(month, 'MMM')} className="flex items-center gap-2">
              <span className="text-[11px] text-text-tertiary w-7 text-right flex-shrink-0">{format(month, 'MMM')}</span>
              <div className="flex-1 flex gap-[1px]">
                {Array.from({ length: days }, (_, i) => {
                  const ds = format(new Date(year, month.getMonth(), i + 1), 'yyyy-MM-dd');
                  const country = dayMap.get(ds);
                  return (
                    <div key={ds} className="flex-1 h-5 rounded-[2px]" style={{ backgroundColor: country ? getCountryColor(country) : '#12121a', minWidth: '1.5px' }}
                      title={country ? `${country} — ${format(parseISO(ds), 'MMM d')}` : format(parseISO(ds), 'MMM d')} />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {legend.length > 0 ? (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {legend.map(c => (
            <div key={c} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-[3px]" style={{ backgroundColor: getCountryColor(c) }} />
              <span className="text-[11px] text-text-tertiary">{c}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[13px] text-text-tertiary text-center">No trips in {year}</p>
      )}
    </div>
  );
}
