'use client';

import { useState } from 'react';
import Image from 'next/image';
import UploadModal from '@/components/UploadModal';
import styles from './page.module.css';

const VIDEO_MODELS = [
  { id: 'pixverse-v5', name: 'Pixverse V5', image: '/assets/pixverse-v5.jpg' },
  { id: 'kling-master-v2', name: 'Kling Master V2', image: '/assets/kling-master-v2.png' },
  { id: 'kling-2.5-turbo-pro', name: 'Kling 2.5 Turbo Pro', image: '/assets/kling-2.5-turbo-pro.jpg' },
  { id: 'minimax-helios-2', name: 'Minimax Helios 2', image: '/assets/minimax-helios-2.png' },
  { id: 'sora-2', name: 'Sora 2', image: '/assets/sora-2.jpg' },
  { id: 'sora-2-pro', name: 'Sora 2 Pro', image: '/assets/sora-2-pro.jpg' },
  { id: 'sora-2-pro-max', name: 'Sora 2 Pro Max', image: '/assets/sora-2-pro-max.jpg' },
  { id: 'veo-3.1', name: 'Veo 3.1', image: '/assets/veo-3.1.jpg' },
  { id: 'veo-3.1-fast', name: 'Veo 3.1 Fast', image: '/assets/veo-3.1-fast.jpg' },
  { id: 'coming-soon', name: 'Coming Soon', image: '/assets/128x128.png', disabled: true },
];

const DIMENSIONS = [
  { id: 'portrait', ratio: '9:16', size: '1080x1920', class: 'portrait' },
  { id: 'landscape', ratio: '16:9', size: '1920x1080', class: 'landscape' },
  { id: 'square', ratio: '1:1', size: '1024x1024', class: 'square' },
  { id: 'classic', ratio: '4:3', size: '1536x1152', class: 'classic' },
];

const DURATIONS = [
  { value: '3', label: '3 seconds', cost: 10 },
  { value: '5', label: '5 seconds', cost: 15 },
  { value: '8', label: '8 seconds', cost: 20 },
  { value: '10', label: '10 seconds', cost: 25 },
  { value: '12', label: '12 seconds', cost: 30 },
];

const RECENT_VIDEOS = [
  {
    id: 1,
    video: '/assets/video1.mp4',
    prompt: 'Ring rotates around space ship',
    model: 'Video Model 1',
    time: '2 min ago'
  },
  {
    id: 2,
    video: '/assets/video2.mp4',
    prompt: 'Abstract cosmic animation with vibrant colors',
    model: 'Video Model 3',
    time: '5 min ago'
  },
  {
    id: 3,
    video: '/assets/video3.mp4',
    prompt: 'Cyberpunk city with neon lights at night',
    model: 'Video Model 5',
    time: '12 min ago'
  },
  {
    id: 4,
    video: '/assets/video4.mp4',
    prompt: 'Smooth camera fly through futuristic corridor',
    model: 'Video Model 2',
    time: '18 min ago'
  },
];

export default function VideoPage() {
  const [selectedModel, setSelectedModel] = useState('pixverse-v5');
  const [selectedDimension, setSelectedDimension] = useState('square');
  const [selectedDuration, setSelectedDuration] = useState('5');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [credits, setCredits] = useState(12000);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [referenceImages, setReferenceImages] = useState<string[]>([]);

  const currentDuration = DURATIONS.find(d => d.value === selectedDuration);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }
    
    // Simulate generation
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCredits(prev => prev - (currentDuration?.cost || 15));
      alert(`Video generation simulated${referenceImages.length > 0 ? ` with ${referenceImages.length} reference images` : ''}!`);
    }, 4000);
  };

  const handleUploadConfirm = (selectedImages: string[]) => {
    setReferenceImages(selectedImages);
    setIsUploadModalOpen(false);
    alert(`${selectedImages.length} start frame images selected!`);
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
          <div className="glass-panel mb-4" style={{ padding: '25px' }}>
            <h3 style={{ color: 'var(--primary-neon)', marginBottom: '20px', fontSize: '1.3rem' }}>
              Video Models Panel
            </h3>
            <div className={styles.modelsGrid2x5}>
              {VIDEO_MODELS.map((model) => (
                <div
                  key={model.id}
                  className={`${styles.modelCard} ${selectedModel === model.id ? styles.active : ''} ${model.disabled ? styles.disabled : ''}`}
                  onClick={() => !model.disabled && setSelectedModel(model.id)}
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
              <div className="glass-panel mb-4" style={{ padding: '25px' }}>
                <h3 style={{ color: 'var(--primary-neon)', marginBottom: '20px', fontSize: '1.3rem' }}>
                  Dimensional Matrix
                </h3>
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
              <div className="glass-panel mb-4" style={{ padding: '25px' }}>
                <h3 style={{ color: 'var(--primary-neon)', marginBottom: '20px', fontSize: '1.3rem' }}>
                  ⏱️ Video Duration
                </h3>
                <select
                  className={styles.durationDropdown}
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  disabled={isGenerating}
                >
                  {DURATIONS.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label} (-{duration.cost} credits)
                    </option>
                  ))}
                </select>
              </div>

              {/* Prompt Input */}
              <div className="glass-panel mb-4" style={{ padding: '25px' }}>
                <h3 style={{ color: 'var(--primary-neon)', marginBottom: '20px', fontSize: '1.3rem' }}>
                  Neural Prompt Interface
                </h3>
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
                      🚀 Render <span style={{ color: '#ff4444', fontSize: '0.85em', marginLeft: '5px' }}>-{currentDuration?.cost}</span>
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Recent Generations */}
            <div className={styles.recentGenerations}>
              <div className="glass-panel" style={{ padding: '25px' }}>
                <h3 style={{ color: 'var(--primary-neon)', marginBottom: '20px', fontSize: '1.3rem' }}>
                  Recent Generations
                </h3>
                <div className={styles.generationsGrid}>
                  {RECENT_VIDEOS.map((gen) => (
                    <div key={gen.id} className={styles.generationItem}>
                      <div className={styles.generationVideo}>
                        <video controls loop style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}>
                          <source src={gen.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
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
          </div>
        </section>
      </div>

      {/* Upload Modal */}
      <UploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onConfirm={handleUploadConfirm}
      />
    </main>
  );
}
