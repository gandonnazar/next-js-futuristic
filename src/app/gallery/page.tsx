'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { getAssetPath } from '@/lib/utils';

const GALLERY_IMAGES = [
  { id: 1, src: getAssetPath('/assets/portrait1.jpg'), title: 'Cyberpunk Portrait', category: 'portrait', model: 'Flux Pro1.1 Ultra', timestamp: '2 hours ago', prompt: 'A cyberpunk character with neon lights' },
  { id: 2, src: getAssetPath('/assets/portrait2.jpg'), title: 'Neon Character', category: 'portrait', model: 'Leonardo Phoenix 1.0', timestamp: '3 hours ago', prompt: 'Futuristic warrior in digital rain' },
  { id: 3, src: getAssetPath('/assets/portrait3.jpg'), title: 'Digital Art', category: 'portrait', model: 'Seedream 4', timestamp: '5 hours ago', prompt: 'Abstract cosmic art with vibrant colors' },
  { id: 4, src: getAssetPath('/assets/portrait4.jpg'), title: 'Future Vision', category: 'portrait', model: 'ImagineArt-1', timestamp: '1 day ago', prompt: 'Anime character in fantasy landscape' },
  { id: 5, src: getAssetPath('/assets/landscape.jpg'), title: 'Futuristic Cityscape', category: 'landscape', model: 'Google Imagen 4', timestamp: '2 days ago', prompt: 'Futuristic cityscape with neon lights' },
  { id: 6, src: getAssetPath('/assets/classic.jpg'), title: 'Anime Landscape', category: 'landscape', model: 'Ideogram v3', timestamp: '3 days ago', prompt: 'Serene anime landscape at sunset' },
  { id: 7, src: getAssetPath('/assets/portrait5.jpg'), title: 'Sci-Fi Character', category: 'portrait', model: 'Recraft V3', timestamp: '4 days ago', prompt: 'Sci-fi character with glowing armor' },
  { id: 8, src: getAssetPath('/assets/image1.jpg'), title: 'Abstract Art', category: 'abstract', model: 'Luma Photon', timestamp: '5 days ago', prompt: 'Abstract geometric patterns with neon colors' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);

  const categories = ['all', 'portrait', 'landscape', 'abstract'];
  
  const filteredImages = selectedCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === selectedCategory);

  return (
    <>
      <style jsx global>{`
        @media (max-width: 1024px) {
          .fullscreen-modal-content {
            grid-template-columns: 1.5fr 1fr !important;
          }
        }

        @media (max-width: 768px) {
          .fullscreen-modal-content {
            grid-template-columns: 1fr !important;
            grid-template-rows: 1.5fr 1fr !important;
            width: 98% !important;
            height: 95vh !important;
          }
          
          .fullscreen-modal-image-section {
            border-bottom: 2px solid rgba(0, 255, 255, 0.3) !important;
            border-right: none !important;
          }
          
          .fullscreen-modal-info-section {
            border-left: none !important;
            border-top: 2px solid rgba(0, 255, 255, 0.3) !important;
          }
          
          .fullscreen-modal-info-content {
            padding: 25px 20px !important;
          }
          
          .fullscreen-close-button {
            top: 15px !important;
            right: 15px !important;
            width: 40px !important;
            height: 40px !important;
            font-size: 1.5rem !important;
          }
        }

        .fullscreen-modal-info-section::-webkit-scrollbar {
          width: 6px;
        }

        .fullscreen-modal-info-section::-webkit-scrollbar-track {
          background: rgba(0, 255, 255, 0.1);
        }

        .fullscreen-modal-info-section::-webkit-scrollbar-thumb {
          background: var(--primary-neon);
          border-radius: 10px;
        }
      `}</style>
    <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-neon)', textShadow: '0 0 30px var(--shadow-cyan)', marginBottom: '20px' }}>
            Creative Gallery
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 30px' }}>
             Your AI-generated masterpieces collection 
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

        {/* Fullscreen Image Viewer Modal */}
        {selectedImage && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'fadeIn 0.3s ease'
            }}
          >
            {/* Overlay */}
            <div
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(10px)'
              }}
            />
            
            {/* Close Button */}
            <button
              className="fullscreen-close-button"
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '1.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 10002
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 0, 100, 0.3)';
                e.currentTarget.style.borderColor = '#ff0066';
                e.currentTarget.style.color = '#ff0066';
                e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 0, 100, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              ✕
            </button>
            
            {/* Modal Content */}
            <div
              className="fullscreen-modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '95%',
                height: '90vh',
                maxWidth: '1600px',
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: 0,
                zIndex: 10001,
                background: 'linear-gradient(135deg, rgba(10, 10, 30, 0.95), rgba(20, 10, 40, 0.95))',
                border: '2px solid var(--primary-neon)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 0 60px rgba(0, 255, 255, 0.4)',
                animation: 'slideUp 0.3s ease'
              }}
            >
              {/* Left Side: Image Display */}
              <div className="fullscreen-modal-image-section" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  width={1200}
                  height={1200}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '10px',
                    boxShadow: '0 0 50px rgba(0, 255, 255, 0.3)'
                  }}
                />
              </div>
              
              {/* Right Side: Information */}
              <div className="fullscreen-modal-info-section" style={{
                background: 'linear-gradient(135deg, rgba(15, 15, 40, 0.98), rgba(25, 15, 50, 0.98))',
                borderLeft: '2px solid rgba(0, 255, 255, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--primary-neon) transparent'
              }}>
                <div className="fullscreen-modal-info-content" style={{
                  padding: '40px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '30px'
                }}>
                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: '1.5rem',
                    color: 'var(--primary-neon)',
                    margin: '0 0 20px 0',
                    textShadow: '0 0 20px var(--shadow-cyan)',
                    paddingBottom: '20px',
                    borderBottom: '2px solid rgba(0, 255, 255, 0.2)'
                  }}>
                    Generation Details
                  </h3>
                  
                  {/* Model */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: '0.85rem',
                      color: 'var(--secondary-neon)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 600
                    }}>
                      Model
                    </span>
                    <span style={{
                      fontSize: '1.1rem',
                      color: 'var(--text-light)',
                      lineHeight: 1.6
                    }}>
                      {selectedImage.model}
                    </span>
                  </div>
                  
                  {/* Prompt */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: '0.85rem',
                      color: 'var(--secondary-neon)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 600
                    }}>
                      Prompt
                    </span>
                    <p style={{
                      fontSize: '1.1rem',
                      color: 'var(--text-light)',
                      lineHeight: 1.6,
                      wordBreak: 'break-word',
                      margin: 0
                    }}>
                      {selectedImage.prompt}
                    </p>
                  </div>
                  
                  {/* Generated */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: '0.85rem',
                      color: 'var(--secondary-neon)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 600
                    }}>
                      Generated
                    </span>
                    <span style={{
                      fontSize: '1.1rem',
                      color: 'var(--text-light)',
                      lineHeight: 1.6
                    }}>
                      {selectedImage.timestamp}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: '0.85rem',
                      color: 'var(--secondary-neon)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 600
                    }}>
                      Title
                    </span>
                    <span style={{
                      fontSize: '1.1rem',
                      color: 'var(--text-light)',
                      lineHeight: 1.6
                    }}>
                      {selectedImage.title}
                    </span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginTop: '20px',
                    paddingTop: '30px',
                    borderTop: '2px solid rgba(0, 255, 255, 0.2)'
                  }}>
                    <button
                      onClick={() => {
                        alert('Download feature');
                      }}
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        fontWeight: 600,
                        padding: '15px 20px',
                        background: 'rgba(0, 255, 255, 0.1)',
                        border: '2px solid var(--primary-neon)',
                        borderRadius: '12px',
                        color: 'var(--primary-neon)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '0.95rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--primary-neon)';
                        e.currentTarget.style.color = '#000';
                        e.currentTarget.style.boxShadow = '0 0 25px var(--primary-neon)';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)';
                        e.currentTarget.style.color = 'var(--primary-neon)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <span style={{ fontSize: '1.3rem' }}>📥</span>
                      <span>Download</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedImage.prompt);
                        alert('Prompt copied to clipboard!');
                      }}
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        fontWeight: 600,
                        padding: '15px 20px',
                        background: 'rgba(0, 255, 255, 0.1)',
                        border: '2px solid var(--primary-neon)',
                        borderRadius: '12px',
                        color: 'var(--primary-neon)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '0.95rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--primary-neon)';
                        e.currentTarget.style.color = '#000';
                        e.currentTarget.style.boxShadow = '0 0 25px var(--primary-neon)';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)';
                        e.currentTarget.style.color = 'var(--primary-neon)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <span style={{ fontSize: '1.3rem' }}>📋</span>
                      <span>Copy Prompt</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this image?')) {
                          alert('Delete feature');
                          setSelectedImage(null);
                        }
                      }}
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        fontWeight: 600,
                        padding: '15px 20px',
                        background: 'rgba(255, 0, 100, 0.1)',
                        border: '2px solid #ff0066',
                        borderRadius: '12px',
                        color: '#ff0066',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '0.95rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#ff0066';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 0, 100, 0.6)';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 0, 100, 0.1)';
                        e.currentTarget.style.color = '#ff0066';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <span style={{ fontSize: '1.3rem' }}>🗑️</span>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
    </>
  );
}
