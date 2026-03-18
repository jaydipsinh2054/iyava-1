import axios from 'axios';
import { useEffect, useState } from 'react';
import About from '../components/About';
import Businesses from '../components/Businesses';
import Contact from '../components/Contact';
import Events from '../components/Events';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Hero from '../components/Hero';
import Navigation from '../components/Navigation';
import News from '../components/News';
import Tourism from '../components/Tourism';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, newsRes, businessesRes, galleryRes] = await Promise.all([
        axios.get(`${API}/events`),
        axios.get(`${API}/news`),
        axios.get(`${API}/businesses`),
        axios.get(`${API}/gallery`)
      ]);

      setEvents(eventsRes.data);
      setNews(newsRes.data);
      setBusinesses(businessesRes.data);
      setGallery(galleryRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Hero />
      <About />
      <Gallery items={gallery} loading={loading} />
      <Events events={events} loading={loading} />
      <News news={news} loading={loading} />
      <Businesses businesses={businesses} loading={loading} />
      <Tourism />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;