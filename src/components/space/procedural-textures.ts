/**
 * Cosmic Atlas — Procedural Textures
 * ----------------------------------
 * Generates CanvasTextures at runtime so the 3D scene needs no
 * external image assets. Each function returns a Three.js texture
 * suitable for use as a map, normalMap, or emissiveMap.
 *
 * All textures are 1024×512 (equirectangular) by default.
 */

import * as THREE from "three";

const TEX_W = 1024;
const TEX_H = 512;

function makeCanvas(w = TEX_W, h = TEX_H) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return { canvas, ctx: canvas.getContext("2d")! };
}

function toTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

/** Hash-based pseudo random for deterministic patterns. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Banded gas-giant texture (Jupiter / Saturn / ice giants). */
export function makeGasGiantTexture(
  baseColor: string,
  accentColor: string,
  seed = 1,
  bandCount = 14,
  turbulence = 0.6,
): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas();
  const rand = mulberry32(seed);

  // Base gradient with horizontal bands
  for (let y = 0; y < TEX_H; y++) {
    const t = y / TEX_H;
    // Sinusoidal banding, plus an offset for variation
    const bandPhase = t * bandCount * Math.PI + Math.sin(t * 23) * 0.3;
    const bandWeight = (Math.sin(bandPhase) + 1) * 0.5;
    const mix = bandWeight * turbulence + (1 - turbulence) * 0.5;
    const color = mixColors(baseColor, accentColor, mix);
    ctx.fillStyle = color;
    ctx.fillRect(0, y, TEX_W, 1);
  }

  // Add horizontal turbulence streaks (procedural 'storms')
  const streakCount = 180;
  for (let i = 0; i < streakCount; i++) {
    const y = rand() * TEX_H;
    const len = 60 + rand() * 380;
    const x = rand() * TEX_W;
    const h = 2 + rand() * 6;
    const c = mixColors(baseColor, accentColor, rand());
    ctx.globalAlpha = 0.15 + rand() * 0.25;
    ctx.fillStyle = c;
    ctx.fillRect(x, y, len, h);
  }
  ctx.globalAlpha = 1;

  // Add a great-spot-like feature if seeded
  if (seed % 2 === 0) {
    const sx = TEX_W * 0.65;
    const sy = TEX_H * 0.62;
    const rx = 70;
    const ry = 38;
    const grad = ctx.createRadialGradient(sx, sy, 2, sx, sy, rx);
    grad.addColorStop(0, accentColor);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.save();
    ctx.translate(sx, sy);
    ctx.scale(1, ry / rx);
    ctx.beginPath();
    ctx.arc(0, 0, rx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  return toTexture(canvas);
}

/** Cratered rocky-body texture (Mercury / Moon / Mars / Pluto). */
export function makeRockyTexture(
  baseColor: string,
  accentColor: string,
  seed = 1,
  craterCount = 220,
  polarCap = false,
): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas();
  const rand = mulberry32(seed);

  // Base fill
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  // Add mottled noise variation
  for (let i = 0; i < 5000; i++) {
    const x = rand() * TEX_W;
    const y = rand() * TEX_H;
    const r = 1 + rand() * 4;
    ctx.globalAlpha = 0.05 + rand() * 0.15;
    ctx.fillStyle = rand() > 0.5 ? accentColor : darken(baseColor, 0.7);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Dark 'mare' patches (large low-albedo regions like on the Moon/Mercury)
  const mareCount = 8;
  for (let i = 0; i < mareCount; i++) {
    const x = rand() * TEX_W;
    const y = (0.3 + rand() * 0.4) * TEX_H;
    const r = 40 + rand() * 100;
    const grad = ctx.createRadialGradient(x, y, 1, x, y, r);
    grad.addColorStop(0, withAlpha(darken(baseColor, 0.5), 0.55));
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Craters: bright rim, dark interior, with shading
  for (let i = 0; i < craterCount; i++) {
    const x = rand() * TEX_W;
    const y = rand() * TEX_H;
    const r = 2 + rand() * 14;
    // Rim (light)
    ctx.strokeStyle = withAlpha(lighten(baseColor, 1.25), 0.55);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    // Interior shadow
    const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0.5, x, y, r);
    grad.addColorStop(0, "rgba(0,0,0,0.4)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r * 0.9, 0, Math.PI * 2);
    ctx.fill();
  }

  // Optional polar ice caps
  if (polarCap) {
    for (const yCenter of [TEX_H * 0.08, TEX_H * 0.92]) {
      const grad = ctx.createRadialGradient(
        TEX_W / 2, yCenter, 5,
        TEX_W / 2, yCenter, TEX_W * 0.45,
      );
      grad.addColorStop(0, "rgba(255,255,255,0.95)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, yCenter - 60, TEX_W, 120);
    }
  }

  return toTexture(canvas);
}

/** Earth-like texture: blue oceans, green/brown continents, polar ice. */
export function makeEarthTexture(
  ocean = "#1f5a9c",
  land = "#3a7d3a",
  land2 = "#8a6a3a",
): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas();
  const rand = mulberry32(42);

  // Ocean base
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  // Continents — irregular blobs
  const continentCount = 18;
  for (let i = 0; i < continentCount; i++) {
    const cx = rand() * TEX_W;
    const cy = (0.18 + rand() * 0.64) * TEX_H;
    const points = 10 + Math.floor(rand() * 8);
    ctx.fillStyle = rand() > 0.4 ? land : land2;
    ctx.beginPath();
    for (let p = 0; p < points; p++) {
      const ang = (p / points) * Math.PI * 2;
      const r = 30 + rand() * 90;
      const x = cx + Math.cos(ang) * r;
      const y = cy + Math.sin(ang) * r * 0.6;
      if (p === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }

  // Smaller islands
  for (let i = 0; i < 600; i++) {
    const x = rand() * TEX_W;
    const y = (0.1 + rand() * 0.8) * TEX_H;
    const r = 1 + rand() * 6;
    ctx.fillStyle = rand() > 0.5 ? land : land2;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Polar caps
  for (const yCenter of [TEX_H * 0.06, TEX_H * 0.94]) {
    const grad = ctx.createRadialGradient(
      TEX_W / 2, yCenter, 5,
      TEX_W / 2, yCenter, TEX_W * 0.55,
    );
    grad.addColorStop(0, "rgba(255,255,255,0.95)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, yCenter - 80, TEX_W, 160);
  }

  // Cloud layer — semi-transparent white blobs
  ctx.globalAlpha = 0.45;
  for (let i = 0; i < 200; i++) {
    const x = rand() * TEX_W;
    const y = rand() * TEX_H;
    const r = 8 + rand() * 40;
    const grad = ctx.createRadialGradient(x, y, 1, x, y, r);
    grad.addColorStop(0, "rgba(255,255,255,0.9)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  return toTexture(canvas);
}

/** The Sun: bright mottled plasma surface with brighter active regions. */
export function makeSunTexture(
  base = "#ffcc33",
  hot = "#fff3c0",
  cool = "#ff5a18",
): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas();
  const rand = mulberry32(7);

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  // Convection cell mottling
  for (let i = 0; i < 4000; i++) {
    const x = rand() * TEX_W;
    const y = rand() * TEX_H;
    const r = 3 + rand() * 18;
    const grad = ctx.createRadialGradient(x, y, 0.5, x, y, r);
    const choice = rand();
    if (choice > 0.7) {
      grad.addColorStop(0, withAlpha(hot, 0.85));
    } else if (choice > 0.4) {
      grad.addColorStop(0, withAlpha(cool, 0.6));
    } else {
      grad.addColorStop(0, withAlpha(base, 0.6));
    }
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Brighter active regions (sunspot clusters)
  for (let i = 0; i < 12; i++) {
    const x = rand() * TEX_W;
    const y = rand() * TEX_H;
    const r = 20 + rand() * 50;
    const grad = ctx.createRadialGradient(x, y, 2, x, y, r);
    grad.addColorStop(0, withAlpha(hot, 0.9));
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return toTexture(canvas);
}

/* ---------- Color helpers (no external deps) ---------- */

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const v = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
}
function rgbToHex(r: number, g: number, b: number) {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}
function mixColors(a: string, b: string, t: number) {
  const ca = hexToRgb(a), cb = hexToRgb(b);
  return rgbToHex(ca.r + (cb.r - ca.r) * t, ca.g + (cb.g - ca.g) * t, ca.b + (cb.b - ca.b) * t);
}
function darken(hex: string, k: number) {
  const c = hexToRgb(hex);
  return rgbToHex(c.r * k, c.g * k, c.b * k);
}
function lighten(hex: string, k: number) {
  const c = hexToRgb(hex);
  return rgbToHex(Math.min(255, c.r * k), Math.min(255, c.g * k), Math.min(255, c.b * k));
}
function withAlpha(hex: string, a: number) {
  const c = hexToRgb(hex);
  return `rgba(${c.r},${c.g},${c.b},${a})`;
}
