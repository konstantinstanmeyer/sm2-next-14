"use client";

import { useEffect, useRef, useState } from "react";

export default function PixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<Record<string, string>>({});
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas before re-drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

  // Function to interpolate and fill gaps
  const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    // Calculate the differences in x and y direction
    const dx = Math.abs(x2 - x1); // Absolute difference in x-coordinates
    const dy = Math.abs(y2 - y1); // Absolute difference in y-coordinates

    // Determine the direction of movement for x and y
    const sx = x1 < x2 ? 1 : -1; // Step direction for x (1 if increasing, -1 if decreasing)
    const sy = y1 < y2 ? 1 : -1; // Step direction for y (1 if increasing, -1 if decreasing)

    // Initialize the error term, which helps decide when to move in the y-direction
    let err = dx - dy;

    // Start drawing from the first point
    let x = x1;
    let y = y1;

    // Loop until reaching the target point (x2, y2)
    while (x !== x2 || y !== y2) {
      drawPixel(x, y); // Draw the pixel at the current (x, y) position

      const e2 = err * 2; // Multiply error by 2 to determine the next step

      if (e2 > -dy) { // If the error is greater than the negative y-difference
          err -= dy; // Decrease error by dy
          x += sx; // Move in the x direction
      }

      if (e2 < dx) { // If the error is less than the x-difference
          err += dx; // Increase error by dx
          y += sy; // Move in the y direction
      }
    }
  };


  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { x, y } = getPixelCoordinates(e);
    setLastPosition({ x, y });
    drawPixel(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { x, y } = getPixelCoordinates(e);

    if (lastPosition) {
      drawLine(lastPosition.x, lastPosition.y, x, y);
    }

    setLastPosition({ x, y });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    }

    setPixels({}); // Reset pixel state
  };

  return (
    <div>
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
        className="rounded-[10px] bg-[#ffe8ce]"
      />
      <p onClick={clearCanvas}>clear</p>
    </div>
  );
}