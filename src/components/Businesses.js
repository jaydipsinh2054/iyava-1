import { MapPin, Phone, Tag } from 'lucide-react';

const Businesses = ({ businesses, loading }) => {
  const defaultBusinesses = [
    {
      id: '1',
      name: 'Iyava General Store',
      category: 'Retail',
      description: 'Your one-stop shop for daily necessities and groceries.',
      contact: '+91 98765 43210',
      address: 'Main Road, Iyava',
      image: 'https://images.unsplash.com/photo-1629977681402-c7db16d6c6d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwxfHx2aWxsYWdlJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3MzYzNzM4OHww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: '2',
      name: 'Traditional Handicrafts',
      category: 'Crafts',
      description: 'Authentic handmade crafts by local artisans.',
      contact: '+91 98765 43211',
      address: 'Artisan Street, Iyava',
      image: 'https://images.unsplash.com/photo-1709744873302-923841d5e8b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxJbmRpYW4lMjBydXJhbCUyMHZpbGxhZ2V8ZW58MHx8fHwxNzczNjM3Mzg0fDA&ixlib=rb-4.1.0&q=85'
    },
    {
      id: '3',
      name: 'Village Dairy Farm',
      category: 'Agriculture',
      description: 'Fresh milk and dairy products from our local farm.',
      contact: '+91 98765 43212',
      address: 'Farm Road, Iyava',
      image: 'https://images.unsplash.com/photo-1678483874487-a4d6f8ceffe9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwyfHx2aWxsYWdlJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3MzYzNzM4OHww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: '4',
      name: 'Iyava Medical Store',
      category: 'Healthcare',
      description: 'Medicines and healthcare products for the community.',
      contact: '+91 98765 43213',
      address: 'Hospital Road, Iyava',
      image: 'https://images.unsplash.com/photo-1706365694209-a885ec999615?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHw0fHxJbmRpYW4lMjBydXJhbCUyMHZpbGxhZ2V8ZW58MHx8fHwxNzczNjM3Mzg0fDA&ixlib=rb-4.1.0&q=85'
    },
  ];

  const displayBusinesses = businesses.length > 0 ? businesses : defaultBusinesses;

  return (
    <section id="businesses" className="section-padding bg-white" data-testid="businesses-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="businesses-title">Local Businesses</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Supporting our local economy and entrepreneurs</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayBusinesses.map((business) => (
              <div
                key={business.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden card-hover"
                data-testid="business-card"
              >
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <Tag size={16} className="mr-2 text-green-600" />
                    <span className="text-sm text-green-600 font-semibold">{business.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{business.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{business.description}</p>
                  <div className="space-y-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <Phone size={14} className="mr-2" />
                      <span>{business.contact}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin size={14} className="mr-2" />
                      <span>{business.address}</span>
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

export default Businesses;