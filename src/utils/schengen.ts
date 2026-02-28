import { subDays, eachDayOfInterval, format, parseISO, max, min } from 'date-fns';
import type { Trip } from '../types';
import { SCHENGEN_COUNTRIES } from '../data/countries';

export function isSchengenCountry(country: string): boolean {
  return (SCHENGEN_COUNTRIES as readonly string[]).includes(country);
}

export function schengenDaysUsed(trips: Trip[], referenceDate: Date): number {
  const windowStart = subDays(referenceDate, 179);
  const schengenDays = new Set<string>();

  for (const trip of trips) {
    if (!isSchengenCountry(trip.country)) continue;

    const entry = parseISO(trip.entryDate);
    const exit = parseISO(trip.exitDate);

    const overlapStart = max([entry, windowStart]);
    const overlapEnd = min([exit, referenceDate]);

    if (overlapStart <= overlapEnd) {
      eachDayOfInterval({ start: overlapStart, end: overlapEnd })
        .forEach(d => schengenDays.add(format(d, 'yyyy-MM-dd')));
    }
  }

  return schengenDays.size;
}

export function schengenTripsInWindow(trips: Trip[], referenceDate: Date): Trip[] {
  const windowStart = subDays(referenceDate, 179);
  return trips.filter(trip => {
    if (!isSchengenCountry(trip.country)) return false;
    const entry = parseISO(trip.entryDate);
    const exit = parseISO(trip.exitDate);
    return exit >= windowStart && entry <= referenceDate;
  });
}
