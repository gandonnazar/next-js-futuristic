'use client';

import { useEffect, useState } from 'react';
import styles from './Loading.module.css';

export default function Loading() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if loading has already been shown in this session
    const hasShown = sessionStorage.getItem('hasShownLoading');
    
    // Only show loading on initial page load (not on navigation)
    if (!hasShown) {
      setIsLoading(true);
      sessionStorage.setItem('hasShownLoading', 'true');
      
      // Hide loading screen after a short delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContainer}>
        <div className={styles.loadingLogo}>NEONLIGHTS AI</div>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
        </div>
        <div className={styles.loadingText}>Initializing AI Systems...</div>
        <div className={styles.loadingProgress}>
          <div className={styles.progressBarFill}></div>
        </div>
      </div>
    </div>
  );
}
