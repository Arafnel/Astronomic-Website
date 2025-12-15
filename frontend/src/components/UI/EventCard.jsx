import { Calendar, Eye } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeColor = (type) => {
    const labels = {
      eclipse: 'Затмение',
      meteor_shower: 'Метеорный поток',
      conjunction: 'Соединение планет',
    };
    return labels[type] || type;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold-500/60 bg-black/40 px-6 pt-6 pb-5 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(245,208,138,0.35)]">
      <div className="pointer-events-none absolute inset-px rounded-[18px] border border-gold-500/30 opacity-60" />

      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-wide text-gold-100">
            {event.title}
          </h3>
          <p className="mt-1 text-[0.78rem] uppercase tracking-[0.25em] text-gold-300/80">
            {getEventTypeColor(event.type)}
          </p>
        </div>
        <div className="rounded-full border border-gold-400/60 bg-gradient-to-br from-gold-200/50 via-gold-500/60 to-black px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-gold-50/90">
          Event
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gold-100/80 text-sm">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formatDate(event.date)}</span>
        </div>
        
        {event.visibility && (
          <div className="flex items-center text-gold-100/75 text-xs">
            <Eye className="h-4 w-4 mr-2" />
            <span className="capitalize">{event.visibility}</span>
          </div>
        )}
      </div>

      {event.description && (
        <p className="text-gold-100/75 text-[0.8rem] leading-relaxed mb-1 line-clamp-3">
          {event.description}
        </p>
      )}
    </div>
  );
};

export default EventCard;