import { useState, useEffect } from 'react';

const Objects = () => {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/nasa/objects')
      .then(res => res.json())
      .then(data => {
        setObjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setMessage('Ошибка загрузки данных');
        setObjects([]);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = async (obj) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('❌ Войдите в систему для добавления в избранное');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      const nasaId = obj.nasa_id;
      const response = await fetch(`http://localhost:8000/nasa/objects/${nasaId}/favorite`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setMessage('✅ Добавлено в избранное!');
      } else {
        const data = await response.json();
        setMessage('❌ ' + (data.detail || 'Ошибка добавления в избранное'));
      }
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Ошибка соединения');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>⏳ Загрузка...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🪐 Каталог объектов</h1>
      
      {message && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          borderRadius: '8px', 
          background: message.includes('✅') ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
      
      {objects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>База данных пуста. Добавьте объекты через API.</p>
          <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>POST http://localhost:8000/objects/</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {objects.map(obj => (
            <div key={obj.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px' }}>
              <h3>{obj.name}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '10px' }}>
                {obj.is_potentially_hazardous ? '⚠️ Потенциально опасный' : '✅ Безопасный'}
              </p>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ background: '#667eea', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem' }}>
                    {obj.type}
                  </span>
                  {obj.diameter_km && (
                    <span style={{ marginLeft: '10px', opacity: 0.7, fontSize: '0.8rem' }}>
                      📏 {obj.diameter_km} км
                    </span>
                  )}
                  {obj.magnitude && (
                    <span style={{ marginLeft: '10px', opacity: 0.7, fontSize: '0.8rem' }}>
                      ✨ {obj.magnitude}
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => toggleFavorite(obj)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#ff6b6b'
                  }}
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Objects;