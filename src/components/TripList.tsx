import { useState } from 'react';
import { format, parseISO, differenceInDays } from 'date-fns';
import type { Trip } from '../types';
import { TripForm } from './TripForm';
import { isSchengenCountry } from '../utils/schengen';
import { getCountryColor } from '../utils/colors';

interface TripListProps {
  trips: Trip[];
  onUpdate: (trip: Trip) => void;
  onDelete: (id: string) => void;
}

export function TripList({ trips, onUpdate, onDelete }: TripListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const sorted = [...trips].sort((a, b) => b.entryDate.localeCompare(a.entryDate));

  return (
    <div className="space-y-3">
      {sorted.map(trip =>
        editingId === trip.id ? (
          <TripForm
            key={trip.id}
            initialTrip={trip}
            onSubmit={() => {}}
            onSubmitEdit={(updated) => {
              onUpdate(updated);
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <div
            key={trip.id}
            className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-start sm:items-center justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getCountryColor(trip.country) }}
                />
                <span className="font-medium text-slate-100">{trip.country}</span>
                {isSchengenCountry(trip.country) && (
                  <span className="text-xs bg-violet-600/20 text-violet-300 px-2 py-0.5 rounded-full">
                    Schengen
                  </span>
                )}
                {trip.country === 'United States' && (
                  <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-0.5 rounded-full">
                    US
                  </span>
                )}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                {format(parseISO(trip.entryDate), 'MMM d, yyyy')} →{' '}
                {format(parseISO(trip.exitDate), 'MMM d, yyyy')}
                <span className="ml-2 text-slate-500">
                  ({differenceInDays(parseISO(trip.exitDate), parseISO(trip.entryDate)) + 1}d)
                </span>
              </div>
              {trip.notes && (
                <div className="text-sm text-slate-500 mt-1">{trip.notes}</div>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setEditingId(trip.id)}
                className="text-sm text-slate-400 hover:text-violet-400 transition-colors cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(trip.id)}
                className="text-sm text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        )
      )}
      {trips.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">No trips yet</p>
          <p className="text-slate-600 text-sm mt-1">Add your first trip above to start tracking</p>
        </div>
      )}
    </div>
  );
}
