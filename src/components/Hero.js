import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="hero-section min-h-screen flex items-center justify-center text-white relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1629977681402-c7db16d6c6d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwxfHx2aWxsYWdlJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3MzYzNzM4OHww&ixlib=rb-4.1.0&q=85)'
      }}
      data-testid="hero-section"
    >
      <div className="text-center px-4 fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-4" data-testid="hero-title">
          Welcome to Maru Iyava
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200" data-testid="hero-subtitle">
          A Village Rich in Culture, Heritage & Community
        </p>
        <button
          onClick={scrollToAbout}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          data-testid="explore-button"
        >
          Explore Our Village
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={40} className="text-white" />
      </div>
    </section>
  );
};

export default Hero;