import axios from 'axios';
import { Edit, Home, LogOut, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminUsername = localStorage.getItem('adminUsername');
    if (!adminUsername) {
      navigate('/admin/login');
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [eventsRes, newsRes, businessesRes, galleryRes, feedbackRes] = await Promise.all([
        axios.get(`${API}/events`),
        axios.get(`${API}/news`),
        axios.get(`${API}/businesses`),
        axios.get(`${API}/gallery`),
        axios.get(`${API}/feedback`)
      ]);

      setEvents(eventsRes.data);
      setNews(newsRes.data);
      setBusinesses(businessesRes.data);
      setGallery(galleryRes.data);
      setFeedback(feedbackRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await axios.delete(`${API}/${type}/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventsManager events={events} onEdit={handleEdit} onDelete={(id) => handleDelete('events', id)} />;
      case 'news':
        return <NewsManager news={news} onEdit={handleEdit} onDelete={(id) => handleDelete('news', id)} />;
      case 'businesses':
        return <BusinessesManager businesses={businesses} onEdit={handleEdit} onDelete={(id) => handleDelete('businesses', id)} />;
      case 'gallery':
        return <GalleryManager gallery={gallery} onEdit={handleEdit} onDelete={(id) => handleDelete('gallery', id)} />;
      case 'feedback':
        return <FeedbackViewer feedback={feedback} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100" data-testid="admin-dashboard">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900" data-testid="dashboard-title">Iyava Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              data-testid="view-site-button"
            >
              <Home size={18} className="mr-2" />
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              data-testid="logout-button"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b overflow-x-auto">
            {['events', 'news', 'businesses', 'gallery', 'feedback'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-green-600 text-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                data-testid={`tab-${tab}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Add Button */}
        {activeTab !== 'feedback' && (
          <div className="mb-6">
            <button
              onClick={handleAdd}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              data-testid="add-new-button"
            >
              <Plus size={20} className="mr-2" />
              Add New {activeTab.slice(0, -1)}
            </button>
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <FormModal
          type={activeTab}
          item={editingItem}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            setShowModal(false);
            setEditingItem(null);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

// Events Manager Component
const EventsManager = ({ events, onEdit, onDelete }) => (
  <div className="space-y-4">
    {events.length === 0 ? (
      <p className="text-gray-600 text-center py-8">No events found. Add your first event!</p>
    ) : (
      events.map((event) => (
        <div key={event.id} className="border rounded-lg p-4 flex justify-between items-center" data-testid="event-item">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-sm text-gray-500 mt-2">Date: {event.date} | Location: {event.location}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(event)}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              data-testid="edit-button"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(event.id)}
              className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
              data-testid="delete-button"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);

// News Manager Component
const NewsManager = ({ news, onEdit, onDelete }) => (
  <div className="space-y-4">
    {news.length === 0 ? (
      <p className="text-gray-600 text-center py-8">No news found. Add your first news article!</p>
    ) : (
      news.map((item) => (
        <div key={item.id} className="border rounded-lg p-4 flex justify-between items-center" data-testid="news-item">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <p className="text-gray-600">{item.content.substring(0, 100)}...</p>
            <p className="text-sm text-gray-500 mt-2">By: {item.author}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(item)}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              data-testid="edit-button"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
              data-testid="delete-button"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);

// Businesses Manager Component
const BusinessesManager = ({ businesses, onEdit, onDelete }) => (
  <div className="space-y-4">
    {businesses.length === 0 ? (
      <p className="text-gray-600 text-center py-8">No businesses found. Add your first business!</p>
    ) : (
      businesses.map((business) => (
        <div key={business.id} className="border rounded-lg p-4 flex justify-between items-center" data-testid="business-item">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{business.name}</h3>
            <p className="text-gray-600">{business.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Category: {business.category} | Contact: {business.contact}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(business)}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              data-testid="edit-button"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(business.id)}
              className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
              data-testid="delete-button"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);

// Gallery Manager Component
const GalleryManager = ({ gallery, onEdit, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {gallery.length === 0 ? (
      <p className="text-gray-600 text-center py-8 col-span-full">No gallery items found. Add your first image!</p>
    ) : (
      gallery.map((item) => (
        <div key={item.id} className="border rounded-lg overflow-hidden" data-testid="gallery-item-admin">
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.category}</p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => onEdit(item)}
                className="flex-1 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                data-testid="edit-button"
              >
                <Edit size={18} className="mx-auto" />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="flex-1 p-2 bg-red-600 text-white rounded hover:bg-red-700"
                data-testid="delete-button"
              >
                <Trash2 size={18} className="mx-auto" />
              </button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);

// Feedback Viewer Component
const FeedbackViewer = ({ feedback }) => (
  <div className="space-y-4">
    {feedback.length === 0 ? (
      <p className="text-gray-600 text-center py-8">No feedback received yet.</p>
    ) : (
      feedback.map((item) => (
        <div key={item.id} className="border rounded-lg p-4" data-testid="feedback-item">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            <span className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Email: {item.email}</p>
          <p className="text-gray-700">{item.message}</p>
        </div>
      ))
    )}
  </div>
);

// Form Modal Component
const FormModal = ({ type, item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(
    item || getDefaultFormData(type)
  );
  const [submitting, setSubmitting] = useState(false);

  function getDefaultFormData(type) {
    const defaults = {
      events: { title: '', description: '', date: '', location: '', image: '' },
      news: { title: '', content: '', author: '', image: '' },
      businesses: { name: '', category: '', description: '', contact: '', address: '', image: '' },
      gallery: { title: '', image: '', category: '', description: '' }
    };
    return defaults[type] || {};
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (item) {
        // Update
        await axios.put(`${API}/${type}/${item.id}`, formData);
      } else {
        // Create
        await axios.post(`${API}/${type}`, formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-testid="form-modal">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {item ? 'Edit' : 'Add'} {type.slice(0, -1)}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'events' && (
              <>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Event Title"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-title"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  required
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-description"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-date"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-location"
                />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-image"
                />
              </>
            )}

            {type === 'news' && (
              <>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="News Title"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-title"
                />
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Content"
                  required
                  rows="6"
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-content"
                />
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-author"
                />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-image"
                />
              </>
            )}

            {type === 'businesses' && (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Business Name"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-name"
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-category"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  required
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-description"
                />
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-contact"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-address"
                />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-image"
                />
              </>
            )}

            {type === 'gallery' && (
              <>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-title"
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-category"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  required
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-description"
                />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  data-testid="form-image"
                />
              </>
            )}

            <div className="flex space-x-4 mt-6">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400"
                data-testid="save-button"
              >
                {submitting ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold"
                data-testid="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
