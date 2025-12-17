import { useState, useEffect } from 'react';

const NASA = () => {
  const [apod, setApod] = useState(null);
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadNasa = async () => {
      try {
        const [apodRes, neoRes] = await Promise.all([
          fetch('http://localhost:8000/nasa/apod'),
          fetch('http://localhost:8000/nasa/neo'),
        ]);

        if (!apodRes.ok || !neoRes.ok) {
          throw new Error('NASA API returned an error');
        }

        const apodData = await apodRes.json();
        const neoData = await neoRes.json();

      setApod(apodData);
      setAsteroids(neoData.objects || []);
      } catch (err) {
      console.error('NASA API error:', err);
        setError('Failed to load NASA data. Please try refreshing the page later.');
      } finally {
      setLoading(false);
      }
    };

    loadNasa();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-gold-100">
        🚀 Loading NASA data...
      </div>
    );
  }

  return (
    <main className="relative mx-auto max-w-5xl px-6 py-16">
      <section className="mb-10 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold-300/80">
          NASA
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[0.18em] text-gold-100">
          Deep Space Insights
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-sm md:text-base text-gold-100/75">
          A collection of current NASA data: the Astronomy Picture of the Day and
          near-Earth asteroids.
        </p>
      </section>

      {error && (
        <div className="mb-8 rounded-2xl border border-red-400/50 bg-black/40 px-6 py-4 text-sm text-red-200">
          {error}
        </div>
      )}
      
      
      {apod && (
        <section className="mb-10 rounded-2xl border border-gold-500/60 bg-black/40 p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-sm">
          <h2 className="text-xl font-semibold tracking-wide text-gold-100 mb-3">
            📸 Astronomy Picture of the Day
          </h2>
          <p className="text-xs text-gold-200/70 mb-3">{apod.date}</p>
            {apod.media_type === 'image' && (
              <img 
                src={apod.url} 
                alt={apod.title}
              className="mb-4 max-h-[400px] w-full rounded-xl object-cover"
              />
            )}
          <h3 className="text-lg font-medium text-gold-100 mb-2">{apod.title}</h3>
          <p className="text-sm leading-relaxed text-gold-100/80">
            {apod.explanation}
          </p>
        </section>
      )}

      
      <section>
        <h2 className="mb-4 text-xl font-semibold tracking-wide text-gold-100">
          ☄️ Near-Earth Asteroids
        </h2>
        {asteroids.length === 0 ? (
          <p className="text-sm text-gold-100/70">
            Asteroid data is unavailable.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {asteroids.map((asteroid, index) => (
              <div
                key={index}
                className={`rounded-2xl border px-5 py-4 text-sm shadow-[0_0_30px_rgba(0,0,0,0.7)] ${
                  asteroid.is_potentially_hazardous
                    ? 'border-red-400/70 bg-black/60'
                    : 'border-gold-500/40 bg-black/40'
                }`}
              >
                <h4 className="mb-1 text-base font-medium text-gold-100">
                  {asteroid.name}
                </h4>
                <p className="text-gold-100/80">
                  📏 Diameter: ~{asteroid.diameter_km?.toFixed(2)} km
                </p>
                <p className="text-gold-100/80">
                  📅 Close approach: {asteroid.close_approach_date}
                </p>
                {asteroid.is_potentially_hazardous && (
                  <span className="mt-2 inline-block rounded-full bg-red-500 px-3 py-1 text-[0.75rem] font-medium text-white">
                    ⚠️ Potentially hazardous
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default NASA;