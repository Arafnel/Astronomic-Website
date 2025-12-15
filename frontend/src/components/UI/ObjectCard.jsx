import { Heart, MapPin, Ruler } from 'lucide-react';
import { useState } from 'react';
import { favoritesAPI } from '../../api/favorites.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';

const ObjectCard = ({ object, isFavorite = false, onFavoriteChange }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleFavoriteToggle = async () => {
    if (!user) return;

    setLoading(true);
    try {
      if (isFavorite) {
        await favoritesAPI.removeFromFavorites(object.id);
      } else {
        await favoritesAPI.addToFavorites(object.id);
      }
      onFavoriteChange?.();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card hover:scale-105 transition-transform duration-200">
      {object.image_url && (
        <img
          src={object.image_url}
          alt={object.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-white">{object.name}</h3>
        {user && (
          <button
            onClick={handleFavoriteToggle}
            disabled={loading}
            className={`p-2 rounded-full transition-colors ${
              isFavorite
                ? 'text-red-400 hover:text-red-300'
                : 'text-space-400 hover:text-red-400'
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-space-300 text-sm">
          <span className="bg-cosmic-600/20 px-2 py-1 rounded text-cosmic-300 font-medium">
            {object.type}
          </span>
        </div>

        {object.constellation && (
          <div className="flex items-center text-space-300 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{object.constellation.name}</span>
          </div>
        )}

        {object.distance_ly && (
          <div className="flex items-center text-space-300 text-sm">
            <Ruler className="h-4 w-4 mr-2" />
            <span>{object.distance_ly.toLocaleString()} св. лет</span>
          </div>
        )}
      </div>

      {object.short_description && (
        <p className="text-space-300 text-sm mb-4 line-clamp-3">
          {object.short_description}
        </p>
      )}

      <button className="btn-secondary w-full text-sm">
        Подробнее
      </button>
    </div>
  );
};

export default ObjectCard;