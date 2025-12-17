import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        setMessage('✅ Успешный вход! Можете перейти на главную страницу.');
      } else {
        const errorData = await response.json();
        setMessage('❌ ' + (errorData.detail || 'Неверные данные'));
      }
    } catch (error) {
      setMessage('❌ Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '1.8rem' }}>🚀 Вход в AstrumAtlas</h2>
        
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
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', opacity: 0.8 }}>Имя пользователя</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '8px', 
                border: '1px solid rgba(255,255,255,0.3)', 
                background: 'rgba(0,0,0,0.3)', 
                color: 'white' 
              }} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', opacity: 0.8 }}>Пароль</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '8px', 
                border: '1px solid rgba(255,255,255,0.3)', 
                background: 'rgba(0,0,0,0.3)', 
                color: 'white' 
              }} 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              background: loading ? '#666' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              color: 'white', 
              padding: '12px', 
              borderRadius: '8px', 
              border: 'none', 
              fontSize: '1rem', 
              cursor: loading ? 'not-allowed' : 'pointer' 
            }}
          >
            {loading ? '⏳ Вход...' : 'Войти'}
          </button>
        </form>
        
        {message.includes('✅') && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <a 
              href="/" 
              style={{ 
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '8px', 
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              Перейти на главную
            </a>
          </div>
        )}
        
        <p style={{ textAlign: 'center', marginTop: '20px', opacity: 0.7 }}>
          Нет аккаунта? <a href="/register" style={{ color: '#667eea' }}>Зарегистрироваться</a>
        </p>
      </div>
    </div>
  );
};

export default Login;