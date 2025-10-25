'use client';

import { useState } from 'react';
import Image from 'next/image';

const GALLERY_IMAGES = [
  { id: 1, src: '/assets/portrait1.jpg', title: 'Cyberpunk Portrait', category: 'portrait' },
  { id: 2, src: '/assets/portrait2.jpg', title: 'Neon Character', category: 'portrait' },
  { id: 3, src: '/assets/portrait3.jpg', title: 'Digital Art', category: 'portrait' },
  { id: 4, src: '/assets/portrait4.jpg', title: 'Future Vision', category: 'portrait' },
  { id: 5, src: '/assets/landscape.jpg', title: 'Futuristic Cityscape', category: 'landscape' },
  { id: 6, src: '/assets/classic.jpg', title: 'Anime Landscape', category: 'landscape' },
  { id: 7, src: '/assets/portrait5.jpg', title: 'Sci-Fi Character', category: 'portrait' },
  { id: 8, src: '/assets/image1.jpg', title: 'Abstract Art', category: 'abstract' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);

  const categories = ['all', 'portrait', 'landscape', 'abstract'];
  
  const filteredImages = selectedCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === selectedCategory);

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-neon)', textShadow: '0 0 30px var(--shadow-cyan)', marginBottom: '20px' }}>
            Community Gallery
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 30px' }}>
            Explore amazing creations from our community
          </p>

          {/* Category Filter */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '10px 25px',
                  background: selectedCategory === category ? 'var(--primary-neon)' : 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${selectedCategory === category ? 'var(--primary-neon)' : 'rgba(0, 255, 255, 0.3)'}`,
                  borderRadius: '25px',
                  color: selectedCategory === category ? '#000' : 'var(--text-light)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '25px'
        }}>
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '15px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
              className="glass-panel"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-neon)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '15px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                color: 'white'
              }}>
                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{image.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              padding: '20px'
            }}
          >
            <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                width={800}
                height={800}
                style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
              />
              <h3 style={{
                color: 'white',
                textAlign: 'center',
                marginTop: '20px',
                fontSize: '1.5rem'
              }}>
                {selectedImage.title}
              </h3>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
