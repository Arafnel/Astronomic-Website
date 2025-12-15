import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await login(data);
      navigate('/');
    } catch (err) {
      setError('Неверные учетные данные');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-center mb-6 bg-cosmic-gradient bg-clip-text text-transparent">
          Вход в AstrumAtlas
        </h2>

        {error && (
          <div className="bg-red-600/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-space-300 mb-2">
              Имя пользователя
            </label>
            <input
              type="text"
              className="input-field w-full"
              {...register('username', { required: 'Обязательное поле' })}
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-space-300 mb-2">
              Пароль
            </label>
            <input
              type="password"
              className="input-field w-full"
              {...register('password', { required: 'Обязательное поле' })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Войти'}
          </button>
        </form>

        <p className="text-center text-space-400 mt-6">
          Нет аккаунта?{' '}
          <Link to="/register" className="text-cosmic-400 hover:text-cosmic-300">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;