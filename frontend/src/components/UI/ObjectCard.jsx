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
    <div className="relative flex h-full w-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-gold-500/60 bg-black/40 px-6 pt-6 pb-5 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(245,208,138,0.35)]">
      <div className="pointer-events-none absolute inset-px rounded-[18px] border border-gold-500/30 opacity-60" />

      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full border border-gold-400/70 bg-gradient-to-br from-gold-200/80 via-gold-500/80 to-black shadow-[0_0_30px_rgba(245,208,138,0.8)]" />
          <div className="text-left text-xs uppercase tracking-[0.25em] text-gold-300/80">
            <div>Object</div>
            <div className="text-gold-200/60">
              {object.type || '—'}
            </div>
          </div>
        </div>

        {user && (
          <button
            onClick={handleFavoriteToggle}
            disabled={loading}
            className={`rounded-full border border-gold-400/60 bg-black/40 p-2 text-gold-200 transition-colors ${
              isFavorite ? 'text-gold-300' : 'hover:text-gold-300'
            }`}
          >
            <Heart
              className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`}
            />
          </button>
        )}
      </div>

      <h3 className="text-lg font-semibold tracking-wide text-gold-100">
        {object.name}
      </h3>

      <div className="mt-3 space-y-1 text-[0.8rem] text-gold-100/80">
        {object.constellation && (
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span>{object.constellation.name}</span>
          </div>
        )}

        {object.distance_ly && (
          <div className="flex items-center gap-2">
            <Ruler className="h-3 w-3" />
            <span>{object.distance_ly.toLocaleString()} св. лет</span>
          </div>
        )}
      </div>

      {object.short_description && (
        <p className="mt-4 text-[0.78rem] leading-relaxed text-gold-100/75 line-clamp-3">
          {object.short_description}
        </p>
      )}
    </div>
  );
};

export default ObjectCard;