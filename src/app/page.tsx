'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './page.module.css';
import { getAssetPath } from '@/lib/utils';
import { useTypewriter } from '@/hooks/useTypewriter';

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);
  
  // Typewriter effect using custom hook
  const { displayText: displayedText, cursorOpacity } = useTypewriter({
    text: 'NEONLIGHTS AI',
    speed: 100,
    delay: 500
  });

  useEffect(() => {
    // Parallax effect on mouse move
    const parallaxElements = document.querySelectorAll('.glass-panel, .hologram');
    
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (e.clientX - centerX) / centerX;
      const moveY = (e.clientY - centerY) / centerY;
      
      parallaxElements.forEach((element, index) => {
        const speed = (index % 3 + 1) * 0.5;
        const x = moveX * speed;
        const y = moveY * speed;
        
        (element as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    // Parallax scroll effect with requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const parallax = parallaxRef.current;
          if (!parallax) {
            ticking.current = false;
            return;
          }

          const scrolled = window.pageYOffset;
          const parallaxOffset = parallax.offsetTop;
          const parallaxHeight = parallax.offsetHeight;

          // Only apply parallax when section is in view
          if (scrolled + window.innerHeight > parallaxOffset && 
              scrolled < parallaxOffset + parallaxHeight) {
            const yPos = -(scrolled - parallaxOffset) * 0.3;
            parallax.style.backgroundPosition = `center ${yPos}px`;
          }

          ticking.current = false;
        });

        ticking.current = true;
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // All gallery images
  const allImages = [
    'an_anime_style_drawing_of_a_wh_ba1ad9ac.jpg',
    'an_anime_style_image_of_a_whit_b62d0cad.jpg',
    'an_anime_woman_with_long_purpl_60dd1f4d.jpg',
    'a_futuristic_crystal_city_on_m_79e231d5.jpg',
    'a_hyperrealistic_photo_of_a_ma_2bc885c2.jpg',
    'a_majestic_man_with_a_glowing__367fccb6.jpg',
    'a_majestic_white_samurai_fox_w_c69cb7db.jpg',
    'a_surrealistic_image_of_a_woma_9379b347.jpg',
    'black_ferrari_f50_with_blue_xe_fe13ffca.jpg',
    'image-_a_hyperrealistic_glass_of_wat-1e16282d.jpg',
    'tmp9a96cwxj.jpg',
    '_anime_style_boy_with_a_high_t_7a58a4f9.jpg',
    '_anime_style_female_android_wi_354a2f5a.jpg',
    '_an_anime_style_wizard_with_gl_513f2928.jpg',
    '_an_astronaut_in_a_glossy_whit_16ac47b2.jpg',
    '_a_black_cat_with_glowing_blue_27ba9cc4.jpg',
    '_a_crystal_palace_floating_in__b6559497.jpg',
    '_a_cybernetic_owl_perched_on_t_9315b241.jpg',
    '_a_futuristic_violin_made_of_t_341dacc9.jpg',
    '_a_glowing_white_owl_with_wide_f97d9b2b.jpg',
    '_a_human_sized_floating_eye_wr_94acdf35.jpg',
    '_a_lone_astronaut_walking_towa_be148ade.jpg',
    '_a_melting_white_face_mask_flo_f2252075.jpg',
    '_a_purple_monolith_levitating__4ef0ce1a.jpg',
    '_a_sleek_white_private_jet_fly_4cef3801.jpg',
    '_a_white_cat_in_a_glossy_white_93271703.jpg',
    '_a_white_formula_1_car_racing__81735b21.jpg',
    '_a_white_stealth_fighter_jet_s_bcbe63de.jpg',
    '_a_woman_with_long_silver_hair_11b37154.jpg',
    '_surreal_close_up_of_a_tarantu_62583e39.jpg',
    '_white_futuristic_motorcycle_s_22e6d854.jpg',
    '_white_lamborghini_aventador_d_75ee5be5.jpg',
  ];

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className="text-center">
            <h1 className={`hero-title mb-3 ${styles.typewriterTitle}`}>
              {displayedText}
              <span className={styles.cursor} style={{ opacity: cursorOpacity }}>|</span>
            </h1>
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
      <section 
        ref={parallaxRef} 
        className={styles.parallaxSection}
        style={{
          backgroundImage: `url('${getAssetPath('/assets/command-center.jpg')}')`
        }}
      >
        <div className={styles.parallaxContent}>
          {/* Optional content can go here */}
        </div>
      </section>

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

      {/* Holographic Gallery Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className={styles.galleryTitle}>
              Holographic <span className="neon-text">Creations</span>
            </h2>
            <p className={styles.gallerySubtitle}>
              Explore the infinite possibilities of AI-generated art
            </p>
          </div>

          {/* Top Row - Normal Speed */}
          <div className={styles.galleryWrapper}>
            <div className={styles.galleryTrack}>
              {/* First set of images */}
              {allImages.map((image, index) => (
                <div key={`top-set1-${index}`} className={styles.hologramCard}>
                  <div className={styles.hologramInner}>
                    <img 
                      src={getAssetPath(`/assets/gallery/${image}`)} 
                      alt={`AI Generated Art ${index + 1}`}
                      className={styles.hologramImage}
                    />
                    <div className={styles.hologramOverlay}></div>
                    <div className={styles.scanLine}></div>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {allImages.map((image, index) => (
                <div key={`top-set2-${index}`} className={styles.hologramCard}>
                  <div className={styles.hologramInner}>
                    <img 
                      src={getAssetPath(`/assets/gallery/${image}`)} 
                      alt={`AI Generated Art ${index + 1}`}
                      className={styles.hologramImage}
                    />
                    <div className={styles.hologramOverlay}></div>
                    <div className={styles.scanLine}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - Slower Speed */}
          <div className={styles.galleryWrapper}>
            <div className={`${styles.galleryTrack} ${styles.galleryTrackSlow}`}>
              {/* First set of images */}
              {allImages.map((image, index) => (
                <div key={`bottom-set1-${index}`} className={styles.hologramCard}>
                  <div className={styles.hologramInner}>
                    <img 
                      src={getAssetPath(`/assets/gallery/${image}`)} 
                      alt={`AI Generated Art ${index + 1}`}
                      className={styles.hologramImage}
                    />
                    <div className={styles.hologramOverlay}></div>
                    <div className={styles.scanLine}></div>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {allImages.map((image, index) => (
                <div key={`bottom-set2-${index}`} className={styles.hologramCard}>
                  <div className={styles.hologramInner}>
                    <img 
                      src={getAssetPath(`/assets/gallery/${image}`)} 
                      alt={`AI Generated Art ${index + 1}`}
                      className={styles.hologramImage}
                    />
                    <div className={styles.hologramOverlay}></div>
                    <div className={styles.scanLine}></div>
                  </div>
                </div>
              ))}
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
