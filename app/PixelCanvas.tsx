"use client"

import { useEffect, useRef, useState } from "react";

export default function PixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<Record<string, string>>({});
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw stored pixels
    Object.entries(pixels).forEach(([key, color]) => {
      const [x, y] = key.split(",").map(Number);
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 5, 5); // Draw 5x5 pixels
    });
  }, [pixels]);

  const getPixelCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: -1, y: -1 };

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    return { x, y };
  };

  const drawPixel = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const key = `${x},${y}`;
    const newColor = `#181818`; // Gray

    setPixels((prev) => {
      if (prev[key]) return prev; // Avoid unnecessary updates

      const updatedPixels = { ...prev, [key]: newColor };

      // Draw immediately
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = newColor;
        ctx.fillRect(x - 2, y - 2, 5, 5); // Centered 5x5 pixel block
      }

      return updatedPixels;
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { x, y } = getPixelCoordinates(e);
    drawPixel(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { x, y } = getPixelCoordinates(e);
    drawPixel(x, y);
  };

  const handleMouseUp = () => setIsDrawing(false);

  return (
    <canvas
      id="drawing-board"
      ref={canvasRef}
      width={200}
      height={200}
      style={{
        imageRendering: "pixelated",
        border: "1px solid black",
        cursor: "crosshair",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Ensures drawing stops if the cursor leaves
    />
  );
}