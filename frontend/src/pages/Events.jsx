import { useState, useEffect } from 'react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Загружаем события...');
    fetch('http://localhost:8000/events/')
      .then(res => {
        console.log('Ответ получен:', res.status);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Данные получены:', data);
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка:', err);
        setError(`Ошибка: ${err.message}`);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>⏳ Загрузка...</div>;
  if (error) return <div style={{ padding: '20px', textAlign: 'center', color: '#ff6b6b' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>📅 Астрономические события</h1>
      
      {events.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Событий нет. Добавьте события через API.</p>
          <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>POST http://localhost:8000/events/</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {events.map(event => (
            <div key={event.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px' }}>
              <h3>{event.title}</h3>
              <p>📅 {formatDate(event.date)}</p>
              {event.description && <p>{event.description}</p>}
              <div style={{ marginTop: '10px' }}>
                <span style={{ background: '#667eea', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem' }}>
                  {event.type}
                </span>
                {event.visibility && (
                  <span style={{ marginLeft: '10px', opacity: 0.7, fontSize: '0.8rem' }}>
                    👁️ {event.visibility}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;