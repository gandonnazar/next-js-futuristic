import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Left Side: Branding */}
        <div className={styles.footerBranding}>
          <div className={styles.footerLogoContainer}>
            <Image 
              src="/assets/1024x1024.png" 
              alt="NeonLights AI Logo" 
              className={styles.footerLogoImg}
              width={120}
              height={120}
            />
          </div>
          <div className={styles.footerBrandText}>
            <h2 className={styles.footerBrandName}>NEONLIGHTS AI</h2>
            <p className={styles.footerBrandTagline}>Commanding the Future of AI Creation</p>
          </div>
        </div>

        {/* Center & Right: Links Sections */}
        <div className={styles.footerLinksContainer}>
          {/* Quick Links */}
          <div className={styles.footerLinksSection}>
            <h3 className={styles.footerLinksTitle}>Quick Links</h3>
            <ul className={styles.footerLinksList}>
              <li><Link href="/image" className={styles.footerLink}>Image</Link></li>
              <li><Link href="/video" className={styles.footerLink}>Video</Link></li>
              <li><Link href="/upscale" className={styles.footerLink}>Upscale</Link></li>
              <li><Link href="/gallery" className={styles.footerLink}>Gallery</Link></li>
              <li><Link href="/pricing" className={styles.footerLink}>Pricing</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className={styles.footerLinksSection}>
            <h3 className={styles.footerLinksTitle}>Legal</h3>
            <ul className={styles.footerLinksList}>
              <li><Link href="#" className={styles.footerLink}>Privacy Policy</Link></li>
              <li><Link href="#" className={styles.footerLink}>Terms of Use</Link></li>
              <li><Link href="#" className={styles.footerLink}>Impressum</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.footerDivider}></div>
        <p className={styles.footerCopyright}>
          © 2025 NeonLights.ai - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
