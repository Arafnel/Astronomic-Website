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
        setMessage('✅ Login successful!');
      } else {
        const errorData = await response.json();
        setMessage('❌ ' + (errorData.detail || 'Invalid credentials'));
      }
    } catch (error) {
      setMessage('❌ Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative mx-auto max-w-md px-6 py-16">
      <section className="mb-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold-300/80">Account</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[0.12em] text-gold-100">Sign in to AstrumAtlas</h1>
        <p className="mt-2 text-sm text-gold-100/75">Sign in to save favorites and track events.</p>
      </section>

      <div className="mx-auto rounded-2xl border border-gold-500/40 bg-black/40 px-6 py-8">
        {message && (
          <div className={`mb-4 rounded-lg px-4 py-2 text-center ${message.includes('✅') ? 'bg-green-900/30 text-green-200' : 'bg-red-900/30 text-red-300'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-sm text-gold-200/80">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-md border border-gold-500/30 bg-black/30 px-3 py-2 text-gold-100"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gold-200/80">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gold-500/30 bg-black/30 px-3 py-2 text-gold-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 rounded-md px-4 py-2 text-white ${loading ? 'bg-gray-600' : 'bg-gradient-to-r from-cosmic-400 to-cosmic-600'}`}
          >
            {loading ? '⏳ Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gold-100/70">Don't have an account? <a href="/register" className="text-cosmic-400">Register</a></p>
      </div>
    </main>
  );
};

export default Login;