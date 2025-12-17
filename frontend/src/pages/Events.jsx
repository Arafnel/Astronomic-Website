import { useState, useEffect } from 'react';
import EventCard from '../components/UI/EventCard.jsx';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch('http://localhost:8000/nasa/neo');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const neoEvents = (data.objects || []).map((a) => ({
          id: a.name,
          title: a.name,
          date: a.close_approach_date,
          type: 'asteroid_pass',
          visibility: 'near_earth',
          description: `Diameter ~${a.diameter_km?.toFixed(2)} km. Potentially hazardous: ${
            a.is_potentially_hazardous ? 'yes' : 'no'
          }.`,
        }));
        setEvents(neoEvents);
      } catch (err) {
        console.error('Failed to load NASA events:', err);
        setError('Unable to load NASA events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US');
  };

  if (loading) return <div className="py-10 text-center text-gold-100">⏳ Loading events...</div>;
  if (error) return <div className="py-10 text-center text-red-400">{error}</div>;

  return (
    <main className="relative mx-auto max-w-5xl px-6 py-16">
      <section className="mb-12 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold-300/80">
          Catalog
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[0.18em] text-gold-100">
          Astronomic Events
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-sm md:text-base text-gold-100/75">
          A selection of upcoming eclipses, meteor showers and other celestial events.
        </p>
      </section>
      
      {events.length === 0 ? (
        <div className="rounded-2xl border border-gold-500/40 bg-black/40 px-6 py-10 text-center text-sm text-gold-100/75">
          <p>NASA event data is unavailable.</p>
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </section>
      )}
    </main>
  );
};

export default Events;