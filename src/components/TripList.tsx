import { useState } from 'react';
import { format, parseISO, differenceInDays } from 'date-fns';
import type { Trip } from '../types';
import { TripForm } from './TripForm';
import { isSchengenCountry } from '../utils/schengen';
import { getCountryColor } from '../utils/colors';

interface Props {
  trips: Trip[];
  onUpdate: (trip: Trip) => void;
  onDelete: (id: string) => void;
}

export function TripList({ trips, onUpdate, onDelete }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const sorted = [...trips].sort((a, b) => b.entryDate.localeCompare(a.entryDate));

  return (
    <div className="space-y-2">
      {sorted.map(trip =>
        editingId === trip.id ? (
          <TripForm key={trip.id} initialTrip={trip} onSubmit={() => {}} onSubmitEdit={u => { onUpdate(u); setEditingId(null); }} onCancel={() => setEditingId(null)} />
        ) : (
          <div key={trip.id} className="bg-surface-raised rounded-xl p-4 border border-border-subtle flex items-center justify-between gap-3 card-glow group">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: getCountryColor(trip.country) }} />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[14px] font-medium text-text-primary">{trip.country}</span>
                  {isSchengenCountry(trip.country) && (
                    <span className="text-[10px] bg-accent-soft text-accent px-1.5 py-0.5 rounded-md font-medium">SCH</span>
                  )}
                  {trip.country === 'United States' && (
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded-md font-medium">US</span>
                  )}
                </div>
                <p className="text-[12px] text-text-tertiary mt-0.5">
                  {format(parseISO(trip.entryDate), 'MMM d')} → {format(parseISO(trip.exitDate), 'MMM d, yyyy')}
                  <span className="ml-1.5 text-text-tertiary/60">{differenceInDays(parseISO(trip.exitDate), parseISO(trip.entryDate)) + 1}d</span>
                </p>
                {trip.notes && <p className="text-[12px] text-text-tertiary/60 mt-0.5">{trip.notes}</p>}
              </div>
            </div>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <button onClick={() => setEditingId(trip.id)} className="text-[12px] text-text-tertiary hover:text-accent transition-colors cursor-pointer">Edit</button>
              <button onClick={() => onDelete(trip.id)} className="text-[12px] text-text-tertiary hover:text-danger transition-colors cursor-pointer">Delete</button>
            </div>
          </div>
        )
      )}
      {trips.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-tertiary text-[15px]">No trips yet</p>
          <p className="text-text-tertiary/60 text-[13px] mt-1">Add your first trip to start tracking</p>
        </div>
      )}
    </div>
  );
}
