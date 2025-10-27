'use client';

import { useState } from 'react';
import Image from 'next/image';
import UploadModal from '@/components/UploadModal';
import styles from './page.module.css';

const AI_MODELS = [
  { id: 'seedream-4', name: 'Seedream 4', image: '/assets/seedream-4.jpg' },
  { id: 'imagineart-1', name: 'ImagineArt-1', image: '/assets/imagineart-1.png' },
  { id: 'neonlights-retro', name: 'Neonlights Retro', image: '/assets/neonlights-retro.jpg' },
  { id: 'nano-banana', name: 'Nano Banana', image: '/assets/nano-banana.png' },
  { id: 'hunyuan-image-3', name: 'Hunyuan Image 3', image: '/assets/hunyuan-image-3.jpg' },
  { id: 'wan-2', name: 'Wan-2', image: '/assets/wan-2.jpg' },
  { id: 'minimax-image-01', name: 'Minimax Image-01', image: '/assets/minimax-image-01.jpg' },
  { id: 'leonardo-phoenix', name: 'Leonardo Phoenix 1.0', image: '/assets/leonardo-phoenix.png' },
  { id: 'flux-dev', name: 'Flux Dev', image: '/assets/flux-dev.jpg' },
  { id: 'flux-pro-ultra', name: 'Flux Pro1.1 Ultra', image: '/assets/flux-pro1.1-ultra.jpg' },
  { id: 'flux-kontext', name: 'Flux Kontext Max', image: '/assets/flux-kontext.jpg' },
  { id: 'ideogram-v3', name: 'Ideogram v3 Quality', image: '/assets/ideogram-v3.png' },
  { id: 'google-imagen-4', name: 'Google Imagen 4', image: '/assets/google-imagen-4.jpg' },
  { id: 'google-imagen-4-ultra', name: 'Google Imagen 4 Ultra', image: '/assets/google-imagen-4-ultra.jpg' },
  { id: 'luma-photon', name: 'Luma Photon', image: '/assets/luma-photon.jpg' },
  { id: 'recraft-v3', name: 'Recraft V3', image: '/assets/recraft-v3.jpg' },
];

const DIMENSIONS = [
  { id: 'portrait', ratio: '9:16', size: '1080x1920', class: 'portrait' },
  { id: 'landscape', ratio: '16:9', size: '1920x1080', class: 'landscape' },
  { id: 'square', ratio: '1:1', size: '1024x1024', class: 'square' },
  { id: 'classic', ratio: '4:3', size: '1536x1152', class: 'classic' },
];

const RECENT_GENERATIONS = [
  {
    id: 1,
    image: '/assets/landscape.jpg',
    prompt: 'Futuristic cityscape with neon lights',
    model: 'Seedream 4',
    time: '2 min ago'
  },
  {
    id: 2,
    image: '/assets/portrait1.jpg',
    prompt: 'Abstract cosmic art with vibrant colors',
    model: 'Leonardo Phoenix 1.0',
    time: '5 min ago'
  },
  {
    id: 3,
    image: '/assets/portrait2.jpg',
    prompt: 'Cyberpunk warrior in digital rain',
    model: 'Flux1.1 Pro Ultra',
    time: '12 min ago'
  },
  {
    id: 4,
    image: '/assets/classic.jpg',
    prompt: 'Anime character in fantasy landscape',
    model: 'ImagineArt-1',
    time: '18 min ago'
  },
];

export default function ImagePage() {
  const [selectedModel, setSelectedModel] = useState('seedream-4');
  const [selectedDimension, setSelectedDimension] = useState('square');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [credits, setCredits] = useState(12000);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [referenceImages, setReferenceImages] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }
    
    // Simulate generation
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCredits(prev => prev - 10);
      alert(`Image generation simulated${referenceImages.length > 0 ? ` with ${referenceImages.length} reference images` : ''}!`);
    }, 3000);
  };

  const handleUploadConfirm = (selectedImages: string[]) => {
    setReferenceImages(selectedImages);
    setIsUploadModalOpen(false);
    alert(`${selectedImages.length} reference images selected!`);
  };

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-neon)', textShadow: '0 0 30px var(--shadow-cyan)', marginBottom: '20px' }}>
            Neural Image Generation
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
            Create stunning visuals with advanced AI models. From photorealistic portraits to abstract art.
          </p>
        </div>

        {/* AI Models Panel */}
        <section className="section" style={{ paddingTop: 0, paddingBottom: '30px' }}>
          <div className="glass-panel mb-4" style={{ padding: '25px' }}>
            <h3 style={{ color: 'var(--primary-neon)', marginBottom: '20px', fontSize: '1.3rem' }}>
              AI Models Panel
            </h3>
            <div className={styles.modelsGridHorizontal}>
              {AI_MODELS.map((model) => (
                <div
                  key={model.id}
                  className={`${styles.modelCard} ${selectedModel === model.id ? styles.active : ''}`}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    sizes="(max-width: 768px) 25vw, 12vw"
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                  <div className={styles.modelName}>{model.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className={styles.imageGenLayout}>
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

              {/* Prompt Input */}
              <div className="glass-panel mb-4" style={{ padding: '25px' }}>
                <h3 style={{ color: 'var(--primary-neon)', marginBottom: '20px', fontSize: '1.3rem' }}>
                  Neural Prompt Interface
                </h3>
                <div className={styles.promptContainer}>
                  <textarea
                    className={styles.promptInput}
                    placeholder="Describe your vision..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isGenerating}
                  />
                </div>

                {/* Action Buttons */}
                <div className={styles.promptActionButtons}>
                  <button className={styles.btnActionLong}>
                    <span>✨ Enhance Prompt</span>
                  </button>
                  <button 
                    className={styles.btnActionLong}
                    onClick={() => setIsUploadModalOpen(true)}
                  >
                    <span>📤 Upload Images</span>
                  </button>
                </div>

                {/* Reference Images Thumbnails */}
                {referenceImages.length > 0 && (
                  <div className={styles.referenceImagesContainer}>
                    <div className={styles.referenceImagesGrid}>
                      {referenceImages.map((imgSrc, index) => (
                        <div key={index} className={styles.referenceThumbnail}>
                          <Image
                            src={imgSrc}
                            alt={`Reference ${index + 1}`}
                            fill
                            sizes="100px"
                            style={{ objectFit: 'cover' }}
                          />
                          <button
                            className={styles.referenceThumbnailRemove}
                            onClick={() => setReferenceImages(prev => prev.filter((_, i) => i !== index))}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
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
                    <span>⚡ Generating...</span>
                  ) : (
                    <span>
                      🚀 Generate <span style={{ color: '#ff4444', fontSize: '0.85em', marginLeft: '5px' }}>-10</span>
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
                  {RECENT_GENERATIONS.map((gen) => (
                    <div key={gen.id} className={styles.generationItem}>
                      <div className={styles.generationImage}>
                        <Image
                          src={gen.image}
                          alt="Generated image"
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          style={{ objectFit: 'cover' }}
                          unoptimized
                        />
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

          {/* Image Generation Tips */}
          <div className="glass-panel" style={{ padding: '30px', marginTop: '40px' }}>
            <h3 style={{ color: 'var(--secondary-neon)', marginBottom: '20px', textAlign: 'center' }}>
              🎯 Image Generation Mastery
            </h3>
            <div className="grid-3 gap-2">
              <div>
                <h4 style={{ color: 'var(--primary-neon)', marginBottom: '10px' }}>🎨 Prompt Crafting</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Be specific with details, lighting, style, and mood. Include artistic references and descriptive adjectives for best results.
                </p>
              </div>
              <div>
                <h4 style={{ color: 'var(--secondary-neon)', marginBottom: '10px' }}>⚡ Model Selection</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Flux Pro for ultra-quality, Seedream 4 for creative styles, Google Imagen 4 Ultra for photorealistic results.
                </p>
              </div>
              <div>
                <h4 style={{ color: 'var(--accent-neon)', marginBottom: '10px' }}>📐 Aspect Ratios</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Square for social media, Landscape for desktop wallpapers, Portrait for mobile screens and posters.
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
