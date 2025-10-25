'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function UpscalePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState('standard-v2');
  const [scaleFactor, setScaleFactor] = useState('2x');
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [credits, setCredits] = useState(12000);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpscale = () => {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }
    setIsUpscaling(true);
    setTimeout(() => {
      setIsUpscaling(false);
      setCredits(prev => prev - 5);
      alert('Upscaling simulated! In production, this would call your AI API.');
    }, 3000);
  };

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-neon)', textShadow: '0 0 30px var(--shadow-cyan)', marginBottom: '20px' }}>
            AI Image Upscaler
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
            Transform low-resolution images into ultra-sharp masterpieces
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
          {/* Upload Section */}
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h3 style={{ color: 'var(--primary-neon)', marginBottom: '20px' }}>Upload Image</h3>
            
            <div style={{ 
              border: '2px dashed var(--primary-neon)', 
              borderRadius: '15px', 
              padding: '60px 20px', 
              textAlign: 'center',
              marginBottom: '20px',
              background: 'rgba(0, 255, 255, 0.05)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📤</div>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '10px' }}>
                Drop image here or click to upload
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', opacity: 0.7, marginBottom: '20px' }}>
                PNG, JPG, WebP up to 10MB
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="fileInput"
              />
              <button
                className="neon-button"
                onClick={() => document.getElementById('fileInput')?.click()}
                style={{ padding: '12px 30px' }}
              >
                📁 Choose File
              </button>
            </div>

            {selectedFile && (
              <div style={{ 
                padding: '15px', 
                background: 'rgba(0, 255, 255, 0.1)', 
                borderRadius: '10px',
                color: 'var(--text-light)'
              }}>
                Selected: {selectedFile.name}
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h3 style={{ color: 'var(--primary-neon)', marginBottom: '20px' }}>Model & Settings</h3>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', color: 'var(--text-light)', marginBottom: '10px', fontWeight: 600 }}>
                Upscale Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(0, 255, 255, 0.3)',
                  borderRadius: '10px',
                  color: 'var(--text-light)',
                  fontSize: '1rem'
                }}
              >
                <option value="standard-v2">Standard V2</option>
                <option value="low-res-v2">Low Resolution V2</option>
                <option value="cgi">CGI</option>
                <option value="high-fidelity-v2">High Fidelity V2</option>
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', color: 'var(--text-light)', marginBottom: '10px', fontWeight: 600 }}>
                Scale Factor
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {['2x', '4x', '6x', '8x'].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setScaleFactor(scale)}
                    style={{
                      padding: '15px',
                      background: scaleFactor === scale ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: `2px solid ${scaleFactor === scale ? 'var(--primary-neon)' : 'rgba(0, 255, 255, 0.3)'}`,
                      borderRadius: '10px',
                      color: 'var(--text-light)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button className="neon-button" style={{ flex: 1, padding: '12px' }}>
                Credits: {credits.toLocaleString()}
              </button>
              <button
                className="neon-button"
                style={{ flex: 2, padding: '15px', fontSize: '1.1rem' }}
                onClick={handleUpscale}
                disabled={isUpscaling || !selectedFile}
              >
                {isUpscaling ? '⚡ Upscaling...' : '🚀 Upscale -5'}
              </button>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ color: 'var(--secondary-neon)', marginBottom: '20px', textAlign: 'center' }}>
            🎯 Upscaling Tips
          </h3>
          <div className="grid-3 gap-2">
            <div>
              <h4 style={{ color: 'var(--primary-neon)', marginBottom: '10px' }}>📸 Best Results</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Use high-quality source images for best upscaling results. Clean, well-lit photos work best.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--secondary-neon)', marginBottom: '10px' }}>⚡ Model Selection</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Standard V2 for general use, High Fidelity V2 for maximum quality, CGI for rendered images.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--accent-neon)', marginBottom: '10px' }}>🎨 Scale Factor</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                2x-4x for most uses, 6x-8x for extreme detail enhancement and large format printing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
