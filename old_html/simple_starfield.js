// Simple Working StarField Animation - Replace in animations.js

class WorkingStarField {
    constructor() {
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 800;
        this.speed = 1;
        
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
            background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
        `;
        document.body.appendChild(canvas);
        return canvas;
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.createStars(); // Recreate stars for new dimensions
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
                size: Math.random() * 2 + 0.5
            });
        }
    }
    
    getRandomColor() {
        const colors = ['#00ffff', '#ff00ff', '#8a2be2', '#ffffff', '#00ff88'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    startAnimation() {
        const animate = () => {
            this.updateAndDraw();
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    updateAndDraw() {
        // Clear canvas with slight trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
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
            const size = Math.max(0.1, star.size * (1000 - star.z) / 1000 * 3);
            const opacity = Math.max(0.1, (1000 - star.z) / 1000);
            
            // Only draw if star is on screen
            if (x >= -50 && x <= this.canvas.width + 50 && 
                y >= -50 && y <= this.canvas.height + 50) {
                
                // Draw star with glow
                this.ctx.save();
                this.ctx.globalAlpha = opacity;
                this.ctx.fillStyle = star.color;
                this.ctx.shadowBlur = size * 4;
                this.ctx.shadowColor = star.color;
                
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
    
    hyperspace() {
        this.setSpeed(8);
        setTimeout(() => this.setSpeed(1), 3000);
    }
}

// Simple initialization
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Only create if not already exists
        if (!window.workingStarField) {
            window.workingStarField = new WorkingStarField();
            console.log('Working StarField initialized');
            
            // Hyperspace on spacebar
            document.addEventListener('keydown', (e) => {
                if (e.code === 'Space' && window.workingStarField) {
                    e.preventDefault();
                    window.workingStarField.hyperspace();
                }
            });
        }
    });
}