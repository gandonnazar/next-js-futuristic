'use client';

import { useState } from 'react';
import Image from 'next/image';
import UploadModal from '@/components/UploadModal';
import styles from './page.module.css';
import { getAssetPath } from '@/lib/utils';

const VIDEO_MODELS = [
  { id: 'pixverse-v5', name: 'Pixverse V5', image: getAssetPath('/assets/pixverse-v5.jpg') },
  { id: 'kling-master-v2', name: 'Kling Master V2', image: getAssetPath('/assets/kling-master-v2.png') },
  { id: 'kling-2.5-turbo-pro', name: 'Kling 2.5 Turbo Pro', image: getAssetPath('/assets/kling-2.5-turbo-pro.jpg') },
  { id: 'minimax-helios-2', name: 'Minimax Helios 2', image: getAssetPath('/assets/minimax-helios-2.png') },
  { id: 'minimax-hailuo-2.3', name: 'Minimax Hailuo 2.3', image: getAssetPath('/assets/minimax-hailuo-2.3.jpg') },
  { id: 'sora-2', name: 'Sora 2', image: getAssetPath('/assets/sora-2.jpg') },
  { id: 'sora-2-pro', name: 'Sora 2 Pro', image: getAssetPath('/assets/sora-2-pro.jpg') },
  { id: 'sora-2-pro-max', name: 'Sora 2 Pro Max', image: getAssetPath('/assets/sora-2-pro-max.jpg') },
  { id: 'veo-3.1', name: 'Veo 3.1', image: getAssetPath('/assets/veo-3.1.jpg') },
  { id: 'veo-3.1-fast', name: 'Veo 3.1 Fast', image: getAssetPath('/assets/veo-3.1-fast.jpg') },
];

const DIMENSIONS = [
  { id: 'portrait', ratio: '9:16', size: '1080x1920', class: 'portrait' },
  { id: 'landscape', ratio: '16:9', size: '1920x1080', class: 'landscape' },
  { id: 'square', ratio: '1:1', size: '1024x1024', class: 'square' },
  { id: 'classic', ratio: '4:3', size: '1536x1152', class: 'classic' },
];

interface VideoDuration {
  duration: number;
  label: string;
  time: string;
  credits: number;
}

const VIDEO_MODEL_DURATIONS: Record<string, VideoDuration[]> = {
  'pixverse-v5': [
    { duration: 5, label: 'Short', time: '5s', credits: 200 },
    { duration: 8, label: 'Medium', time: '8s', credits: 320 }
  ],
  'kling-master-v2': [
    { duration: 5, label: 'Short', time: '5s', credits: 320 },
    { duration: 10, label: 'Long', time: '10s', credits: 640 }
  ],
  'kling-2.5-turbo-pro': [
    { duration: 5, label: 'Short', time: '5s', credits: 90 },
    { duration: 10, label: 'Long', time: '10s', credits: 180 }
  ],
  'minimax-helios-2': [
    { duration: 6, label: 'Short', time: '6s', credits: 68 },
    { duration: 10, label: 'Long', time: '10s', credits: 112 }
  ],
  'sora-2': [
    { duration: 4, label: 'Short', time: '4s', credits: 100 },
    { duration: 8, label: 'Medium', time: '8s', credits: 200 },
    { duration: 12, label: 'Long', time: '12s', credits: 300 }
  ],
  'sora-2-pro': [
    { duration: 4, label: 'Short', time: '4s', credits: 300 },
    { duration: 8, label: 'Medium', time: '8s', credits: 600 },
    { duration: 12, label: 'Long', time: '12s', credits: 900 }
  ],
  'sora-2-pro-max': [
    { duration: 4, label: 'Short', time: '4s', credits: 500 },
    { duration: 8, label: 'Medium', time: '8s', credits: 1000 },
    { duration: 12, label: 'Long', time: '12s', credits: 1500 }
  ],
  'veo-3.1': [
    { duration: 4, label: 'Short', time: '4s', credits: 450 },
    { duration: 8, label: 'Medium', time: '8s', credits: 900 }
  ],
  'veo-3.1-fast': [
    { duration: 4, label: 'Short', time: '4s', credits: 225 },
    { duration: 8, label: 'Medium', time: '8s', credits: 450 }
  ],
  'minimax-hailuo-2.3': [
    { duration: 6, label: 'Short', time: '6s', credits: 130 },
    { duration: 10, label: 'Long', time: '10s', credits: 220 }
  ]
};

const RECENT_VIDEOS = [
  {
    id: 1,
    video: getAssetPath('/assets/video1.mp4'),
    prompt: 'Ring rotates around space ship',
    model: 'Video Model 1',
    time: '2 min ago'
  },
  {
    id: 2,
    video: getAssetPath('/assets/video2.mp4'),
    prompt: 'Abstract cosmic animation with vibrant colors',
    model: 'Video Model 3',
    time: '5 min ago'
  },
  {
    id: 3,
    video: getAssetPath('/assets/video3.mp4'),
    prompt: 'Cyberpunk city with neon lights at night',
    model: 'Video Model 5',
    time: '12 min ago'
  },
  {
    id: 4,
    video: getAssetPath('/assets/video4.mp4'),
    prompt: 'Smooth camera fly through futuristic corridor',
    model: 'Video Model 2',
    time: '18 min ago'
  },
];

export default function VideoPage() {
  const [selectedModel, setSelectedModel] = useState('pixverse-v5');
  const [selectedDimension, setSelectedDimension] = useState('portrait');
  const [selectedDuration, setSelectedDuration] = useState<number>(5);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [credits, setCredits] = useState(12000);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<typeof RECENT_VIDEOS[0] | null>(null);

  // Get available durations for selected model
  const availableDurations = VIDEO_MODEL_DURATIONS[selectedModel] || VIDEO_MODEL_DURATIONS['pixverse-v5'];
  
  // Get current duration details
  const currentDurationDetails = availableDurations.find(d => d.duration === selectedDuration) || availableDurations[0];

  // Update selected duration when model changes
  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    const newAvailableDurations = VIDEO_MODEL_DURATIONS[modelId] || VIDEO_MODEL_DURATIONS['pixverse-v5'];
    setSelectedDuration(newAvailableDurations[0].duration);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }
    
    // Simulate generation
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCredits(prev => prev - currentDurationDetails.credits);
      alert(`Video generation simulated${referenceImages.length > 0 ? ` with ${referenceImages.length} reference images` : ''}!`);
    }, 4000);
  };

  const handleUploadConfirm = (selectedImages: string[]) => {
    setReferenceImages(selectedImages);
    setIsUploadModalOpen(false);
  };

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-neon)', textShadow: '0 0 30px var(--shadow-cyan)', marginBottom: '20px' }}>
            Cinematic Video Rendering
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
            Transform your ideas into stunning video content with AI precision
          </p>
        </div>

        {/* Video Models Panel */}
        <section className="section" style={{ paddingTop: 0, paddingBottom: '30px' }}>
          <h3 style={{ color: 'var(--primary-neon)', marginTop: '40px', marginBottom: '20px', fontSize: '1.3rem' }}>
            Video Models Panel
          </h3>
          <div className="mb-4">
            <div className={styles.modelsGrid2x5}>
              {VIDEO_MODELS.map((model) => (
                <div
                  key={model.id}
                  className={`${styles.modelCard} ${selectedModel === model.id ? styles.active : ''}`}
                  onClick={() => handleModelChange(model.id)}
                >
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    sizes="(max-width: 768px) 33vw, 20vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.modelName}>{model.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className={styles.videoGenLayout}>
            {/* Left Column: Generation Controls */}
            <div className={styles.generationControls}>
              {/* Dimensional Matrix Panel */}
              <h3 style={{ color: 'var(--primary-neon)', marginTop: '40px', marginBottom: '20px', fontSize: '1.3rem' }}>
                Dimensional Matrix
              </h3>
              <div className="mb-4">
                <div className={styles.dimensionSelectorVertical}>
                  {DIMENSIONS.map((dim) => (
                    <div
                      key={dim.id}
                      className={`${styles.dimensionOption} ${selectedDimension === dim.id ? styles.active : ''}`}
                      onClick={() => setSelectedDimension(dim.id)}
                    >
                      <div className={`${styles.ratioPreview} ${styles[dim.class]}`}></div>
                      <div className={styles.dimensionInfo}>
                        <span>{dim.id.charAt(0).toUpperCase() + dim.id.slice(1)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Duration Selector */}
              <h3 style={{ color: 'var(--primary-neon)', marginTop: '40px', marginBottom: '20px', fontSize: '1.3rem' }}>
                Video Duration
              </h3>
              <div className="mb-4">
                <select
                  className={styles.durationDropdown}
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(Number(e.target.value))}
                  disabled={isGenerating}
                >
                  {availableDurations.map((duration) => (
                    <option key={duration.duration} value={duration.duration}>
                      {duration.label} ({duration.time}) - {duration.credits} credits
                    </option>
                  ))}
                </select>
              </div>

              {/* Prompt Input */}
              <h3 style={{ color: 'var(--primary-neon)', marginTop: '40px', marginBottom: '20px', fontSize: '1.3rem' }}>
                Neural Prompt Interface
              </h3>
              <div className="mb-4">
                <div className={styles.promptContainer}>
                  <textarea
                    className={styles.promptInput}
                    placeholder="Describe your animation..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isGenerating}
                  />
                </div>

                {/* Action Buttons */}
                <div className={styles.promptActionButtons}>
                  <button 
                    className={styles.btnActionLong}
                    onClick={() => setIsUploadModalOpen(true)}
                  >
                    <span>🎬 Start Frame</span>
                  </button>
                  <button 
                    className={`${styles.btnActionLong} ${referenceImages.length === 0 ? styles.disabled : ''}`} 
                    disabled={referenceImages.length === 0}
                    onClick={() => alert('End Frame selection simulated! This would open another upload modal for end frames.')}
                  >
                    <span>🎬 End Frame</span>
                  </button>
                </div>

                {/* Frame Images Display */}
                {referenceImages.length > 0 && (
                  <div className={styles.frameImagesContainer}>
                    {referenceImages.map((imgSrc, index) => (
                      <div key={index} className={styles.frameImageItem}>
                        <div className={styles.frameLabel}>
                          {index === 0 ? 'Start Frame' : 'End Frame'}
                        </div>
                        <div className={styles.frameThumbnail}>
                          <Image
                            src={imgSrc}
                            alt={`${index === 0 ? 'Start' : 'End'} Frame`}
                            fill
                            sizes="400px"
                            style={{ objectFit: 'contain' }}
                          />
                          <button
                            className={styles.frameThumbnailRemove}
                            onClick={() => setReferenceImages(prev => prev.filter((_, i) => i !== index))}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <div className={styles.generationAction}>
                <button className={`neon-button ${styles.creditsDisplayBtn}`}>
                  <span>Credits: {credits.toLocaleString()}</span>
                </button>
                <button
                  className={`neon-button ${styles.generateBtn}`}
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <span>⚡ Rendering...</span>
                  ) : (
                    <span>
                      🚀 Render <span style={{ color: '#ff4444', fontSize: '0.85em', marginLeft: '5px' }}>-{currentDurationDetails.credits}</span>
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Recent Generations */}
            <div className={styles.recentGenerations}>
              <h3 style={{ color: 'var(--primary-neon)', marginTop: '40px', marginBottom: '20px', fontSize: '1.3rem' }}>
                Recent Generations
              </h3>
              <div>
                <div className={styles.generationsGrid}>
                  {RECENT_VIDEOS.map((gen) => (
                    <div key={gen.id} className={styles.generationItem}>
                      <div 
                        className={styles.generationVideo}
                        onClick={() => setSelectedVideo(gen)}
                        style={{ cursor: 'pointer', position: 'relative' }}
                        onMouseEnter={(e) => {
                          const playBtn = e.currentTarget.querySelector('.play-overlay') as HTMLElement;
                          if (playBtn) {
                            playBtn.style.transform = 'translate(-50%, -50%) scale(1.2)';
                            playBtn.style.background = 'rgba(0, 255, 255, 0.4)';
                            playBtn.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          const playBtn = e.currentTarget.querySelector('.play-overlay') as HTMLElement;
                          if (playBtn) {
                            playBtn.style.transform = 'translate(-50%, -50%) scale(1)';
                            playBtn.style.background = 'rgba(0, 255, 255, 0.2)';
                            playBtn.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <video 
                          loop 
                          muted
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover', 
                            borderRadius: '12px',
                            pointerEvents: 'none'
                          }}
                        >
                          <source src={gen.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        {/* Play overlay indicator */}
                        <div 
                          className="play-overlay"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: 'rgba(0, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid var(--primary-neon)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            color: 'var(--primary-neon)',
                            transition: 'all 0.3s ease',
                            pointerEvents: 'none'
                          }}
                        >
                          ▶
                        </div>
                      </div>
                      <div className={styles.generationInfo}>
                        <p className={styles.generationPrompt}>{gen.prompt}</p>
                        <div className={styles.generationMeta}>
                          <span>{gen.model}</span>
                          <span>{gen.time}</span>
                        </div>
                        <div className={styles.generationActions}>
                          <button className={styles.actionBtn}>📥</button>
                          <button className={styles.actionBtn}>🔗</button>
                          <button className={styles.actionBtn}>🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Video Generation Tips */}
          <div className="glass-panel" style={{ padding: '30px', marginTop: '40px' }}>
            <h3 style={{ color: 'var(--secondary-neon)', marginBottom: '20px', textAlign: 'center' }}>
              🎯 Video Generation Mastery
            </h3>
            <div className="grid-3 gap-2">
              <div>
                <h4 style={{ color: 'var(--primary-neon)', marginBottom: '10px' }}>🎬 Motion Description</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Describe camera movements, object animations, and scene transitions clearly for best results.
                </p>
              </div>
              <div>
                <h4 style={{ color: 'var(--secondary-neon)', marginBottom: '10px' }}>⚡ Model Selection</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Sora 2 Pro Max for ultra-quality, Kling for fast iterations, Veo 3.1 for cinematic results.
                </p>
              </div>
              <div>
                <h4 style={{ color: 'var(--accent-neon)', marginBottom: '10px' }}>⏱️ Duration Tips</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Shorter durations are great for testing. Longer videos allow for complex narratives and transitions.
                </p>
              </div>
            </div>

            {/* NSFW Warning */}
            <div className={styles.warningSection}>
              <div className={styles.warningContent}>
                <div className={styles.warningIcon}>⚠️</div>
                <div className={styles.warningText}>
                  <h4 className={styles.warningTitle}>Important: NSFW Content Policy</h4>
                  <p className={styles.warningMessage}>
                    If your generation fails due to NSFW content, credits will <strong>not be refunded</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Upload Modal */}
      <UploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onConfirm={handleUploadConfirm}
      />

      {/* Fullscreen Video Viewer Modal */}
      {selectedVideo && (
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
            onClick={() => setSelectedVideo(null)}
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
            onClick={() => setSelectedVideo(null)}
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
            {/* Left Side: Video Display */}
            <div className="fullscreen-modal-image-section" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#000',
              padding: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <video 
                controls 
                autoPlay 
                loop
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0 0 50px rgba(0, 255, 255, 0.3)'
                }}
              >
                <source src={selectedVideo.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
                    {selectedVideo.model}
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
                    {selectedVideo.prompt}
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
                    {selectedVideo.time}
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
                      navigator.clipboard.writeText(selectedVideo.prompt);
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
                      if (confirm('Are you sure you want to delete this video?')) {
                        alert('Delete feature');
                        setSelectedVideo(null);
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
    </main>
  );
}
