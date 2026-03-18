
const Gallery = ({ items, loading }) => {
  const defaultImages = [
    {
      id: '1',
      title: 'Village Landscape',
      image: 'https://images.unsplash.com/photo-1709744873302-923841d5e8b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxJbmRpYW4lMjBydXJhbCUyMHZpbGxhZ2V8ZW58MHx8fHwxNzczNjM3Mzg0fDA&ixlib=rb-4.1.0&q=85',
      category: 'Landscape'
    },
    {
      id: '2',
      title: 'Village Road',
      image: 'https://images.unsplash.com/photo-1706365694209-a885ec999615?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHw0fHxJbmRpYW4lMjBydXJhbCUyMHZpbGxhZ2V8ZW58MHx8fHwxNzczNjM3Mzg0fDA&ixlib=rb-4.1.0&q=85',
      category: 'Village Life'
    },
    {
      id: '3',
      title: 'Countryside View',
      image: 'https://images.unsplash.com/photo-1678483874487-a4d6f8ceffe9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwyfHx2aWxsYWdlJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3MzYzNzM4OHww&ixlib=rb-4.1.0&q=85',
      category: 'Nature'
    },
    {
      id: '4',
      title: 'Village Houses',
      image: 'https://images.unsplash.com/photo-1731234057680-cc5303a80157?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHw0fHx2aWxsYWdlJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3MzYzNzM4OHww&ixlib=rb-4.1.0&q=85',
      category: 'Architecture'
    },
  ];

  const displayItems = items.length > 0 ? items : defaultImages;

  return (
    <section id="gallery" className="section-padding bg-gray-50" data-testid="gallery-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="gallery-title">Photo Gallery</h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Capturing the beauty and essence of Maru Iyava</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          </div>
        ) : (
          <div className="image-gallery">
            {displayItems.map((item) => (
              <div key={item.id} className="gallery-item overflow-hidden rounded-lg shadow-lg" data-testid="gallery-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;