import { useState, useEffect } from 'react';
import { favoritesAPI } from '../api/favorites.jsx';
import ObjectCard from '../components/UI/ObjectCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { Heart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { Navigate } from 'react-router-dom';

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      const response = await favoritesAPI.getFavorites();
      setFavorites(response.data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-cosmic-gradient bg-clip-text text-transparent">
          Мои избранные объекты
        </h1>
        <p className="text-space-300 text-lg">
          Ваша личная коллекция астрономических объектов
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 text-space-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-space-300 mb-2">
            Пока нет избранных объектов
          </h3>
          <p className="text-space-400 mb-6">
            Добавляйте интересные объекты в избранное, чтобы они появились здесь
          </p>
          <a href="/objects" className="btn-primary">
            Исследовать каталог
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(favorite => (
            <ObjectCard
              key={favorite.id}
              object={favorite.astronomic_object}
              isFavorite={true}
              onFavoriteChange={loadFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;