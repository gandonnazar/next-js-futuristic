'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './Loading.module.css';

let hasShownLoading = false;

export default function Loading() {
  const [isLoading, setIsLoading] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    // Only show loading on hard refresh/initial load, not on client-side navigation
    if (!mountedRef.current && !hasShownLoading) {
      mountedRef.current = true;
      hasShownLoading = true;
      setIsLoading(true);
      
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
