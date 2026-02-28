import { useState, useCallback } from 'react';
import type { Trip } from '../types';

const STORAGE_KEY = 'nomad-trips';

function loadTrips(): Trip[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveTrips(trips: Trip[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>(loadTrips);

  const addTrip = useCallback((trip: Omit<Trip, 'id'>) => {
    const newTrip: Trip = { ...trip, id: crypto.randomUUID() };
    setTrips(prev => { const u = [...prev, newTrip]; saveTrips(u); return u; });
  }, []);

  const updateTrip = useCallback((trip: Trip) => {
    setTrips(prev => { const u = prev.map(t => t.id === trip.id ? trip : t); saveTrips(u); return u; });
  }, []);

  const deleteTrip = useCallback((id: string) => {
    setTrips(prev => { const u = prev.filter(t => t.id !== id); saveTrips(u); return u; });
  }, []);

  const clearTrips = useCallback(() => {
    setTrips([]); saveTrips([]);
  }, []);

  const importTrips = useCallback((data: Trip[]) => {
    setTrips(prev => {
      const merged = [...prev];
      for (const t of data) {
        if (!merged.find(e => e.id === t.id)) {
          merged.push({ ...t, id: t.id || crypto.randomUUID() });
        }
      }
      saveTrips(merged);
      return merged;
    });
  }, []);

  return { trips, addTrip, updateTrip, deleteTrip, clearTrips, importTrips };
}
