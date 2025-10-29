'use client';

import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useTypewriter({
  text,
  speed = 100,
  delay = 500,
  onComplete
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [cursorOpacity, setCursorOpacity] = useState(1);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    let cursorBlink: NodeJS.Timeout;

    // Start typing after delay
    timeout = setTimeout(() => {
      let currentIndex = 0;

      interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          if (onComplete) onComplete();
          
          // Start cursor blink after typing is complete
          cursorBlink = setInterval(() => {
            setCursorOpacity(prev => prev === 1 ? 0 : 1);
          }, 530);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
      if (cursorBlink) clearInterval(cursorBlink);
    };
  }, [text, speed, delay, onComplete]);

  return { displayText, isComplete, cursorOpacity };
}
