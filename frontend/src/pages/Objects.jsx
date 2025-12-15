import { useState, useEffect } from 'react';

const Objects = () => {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Загружаем объекты...');
    fetch('http://localhost:8000/objects/')
      .then(res => {
        console.log('Ответ получен:', res.status);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Данные получены:', data);
        setObjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка:', err);
        setError(`Ошибка: ${err.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>⏳ Загрузка...</div>;
  if (error) return <div style={{ padding: '20px', textAlign: 'center', color: '#ff6b6b' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🪐 Каталог объектов</h1>
      
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
              <p>{obj.short_description || obj.description || 'Нет описания'}</p>
              <div style={{ marginTop: '10px' }}>
                <span style={{ background: '#667eea', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem' }}>
                  {obj.type}
                </span>
                {obj.distance_ly && (
                  <span style={{ marginLeft: '10px', opacity: 0.7, fontSize: '0.8rem' }}>
                    📏 {obj.distance_ly} св.лет
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

export default Objects;