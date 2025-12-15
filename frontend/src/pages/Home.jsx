const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        AstrumAtlas
      </h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '40px', opacity: 0.8 }}>
        Исследуйте бескрайние просторы космоса
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '60px' }}>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>🔭 Каталог объектов</h3>
          <p style={{ opacity: 0.8 }}>Изучайте планеты, звезды, галактики и туманности</p>
        </div>
        
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>📅 События</h3>
          <p style={{ opacity: 0.8 }}>Не пропустите затмения и метеорные дожди</p>
        </div>
        
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>⭐ Избранное</h3>
          <p style={{ opacity: 0.8 }}>Создавайте личную коллекцию объектов</p>
        </div>
      </div>
    </div>
  );
};

export default Home;