"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  alpha: number;
  twinkle: number;
  hue: "white" | "cyan" | "violet";
};

const STAR_COUNT = 130;

const createRandom = (seed: number) => {
  let value = seed;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

const getTheme = () => {
  if (typeof window === "undefined") {
    return "dark";
  }

  const theme = document.documentElement.dataset.theme;

  if (theme === "light" || theme === "dark") {
    return theme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const random = createRandom(42);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const stars: Star[] = [];
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let theme = getTheme();

    const createStars = () => {
      stars.length = 0;

      for (let index = 0; index < STAR_COUNT; index += 1) {
        const colorRoll = random();

        stars.push({
          x: random() * width,
          y: random() * height,
          radius: 0.45 + random() * 1.85,
          speed: 0.08 + random() * 0.32,
          alpha: 0.35 + random() * 0.6,
          twinkle: random() * Math.PI * 2,
          hue:
            colorRoll > 0.92 ? "cyan" : colorRoll > 0.82 ? "violet" : "white",
        });
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createStars();
    };

    const getStarColor = (star: Star, opacity: number) => {
      if (theme === "light") {
        if (star.hue === "cyan") return `rgba(8, 145, 178, ${opacity})`;
        if (star.hue === "violet") return `rgba(79, 70, 229, ${opacity})`;
        return `rgba(15, 23, 42, ${opacity})`;
      }

      if (star.hue === "cyan") return `rgba(125, 249, 255, ${opacity})`;
      if (star.hue === "violet") return `rgba(165, 180, 252, ${opacity})`;
      return `rgba(248, 250, 252, ${opacity})`;
    };

    const drawNebula = (time: number) => {
      const drift = Math.sin(time * 0.00008) * 24;
      const firstGlow = context.createRadialGradient(
        width * 0.22 + drift,
        height * 0.38,
        0,
        width * 0.22 + drift,
        height * 0.38,
        Math.max(width, height) * 0.56,
      );
      const secondGlow = context.createRadialGradient(
        width * 0.72 - drift,
        height * 0.26,
        0,
        width * 0.72 - drift,
        height * 0.26,
        Math.max(width, height) * 0.48,
      );

      if (theme === "light") {
        firstGlow.addColorStop(0, "rgba(45, 212, 191, 0.12)");
        firstGlow.addColorStop(0.42, "rgba(99, 102, 241, 0.08)");
        firstGlow.addColorStop(1, "rgba(99, 102, 241, 0)");
        secondGlow.addColorStop(0, "rgba(99, 102, 241, 0.14)");
        secondGlow.addColorStop(1, "rgba(99, 102, 241, 0)");
      } else {
        firstGlow.addColorStop(0, "rgba(45, 212, 191, 0.1)");
        firstGlow.addColorStop(0.42, "rgba(99, 102, 241, 0.12)");
        firstGlow.addColorStop(1, "rgba(99, 102, 241, 0)");
        secondGlow.addColorStop(0, "rgba(99, 102, 241, 0.18)");
        secondGlow.addColorStop(1, "rgba(99, 102, 241, 0)");
      }

      context.fillStyle = firstGlow;
      context.fillRect(0, 0, width, height);
      context.fillStyle = secondGlow;
      context.fillRect(0, 0, width, height);
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      drawNebula(time);

      for (const star of stars) {
        if (!reducedMotion) {
          star.y += star.speed;
          star.x += star.speed * 0.16;

          if (star.y > height + 8) {
            star.y = -8;
            star.x = random() * width;
          }

          if (star.x > width + 8) {
            star.x = -8;
          }
        }

        const twinkle = reducedMotion
          ? 1
          : 0.72 + Math.sin(time * 0.0015 + star.twinkle) * 0.28;
        const opacity = Math.min(star.alpha * twinkle, 0.95);

        context.beginPath();
        context.fillStyle = getStarColor(star, opacity);
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();

        if (star.radius > 1.55) {
          context.beginPath();
          context.fillStyle = getStarColor(star, opacity * 0.16);
          context.arc(star.x, star.y, star.radius * 3.2, 0, Math.PI * 2);
          context.fill();
        }
      }

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const syncTheme = () => {
      theme = getTheme();
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cosmos-space-canvas"
      aria-hidden="true"
    />
  );
};

export default SpaceBackground;
