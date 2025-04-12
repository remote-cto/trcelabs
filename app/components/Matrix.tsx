"use client";

import React, { useEffect, useRef } from "react";

const Matrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    if (!context) return;

    const ctx = context;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Define the characters to display
    const letters =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
      );

    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);

    const drops: number[] = Array(columns).fill(1);

    ctx.fillStyle = "#0B1828";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function draw(): void {
      ctx.fillStyle = "rgba(11, 24, 40, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = "#0f0";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        drops[i] += 0.5;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }

    const animationInterval = setInterval(draw, 50);

    // Clean up interval on component unmount
    return () => clearInterval(animationInterval);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Matrix;
