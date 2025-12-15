import { Calendar, Eye, Clock } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      eclipse: 'bg-yellow-600/20 text-yellow-300',
      meteor_shower: 'bg-blue-600/20 text-blue-300',
      conjunction: 'bg-purple-600/20 text-purple-300',
      default: 'bg-space-600/20 text-space-300'
    };
    return colors[type] || colors.default;
  };

  return (
    <div className="card hover:scale-105 transition-transform duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{event.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
          {event.type}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-space-300">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formatDate(event.date)}</span>
        </div>
        
        {event.visibility && (
          <div className="flex items-center text-space-300">
            <Eye className="h-4 w-4 mr-2" />
            <span className="capitalize">{event.visibility}</span>
          </div>
        )}
      </div>

      {event.description && (
        <p className="text-space-300 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>
      )}

      <button className="btn-secondary w-full text-sm">
        Подробнее
      </button>
    </div>
  );
};

export default EventCard;