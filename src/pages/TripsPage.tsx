import { useTripsContext } from '../context/TripsContext';
import { TripForm } from '../components/TripForm';
import { TripList } from '../components/TripList';

export function TripsPage() {
  const { trips, addTrip, updateTrip, deleteTrip } = useTripsContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-100">Trips</h2>
      <TripForm onSubmit={addTrip} />
      <TripList trips={trips} onUpdate={updateTrip} onDelete={deleteTrip} />
    </div>
  );
}
