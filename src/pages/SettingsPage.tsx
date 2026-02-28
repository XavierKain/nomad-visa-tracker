import { useState } from 'react';
import { useTripsContext } from '../context/TripsContext';
import { DEMO_TRIPS } from '../data/demo';

export function SettingsPage() {
  const { trips, addTrip, clearTrips, importTrips } = useTripsContext();
  const [showConfirm, setShowConfirm] = useState<'demo' | 'clear' | null>(null);
  const [exportMsg, setExportMsg] = useState('');

  function handleLoadDemo() {
    DEMO_TRIPS.forEach(t => addTrip(t));
    setShowConfirm(null);
  }

  function handleClear() {
    clearTrips();
    setShowConfirm(null);
  }

  function handleExport() {
    const json = JSON.stringify(trips, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nomad-trips-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportMsg('Exported!');
    setTimeout(() => setExportMsg(''), 2000);
  }

  function handleImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        if (!Array.isArray(data)) throw new Error('Invalid format');
        importTrips(data);
      } catch {
        alert('Invalid JSON file');
      }
    };
    input.click();
  }

  const btnCls = 'w-full text-left bg-surface-overlay hover:bg-surface-overlay/80 border border-border-subtle rounded-xl px-4 py-3.5 transition-colors cursor-pointer group';

  return (
    <div className="space-y-6">
      <p className="text-[13px] text-text-tertiary font-medium uppercase tracking-wider">Settings</p>

      <div className="bg-surface-raised rounded-2xl border border-border-subtle divide-y divide-border-subtle overflow-hidden">
        {/* Demo data */}
        <div className="p-1.5">
          {showConfirm === 'demo' ? (
            <div className="px-3 py-3 flex items-center justify-between">
              <p className="text-[13px] text-text-secondary">Load 12 demo trips? (adds to existing)</p>
              <div className="flex gap-2">
                <button onClick={handleLoadDemo} className="bg-accent hover:bg-accent/90 text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold cursor-pointer">Load</button>
                <button onClick={() => setShowConfirm(null)} className="bg-surface-overlay text-text-tertiary px-3 py-1.5 rounded-lg text-[12px] cursor-pointer">Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowConfirm('demo')} className={btnCls}>
              <p className="text-[14px] text-text-primary font-medium">Load demo data</p>
              <p className="text-[12px] text-text-tertiary mt-0.5">Add sample trips to see the app in action</p>
            </button>
          )}
        </div>

        {/* Import */}
        <div className="p-1.5">
          <button onClick={handleImport} className={btnCls}>
            <p className="text-[14px] text-text-primary font-medium">Import trips</p>
            <p className="text-[12px] text-text-tertiary mt-0.5">Load from a JSON file</p>
          </button>
        </div>

        {/* Export */}
        <div className="p-1.5">
          <button onClick={handleExport} className={btnCls}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] text-text-primary font-medium">Export trips</p>
                <p className="text-[12px] text-text-tertiary mt-0.5">Download as JSON ({trips.length} trips)</p>
              </div>
              {exportMsg && <span className="text-[12px] text-success font-medium">{exportMsg}</span>}
            </div>
          </button>
        </div>

        {/* Clear */}
        <div className="p-1.5">
          {showConfirm === 'clear' ? (
            <div className="px-3 py-3 flex items-center justify-between">
              <p className="text-[13px] text-danger">Delete all {trips.length} trips?</p>
              <div className="flex gap-2">
                <button onClick={handleClear} className="bg-danger hover:bg-danger/90 text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold cursor-pointer">Delete all</button>
                <button onClick={() => setShowConfirm(null)} className="bg-surface-overlay text-text-tertiary px-3 py-1.5 rounded-lg text-[12px] cursor-pointer">Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowConfirm('clear')} className={btnCls}>
              <p className="text-[14px] text-danger font-medium">Clear all data</p>
              <p className="text-[12px] text-text-tertiary mt-0.5">Remove all trips from localStorage</p>
            </button>
          )}
        </div>
      </div>

      <div className="text-center">
        <p className="text-[11px] text-text-tertiary/50">Nomad Visa Tracker · All data stored locally</p>
      </div>
    </div>
  );
}
