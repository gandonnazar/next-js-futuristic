'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const GALLERY_IMAGES = [
  { id: 1, src: '/assets/portrait1.jpg', title: 'Cyberpunk Portrait', category: 'portrait', model: 'Flux Pro1.1 Ultra', timestamp: '2 hours ago', prompt: 'A cyberpunk character with neon lights' },
  { id: 2, src: '/assets/portrait2.jpg', title: 'Neon Character', category: 'portrait', model: 'Leonardo Phoenix 1.0', timestamp: '3 hours ago', prompt: 'Futuristic warrior in digital rain' },
  { id: 3, src: '/assets/portrait3.jpg', title: 'Digital Art', category: 'portrait', model: 'Seedream 4', timestamp: '5 hours ago', prompt: 'Abstract cosmic art with vibrant colors' },
  { id: 4, src: '/assets/portrait4.jpg', title: 'Future Vision', category: 'portrait', model: 'ImagineArt-1', timestamp: '1 day ago', prompt: 'Anime character in fantasy landscape' },
  { id: 5, src: '/assets/landscape.jpg', title: 'Futuristic Cityscape', category: 'landscape', model: 'Google Imagen 4', timestamp: '2 days ago', prompt: 'Futuristic cityscape with neon lights' },
  { id: 6, src: '/assets/classic.jpg', title: 'Anime Landscape', category: 'landscape', model: 'Ideogram v3', timestamp: '3 days ago', prompt: 'Serene anime landscape at sunset' },
  { id: 7, src: '/assets/portrait5.jpg', title: 'Sci-Fi Character', category: 'portrait', model: 'Recraft V3', timestamp: '4 days ago', prompt: 'Sci-fi character with glowing armor' },
  { id: 8, src: '/assets/image1.jpg', title: 'Abstract Art', category: 'abstract', model: 'Luma Photon', timestamp: '5 days ago', prompt: 'Abstract geometric patterns with neon colors' },
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
        <div className={styles.galleryGrid}>
          {filteredImages.map((image) => (
            <div
              key={image.id}
              style={{
                position: 'relative',
                borderRadius: '15px',
                overflow: 'hidden',
                border: '2px solid rgba(0, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                background: 'rgba(255, 255, 255, 0.03)'
              }}
              className="gallery-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-neon)';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image Container */}
              <div 
                style={{
                  position: 'relative',
                  aspectRatio: '1',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  sizes="20vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Gallery Info */}
              <div style={{ padding: '15px' }}>
                {/* Meta Info */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                  fontSize: '0.85rem',
                  color: 'rgba(0, 255, 255, 0.8)'
                }}>
                  <span style={{ fontWeight: 600 }}>{image.model}</span>
                  <span style={{ opacity: 0.7 }}>{image.timestamp}</span>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '8px'
                }}>
                  <button
                    onClick={() => alert('Download feature')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: 'rgba(0, 255, 255, 0.1)',
                      border: '1px solid rgba(0, 255, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'var(--primary-neon)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 255, 255, 0.2)';
                      e.currentTarget.style.borderColor = 'var(--primary-neon)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.3)';
                    }}
                    title="Download"
                  >
                    <span>📥</span>
                    <span style={{ fontSize: '0.75rem' }}>Download</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(image.prompt);
                      alert('Prompt copied to clipboard!');
                    }}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: 'rgba(0, 255, 255, 0.1)',
                      border: '1px solid rgba(0, 255, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'var(--primary-neon)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 255, 255, 0.2)';
                      e.currentTarget.style.borderColor = 'var(--primary-neon)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.3)';
                    }}
                    title="Copy Prompt"
                  >
                    <span>📋</span>
                    <span style={{ fontSize: '0.75rem' }}>Copy</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this image?')) {
                        alert('Delete feature');
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: 'rgba(255, 68, 68, 0.1)',
                      border: '1px solid rgba(255, 68, 68, 0.3)',
                      borderRadius: '8px',
                      color: '#ff4444',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 68, 68, 0.2)';
                      e.currentTarget.style.borderColor = '#ff4444';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 68, 68, 0.3)';
                    }}
                    title="Delete"
                  >
                    <span>🗑️</span>
                    <span style={{ fontSize: '0.75rem' }}>Delete</span>
                  </button>
                </div>
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
