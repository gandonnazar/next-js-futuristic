import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className="text-center">
            <h1 className="hero-title mb-3">NEONLIGHTS AI</h1>
            <p className={styles.heroSubtitle}>
              Generate the Future.
            </p>
            
            <div className="flex-center gap-3 mb-5" style={{ flexWrap: 'wrap' }}>
              <Link href="/image" className="neon-button cta-button">
                Launch Image Generator
              </Link>
              <Link href="/video" className="neon-button cta-button secondary">
                Create Video
              </Link>
            </div>
          </div>
          
          {/* Floating Stats Panels */}
          <div className="grid-3 mt-5">
            <div className="stat-card hologram">
              <div className="stat-number">400K</div>
              <div className="stat-label">Active Creators</div>
            </div>
            
            <div className="stat-card hologram" style={{ animationDelay: '-2s' }}>
              <div className="stat-number">15K</div>
              <div className="stat-label">Images Generated</div>
            </div>
            
            <div className="stat-card hologram" style={{ animationDelay: '-4s' }}>
              <div className="stat-number">3K</div>
              <div className="stat-label">Videos Rendered</div>
            </div>
            
            <div className="stat-card hologram" style={{ animationDelay: '-1s' }}>
              <div className="stat-number">99.7%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtitle Section */}
      <div className="container">
        <div className="text-center">
          <h2 className={styles.commandTitle}>
            Command the Power of AI Creation
          </h2>
        </div>
      </div>

      {/* Parallax Section */}
      <section className={styles.parallaxSection}></section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className={styles.featuresTitle}>
              Futuristic AI Capabilities
            </h2>
            <p className={styles.featuresSubtitle}>
              Experience the next generation of creative AI technology
            </p>
          </div>
          
          <div className={styles.featuresGrid}>
            <div className="glass-panel" style={{ padding: '40px' }}>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <div className={styles.featureIcon} style={{ borderColor: 'var(--primary-neon)', boxShadow: '0 0 20px var(--shadow-cyan)' }}>
                  <span style={{ fontSize: '1.5rem' }}>🎨</span>
                </div>
                <div>
                  <h3 className={styles.featureTitle} style={{ color: 'var(--primary-neon)' }}>
                    Ultra-HD Image Generation
                  </h3>
                  <p className={styles.featureDescription}>
                    Create stunning 4K images with our advanced AI models. From photorealistic portraits to abstract art, unleash your creativity without limits.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-panel" style={{ padding: '40px' }}>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <div className={styles.featureIcon} style={{ borderColor: 'var(--secondary-neon)', boxShadow: '0 0 20px var(--shadow-magenta)' }}>
                  <span style={{ fontSize: '1.5rem' }}>🎬</span>
                </div>
                <div>
                  <h3 className={styles.featureTitle} style={{ color: 'var(--secondary-neon)' }}>
                    Cinematic Video Creation
                  </h3>
                  <p className={styles.featureDescription}>
                    Generate professional-quality videos up to 12 seconds long. Perfect for social media, presentations, and creative projects.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-panel" style={{ padding: '40px' }}>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <div className={styles.featureIcon} style={{ borderColor: 'var(--primary-neon)', boxShadow: '0 0 20px var(--shadow-cyan)' }}>
                  <span style={{ fontSize: '1.5rem' }}>🔮</span>
                </div>
                <div>
                  <h3 className={styles.featureTitle} style={{ color: 'var(--primary-neon)' }}>
                    Advanced Upscaling
                  </h3>
                  <p className={styles.featureDescription}>
                    Enhance any image up to 8x resolution with our AI upscaling technology. Transform low-res images into masterpieces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section">
        <div className="container">
          <div className="glass-panel" style={{ padding: '60px', textAlign: 'center' }}>
            <h2 className={styles.ctaTitle}>
              Ready to Create the <span className="neon-text">Future</span>?
            </h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of creators who are already using NeonLights.ai to bring their wildest visions to life.
            </p>
            <div className="flex-center gap-3" style={{ flexWrap: 'wrap' }}>
              <Link href="/pricing" className="neon-button cta-button">
                Get Started Now
              </Link>
              <Link href="/gallery" className="neon-button secondary">
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
