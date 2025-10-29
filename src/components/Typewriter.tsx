'use client';

import { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
  cursorColor?: string;
}

export default function Typewriter({
  text,
  speed = 100,
  delay = 500,
  className = '',
  showCursor = true,
  onComplete,
  cursorColor = '#00ffff'
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [cursorOpacity, setCursorOpacity] = useState(1);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    let cursorBlink: NodeJS.Timeout;

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
          if (showCursor) {
            cursorBlink = setInterval(() => {
              setCursorOpacity(prev => prev === 1 ? 0 : 1);
            }, 530);
          }
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
      if (cursorBlink) clearInterval(cursorBlink);
    };
  }, [text, speed, delay, onComplete, showCursor]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span
          style={{
            borderRight: `2px solid ${cursorColor}`,
            paddingRight: '2px',
            marginLeft: '2px',
            display: 'inline-block',
            opacity: isComplete ? cursorOpacity : 1
          }}
        />
      )}
    </span>
  );
}
