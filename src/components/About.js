import { Calendar, MapPin, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section-padding bg-white" data-testid="about-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="about-title">About Maru Iyava</h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1709735133597-6e4b7178e507?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBydXJhbCUyMHZpbGxhZ2V8ZW58MHx8fHwxNzczNjM3Mzg0fDA&ixlib=rb-4.1.0&q=85"
              alt="Iyava Village"
              className="rounded-lg shadow-lg w-full"
              data-testid="about-image"
            />
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed" data-testid="about-description">
              Maru Iyava is a picturesque village known for its rich cultural heritage, warm community, and
              breathtaking natural beauty. Nestled in the heart of rural India, our village has preserved
              its traditional values while embracing modern development.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              With a history spanning several generations, Maru Iyava stands as a testament to the harmonious
              coexistence of tradition and progress. Our village is home to farmers, artisans, and
              entrepreneurs who work together to build a thriving community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-orange-50 rounded-lg" data-testid="stat-population">
                <Users className="mx-auto mb-2 text-orange-600" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">2,500+</h3>
                <p className="text-gray-600">Population</p>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg" data-testid="stat-area">
                <MapPin className="mx-auto mb-2 text-orange-600" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">15 km²</h3>
                <p className="text-gray-600">Total Area</p>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg" data-testid="stat-established">
                <Calendar className="mx-auto mb-2 text-orange-600" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">200+</h3>
                <p className="text-gray-600">Years Old</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;