'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const UPSCALE_MODELS = [
  { id: 'standard-v2', name: 'Standard V2', icon: '⚡', disabled: false },
  { id: 'low-res-v2', name: 'Low Resolution V2', icon: '🔍', disabled: false },
  { id: 'cgi', name: 'CGI', icon: '🎨', disabled: false },
  { id: 'high-fidelity-v2', name: 'High Fidelity V2', icon: '💎', disabled: false },
  { id: 'text-refine', name: 'Text Refine', icon: '📝', disabled: false },
  { id: 'topaz', name: 'Topaz Generative', icon: '✨', disabled: true, badge: 'Coming Soon' },
];

const RECENT_UPLOADS = [
  { id: 1, src: '/assets/portrait1.jpg' },
  { id: 2, src: '/assets/portrait2.jpg' },
  { id: 3, src: '/assets/portrait3.jpg' },
  { id: 4, src: '/assets/portrait4.jpg' },
  { id: 5, src: '/assets/portrait5.jpg' },
  { id: 6, src: '/assets/landscape.jpg' },
  { id: 7, src: '/assets/classic.jpg' },
  { id: 8, src: '/assets/image1.jpg' },
  { id: 9, src: '/assets/portrait1.jpg' },
  { id: 10, src: '/assets/portrait2.jpg' },
  { id: 11, src: '/assets/portrait3.jpg' },
  { id: 12, src: '/assets/portrait4.jpg' },
  { id: 13, src: '/assets/portrait5.jpg' },
  { id: 14, src: '/assets/landscape.jpg' },
  { id: 15, src: '/assets/classic.jpg' },
];

export default function UpscalePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState('standard-v2');
  const [scaleFactor, setScaleFactor] = useState(2);
  const [subjectDetection, setSubjectDetection] = useState('none');
  const [faceEnhancement, setFaceEnhancement] = useState(false);
  const [strength, setStrength] = useState(80);
  const [creativity, setCreativity] = useState(50);
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [credits, setCredits] = useState(12000);
  const [selectedRecent, setSelectedRecent] = useState<number | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setSelectedRecent(null);
    }
  };

  const handleConfirmSelection = () => {
    if (selectedRecent) {
      alert(`Selected image ${selectedRecent}`);
    } else if (selectedFile) {
      alert(`Selected file: ${selectedFile.name}`);
    } else {
      alert('Please select an image first');
    }
  };

  const handleUpscale = () => {
    if (!selectedFile && !selectedRecent) {
      alert('Please select an image first');
      return;
    }
    setIsUpscaling(true);
    setTimeout(() => {
      setIsUpscaling(false);
      setCredits(prev => prev - 5);
      setResultImage('/assets/landscape.jpg'); // Placeholder result
      alert('Upscaling simulated! In production, this would call your AI API.');
    }, 3000);
  };

  const handleDownload = () => {
    alert('Download feature - would download the upscaled image');
  };

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-neon)', textShadow: '0 0 30px var(--shadow-cyan)', marginBottom: '20px' }}>
            AI Image Upscaler
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
            Transform low-resolution images into ultra-sharp masterpieces
          </p>
        </div>

        {/* Main Upscale Grid */}
        <div className={styles.mainGrid}>
          
          {/* Left Container: Image Upload */}
          <div className={styles.container}>
            <div className={styles.containerHeader}>
              <h3 className={styles.containerTitle}>Upload Image</h3>
            </div>
            <div className={styles.containerBody}>
              {/* Drag and Drop Area */}
              <div className={styles.dropzone}>
                <div className={styles.dropzoneContent}>
                  <div className={styles.dropzoneIcon}>📤</div>
                  <p className={styles.dropzoneText}>Drop image here or click to upload</p>
                  <p className={styles.dropzoneSubtext}>PNG, JPG, WebP up to 10MB</p>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="upscaleFileInput"
                  />
                  <button
                    className={styles.btnChoose}
                    onClick={() => document.getElementById('upscaleFileInput')?.click()}
                  >
                    <span>📁 Choose File</span>
                  </button>
                </div>
              </div>

              {/* Confirm Button */}
              <button 
                className={styles.confirmBtn}
                onClick={handleConfirmSelection}
              >
                <span className={styles.btnIcon}>✓</span>
                Confirm Selection
              </button>

              {/* Recently Uploaded Images */}
              <div className={styles.recentSection}>
                <h4 className={styles.recentTitle}>Recently Uploaded</h4>
                <div className={styles.recentScrollContainer}>
                  <div className={styles.recentGrid}>
                    {RECENT_UPLOADS.map((upload) => (
                      <div
                        key={upload.id}
                        className={`${styles.recentItem} ${selectedRecent === upload.id ? styles.selected : ''}`}
                        onClick={() => {
                          setSelectedRecent(upload.id);
                          setSelectedFile(null);
                        }}
                      >
                        <Image
                          src={upload.src}
                          alt={`Recent ${upload.id}`}
                          width={150}
                          height={150}
                          style={{ objectFit: 'cover' }}
                        />
                        {selectedRecent === upload.id && (
                          <div className={styles.recentOverlay}>✓</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Container: Settings & Controls */}
          <div className={styles.container}>
            <div className={styles.containerHeader}>
              <h3 className={styles.containerTitle}>Model & Settings</h3>
            </div>
            <div className={styles.containerBody}>
              
              {/* Model Selector */}
              <div className={styles.settingGroup}>
                <label className={styles.label}>Model</label>
                <div className={styles.modelGrid}>
                  {UPSCALE_MODELS.map((model) => (
                    <div
                      key={model.id}
                      className={`${styles.modelOption} ${selectedModel === model.id ? styles.active : ''} ${model.disabled ? styles.disabled : ''}`}
                      onClick={() => !model.disabled && setSelectedModel(model.id)}
                    >
                      <div className={styles.modelIcon}>{model.icon}</div>
                      <div className={styles.modelName}>{model.name}</div>
                      {model.badge && (
                        <div className={styles.modelBadge}>{model.badge}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Scale Factor */}
              <div className={styles.settingGroup}>
                <label className={styles.label}>Scale Factor</label>
                <div className={styles.scaleOptions}>
                  {[2, 4, 6].map((scale) => (
                    <button
                      key={scale}
                      className={`${styles.scaleBtn} ${scaleFactor === scale ? styles.active : ''}`}
                      onClick={() => setScaleFactor(scale)}
                    >
                      {scale}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Detection */}
              <div className={styles.settingGroup}>
                <label className={styles.label}>Subject Detection</label>
                <select
                  className={styles.select}
                  value={subjectDetection}
                  onChange={(e) => setSubjectDetection(e.target.value)}
                >
                  <option value="none">None</option>
                  <option value="all">All</option>
                  <option value="foreground">Foreground</option>
                  <option value="background">Background</option>
                </select>
              </div>

              {/* Face Enhancement Toggle */}
              <div className={styles.settingGroup}>
                <label className={styles.label}>Face Enhancement</label>
                <div className={styles.toggleContainer}>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={faceEnhancement}
                      onChange={(e) => setFaceEnhancement(e.target.checked)}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                  <span className={styles.toggleLabel}>
                    {faceEnhancement ? 'On' : 'Off'}
                  </span>
                </div>
              </div>

              {/* Strength Slider */}
              <div className={styles.settingGroup}>
                <label className={styles.label}>
                  Strength
                  <span className={styles.valueDisplay}>{strength}%</span>
                </label>
                <input
                  type="range"
                  className={styles.slider}
                  min="0"
                  max="100"
                  value={strength}
                  onChange={(e) => setStrength(parseInt(e.target.value))}
                />
              </div>

              {/* Creativity Slider */}
              <div className={styles.settingGroup}>
                <label className={styles.label}>
                  Creativity
                  <span className={styles.valueDisplay}>{creativity}%</span>
                </label>
                <input
                  type="range"
                  className={styles.slider}
                  min="0"
                  max="100"
                  value={creativity}
                  onChange={(e) => setCreativity(parseInt(e.target.value))}
                />
              </div>

              {/* Generate Button */}
              <button
                className={styles.generateBtn}
                onClick={handleUpscale}
                disabled={isUpscaling}
              >
                <span className={styles.btnIcon}>🚀</span>
                {isUpscaling ? 'Upscaling...' : 'Upscale'}
              </button>
            </div>
          </div>

        </div>

        {/* Warning/Attention Section */}
        <div className={styles.warningSection}>
          <div className={styles.warningContent}>
            <div className={styles.warningIcon}>⚠️</div>
            <div className={styles.warningText}>
              <h4 className={styles.warningTitle}>Important Notice</h4>
              <p className={styles.warningMessage}>
                Upscaled images are <strong>not saved on the server</strong>. They will be permanently deleted when you refresh or leave this page. 
                Please <strong>download and save your upscaled images</strong> immediately after processing.
              </p>
            </div>
          </div>
        </div>

        {/* Results Container */}
        <div className={styles.resultsContainer}>
          <div className={styles.containerHeader}>
            <h3 className={styles.containerTitle}>Upscaled Result</h3>
          </div>
          <div className={styles.containerBody}>
            <div className={styles.resultContent}>
              {!resultImage ? (
                /* Placeholder for result */
                <div className={styles.resultPlaceholder}>
                  <div className={styles.placeholderIcon}>🎯</div>
                  <p className={styles.placeholderText}>Your upscaled image will appear here</p>
                  <p className={styles.placeholderSubtext}>Upload an image and click &quot;Upscale&quot; to begin</p>
                </div>
              ) : (
                /* Result image */
                <div className={styles.resultImageContainer}>
                  <Image
                    src={resultImage}
                    alt="Upscaled Result"
                    width={800}
                    height={800}
                    className={styles.resultImage}
                    style={{ objectFit: 'contain' }}
                  />
                  <div className={styles.resultActions}>
                    <button
                      className={styles.downloadBtn}
                      onClick={handleDownload}
                    >
                      <span className={styles.btnIcon}>⬇️</span>
                      Download Image
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}