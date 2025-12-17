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
      setMessage('❌ Войдите в систему для просмотра избранного');
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
        setMessage('❌ Ошибка загрузки избранного');
      }
    } catch (err) {
      setMessage('❌ Ошибка соединения');
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
        setMessage('✅ Удалено из избранного');
        loadFavorites(); // Перезагружаем список
      } else {
        setMessage('❌ Ошибка удаления');
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
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>⭐ Избранные объекты</h1>
      
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
      
      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Пока нет избранных объектов</p>
          <p style={{ opacity: 0.7 }}>Добавьте объекты в избранное на странице каталога</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {favorites.map(fav => (
            <div key={fav.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px' }}>
              <h3>{fav.astronomic_object?.name || 'Неизвестный объект'}</h3>
              <p>{fav.astronomic_object?.short_description || fav.astronomic_object?.description || 'Нет описания'}</p>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ background: '#667eea', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem' }}>
                  {fav.astronomic_object?.type || 'unknown'}
                </span>
                <button 
                  onClick={() => removeFavorite(fav.object_id)}
                  style={{
                    background: '#ff6b6b',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;