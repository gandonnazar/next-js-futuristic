// NeonLights.ai - Advanced Starship Interface Animations
// Cinematic sci-fi effects and holographic interactions

// Holographic scan line overlay
function createScanLines() {
    const scanLines = document.createElement('div');
    scanLines.className = 'scan-lines-overlay';
    scanLines.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.15;
    `;
    
    for (let i = 0; i < 3; i++) {
        const line = document.createElement('div');
        line.className = `scan-line scan-line-${i + 1}`;
        line.style.cssText = `
            position: absolute;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ffff, transparent);
            animation: scan-move-${i + 1} ${4 + i * 2}s linear infinite;
            opacity: 0.8;
        `;
        scanLines.appendChild(line);
    }
    
    document.body.appendChild(scanLines);
}

// Advanced cursor trail system
class HolographicCursor {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.canvas = null;
        this.ctx = null;
        this.init();
    }
    
    init() {
        // Create canvas for cursor effects
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
        `;
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.addParticle();
        });
        
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    addParticle() {
        this.particles.push({
            x: this.mouse.x,
            y: this.mouse.y,
            life: 1,
            decay: 0.02 + Math.random() * 0.03,
            size: Math.random() * 3 + 1,
            color: `hsl(${180 + Math.random() * 120}, 100%, 70%)`
        });
        
        // Limit particle count
        if (this.particles.length > 30) {
            this.particles.shift();
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles = this.particles.filter(particle => {
            particle.life -= particle.decay;
            
            // Draw glowing particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.life * 0.7;
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = particle.color;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            
            return particle.life > 0;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Sound effects system
class SciFiSounds {
    constructor() {
        this.enabled = false;
        this.audioContext = null;
        this.sounds = {};
        this.init();
    }
    
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createSounds();
        } catch (e) {
            console.log('Audio context not available');
        }
    }
    
    createSounds() {
        this.sounds = {
            hover: () => this.playTone(440, 0.08, 'square', 0.1),
            click: () => this.playTone(880, 0.05, 'triangle', 0.2),
            success: () => this.playChord([523, 659, 784], 0.3, 'sine', 0.15),
            error: () => this.playTone(220, 0.4, 'sawtooth', 0.2),
            whoosh: () => this.playSweep(200, 800, 0.6, 'sine', 0.1)
        };
    }
    
    playTone(frequency, duration, type = 'sine', volume = 0.1) {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    playChord(frequencies, duration, type = 'sine', volume = 0.1) {
        frequencies.forEach(freq => {
            this.playTone(freq, duration, type, volume / frequencies.length);
        });
    }
    
    playSweep(startFreq, endFreq, duration, type = 'sine', volume = 0.1) {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(startFreq, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(endFreq, this.audioContext.currentTime + duration);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }
    
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// Simple Working StarField Animation
class SimpleStarField {
    constructor() {
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d', { alpha: false }); // Disable alpha for better performance
        this.stars = [];
        this.numStars = 300; // Reduced from 800 to 300
        this.speed = 1;
        this.animationId = null;
        this.lastFrameTime = 0;
        this.fps = 30; // Cap at 30 FPS for efficiency
        this.frameInterval = 1000 / this.fps;
        
        this.setupCanvas();
        this.createStars();
        this.startAnimation();
    }
    
    createCanvas() {
        // Remove any existing starfield canvas
        const existing = document.getElementById('starfield-canvas');
        if (existing) existing.remove();
        
        const canvas = document.createElement('canvas');
        canvas.id = 'starfield-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            background: linear-gradient(135deg, #000011 0%, #000033 50%, #000011 100%);
        `;
        document.body.appendChild(canvas);
        return canvas;
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Handle resize with debounce for performance
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                this.createStars();
            }, 250);
        });
    }
    
    createStars() {
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: (Math.random() - 0.5) * 4000,
                y: (Math.random() - 0.5) * 4000,
                z: Math.random() * 1000 + 1,
                color: this.getRandomColor(),
                size: Math.random() * 1.5 + 0.3 // Reduced size range
            });
        }
    }
    
    getRandomColor() {
        const colors = ['#00ffff', '#ff00ff', '#8a2be2', '#ffffff', '#00ff88'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    startAnimation() {
        const animate = (currentTime) => {
            this.animationId = requestAnimationFrame(animate);
            
            // Throttle frame rate for better performance
            const elapsed = currentTime - this.lastFrameTime;
            if (elapsed < this.frameInterval) return;
            
            this.lastFrameTime = currentTime - (elapsed % this.frameInterval);
            this.updateAndDraw();
        };
        animate(0);
    }
    
    updateAndDraw() {
        // Clear canvas with slight trail effect - reduced opacity for better performance
        this.ctx.fillStyle = 'rgba(0, 0, 17, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        this.stars.forEach(star => {
            // Move star towards viewer
            star.z -= this.speed;
            
            // Reset star when it gets too close
            if (star.z <= 0) {
                star.x = (Math.random() - 0.5) * 4000;
                star.y = (Math.random() - 0.5) * 4000;
                star.z = 1000;
                star.color = this.getRandomColor();
            }
            
            // 3D to 2D projection
            const perspective = 200;
            const x = (star.x / star.z) * perspective + centerX;
            const y = (star.y / star.z) * perspective + centerY;
            
            // Calculate size based on distance
            const size = Math.max(0.1, star.size * (1000 - star.z) / 1000 * 2);
            const opacity = Math.max(0.1, (1000 - star.z) / 1000);
            
            // Only draw if star is on screen
            if (x >= -50 && x <= this.canvas.width + 50 && 
                y >= -50 && y <= this.canvas.height + 50) {
                
                // Draw star with minimal glow - reduced shadow blur for performance
                this.ctx.save();
                this.ctx.globalAlpha = opacity * 0.9;
                this.ctx.fillStyle = star.color;
                
                // Only add shadow to larger stars for performance
                if (size > 1) {
                    this.ctx.shadowBlur = size * 2; // Reduced from size * 4
                    this.ctx.shadowColor = star.color;
                }
                
                this.ctx.beginPath();
                this.ctx.arc(x, y, size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            }
        });
    }
    
    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }
    
    enterHyperspace() {
        this.setSpeed(8);
        setTimeout(() => this.setSpeed(1), 3000);
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Enhanced 3D Starfield for hyperspace effect - DISABLED due to animation issues
/*
class StarField {
    constructor() {
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 1200;
        this.speed = 2;
        this.warpFactor = 1;
        this.nebula = [];
        
        this.resize();
        this.createStars();
        this.createNebula();
        this.setupEvents();
        this.animate();
    }
    
    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2;
            background: radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%);
        `;
        document.body.appendChild(canvas);
        return canvas;
    }
    
    setupEvents() {
        window.addEventListener('resize', () => this.resize());
        
        // Warp speed on spacebar
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                // Don't trigger if typing in input fields
                const activeElement = document.activeElement;
                const isTyping = activeElement && (
                    activeElement.tagName === 'INPUT' || 
                    activeElement.tagName === 'TEXTAREA' || 
                    activeElement.isContentEditable
                );
                
                if (!isTyping) {
                    e.preventDefault();
                    this.enterHyperspace();
                }
            }
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createNebula() {
        this.nebula = [];
        for (let i = 0; i < 6; i++) {
            this.nebula.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: 150 + Math.random() * 300,
                color: `hsla(${200 + Math.random() * 120}, 70%, 25%, 0.08)`,
                drift: Math.random() * 0.3 + 0.1,
                angle: Math.random() * Math.PI * 2,
                pulse: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    createStars() {
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: (Math.random() - 0.5) * 2000,
                y: (Math.random() - 0.5) * 2000,
                z: Math.random() * 1000 + 1,
                prevZ: Math.random() * 1000 + 1,
                color: this.getStarColor(),
                type: Math.random() > 0.9 ? 'pulsar' : 'normal',
                pulse: Math.random() * Math.PI * 2,
                brightness: 0.3 + Math.random() * 0.7
            });
        }
    }
    
    getStarColor() {
        const colors = [
            { color: '#00ffff', weight: 0.25 },  // Cyan
            { color: '#ff00ff', weight: 0.20 },  // Magenta
            { color: '#8a2be2', weight: 0.15 },  // Purple
            { color: '#ffffff', weight: 0.25 },  // White
            { color: '#00ff88', weight: 0.10 },  // Green-cyan
            { color: '#ff6644', weight: 0.05 }   // Orange-red
        ];
        
        const random = Math.random();
        let cumulative = 0;
        for (let colorData of colors) {
            cumulative += colorData.weight;
            if (random <= cumulative) {
                return colorData.color;
            }
        }
        return '#ffffff';
    }
    
    animate() {
        try {
            // Ensure canvas and context are valid
            if (!this.canvas || !this.ctx) {
                console.error('StarField: Canvas or context is null');
                return;
            }
            
            // Clear with subtle fade trail
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Draw animated nebula background
            this.drawNebula();
            
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            const time = Date.now() * 0.001;
        
            this.stars.forEach(star => {
                star.prevZ = star.z;
                star.z -= this.speed * this.warpFactor;
                
                // Reset star when too close
                if (star.z <= 0.1) {
                    star.x = (Math.random() - 0.5) * 2000;
                    star.y = (Math.random() - 0.5) * 2000;
                    star.z = 1000 + Math.random() * 500;
                    star.prevZ = star.z;
                    star.color = this.getStarColor();
                    star.type = Math.random() > 0.9 ? 'pulsar' : 'normal';
                    star.brightness = 0.3 + Math.random() * 0.7;
                }
                
                // 3D to 2D projection
                const perspective = 300;
                const x = (star.x / star.z) * perspective + centerX;
                const y = (star.y / star.z) * perspective + centerY;
                const prevX = (star.x / star.prevZ) * perspective + centerX;
                const prevY = (star.y / star.prevZ) * perspective + centerY;
            
                // Calculate size and brightness
                let size = Math.max(0.5, (1000 - star.z) / 1000 * 4);
                let brightness = star.brightness * Math.max(0.1, (1000 - star.z) / 1000);
                
                // Pulsar effect
                if (star.type === 'pulsar') {
                    const pulse = Math.sin(time * 4 + star.pulse) * 0.5 + 0.5;
                    size *= (1 + pulse * 1.5);
                    brightness *= (1 + pulse * 0.8);
                }
                
                // Only draw visible stars
                if (x >= -50 && x <= this.canvas.width + 50 && 
                    y >= -50 && y <= this.canvas.height + 50) {
                    
                    // Draw hyperspace trail
                    if (this.warpFactor > 2) {
                        this.ctx.save();
                        this.ctx.globalAlpha = brightness * 0.6;
                        this.ctx.strokeStyle = star.color;
                        this.ctx.lineWidth = Math.max(1, size * 0.6);
                        this.ctx.lineCap = 'round';
                        
                        const gradient = this.ctx.createLinearGradient(prevX, prevY, x, y);
                        gradient.addColorStop(0, 'transparent');
                        gradient.addColorStop(1, star.color);
                        this.ctx.strokeStyle = gradient;
                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(prevX, prevY);
                        this.ctx.lineTo(x, y);
                        this.ctx.stroke();
                        this.ctx.restore();
                    }
                    
                    // Draw star with glow
                    this.ctx.save();
                    this.ctx.globalAlpha = brightness;
                    this.ctx.fillStyle = star.color;
                    this.ctx.shadowBlur = size * 6;
                    this.ctx.shadowColor = star.color;
                    
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, size, 0, Math.PI * 2);
                    this.ctx.fill();
                    
                    // Cross sparkle for bright stars
                    if (brightness > 0.7 && size > 2) {
                        this.ctx.strokeStyle = star.color;
                        this.ctx.lineWidth = 0.8;
                        this.ctx.globalAlpha = brightness * 0.6;
                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(x - size * 3, y);
                        this.ctx.lineTo(x + size * 3, y);
                        this.ctx.moveTo(x, y - size * 3);
                        this.ctx.lineTo(x, y + size * 3);
                        this.ctx.stroke();
                    }
                    
                    this.ctx.restore();
                }
            });
            
        } catch (error) {
            console.error('StarField animation error:', error);
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawNebula() {
        const time = Date.now() * 0.0003;
        
        this.nebula.forEach((cloud, index) => {
            this.ctx.save();
            
            // Animate nebula drift and pulse
            cloud.angle += cloud.drift * 0.01;
            cloud.radius += Math.sin(time * cloud.pulse + index) * 2;
            
            const x = cloud.x + Math.cos(cloud.angle + time * 0.1) * 30;
            const y = cloud.y + Math.sin(cloud.angle + time * 0.15) * 20;
            
            // Create animated gradient
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, cloud.radius);
            const alpha = 0.4 + Math.sin(time + index) * 0.2;
            gradient.addColorStop(0, cloud.color.replace('0.08', String(alpha * 0.2)));
            gradient.addColorStop(0.4, cloud.color.replace('0.08', String(alpha * 0.1)));
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.globalCompositeOperation = 'screen';
            this.ctx.globalAlpha = 0.8;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, cloud.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }
    
    setSpeed(speed) {
        this.speed = Math.max(0.1, speed);
    }
    
    setWarpFactor(factor) {
        this.warpFactor = Math.max(0.1, factor);
    }
    
    enterHyperspace() {
        // Smooth transition to warp speed
        const startWarp = this.warpFactor;
        const targetWarp = 12;
        const duration = 2000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth acceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            this.warpFactor = startWarp + (targetWarp - startWarp) * easeOut;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Return to normal speed after hyperspace
                setTimeout(() => {
                    this.setWarpFactor(1);
                }, 1500);
            }
        };
        
        animate();
    }
}
*/

// Holographic effect for panels
class HolographicEffects {
    constructor() {
        this.initGlitchEffect();
        this.initParallaxEffect();
        this.initCursorTrail();
    }
    
    initGlitchEffect() {
        const hologramElements = document.querySelectorAll('.hologram');
        
        hologramElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.createGlitchEffect(element);
            });
        });
    }
    
    createGlitchEffect(element) {
        element.style.animation = 'none';
        
        // Create temporary glitch layers
        for (let i = 0; i < 3; i++) {
            const glitch = element.cloneNode(true);
            glitch.style.position = 'absolute';
            glitch.style.top = '0';
            glitch.style.left = '0';
            glitch.style.width = '100%';
            glitch.style.height = '100%';
            glitch.style.pointerEvents = 'none';
            glitch.style.zIndex = '-1';
            
            const colors = ['rgba(255, 0, 0, 0.3)', 'rgba(0, 255, 0, 0.3)', 'rgba(0, 0, 255, 0.3)'];
            const offsets = ['-2px', '2px', '0px'];
            
            glitch.style.mixBlendMode = 'screen';
            glitch.style.backgroundColor = colors[i];
            glitch.style.transform = `translateX(${offsets[i]})`;
            
            element.style.position = 'relative';
            element.appendChild(glitch);
            
            // Remove after animation
            setTimeout(() => {
                if (glitch.parentNode) {
                    glitch.parentNode.removeChild(glitch);
                }
            }, 300);
        }
    }
    
    initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.glass-panel, .hologram');
        
        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (e.clientX - centerX) / centerX;
            const moveY = (e.clientY - centerY) / centerY;
            
            parallaxElements.forEach((element, index) => {
                const speed = (index % 3 + 1) * 0.5;
                const x = moveX * speed;
                const y = moveY * speed;
                
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
    
    initCursorTrail() {
        let trail = [];
        const maxTrail = 20;
        
        document.addEventListener('mousemove', (e) => {
            // Add current position to trail
            trail.unshift({ x: e.clientX, y: e.clientY });
            
            // Limit trail length
            if (trail.length > maxTrail) {
                trail.pop();
            }
            
            // Remove existing trail elements
            document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
            
            // Create new trail elements
            trail.forEach((point, index) => {
                if (index % 3 === 0) { // Only show every 3rd point for performance
                    const trailElement = document.createElement('div');
                    trailElement.className = 'cursor-trail';
                    trailElement.style.cssText = `
                        position: fixed;
                        left: ${point.x}px;
                        top: ${point.y}px;
                        width: 4px;
                        height: 4px;
                        background: radial-gradient(circle, rgba(0, 255, 255, ${1 - index / maxTrail}), transparent);
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9999;
                        animation: fade-out 1s ease-out forwards;
                    `;
                    
                    document.body.appendChild(trailElement);
                    
                    // Remove after animation
                    setTimeout(() => {
                        if (trailElement.parentNode) {
                            trailElement.parentNode.removeChild(trailElement);
                        }
                    }, 1000);
                }
            });
        });
    }
}

// Typewriter effect for text
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

// Floating animation for elements
class FloatingAnimation {
    constructor() {
        this.initFloatingElements();
    }
    
    initFloatingElements() {
        const floatingElements = document.querySelectorAll('.stat-card, .gallery-item, .pricing-card');
        
        floatingElements.forEach((element, index) => {
            const duration = 3 + (index % 3);
            const delay = index * 0.5;
            
            element.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;
        });
    }
}

// Neon glow pulse effect
class NeonPulse {
    constructor() {
        this.initPulseEffects();
    }
    
    initPulseEffects() {
        const neonElements = document.querySelectorAll('.neon-button, .neon-text, .logo');
        
        neonElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animationDuration = '0.5s';
                element.style.filter = 'brightness(1.3)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.animationDuration = '2s';
                element.style.filter = 'brightness(1)';
            });
        });
    }
}

// Loading screen with animations
class LoadingScreen {
    constructor() {
        this.createLoadingScreen();
    }
    
    createLoadingScreen() {
        const loader = document.createElement('div');
        loader.id = 'loading-screen';
        loader.innerHTML = `
            <div class="loading-container">
                <div class="loading-logo">NEONLIGHTS AI</div>
                <div class="loading-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <div class="loading-text">Initializing AI Systems...</div>
                <div class="loading-progress">
                    <div class="progress-bar-fill"></div>
                </div>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #000011, #001122);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease-out;
        `;
        
        // Add CSS for loading animations
        const style = document.createElement('style');
        style.textContent = `
            .loading-container {
                text-align: center;
            }
            
            .loading-logo {
                font-family: 'Audiowide', cursive;
                font-size: 3rem;
                background: linear-gradient(45deg, #00ffff, #ff00ff);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 40px;
                animation: logo-glow 1s ease-in-out infinite alternate;
            }
            
            .loading-spinner {
                position: relative;
                width: 100px;
                height: 100px;
                margin: 0 auto 30px;
            }
            
            .spinner-ring {
                position: absolute;
                border: 3px solid transparent;
                border-top: 3px solid #00ffff;
                border-radius: 50%;
                animation: spin 2s linear infinite;
            }
            
            .spinner-ring:nth-child(1) {
                width: 100px;
                height: 100px;
                animation-duration: 1s;
            }
            
            .spinner-ring:nth-child(2) {
                width: 70px;
                height: 70px;
                top: 15px;
                left: 15px;
                border-top-color: #ff00ff;
                animation-duration: 0.75s;
                animation-direction: reverse;
            }
            
            .spinner-ring:nth-child(3) {
                width: 40px;
                height: 40px;
                top: 30px;
                left: 30px;
                border-top-color: #8a2be2;
                animation-duration: 0.5s;
            }
            
            .loading-text {
                color: #ffffff;
                font-size: 1.2rem;
                margin-bottom: 20px;
                opacity: 0.8;
                animation: pulse 1s ease-in-out infinite;
            }
            
            .loading-progress {
                width: 300px;
                height: 4px;
                background: rgba(0, 255, 255, 0.2);
                border-radius: 2px;
                margin: 0 auto;
                overflow: hidden;
            }
            
            .progress-bar-fill {
                height: 100%;
                background: linear-gradient(90deg, #00ffff, #ff00ff);
                border-radius: 2px;
                animation: loading-progress 1.5s ease-in-out;
            }
            
            @keyframes logo-glow {
                from { filter: drop-shadow(0 0 20px #00ffff); }
                to { filter: drop-shadow(0 0 40px #ff00ff); }
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
            }
            
            @keyframes loading-progress {
                0% { width: 0%; }
                100% { width: 100%; }
            }
            
            @keyframes cursor-blink {
                0%, 50% { border-color: transparent; }
                51%, 100% { border-color: var(--primary-neon); }
            }
            
            @keyframes fade-out {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(loader);
        
        // Hide loading screen after page loads
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 1500);
    }
}

// Sound effects (optional - requires user interaction)
class SoundEffects {
    constructor() {
        this.sounds = {};
        this.initSounds();
    }
    
    initSounds() {
        // Create audio context (requires user interaction)
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.createSounds();
            }
        }, { once: true });
    }
    
    createSounds() {
        // Create simple beep sounds for interactions
        this.sounds.hover = this.createTone(800, 0.1, 0.05);
        this.sounds.click = this.createTone(1000, 0.2, 0.1);
        this.sounds.success = this.createTone(600, 0.3, 0.2);
        
        this.attachSoundEvents();
    }
    
    createTone(frequency, duration, volume) {
        return () => {
            if (!this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }
    
    attachSoundEvents() {
        // Hover sounds
        document.querySelectorAll('.neon-button, .gallery-item, .pricing-card').forEach(element => {
            element.addEventListener('mouseenter', this.sounds.hover);
        });
        
        // Click sounds
        document.querySelectorAll('.neon-button').forEach(element => {
            element.addEventListener('click', this.sounds.click);
        });
    }
}

// Matrix rain effect (optional background)
class MatrixRain {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }
    
    init() {
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.1;
            z-index: -1;
        `;
        
        this.container.appendChild(this.canvas);
        this.resize();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
        
        this.columns = Math.floor(this.canvas.width / 20);
        this.drops = new Array(this.columns).fill(1);
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = '15px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            this.ctx.fillText(text, i * 20, this.drops[i] * 20);
            
            if (this.drops[i] * 20 > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen first
    new LoadingScreen();
    
    // Initialize after loading
    setTimeout(() => {
        // Core effects - StarField is now handled by DOMContentLoaded
        // new StarField('starfield'); // REMOVED - conflicts with new 3D StarField
        new HolographicEffects();
        new FloatingAnimation();
        new NeonPulse();
        
        // Optional effects (can be disabled for performance)
        new SoundEffects();
        
        // Initialize typewriter effect for hero titles
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            new TypewriterEffect('.hero-title', { speed: 100, delay: 500 });
        }
        
        console.log('🚀 NeonLights.ai - All systems online');
    }, 1000);
});

// Utility functions for interactive elements
window.NeonUtils = {
    // Create ripple effect on click
    createRipple: function(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            left: ${event.clientX - rect.left - size / 2}px;
            top: ${event.clientY - rect.top - size / 2}px;
            width: ${size}px;
            height: ${size}px;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    },
    
    // Shake animation for errors
    shake: function(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
};

// Add ripple animation CSS
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize Advanced Starship Interface
document.addEventListener('DOMContentLoaded', () => {
    // Ensure only one StarField instance
    if (window.starFieldInstance) {
        console.log('StarField already initialized');
        return;
    }
    
    // SIMPLE WORKING STARFIELD - Replace complex version
    window.starFieldInstance = new SimpleStarField();
    
    // Initialize holographic cursor trail
    const cursor = new HolographicCursor();
    
    // Initialize sci-fi sound system
    const sounds = new SciFiSounds();
    
    // Initialize scan lines overlay
    createScanLines();
    
    // Enhanced button interactions with sound
    document.querySelectorAll('.btn, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            sounds.play('hover');
            element.style.transform = 'translateY(-3px) translateZ(0) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0) translateZ(0) scale(1)';
        });
        
        element.addEventListener('click', (event) => {
            sounds.play('click');
            
            // Ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: radial-gradient(circle, rgba(0,255,255,0.6) 0%, transparent 70%);
                border-radius: 50%;
                animation: ripple-expand 0.6s ease-out forwards;
                pointer-events: none;
                z-index: 1000;
            `;
            
            const rect = element.getBoundingClientRect();
            ripple.style.left = (event.clientX - rect.left - 5) + 'px';
            ripple.style.top = (event.clientY - rect.top - 5) + 'px';
            
            if (element.style.position !== 'relative') {
                element.style.position = 'relative';
            }
            element.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Advanced holographic panel effects
    document.querySelectorAll('.glass-panel, .hologram').forEach(element => {
        let glitchInterval;
        
        element.addEventListener('mouseenter', () => {
            sounds.play('hover');
            element.style.transform = 'translateZ(0) scale(1.02)';
            
            // Random glitch effect
            glitchInterval = setInterval(() => {
                if (Math.random() < 0.1) {
                    element.style.filter = 'hue-rotate(180deg) contrast(1.2)';
                    setTimeout(() => {
                        element.style.filter = 'none';
                    }, 50);
                }
            }, 200);
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateZ(0) scale(1)';
            element.style.filter = 'none';
            clearInterval(glitchInterval);
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts when typing in input fields
        const activeElement = document.activeElement;
        const isTyping = activeElement && (
            activeElement.tagName === 'INPUT' || 
            activeElement.tagName === 'TEXTAREA' || 
            activeElement.isContentEditable
        );
        
        switch(e.code) {
            case 'Space':
                // Only prevent default and trigger hyperspace if NOT typing
                if (!isTyping) {
                    e.preventDefault();
                    if (window.starFieldInstance && window.starFieldInstance.enterHyperspace) {
                        window.starFieldInstance.enterHyperspace();
                    }
                    sounds.play('whoosh');
                }
                break;
                
            case 'KeyM':
                if (e.ctrlKey) {
                    e.preventDefault();
                    const enabled = sounds.toggle();
                    const message = enabled ? 'Sound effects enabled' : 'Sound effects disabled';
                    showStarshipNotification(message);
                }
                break;
                
            case 'KeyH':
                if (e.ctrlKey) {
                    e.preventDefault();
                    showStarshipHelp();
                }
                break;
        }
    });
    
    // Smooth scroll navigation with sound
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            sounds.play('whoosh');
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Starship notification system
function showStarshipNotification(message) {
    const notification = document.createElement('div');
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: linear-gradient(135deg, rgba(0, 255, 255, 0.15), rgba(255, 0, 255, 0.1));
        border: 1px solid rgba(0, 255, 255, 0.4);
        border-radius: 12px;
        color: white;
        font-family: 'Orbitron', monospace;
        font-size: 14px;
        backdrop-filter: blur(20px);
        box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
        z-index: 10000;
        max-width: 300px;
        animation: notification-slide 0.4s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'notification-slide 0.4s ease-out reverse';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

function showStarshipHelp() {
    const helpText = `
        <div style="color: #00ffff; font-weight: bold; margin-bottom: 10px;">🚀 STARSHIP INTERFACE CONTROLS</div>
        <div style="margin-bottom: 8px;"><strong>SPACEBAR</strong> - Enter Hyperspace</div>
        <div style="margin-bottom: 8px;"><strong>CTRL + M</strong> - Toggle Sound Effects</div>
        <div style="margin-bottom: 8px;"><strong>CTRL + H</strong> - Show This Help</div>
        <div style="margin-top: 10px; font-size: 12px; opacity: 0.8;">
            Hover over elements for holographic effects<br>
            Click buttons for ripple animations
        </div>
    `;
    
    showStarshipNotification(helpText);
}

// Additional CSS for notifications
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes notification-slide {
        from { 
            transform: translateX(100%) scale(0.8); 
            opacity: 0; 
        }
        to { 
            transform: translateX(0) scale(1); 
            opacity: 1; 
        }
    }
    
    @keyframes ripple-expand {
        from { 
            transform: scale(0); 
            opacity: 1; 
        }
        to { 
            transform: scale(20); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(notificationStyle);