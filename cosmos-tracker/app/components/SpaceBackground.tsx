"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  alpha: number;
  twinkle: number;
  angle: number;
  distance: number;
  hue: "white" | "cyan" | "violet";
};

type ShootingStar = {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
  hue: "cyan" | "violet" | "white";
};

const STAR_COUNT = 130;
const MAX_SHOOTING_STARS = 3;

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
    const shootingStars: ShootingStar[] = [];
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let theme = getTheme();
    let lastTime = 0;
    let nextShootingStarAt = 900;

    const positionStar = (star: Star) => {
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      star.x = centerX + Math.cos(star.angle) * star.distance;
      star.y = centerY + Math.sin(star.angle) * star.distance;
    };

    const resetStarNearCenter = (star: Star) => {
      star.angle = random() * Math.PI * 2;
      star.distance = random() * Math.max(width, height) * 0.08;
      star.radius = 0.45 + random() * 1.85;
      star.speed = 0.018 + random() * 0.072;
      star.alpha = 0.35 + random() * 0.6;
      star.twinkle = random() * Math.PI * 2;
      positionStar(star);
    };

    const createStars = () => {
      stars.length = 0;

      for (let index = 0; index < STAR_COUNT; index += 1) {
        const colorRoll = random();
        const maxDistance = Math.hypot(width, height) * 0.56;
        const star: Star = {
          x: 0,
          y: 0,
          radius: 0.45 + random() * 1.85,
          speed: 0.018 + random() * 0.072,
          alpha: 0.35 + random() * 0.6,
          twinkle: random() * Math.PI * 2,
          angle: random() * Math.PI * 2,
          distance: random() * maxDistance,
          hue:
            colorRoll > 0.92 ? "cyan" : colorRoll > 0.82 ? "violet" : "white",
        };

        positionStar(star);
        stars.push(star);
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

    const getShootingStarColor = (hue: ShootingStar["hue"], opacity: number) => {
      if (theme === "light") {
        if (hue === "cyan") return `rgba(8, 145, 178, ${opacity})`;
        if (hue === "violet") return `rgba(79, 70, 229, ${opacity})`;
        return `rgba(15, 23, 42, ${opacity})`;
      }

      if (hue === "cyan") return `rgba(125, 249, 255, ${opacity})`;
      if (hue === "violet") return `rgba(165, 180, 252, ${opacity})`;
      return `rgba(248, 250, 252, ${opacity})`;
    };

    const scheduleShootingStar = (time: number) => {
      nextShootingStarAt = time + 2200 + random() * 5200;
    };

    const spawnShootingStar = () => {
      if (shootingStars.length >= MAX_SHOOTING_STARS) {
        return;
      }

      const hueRoll = random();

      shootingStars.push({
        x: random() * width * 0.82 - width * 0.12,
        y: random() * height * 0.42 + height * 0.04,
        length: 130 + random() * 190,
        speed: 0.48 + random() * 0.46,
        angle: Math.PI * (0.14 + random() * 0.08),
        opacity: 0.58 + random() * 0.32,
        life: 0,
        maxLife: 1100 + random() * 680,
        hue: hueRoll > 0.72 ? "cyan" : hueRoll > 0.44 ? "violet" : "white",
      });
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

    const drawShootingStars = (delta: number) => {
      for (let index = shootingStars.length - 1; index >= 0; index -= 1) {
        const shootingStar = shootingStars[index];
        shootingStar.life += delta;

        const progress = Math.min(shootingStar.life / shootingStar.maxLife, 1);
        const fade = Math.sin(progress * Math.PI);
        const opacity = shootingStar.opacity * fade;
        const distance = shootingStar.speed * delta;
        const moveX = Math.cos(shootingStar.angle) * distance;
        const moveY = Math.sin(shootingStar.angle) * distance;

        shootingStar.x += moveX;
        shootingStar.y += moveY;

        const tailX =
          shootingStar.x -
          Math.cos(shootingStar.angle) * shootingStar.length;
        const tailY =
          shootingStar.y -
          Math.sin(shootingStar.angle) * shootingStar.length;
        const gradient = context.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          tailX,
          tailY,
        );

        gradient.addColorStop(
          0,
          getShootingStarColor(shootingStar.hue, opacity),
        );
        gradient.addColorStop(
          0.28,
          getShootingStarColor(shootingStar.hue, opacity * 0.34),
        );
        gradient.addColorStop(1, getShootingStarColor(shootingStar.hue, 0));

        context.save();
        context.lineCap = "round";
        context.lineWidth = 1.5;
        context.shadowBlur = 16;
        context.shadowColor = getShootingStarColor(
          shootingStar.hue,
          opacity * 0.72,
        );
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(shootingStar.x, shootingStar.y);
        context.lineTo(tailX, tailY);
        context.stroke();

        context.shadowBlur = 8;
        context.fillStyle = getShootingStarColor(
          shootingStar.hue,
          opacity * 0.95,
        );
        context.beginPath();
        context.arc(shootingStar.x, shootingStar.y, 1.8, 0, Math.PI * 2);
        context.fill();
        context.restore();

        if (
          progress >= 1 ||
          shootingStar.x > width + shootingStar.length ||
          shootingStar.y > height + shootingStar.length
        ) {
          shootingStars.splice(index, 1);
        }
      }
    };

    const draw = (time = 0) => {
      const delta = lastTime ? Math.min(time - lastTime, 48) : 16;
      lastTime = time;

      context.clearRect(0, 0, width, height);
      drawNebula(time);

      for (const star of stars) {
        if (!reducedMotion) {
          const drift = star.speed * delta;
          star.distance += drift * (1 + star.distance * 0.008);
          positionStar(star);

          if (
            star.x < -24 ||
            star.x > width + 24 ||
            star.y < -24 ||
            star.y > height + 24
          ) {
            resetStarNearCenter(star);
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
        if (time >= nextShootingStarAt) {
          spawnShootingStar();
          scheduleShootingStar(time);
        }

        drawShootingStars(delta);
      }

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const syncTheme = () => {
      theme = getTheme();
    };

    resize();
    scheduleShootingStar(0);
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
