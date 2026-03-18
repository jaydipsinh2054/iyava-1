import { Calendar, MapPin } from 'lucide-react';

const Events = ({ events, loading }) => {
  const defaultEvents = [
    {
      id: '1',
      title: 'Annual Village Festival',
      description: 'Join us for our annual celebration featuring traditional music, dance, and local cuisine.',
      date: '2025-09-15',
      location: 'Village Community Center',
      image: 'https://images.unsplash.com/photo-1709744873302-923841d5e8b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxJbmRpYW4lMjBydXJhbCUyMHZpbGxhZ2V8ZW58MHx8fHwxNzczNjM3Mzg0fDA&ixlib=rb-4.1.0&q=85'
    },
    {
      id: '2',
      title: 'Harvest Celebration',
      description: 'Celebrate the successful harvest season with the entire community.',
      date: '2025-10-20',
      location: 'Main Agricultural Field',
      image: 'https://images.unsplash.com/photo-1678483874487-a4d6f8ceffe9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwyfHx2aWxsYWdlJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3MzYzNzM4OHww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: '3',
      title: 'Cultural Heritage Day',
      description: 'Experience the rich cultural traditions and heritage of Iyava village.',
      date: '2025-11-05',
      location: 'Village Square',
      image: 'https://images.unsplash.com/photo-1706365694209-a885ec999615?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHw0fHxJbmRpYW4lMjBydXJhbCUyMHZpbGxhZ2V8ZW58MHx8fHwxNzczNjM3Mzg0fDA&ixlib=rb-4.1.0&q=85'
    },
  ];

  const displayEvents = events.length > 0 ? events : defaultEvents;

  return (
    <section id="events" className="section-padding bg-white" data-testid="events-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="events-title">Upcoming Events</h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Join us in celebrating our community</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden card-hover"
                data-testid="event-card"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;