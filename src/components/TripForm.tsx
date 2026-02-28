import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Trip } from '../types';
import { COUNTRIES } from '../data/countries';

interface TripFormProps {
  onSubmit: (trip: Omit<Trip, 'id'>) => void;
  onSubmitEdit?: (trip: Trip) => void;
  initialTrip?: Trip;
  onCancel?: () => void;
}

export function TripForm({ onSubmit, onSubmitEdit, initialTrip, onCancel }: TripFormProps) {
  const [country, setCountry] = useState(initialTrip?.country ?? '');
  const [entryDate, setEntryDate] = useState(initialTrip?.entryDate ?? '');
  const [exitDate, setExitDate] = useState(initialTrip?.exitDate ?? '');
  const [notes, setNotes] = useState(initialTrip?.notes ?? '');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!country || !entryDate || !exitDate) return;

    if (initialTrip && onSubmitEdit) {
      onSubmitEdit({ ...initialTrip, country, entryDate, exitDate, notes });
    } else {
      onSubmit({ country, entryDate, exitDate, notes });
    }

    if (!initialTrip) {
      setCountry('');
      setEntryDate('');
      setExitDate('');
      setNotes('');
    }
  }

  const inputClass = 'w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500';

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Country</label>
          <input
            list="countries"
            value={country}
            onChange={e => setCountry(e.target.value)}
            placeholder="Select or type a country"
            className={inputClass}
            required
          />
          <datalist id="countries">
            {COUNTRIES.map(c => <option key={c} value={c} />)}
          </datalist>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Entry Date</label>
          <input
            type="date"
            value={entryDate}
            onChange={e => setEntryDate(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Exit Date</label>
          <input
            type="date"
            value={exitDate}
            onChange={e => setExitDate(e.target.value)}
            min={entryDate}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Notes</label>
          <input
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Optional notes"
            className={inputClass}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-md font-medium transition-colors cursor-pointer"
        >
          {initialTrip ? 'Update Trip' : 'Add Trip'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded-md transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
