import type { Trip } from '../types';

export const DEMO_TRIPS: Omit<Trip, 'id'>[] = [
  { country: 'Portugal', entryDate: '2025-09-01', exitDate: '2025-11-15', notes: 'Lisbon coworking' },
  { country: 'Spain', entryDate: '2025-11-16', exitDate: '2025-12-20', notes: 'Barcelona' },
  { country: 'France', entryDate: '2025-12-21', exitDate: '2026-01-05', notes: 'Holidays' },
  { country: 'Thailand', entryDate: '2026-01-10', exitDate: '2026-02-15', notes: 'Chiang Mai' },
  { country: 'United States', entryDate: '2026-02-20', exitDate: '2026-03-10', notes: 'NYC client meeting' },
  { country: 'Germany', entryDate: '2026-03-15', exitDate: '2026-04-05', notes: 'Berlin' },
  { country: 'Croatia', entryDate: '2026-04-10', exitDate: '2026-05-20', notes: 'Split / remote work' },
  { country: 'Italy', entryDate: '2026-05-22', exitDate: '2026-06-10', notes: 'Rome' },
  { country: 'Mexico', entryDate: '2026-06-15', exitDate: '2026-07-20', notes: 'CDMX / Playa del Carmen' },
  { country: 'Portugal', entryDate: '2026-08-01', exitDate: '2026-08-25', notes: 'Porto' },
  { country: 'Netherlands', entryDate: '2026-09-01', exitDate: '2026-09-20', notes: 'Amsterdam' },
  { country: 'United States', entryDate: '2026-10-01', exitDate: '2026-10-25', notes: 'SF / LA' },
];
