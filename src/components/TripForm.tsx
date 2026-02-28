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
    if (!initialTrip) { setCountry(''); setEntryDate(''); setExitDate(''); setNotes(''); }
  }

  const inputCls = 'w-full bg-surface-overlay border border-border-default rounded-xl px-3 py-2.5 text-[14px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors';

  return (
    <form onSubmit={handleSubmit} className="bg-surface-raised rounded-2xl p-5 border border-border-subtle">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[12px] font-medium text-text-tertiary mb-1.5 uppercase tracking-wider">Country</label>
          <input list="countries" value={country} onChange={e => setCountry(e.target.value)} placeholder="Select country" className={inputCls} required />
          <datalist id="countries">{COUNTRIES.map(c => <option key={c} value={c} />)}</datalist>
        </div>
        <div>
          <label className="block text-[12px] font-medium text-text-tertiary mb-1.5 uppercase tracking-wider">Entry</label>
          <input type="date" value={entryDate} onChange={e => setEntryDate(e.target.value)} className={inputCls} required />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-text-tertiary mb-1.5 uppercase tracking-wider">Exit</label>
          <input type="date" value={exitDate} onChange={e => setExitDate(e.target.value)} min={entryDate} className={inputCls} required />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-text-tertiary mb-1.5 uppercase tracking-wider">Notes</label>
          <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Optional" className={inputCls} />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-accent hover:bg-accent/90 text-white px-5 py-2 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer">
          {initialTrip ? 'Update' : 'Add Trip'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-surface-overlay hover:bg-surface-overlay/80 text-text-secondary px-4 py-2 rounded-xl text-[13px] transition-colors cursor-pointer">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
