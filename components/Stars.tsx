"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

type Coordinates = {
  x: number | null;
  y: number | null;
};

type Star = {
  x: number;
  y: number;
  z: number;
};

interface StarsProps {
  normalVelocity?: number;
  containerOpacity?: number;
  addEventListeners?: boolean;
}

const Stars: React.FC<StarsProps> = ({
  normalVelocity = 0.0005,
  containerOpacity = 1,
  addEventListeners = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const stars = useRef<Star[]>([]);
  const starSize = 3;
  const starMinScale = 0.2;
  const overflowThreshold = 50;

  const scale = useRef(1); // device/pixel ratio
  const windowWidth = useRef(0);
  const windowHeight = useRef(0);

  const velocity = useRef({ x: 0, y: 0, tx: 0, ty: 0, z: normalVelocity });

  const pointer = useRef<Coordinates>({ x: null, y: null });
  const cursorInsideCanvas = useRef(false);

  const generateStars = useCallback(() => {
    const starsNumber =
      typeof window !== "undefined"
        ? (window.innerWidth + window.innerHeight) / 8
        : 100; // Default value for SSR

    for (let i = 0; i < starsNumber; i++) {
      stars.current.push({
        x: 0,
        y: 0,
        z: starMinScale + Math.random() * (1 - starMinScale),
      });
    }
  }, [starMinScale]);

  const recycleStar = useCallback(
    (star: Star) => {
      star.z = starMinScale + Math.random() * (1 - starMinScale);
      star.x = Math.random() * windowWidth.current;
      star.y = Math.random() * windowHeight.current;
    },
    [starMinScale]
  );

  const resizeCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      scale.current = window.devicePixelRatio || 1;

      windowWidth.current = window.innerWidth * scale.current;
      windowHeight.current = window.innerHeight * scale.current;

      canvas.width = windowWidth.current;
      canvas.height = windowHeight.current;

      stars.current.forEach((star) => {
        star.x = Math.random() * windowWidth.current;
        star.y = Math.random() * windowHeight.current;
      });
    },
    []
  );

  const movePointer = useCallback(
    (x: number, y: number) => {
      if (pointer.current.x !== null && pointer.current.y !== null) {
        const dx = x - pointer.current.x;
        const dy = y - pointer.current.y;

        velocity.current.tx -= dx / 8;
        velocity.current.ty -= dy / 8;
      }

      pointer.current = { x, y };
    },
    []
  );

  const renderStars = useCallback(() => {
    stars.current.forEach((star) => {
      if (context) {
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = starSize * star.z * scale.current;
        context.strokeStyle =
          "rgba(255,255,255," + (0.5 + 0.5 * Math.random()) + ")";

        context.moveTo(star.x, star.y);

        let tailX = velocity.current.x * 2;
        let tailY = velocity.current.y * 2;

        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;

        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
      }
    });
  }, [context, starSize]);

  const update = useCallback(() => {
    velocity.current.tx *= 0.96;
    velocity.current.ty *= 0.96;

    velocity.current.x += (velocity.current.tx - velocity.current.x) * 0.8;
    velocity.current.y += (velocity.current.ty - velocity.current.y) * 0.8;

    stars.current.forEach((star) => {
      star.x +=
        velocity.current.x * star.z +
        (star.x - windowWidth.current / 2) * velocity.current.z * star.z;
      star.y +=
        velocity.current.y * star.z +
        (star.y - windowHeight.current / 2) * velocity.current.z * star.z;
      star.z += velocity.current.z;

      if (
        star.x < -overflowThreshold ||
        star.x > windowWidth.current + overflowThreshold ||
        star.y < -overflowThreshold ||
        star.y > windowHeight.current + overflowThreshold
      ) {
        recycleStar(star);
      }
    });
  }, [recycleStar, overflowThreshold]);

  const step = useCallback(() => {
    if (context) {
      context.clearRect(0, 0, windowWidth.current, windowHeight.current);
      update();
      renderStars();
      requestAnimationFrame(step);
    }
  }, [context, update, renderStars]);

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");
      if (renderCtx) {
        setContext(renderCtx);
        generateStars();
        resizeCanvas(canvasRef.current);
        step();
      }
    }

    const handleResize = () => {
      if (canvasRef.current) resizeCanvas(canvasRef.current);
    };

    const handleMouseMove = (event: MouseEvent) => {
      cursorInsideCanvas.current = true;
      movePointer(event.clientX, event.clientY);
    };

    const handleMouseLeave = () => {
      cursorInsideCanvas.current = false;
      pointer.current = { x: null, y: null };
    };

    if (addEventListeners) {
      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (addEventListeners) {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [context, generateStars, resizeCanvas, step, movePointer, addEventListeners]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{
        opacity: containerOpacity,
        backgroundColor: "black",
      }}
    />
  );
};

export default Stars;