import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await registerUser(data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <header className="mb-6 text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-gold-300/80">
          AstrumAtlas
        </p>
        <h2 className="mt-2 bg-cosmic-gradient bg-clip-text text-2xl font-semibold tracking-[0.2em] text-transparent">
          Sign Up
        </h2>
        <p className="mt-3 text-[0.85rem] text-gold-100/75">
          Создайте аккаунт, чтобы сохранять любимые объекты и события.
        </p>
      </header>

        {error && (
          <div className="bg-red-600/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

      {error && (
        <div className="mb-4 rounded-2xl border border-red-500/70 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-gold-200/80">
              Имя пользователя
            </label>
            <input
              type="text"
              className="input-field w-full"
              {...register('username', { 
                required: 'Обязательное поле',
                minLength: { value: 3, message: 'Минимум 3 символа' }
              })}
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-gold-200/80">
              Email
            </label>
            <input
              type="email"
              className="input-field w-full"
              {...register('email', { 
                required: 'Обязательное поле',
                pattern: { value: /^\S+@\S+$/i, message: 'Неверный формат email' }
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-gold-200/80">
              Пароль
            </label>
            <input
              type="password"
              className="input-field w-full"
              {...register('password', { 
                required: 'Обязательное поле',
                minLength: { value: 6, message: 'Минимум 6 символов' }
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-gold-200/80">
              Подтвердите пароль
            </label>
            <input
              type="password"
              className="input-field w-full"
              {...register('confirmPassword', { 
                required: 'Обязательное поле',
                validate: value => value === password || 'Пароли не совпадают'
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex w-full items-center justify-center text-sm tracking-[0.18em] uppercase disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="mt-6 text-center text-[0.78rem] text-gold-100/65">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-cosmic-300 hover:text-cosmic-200">
            Войти
          </Link>
        </p>
    </div>
  );
};

export default RegisterForm;