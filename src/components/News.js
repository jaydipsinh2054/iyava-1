import { Calendar, User } from 'lucide-react';

const News = ({ news, loading }) => {
  const defaultNews = [
    {
      id: '1',
      title: 'New Community Center Inauguration',
      content: 'Iyava village celebrates the opening of a new community center equipped with modern facilities for residents.',
      author: 'Village Council',
      date: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1629977681402-c7db16d6c6d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwxfHx2aWxsYWdlJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3MzYzNzM4OHww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: '2',
      title: 'Agricultural Development Program Launch',
      content: 'A new program aimed at enhancing agricultural productivity and farmer welfare has been launched in our village.',
      author: 'Development Committee',
      date: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1709735133597-6e4b7178e507?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBydXJhbCUyMHZpbGxhZ2V8ZW58MHx8fHwxNzczNjM3Mzg0fDA&ixlib=rb-4.1.0&q=85'
    },
    {
      id: '3',
      title: 'Village School Wins State Award',
      content: 'Our village school has been recognized for excellence in education and community service at the state level.',
      author: 'Education Department',
      date: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1731234057680-cc5303a80157?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHw0fHx2aWxsYWdlJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3MzYzNzM4OHww&ixlib=rb-4.1.0&q=85'
    },
  ];

  const displayNews = news.length > 0 ? news : defaultNews;

  return (
    <section id="news" className="section-padding bg-gray-50" data-testid="news-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="news-title">Latest News</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Stay updated with the latest from Iyava</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden card-hover"
                data-testid="news-card"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      <span>{item.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
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

export default News;