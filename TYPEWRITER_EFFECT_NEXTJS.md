# Typewriter Effect Implementation for Next.js

## Overview
This guide explains how to create the typing animation effect that types out text letter-by-letter when the page loads, exactly like the hero title "NEONLIGHTS AI" on the home page.

---

## 1. How It Works (Current Implementation)

### JavaScript Class
```javascript
class TypewriterEffect {
    constructor(selector, options = {}) {
        this.elements = document.querySelectorAll(selector);
        this.speed = options.speed || 50;
        this.delay = options.delay || 1000;
        
        this.init();
    }
    
    init() {
        this.elements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            
            setTimeout(() => {
                this.typeText(element, text);
            }, index * this.delay);
        });
    }
    
    typeText(element, text) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
                // Add cursor blink effect
                element.style.borderRight = '2px solid var(--primary-neon)';
                element.style.animation = 'cursor-blink 1s infinite';
            }
        }, this.speed);
    }
}

// Usage
new TypewriterEffect('.hero-title', { speed: 100, delay: 500 });
```

### Parameters
| Parameter | Default | Description |
|-----------|---------|-------------|
| `selector` | N/A | CSS selector for elements to animate |
| `speed` | 50ms | Milliseconds between each character |
| `delay` | 1000ms | Delay before animation starts |

### Current Settings
- **Speed**: `100ms` per character
- **Delay**: `500ms` before starting
- **Text**: "NEONLIGHTS AI" (14 characters)
- **Total Duration**: ~1.9 seconds (500ms delay + 14 × 100ms)

---

## 2. Next.js Implementation

### Option A: React Hook (Recommended)

```tsx
// hooks/useTypewriter.ts
'use client';

import { useEffect, useState, useRef } from 'react';

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
  const [showCursor, setShowCursor] = useState(true);

  useEffect() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

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
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay, onComplete]);

  return { displayText, isComplete, showCursor };
}
```

### Usage in Component

```tsx
// components/HeroTitle.tsx
'use client';

import { useTypewriter } from '@/hooks/useTypewriter';
import styles from './HeroTitle.module.css';

export default function HeroTitle() {
  const { displayText, isComplete, showCursor } = useTypewriter({
    text: 'NEONLIGHTS AI',
    speed: 100,
    delay: 500
  });

  return (
    <h1 className={styles.heroTitle}>
      {displayText}
      {showCursor && !isComplete && <span className={styles.cursor}>|</span>}
    </h1>
  );
}
```

---

## 3. CSS Styling

```css
/* HeroTitle.module.css */
.heroTitle {
  font-family: 'Audiowide', cursive;
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  overflow: hidden;
  display: inline-block;
}

/* Blinking cursor */
.cursor {
  color: #00ffff;
  animation: cursorBlink 1s infinite;
  margin-left: 2px;
}

@keyframes cursorBlink {
  0%, 50% { 
    opacity: 1; 
  }
  51%, 100% { 
    opacity: 0; 
  }
}

/* Alternative: Border cursor */
.heroTitleWithBorder {
  border-right: 2px solid #00ffff;
  padding-right: 2px;
  animation: cursorBlink 1s infinite;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .heroTitle {
    font-size: 2.5rem;
  }
}
```

---

## 4. Option B: Reusable Component

```tsx
// components/Typewriter.tsx
'use client';

import { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export default function Typewriter({
  text,
  speed = 100,
  delay = 500,
  className = '',
  showCursor = true,
  onComplete
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

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
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && !isComplete && (
        <span
          style={{
            borderRight: '2px solid #00ffff',
            animation: 'cursor-blink 1s infinite',
            paddingRight: '2px',
            marginLeft: '2px'
          }}
        />
      )}
    </span>
  );
}
```

### Usage

```tsx
// In your page component
import Typewriter from '@/components/Typewriter';

export default function HomePage() {
  return (
    <div>
      <h1 className="hero-title">
        <Typewriter
          text="NEONLIGHTS AI"
          speed={100}
          delay={500}
          showCursor={true}
        />
      </h1>
    </div>
  );
}
```

---

## 5. Advanced Features

### A. Multiple Lines with Stagger

```tsx
'use client';

import { useTypewriter } from '@/hooks/useTypewriter';

export default function MultiLineTypewriter() {
  const line1 = useTypewriter({
    text: 'NEONLIGHTS AI',
    speed: 100,
    delay: 500
  });

  const line2 = useTypewriter({
    text: 'Generate the Future',
    speed: 50,
    delay: 2000 // Starts after first line
  });

  return (
    <>
      <h1>{line1.displayText}</h1>
      <p>{line2.displayText}</p>
    </>
  );
}
```

### B. Sound Effect on Type

```tsx
'use client';

import { useEffect, useState } from 'react';

export function useTypewriterWithSound({
  text,
  speed = 100,
  delay = 500
}) {
  const [displayText, setDisplayText] = useState('');

  // Simple typing sound
  const playTypeSound = () => {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.05
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      let currentIndex = 0;

      interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.substring(0, currentIndex));
          playTypeSound(); // Play sound for each character
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);

  return { displayText };
}
```

### C. Pause and Resume

```tsx
'use client';

import { useEffect, useState, useRef } from 'react';

export function useTypewriterWithPause({
  text,
  speed = 100,
  delay = 500
}) {
  const [displayText, setDisplayText] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const currentIndex = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTyping = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (!isPaused && currentIndex.current <= text.length) {
        setDisplayText(text.substring(0, currentIndex.current));
        currentIndex.current++;
      } else if (currentIndex.current > text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, speed);
  };

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);
  const reset = () => {
    currentIndex.current = 0;
    setDisplayText('');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTyping();
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { displayText, pause, resume, reset, isPaused };
}
```

---

## 6. Performance Optimization

### Memoize for Better Performance

```tsx
'use client';

import { useEffect, useState, useMemo } from 'react';

export function useTypewriter({
  text,
  speed = 100,
  delay = 500
}) {
  const [displayText, setDisplayText] = useState('');
  
  // Memoize the text array
  const textArray = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= textArray.length) {
          setDisplayText(textArray.slice(0, currentIndex).join(''));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [textArray, speed, delay]);

  return displayText;
}
```

---

## 7. Configuration Examples

### Fast Typing (Computer-like)
```tsx
<Typewriter text="NEONLIGHTS AI" speed={30} delay={200} />
```
- Speed: 30ms per character
- Total: ~620ms

### Slow Typing (Dramatic)
```tsx
<Typewriter text="NEONLIGHTS AI" speed={200} delay={1000} />
```
- Speed: 200ms per character
- Total: ~3.8 seconds

### Default (Balanced)
```tsx
<Typewriter text="NEONLIGHTS AI" speed={100} delay={500} />
```
- Speed: 100ms per character
- Total: ~1.9 seconds

---

## 8. Complete Example with All Features

```tsx
// app/page.tsx
'use client';

import { useState } from 'react';
import Typewriter from '@/components/Typewriter';
import styles from './page.module.css';

export default function HomePage() {
  const [showSubtitle, setShowSubtitle] = useState(false);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.heroTitle}>
          <Typewriter
            text="NEONLIGHTS AI"
            speed={100}
            delay={500}
            showCursor={true}
            onComplete={() => setShowSubtitle(true)}
          />
        </h1>
        
        {showSubtitle && (
          <p className={styles.subtitle}>
            <Typewriter
              text="Generate the Future"
              speed={50}
              delay={300}
              showCursor={false}
            />
          </p>
        )}
      </div>
    </section>
  );
}
```

---

## 9. Common Issues & Solutions

### Issue 1: Text Flashing on Load
**Cause**: Text is visible before JavaScript loads
**Solution**: Set initial state to empty string

```tsx
const [displayText, setDisplayText] = useState(''); // Not the full text
```

### Issue 2: Animation Runs Multiple Times
**Cause**: Component re-renders
**Solution**: Add proper dependencies to useEffect

```tsx
useEffect(() => {
  // ...
}, [text, speed, delay]); // Include all dependencies
```

### Issue 3: Cursor Doesn't Show
**Cause**: CSS animation not defined
**Solution**: Add keyframe animation

```css
@keyframes cursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

### Issue 4: Typing Continues After Unmount
**Cause**: Interval not cleared
**Solution**: Always clean up intervals

```tsx
return () => {
  clearTimeout(timeout);
  if (interval) clearInterval(interval);
};
```

---

## 10. Customization Options

### Different Cursor Styles

```css
/* Pipe cursor */
.cursor { content: '|'; }

/* Underscore cursor */
.cursor { content: '_'; }

/* Block cursor */
.cursor {
  display: inline-block;
  width: 0.6em;
  height: 1em;
  background: #00ffff;
  vertical-align: text-bottom;
}
```

### Color Variations

```css
/* Cyan cursor */
border-right: 2px solid #00ffff;

/* Magenta cursor */
border-right: 2px solid #ff00ff;

/* Gradient cursor */
border-right: 2px solid;
border-image: linear-gradient(45deg, #00ffff, #ff00ff) 1;
```

### Variable Speed

```tsx
// Faster at start, slower at end
const getVariableSpeed = (index: number, total: number) => {
  const progress = index / total;
  return 50 + (progress * 150); // 50ms to 200ms
};
```

---

## Summary

**Key Implementation Details:**

1. ✅ **Core Mechanism**: `setInterval` adds one character at a time
2. ✅ **Timing**: Start after `delay`, add character every `speed` ms
3. ✅ **Cursor**: Border-right or span element with blink animation
4. ✅ **Cleanup**: Always clear intervals on unmount
5. ✅ **Performance**: Use `useEffect` dependencies correctly

**Exact Parameters from Original:**
- Text: `"NEONLIGHTS AI"`
- Speed: `100ms` per character
- Delay: `500ms` before start
- Cursor: Cyan (`#00ffff`) with 1s blink

**Total Animation Time:**
```
500ms (delay) + (14 characters × 100ms) = 1900ms (1.9 seconds)
```

This creates the smooth, professional typing effect you see on the homepage! 🎯✨
