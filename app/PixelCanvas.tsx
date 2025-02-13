"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function PixelCanvas({ setAddDrawing }: { setAddDrawing: Dispatch<SetStateAction<boolean>> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<Record<string, string>>({});
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    Object.entries(pixels).forEach(([key, color]) => {
      const [x, y] = key.split(",").map(Number);
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 5, 5);
    });
  }, [pixels]);

  const getPixelCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | TouchEvent
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: -1, y: -1 };

    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = Math.floor(clientX - rect.left);
    const y = Math.floor(clientY - rect.top);

    return { x, y };
  };

  const drawPixel = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const key = `${x},${y}`;
    const newColor = "#181818";

    setPixels((prev) => {
      if (prev[key]) return prev;
      return { ...prev, [key]: newColor };
    });

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = newColor;
      ctx.fillRect(x - 2, y - 2, 5, 5);
    }
  };

  const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = x1 < x2 ? 1 : -1;
    let sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;

    let x = x1;
    let y = y1;

    while (x !== x2 || y !== y2) {
      drawPixel(x, y);
      let e2 = err * 2;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
    }
  };

  const handleStart = (
    e: React.MouseEvent<HTMLCanvasElement> | TouchEvent
  ) => {
    e.preventDefault();
    setIsDrawing(true);
    const { x, y } = getPixelCoordinates(e);
    setLastPosition({ x, y });
    drawPixel(x, y);
  };

  const handleMove = (
    e: React.MouseEvent<HTMLCanvasElement> | TouchEvent
  ) => {
    if (!isDrawing) return;
    e.preventDefault();

    const { x, y } = getPixelCoordinates(e);

    // Ensure interpolation is done from the actual last drawn position to account for touchscreen events
    if (lastPosition && (lastPosition.x !== x || lastPosition.y !== y)) {
      drawLine(lastPosition.x, lastPosition.y, x, y);
      setLastPosition({ x, y }); // update lastPosition after each move
    }
  };

  const handleEnd = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    setPixels({});
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    canvas.addEventListener("touchend", handleEnd);
    document.addEventListener(
      "touchmove",
      (e) => {
        if (e.target === canvas) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    return () => {
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
    };
  }, [isDrawing, lastPosition]); // lastPosition dependency to ensure updates

  function handleClick(e:any){
    e.preventDefault();
    clearCanvas();
  }

  return (
    <div className="flex flex-col items-center relative">
      <canvas
        id="drawing-board"
        ref={canvasRef}
        width={200}
        height={200}
        style={{
          imageRendering: "pixelated",
          cursor: "crosshair",
        }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      />
      <div className="flex flex-row items-center absolute -bottom-9">
        <button className="cursor-pointer h-5 mt-[0.37rem] mx-[0.3rem]" onClick={handleClick}>
          clear
        </button>
        <button className="cursor-pointer h-5 mx-[0.3rem]" onClick={() => setAddDrawing(false)}>
          cancel
        </button>
      </div>
    </div>
  );
}