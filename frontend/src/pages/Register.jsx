import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('❌ Пароли не совпадают');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('✅ Регистрация успешна! Теперь можете войти.');
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        setMessage('❌ ' + (data.detail || 'Ошибка регистрации'));
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
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '1.8rem' }}>🌟 Регистрация</h2>
        
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
              name="username"
              value={formData.username}
              onChange={handleChange}
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
            <label style={{ display: 'block', marginBottom: '8px', opacity: 0.8 }}>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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
            <label style={{ display: 'block', marginBottom: '8px', opacity: 0.8 }}>Подтвердите пароль</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
            {loading ? '⏳ Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', opacity: 0.7 }}>
          Уже есть аккаунт? <a href="/login" style={{ color: '#667eea' }}>Войти</a>
        </p>
      </div>
    </div>
  );
};

export default Register;