import { parseISO, eachDayOfInterval, format, startOfYear, endOfYear, max, min } from 'date-fns';
import type { Trip } from '../types';

export interface CountryDays {
  country: string;
  days: number;
}

export function daysPerCountryInYear(trips: Trip[], year: number): CountryDays[] {
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(new Date(year, 0, 1));
  const today = new Date();
  const effectiveEnd = min([yearEnd, today]);

  const countryDaysMap = new Map<string, Set<string>>();

  for (const trip of trips) {
    const entry = parseISO(trip.entryDate);
    const exit = parseISO(trip.exitDate);

    const overlapStart = max([entry, yearStart]);
    const overlapEnd = min([exit, effectiveEnd]);

    if (overlapStart <= overlapEnd) {
      if (!countryDaysMap.has(trip.country)) {
        countryDaysMap.set(trip.country, new Set());
      }
      const daySet = countryDaysMap.get(trip.country)!;
      eachDayOfInterval({ start: overlapStart, end: overlapEnd })
        .forEach(d => daySet.add(format(d, 'yyyy-MM-dd')));
    }
  }

  return Array.from(countryDaysMap.entries())
    .map(([country, daySet]) => ({ country, days: daySet.size }))
    .sort((a, b) => b.days - a.days);
}

export function taxResidencyWarnings(trips: Trip[], year: number): CountryDays[] {
  return daysPerCountryInYear(trips, year).filter(cd => cd.days >= 183);
}
