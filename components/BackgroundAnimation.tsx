import React, { useRef, useEffect } from 'react';

const BackgroundAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        
        const mouse = {
            x: -1000,
            y: -1000,
            radius: 150, // Area of interaction
        };
        
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            life: number;
            maxLife: number;
            opacity: number;

            constructor() {
                if (!canvas) {
                    this.x = 0; this.y = 0; this.size = 0; this.speedX = 0; this.speedY = 0;
                    this.life = 0; this.maxLife = 0; this.opacity = 0;
                    return;
                };
                this.reset();
            }
            
            reset() {
                if (!canvas) return;
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 1;
                this.speedX = (Math.random() * 2 - 1) * 0.1;
                this.speedY = (Math.random() * 2 - 1) * 0.1;
                this.maxLife = Math.random() * 1200 + 900; // Lifespan in frames (approx 15-35 seconds)
                this.life = this.maxLife;
                this.opacity = 0;
            }

            update() {
                if (!canvas) return;

                // Life cycle management
                this.life--;

                const halfLife = this.maxLife / 2;
                if (this.life > halfLife) {
                    this.opacity = 1 - (this.life - halfLife) / halfLife; // Fading in
                } else {
                    this.opacity = this.life / halfLife; // Fading out
                }
                
                if (this.life <= 0) {
                    this.reset();
                }

                // Mouse interaction
                const dx_mouse = mouse.x - this.x;
                const dy_mouse = mouse.y - this.y;
                const distance_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse) || 1;

                if (distance_mouse < mouse.radius) {
                    // A single, consistent repulsion force that is stronger when closer.
                    const force = (mouse.radius - distance_mouse) / mouse.radius;
                    const forceFactor = 0.2; // Adjust this to control repulsion strength
                    this.speedX -= (dx_mouse / distance_mouse) * force * forceFactor;
                    this.speedY -= (dy_mouse / distance_mouse) * force * forceFactor;
                }

                // Bounce off canvas edges
                if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                    this.speedX *= -1;
                }
                if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                    this.speedY *= -1;
                }
                
                // Cap speed
                const speed = Math.sqrt(this.speedX*this.speedX + this.speedY*this.speedY);
                const maxSpeed = 0.375;
                if (speed > maxSpeed) {
                  this.speedX = (this.speedX / speed) * maxSpeed;
                  this.speedY = (this.speedY / speed) * maxSpeed;
                }

                this.x += this.speedX;
                this.y += this.speedY;
            }

            draw() {
                if(!ctx) return;
                ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity * 0.65})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            if(!canvas) return;
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const connectParticles = () => {
            if (!ctx) return;
            const connectionDistance = 120;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    
                    if (p1.opacity <= 0 || p2.opacity <= 0) continue;

                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const lineOpacityFactor = 1 - distance / connectionDistance;
                        const combinedOpacity = Math.min(p1.opacity, p2.opacity) * lineOpacityFactor;
                        
                        ctx.strokeStyle = `rgba(139, 92, 246, ${combinedOpacity * 0.78})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if(!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            connectParticles();

            for (const particle of particles) {
                particle.update();
                particle.draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };

    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}
        />
    );
};

export default BackgroundAnimation;