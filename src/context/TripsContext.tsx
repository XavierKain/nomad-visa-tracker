import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Trip } from '../types';
import { useTrips } from '../hooks/useTrips';

interface TripsContextType {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
}

const TripsContext = createContext<TripsContextType | null>(null);

export function TripsProvider({ children }: { children: ReactNode }) {
  const tripsState = useTrips();
  return (
    <TripsContext.Provider value={tripsState}>
      {children}
    </TripsContext.Provider>
  );
}

export function useTripsContext() {
  const ctx = useContext(TripsContext);
  if (!ctx) throw new Error('useTripsContext must be used within TripsProvider');
  return ctx;
}
