import React from 'react';

const Gallery: React.FC = () => {
  const galleryImages = [
    { src: '/images/vecteezy_empty-swing-under-tree-on-overcast-day-in-open-field_69633486.jpg', alt: 'School exterior view' },
    { src: '/images/vecteezy_rustic-tree-swing-in-natural-landscape-open-field_69633466.jpg', alt: 'School sports ground' },
    { src: '/images/vecteezy_covered-walkway-with-columns-and-windows-in-architectural_70374917.jpg', alt: 'School corridor' },
    {src: '/images/vecteezy_rustic-tree-swing-in-natural-landscape-open-field_69633466.jpg', alt: 'School entrance gate' },
    { src: '/images/vecteezy_covered-walkway-with-columns-and-windows-in-architectural_70374917.jpg', alt: 'School bridge walkway' },
    { src: '/images/vecteezy_covered-walkway-with-columns-and-windows-in-architectural_70374917.jpg', alt: 'Playground equipment' },
    { src: '/images/vecteezy_covered-walkway-with-columns-and-windows-in-architectural_70374917.jpg', alt: 'Computer lab classroom' },
    { src: '/images/vecteezy_covered-walkway-with-columns-and-windows-in-architectural_70374917.jpg', alt: 'Computer lab with desks' },
    { src: '/images/vecteezy_covered-walkway-with-columns-and-windows-in-architectural_70374917.jpg', alt: 'School field area' },
    { src: '/images/vecteezy_covered-walkway-with-columns-and-windows-in-architectural_70374917.jpg', alt: 'Sky and clouds view' },
    { src: '/images/vecteezy_covered-walkway-with-columns-and-windows-in-architectural_70374917.jpg', alt: 'Sports field with markings' },
    { src: '/images/vecteezy_covered-walkway-with-columns-and-windows-in-architectural_70374917.jpg', alt: 'Basketball court' },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Gallery</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" 
            />
          </div>
        ))}
      </div>

      {/* Apply Button */}
      <div className="text-center mt-8">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
          Apply For a Child
        </button>
      </div>
    </div>
  );
};

export default Gallery;