"use client"

import React, { useEffect, useRef } from 'react';

const Matrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Early return if canvas ref is not available
    if (!canvasRef.current) return;
    
    // Use non-null assertion operator to tell TypeScript that we've checked
    const canvas = canvasRef.current;
    
    // Get the 2D context, with type assertion
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Now TypeScript knows these are definitely not null
    const ctx = context;
  
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Define the characters to display
    const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
   
    // Configure the matrix effect
    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops at the top of the screen
    const drops: number[] = Array(columns).fill(1);

    // Set initial background
    ctx.fillStyle = '#0B1828';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function draw(): void {
      // Apply fading effect with semi-transparent blue rectangle
      // Using the requested background color with transparency
      ctx.fillStyle = 'rgba(11, 24, 40, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw each character in the matrix
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = '#0f0'; // Matrix green
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Move the drop down more slowly (reduced increment)
        drops[i] += 0.5; // Reduced from 1 to 0.5 to slow down the fall rate
        
        // Reset the drop when it reaches the bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }
    
    // Start the animation loop with slower interval (increased from 33ms to 50ms)
    const animationInterval = setInterval(draw, 50);
    
    // Clean up interval on component unmount
    return () => clearInterval(animationInterval);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Matrix;