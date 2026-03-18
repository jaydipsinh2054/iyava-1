import { Camera, Coffee, MapPin, Sun } from 'lucide-react';

const Tourism = () => {
  const attractions = [
    {
      icon: <Camera size={32} />,
      title: 'Scenic Landscapes',
      description: 'Breathtaking views of lush green fields and natural beauty'
    },
    {
      icon: <Sun size={32} />,
      title: 'Cultural Heritage',
      description: 'Experience traditional festivals and authentic village life'
    },
    {
      icon: <Coffee size={32} />,
      title: 'Local Cuisine',
      description: 'Taste authentic regional dishes prepared with local ingredients'
    },
    {
      icon: <MapPin size={32} />,
      title: 'Historical Sites',
      description: 'Visit ancient temples and monuments with rich history'
    },
  ];

  return (
    <section id="tourism" className="section-padding bg-green-50" data-testid="tourism-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="tourism-title">Visit Iyava</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Discover the charm of rural India</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center card-hover"
              data-testid="attraction-card"
            >
              <div className="text-green-600 mb-4 flex justify-center">{attraction.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{attraction.title}</h3>
              <p className="text-gray-600">{attraction.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Reach Iyava</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center" data-testid="reach-by-air">
              <h4 className="font-bold text-lg text-gray-900 mb-2">By Air</h4>
              <p className="text-gray-600">Nearest airport is 75 km away with regular taxi services available</p>
            </div>
            <div className="text-center" data-testid="reach-by-train">
              <h4 className="font-bold text-lg text-gray-900 mb-2">By Train</h4>
              <p className="text-gray-600">Railway station is 25 km from the village with good bus connectivity</p>
            </div>
            <div className="text-center" data-testid="reach-by-road">
              <h4 className="font-bold text-lg text-gray-900 mb-2">By Road</h4>
              <p className="text-gray-600">Well-connected by state highways with regular bus services</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tourism;