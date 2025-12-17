import { useState, useEffect } from 'react';

const Objects = () => {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/objects/')
      .then(res => res.json())
      .then(data => {
        setObjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setMessage('Error loading data');
        setObjects([]);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = async (obj) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('❌ Please log in to add favorites');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/favorites/${obj.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setMessage('✅ Added to favorites!');
      } else {
        const data = await response.json();
        setMessage('❌ ' + (data.detail || 'Error adding to favorites'));
      }
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Connection error');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="py-10 text-center text-gold-100">⏳ Loading...</div>;

  return (
    <main className="relative mx-auto max-w-6xl px-6 py-16">
      <section className="mb-8 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold-300/80">Catalog</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[0.18em] text-gold-100">Object Catalog</h1>
        <p className="mt-4 mx-auto max-w-2xl text-sm md:text-base text-gold-100/75">Browse planets, stars, nebulae and galaxies. Click ❤️ to add to favorites.</p>
      </section>

      {message && (
        <div className={`mb-6 rounded-2xl border border-gold-500/40 px-6 py-3 text-center ${message.includes('✅') ? 'bg-green-900/30 text-green-200' : 'bg-red-900/30 text-red-300'}`}>
          {message}
        </div>
      )}

      {objects.length === 0 ? (
        <div className="rounded-2xl border border-gold-500/40 bg-black/40 px-6 py-10 text-center text-sm text-gold-100/75">
          <p>The database is empty. Add objects via the API.</p>
          <p className="opacity-70 text-sm mt-2">POST http://localhost:8000/objects/</p>
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {objects.map(obj => (
            <div key={obj.id} className="rounded-2xl border border-gold-500/30 bg-black/40 p-4 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              {obj.image_url && (
                <img src={obj.image_url} alt={obj.name} className="mb-4 w-full rounded-lg object-cover" style={{ height: 200 }} />
              )}
              <h3 className="text-lg font-semibold text-gold-100">{obj.name}</h3>
              {obj.short_description && (
                <p className="mt-2 text-sm text-gold-100/75">{obj.short_description}</p>
              )}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-gold-800/20 px-3 py-1 text-xs text-gold-200">{obj.type}</span>
                  {obj.diameter_km && <span className="text-sm opacity-70">📏 {obj.diameter_km} km</span>}
                </div>
                <button onClick={() => toggleFavorite(obj)} className="text-2xl text-rose-400 hover:scale-105 transition-transform">❤️</button>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Objects;