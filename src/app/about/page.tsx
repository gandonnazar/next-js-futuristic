import Image from 'next/image';
import styles from './page.module.css';
import { getAssetPath } from '@/lib/utils';

export default function AboutPage() {
  return (
    <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container">
        <h2 className={styles.aboutTitle}>⚡ About NeonLights.ai</h2>
        
        <div className={styles.aboutGrid}>
          {/* Left Container - Profile */}
          <div className={styles.profileContainer}>
            {/* Profile Picture */}
            <div className={styles.profileImageContainer}>
              <div className={styles.profileImageWrapper}>
                <Image
                  src={getAssetPath('/assets/profile.jpg')}
                  alt="Heyselcuk"
                  width={200}
                  height={200}
                  className={styles.profileImage}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Header */}
            <h1 className={styles.profileName}>Heyselcuk</h1>
            <p className={styles.profileTitle}>Founder and CEO of Neonlights.ai</p>

            {/* Social Media Links */}
            <div className={styles.socialLinks}>
              <a 
                href="https://www.instagram.com/heyselcuk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialButton}
              >
                <span className={styles.socialIcon}>📷</span>
                Instagram
              </a>
              <a 
                href="https://www.youtube.com/@heyselcuk" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialButton}
              >
                <span className={styles.socialIcon}>▶️</span>
                YouTube
              </a>
              <a 
                href="https://www.tiktok.com/@heyselcuk.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialButton}
              >
                <span className={styles.socialIcon}>🎵</span>
                TikTok
              </a>
              <a 
                href="https://www.heyselcuk.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialButton}
              >
                <span className={styles.socialIcon}>🌐</span>
                Personal Website
              </a>
            </div>
          </div>

          {/* Right Container - About Text */}
          <div className={styles.aboutContainer}>
            <div className={styles.aboutContent}>
              <p>
                Welcome aboard NeonLights.ai — the next evolution of AI creation.
                Founded by Heyselcuk, a leading AI content creator with over 500,000 followers, NeonLights.ai was built to push imagination beyond the limits of the ordinary web.
              </p>

              <p>
                Here, creativity doesn't happen on a flat screen — it happens inside a living starship of light.
                Every command you give feels like operating a futuristic control deck, every image and video you generate is a spark in the endless neon void of possibility.
              </p>

              <p>
                NeonLights.ai isn't just a tool — it's an experience.<br />
                A fusion of high design and high technology, engineered for artists, creators, and visionaries who want to shape the future — not just scroll through it.
              </p>

              <p>
                Inside this digital starship, every glowing interface, holographic display, and pulse of color is designed to make creation feel cinematic — as if you're commanding the engines of imagination itself.
              </p>

              <p>
                Whether you're generating photorealistic portraits, cinematic worlds, or dreamlike AI films, NeonLights.ai turns your ideas into pure light.
                 Instantly. Effortlessly. Brilliantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
