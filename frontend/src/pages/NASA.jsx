import { useState, useEffect } from 'react';

const NASA = () => {
  const [apod, setApod] = useState(null);
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8000/nasa/apod').then(res => res.json()),
      fetch('http://localhost:8000/nasa/neo').then(res => res.json())
    ]).then(([apodData, neoData]) => {
      setApod(apodData);
      setAsteroids(neoData.objects || []);
      setLoading(false);
    }).catch(err => {
      console.error('NASA API error:', err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>🚀 Загрузка данных NASA...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🚀 NASA Data</h1>
      
      {/* Astronomy Picture of the Day */}
      {apod && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>📸 Астрономическая картинка дня</h2>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px' }}>
            <h3>{apod.title}</h3>
            <p style={{ opacity: 0.8, marginBottom: '15px' }}>{apod.date}</p>
            {apod.media_type === 'image' && (
              <img 
                src={apod.url} 
                alt={apod.title}
                style={{ width: '100%', maxWidth: '600px', borderRadius: '10px', marginBottom: '15px' }}
              />
            )}
            <p>{apod.explanation}</p>
          </div>
        </div>
      )}

      {/* Near Earth Objects */}
      <div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>☄️ Астероиды рядом с Землей</h2>
        {asteroids.length === 0 ? (
          <p>Данные об астероидах недоступны</p>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {asteroids.map((asteroid, index) => (
              <div key={index} style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '15px', 
                borderRadius: '10px',
                border: asteroid.is_potentially_hazardous ? '2px solid #ff6b6b' : 'none'
              }}>
                <h4>{asteroid.name}</h4>
                <p>📏 Диаметр: ~{asteroid.diameter_km?.toFixed(2)} км</p>
                <p>📅 Сближение: {asteroid.close_approach_date}</p>
                {asteroid.is_potentially_hazardous && (
                  <span style={{ 
                    background: '#ff6b6b', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '12px', 
                    fontSize: '0.8rem' 
                  }}>
                    ⚠️ Потенциально опасный
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NASA;