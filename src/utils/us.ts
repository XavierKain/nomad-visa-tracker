import { subDays, eachDayOfInterval, format, parseISO, max, min } from 'date-fns';
import type { Trip } from '../types';

export function usDaysUsed(trips: Trip[], referenceDate: Date): number {
  const windowStart = subDays(referenceDate, 179);
  const usDays = new Set<string>();

  for (const trip of trips) {
    if (trip.country !== 'United States') continue;

    const entry = parseISO(trip.entryDate);
    const exit = parseISO(trip.exitDate);

    const overlapStart = max([entry, windowStart]);
    const overlapEnd = min([exit, referenceDate]);

    if (overlapStart <= overlapEnd) {
      eachDayOfInterval({ start: overlapStart, end: overlapEnd })
        .forEach(d => usDays.add(format(d, 'yyyy-MM-dd')));
    }
  }

  return usDays.size;
}
