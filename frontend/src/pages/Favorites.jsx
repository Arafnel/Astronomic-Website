import { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('❌ Please sign in to view favorites');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/favorites/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      } else {
        setMessage('❌ Error loading favorites');
      }
    } catch (err) {
      setMessage('❌ Connection error');
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (objectId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8000/favorites/${objectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setMessage('✅ Removed from favorites');
        loadFavorites(); // Перезагружаем список
      } else {
        setMessage('❌ Error removing');
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
        <p className="text-xs tracking-[0.3em] uppercase text-gold-300/80">Your</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[0.18em] text-gold-100">Favorites</h1>
        <p className="mt-4 mx-auto max-w-2xl text-sm md:text-base text-gold-100/75">Saved objects you've marked as favorites.</p>
      </section>

      {message && (
        <div className={`mb-6 rounded-2xl border border-gold-500/40 px-6 py-3 text-center ${message.includes('✅') ? 'bg-green-900/30 text-green-200' : 'bg-red-900/30 text-red-300'}`}>
          {message}
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="rounded-2xl border border-gold-500/40 bg-black/40 px-6 py-10 text-center text-sm text-gold-100/75">
          <p>No favorites yet</p>
          <p className="opacity-70 mt-2">Add objects to favorites from the catalog page</p>
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map(fav => (
            <div key={fav.id} className="rounded-2xl border border-gold-500/30 bg-black/40 p-4 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              <h3 className="text-lg font-semibold text-gold-100">{fav.astronomic_object?.name || 'Unknown object'}</h3>
              <p className="mt-2 text-sm text-gold-100/75">{fav.astronomic_object?.short_description || fav.astronomic_object?.description || 'No description'}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-gold-800/20 px-3 py-1 text-xs text-gold-200">{fav.astronomic_object?.type || 'unknown'}</span>
                <button onClick={() => removeFavorite(fav.object_id)} className="rounded-md bg-rose-500 px-3 py-1 text-sm text-white">Remove</button>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Favorites;