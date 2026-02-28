import { useState, useCallback } from 'react';
import type { Trip } from '../types';

const STORAGE_KEY = 'nomad-trips';

function loadTrips(): Trip[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveTrips(trips: Trip[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>(loadTrips);

  const addTrip = useCallback((trip: Omit<Trip, 'id'>) => {
    const newTrip: Trip = { ...trip, id: crypto.randomUUID() };
    setTrips(prev => {
      const updated = [...prev, newTrip];
      saveTrips(updated);
      return updated;
    });
  }, []);

  const updateTrip = useCallback((trip: Trip) => {
    setTrips(prev => {
      const updated = prev.map(t => t.id === trip.id ? trip : t);
      saveTrips(updated);
      return updated;
    });
  }, []);

  const deleteTrip = useCallback((id: string) => {
    setTrips(prev => {
      const updated = prev.filter(t => t.id !== id);
      saveTrips(updated);
      return updated;
    });
  }, []);

  return { trips, addTrip, updateTrip, deleteTrip };
}
