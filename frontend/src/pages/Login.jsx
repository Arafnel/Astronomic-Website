import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login({ username, password });
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      const msg =
        err?.response?.data?.detail ||
        'Не удалось войти. Проверьте логин и пароль.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-16">
      <div className="hero-glow starfield pointer-events-none absolute inset-0 opacity-70" />

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-gold-500/60 bg-black/50 px-8 py-10 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur">
        <div className="pointer-events-none absolute inset-px rounded-[26px] border border-gold-500/30 opacity-70" />

        <header className="relative mb-8 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-gold-300/80">
            AstrumAtlas
          </p>
          <h1 className="mt-3 bg-cosmic-gradient bg-clip-text text-2xl font-semibold tracking-[0.2em] text-transparent">
            Sign In
          </h1>
          <p className="mt-3 text-[0.85rem] text-gold-100/75">
            Откройте свой личный звездный атлас и сохранённые объекты.
          </p>
        </header>

        {error && (
          <div className="relative mb-5 rounded-2xl border border-red-400/60 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-medium tracking-[0.18em] uppercase text-gold-200/80">
              Имя пользователя
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field w-full"
              placeholder="orion_observer"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium tracking-[0.18em] uppercase text-gold-200/80">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field w-full"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex w-full items-center justify-center text-sm tracking-[0.18em] uppercase disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Входим…' : 'Войти'}
          </button>
        </form>

        <p className="mt-6 text-center text-[0.78rem] text-gold-100/60">
          Регистрация пока доступна через API:
          <br />
          <span className="rounded-full border border-gold-500/40 bg-black/40 px-3 py-1">
            POST /auth/register
          </span>
        </p>
      </section>
    </main>
  );
};

export default Login;