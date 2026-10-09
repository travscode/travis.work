"use client";

import { useEffect, useRef } from "react";

/**
 * Live, slow-moving versions of the "Series of Ten" prints, used as the
 * service hero background. Riso inks are multiplied onto the page's khaki,
 * with a punched-out grain so it reads as print, not vector.
 */

export type ArtKey =
  | "structure"
  | "mark"
  | "signal"
  | "interference"
  | "touch"
  | "rule30"
  | "field"
  | "system"
  | "ampersand"
  | "layers";

const INK = {
  pink: "255,72,176",
  blue: "50,85,164",
  yellow: "255,232,0",
  orange: "255,108,47",
  teal: "0,131,138",
};
const ink = (c: string, a = 1) => `rgba(${c},${a})`;

/* ---------- Perlin noise ---------- */
const perm = new Uint8Array(512);
(() => {
  let s = 1337;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const p = [...Array(256).keys()];
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
})();
const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const grad = (h: number, x: number, y: number) => {
  const u = h & 1 ? x : -x;
  const v = h & 2 ? y : -y;
  return h & 4 ? u + v * 0.5 : v + u * 0.5;
};
function noise(x: number, y: number) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  x -= Math.floor(x); y -= Math.floor(y);
  const u = fade(x), v = fade(y), a = perm[X] + Y, b = perm[X + 1] + Y;
  return lerp(
    lerp(grad(perm[a], x, y), grad(perm[b], x - 1, y), u),
    lerp(grad(perm[a + 1], x, y - 1), grad(perm[b + 1], x - 1, y - 1), u),
    v,
  );
}
const fbm = (x: number, y: number) => noise(x, y) * 0.65 + noise(x * 2, y * 2) * 0.35;

type Draw = (t: number, dt: number) => void;
type System = (ctx: CanvasRenderingContext2D, w: number, h: number) => { draw: Draw; trails?: boolean };

/* ---------- the systems ---------- */
const systems: Record<ArtKey, System> = {
  // Contour lines breathing under a pink frame
  structure(ctx, w, h) {
    return {
      draw(t) {
        ctx.clearRect(0, 0, w, h);
        const x0 = w * 0.32, x1 = w * 1.02, cx = w * 0.68, cy = h * 0.5;
        const g = ctx.createLinearGradient(0, h * 0.18, 0, h * 0.85);
        g.addColorStop(0, ink(INK.pink, 0.9)); g.addColorStop(1, ink(INK.pink, 0.08));
        ctx.fillStyle = g; ctx.fillRect(w * 0.66, h * 0.18, w * 0.17, h * 0.67);
        ctx.strokeStyle = ink(INK.blue, 0.9); ctx.lineWidth = 1.4;
        const lines = 64;
        for (let k = 0; k < lines; k++) {
          const yb = h * 0.08 + (k / (lines - 1)) * h * 0.88;
          ctx.beginPath();
          for (let x = x0; x <= x1; x += 6) {
            const env = Math.exp(-(((x - cx) / (w * 0.22)) ** 2)) * Math.exp(-(((yb - cy) / (h * 0.35)) ** 2));
            const y = yb - env * h * (0.06 + 0.1 * (fbm(x / 420, yb / 420 + t * 0.06) + 0.5));
            if (x === x0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      },
    };
  },

  // Twelve states of a mark, morphing in a wave; the chosen one moves along
  mark(ctx, w, h) {
    const se = (cx: number, cy: number, r: number, n: number) => {
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const a = (i / 120) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
        const x = cx + r * Math.sign(c) * Math.abs(c) ** (2 / n);
        const y = cy + r * Math.sign(s) * Math.abs(s) ** (2 / n);
        if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
      }
      ctx.closePath(); ctx.fill();
    };
    return {
      draw(t) {
        ctx.clearRect(0, 0, w, h);
        const cell = Math.min(w * 0.11, h * 0.2), r = cell * 0.34;
        const ox = w * 0.5, oy = h * 0.5 - cell;
        const chosen = Math.floor(t / 2.2) % 12;
        for (let i = 0; i < 12; i++) {
          const gx = i % 4, gy = Math.floor(i / 4);
          const cx = ox + gx * cell + cell / 2, cy = oy + gy * cell;
          const base = 0.55 * (9 / 0.55) ** (i / 11);
          const n = base * (1 + 0.35 * Math.sin(t * 0.9 - i * 0.5));
          if (i === chosen) {
            ctx.fillStyle = ink(INK.yellow, 0.95); ctx.fillRect(cx - r * 1.35, cy - r * 1.35, r * 2.7, r * 2.7);
            ctx.fillStyle = ink(INK.pink, 0.95);
          } else ctx.fillStyle = ink(INK.blue, 0.88);
          se(cx, cy, r, n);
        }
        ctx.fillStyle = ink(INK.blue, 0.7);
        ctx.fillRect(w * 0.42, oy + Math.floor(chosen / 4) * cell - 0.75, w * 0.6, 1.5);
      },
    };
  },

  // Particles drifting until they converge on one point
  signal(ctx, w, h) {
    const tx = w * 0.72, ty = h * 0.42, N = 1600;
    const ps = Array.from({ length: N }, () => ({ x: Math.random() * w, y: Math.random() * h, life: Math.random() * 300 }));
    return {
      trails: true,
      draw(t) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.018)"; ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = ink(INK.blue, 0.5); ctx.lineWidth = 1;
        ctx.beginPath();
        for (const p of ps) {
          const d = Math.hypot(tx - p.x, ty - p.y);
          const toward = Math.atan2(ty - p.y, tx - p.x);
          const a = lerp(fbm(p.x / 380, p.y / 380 + t * 0.02) * Math.PI * 2.4, toward, 0.35 + Math.min(1, 200 / d) * 0.6);
          ctx.moveTo(p.x, p.y);
          p.x += Math.cos(a) * 1.8; p.y += Math.sin(a) * 1.8; p.life--;
          ctx.lineTo(p.x, p.y);
          if (d < 10 || p.life < 0) { p.x = Math.random() * w; p.y = Math.random() * h; p.life = 200 + Math.random() * 300; }
        }
        ctx.stroke();
        ctx.fillStyle = ink(INK.orange); ctx.beginPath(); ctx.arc(tx, ty, 11, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = ink(INK.orange, 0.5 + 0.4 * Math.sin(t * 2)); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(tx, ty, 26 + 6 * Math.sin(t * 2), 0, Math.PI * 2); ctx.stroke();
      },
    };
  },

  // Two drifting ring sets; the moiré is the message
  interference(ctx, w, h) {
    return {
      draw(t) {
        ctx.clearRect(0, 0, w, h);
        const R = Math.min(h * 0.46, w * 0.3), cx = w * 0.7, cy = h * 0.5;
        ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
        ctx.lineWidth = 3.2;
        const sets: [string, number, number][] = [
          [INK.teal, cx - R * 0.3 + Math.sin(t * 0.21) * R * 0.12, cy - R * 0.15 + Math.cos(t * 0.17) * R * 0.1],
          [INK.pink, cx + R * 0.3 + Math.cos(t * 0.19) * R * 0.12, cy + R * 0.15 + Math.sin(t * 0.23) * R * 0.1],
        ];
        for (const [c, x, y] of sets) {
          ctx.strokeStyle = ink(c, 0.9);
          for (let r = 6; r < R * 2.2; r += 13) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke(); }
        }
        ctx.restore();
      },
    };
  },

  // A soft field, a capsule, a point of contact that taps
  touch(ctx, w, h) {
    return {
      draw(t) {
        ctx.clearRect(0, 0, w, h);
        const g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, ink(INK.yellow, 0.05)); g.addColorStop(1, ink(INK.yellow, 0.85));
        ctx.fillStyle = g; ctx.fillRect(w * 0.4, 0, w * 0.6, h);
        const cw = Math.min(w * 0.13, h * 0.3), ch = h * 0.72, cx = w * 0.7 - cw / 2, cy = h * 0.14;
        const pg = ctx.createLinearGradient(0, cy, 0, cy + ch);
        pg.addColorStop(0, ink(INK.pink, 0.95)); pg.addColorStop(1, ink(INK.pink, 0.3));
        ctx.fillStyle = pg; ctx.beginPath(); ctx.roundRect(cx, cy, cw, ch, cw / 2); ctx.fill();
        const phase = (t * 0.35) % 1;
        const dy = cy + cw * 0.6 + (ch - cw * 1.2) * (0.5 - 0.5 * Math.cos(phase * Math.PI * 2));
        const tap = Math.max(0, Math.sin(t * 2.2));
        ctx.fillStyle = ink(INK.blue, 0.95);
        ctx.beginPath(); ctx.arc(cx + cw / 2, dy, cw * 0.13, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = ink(INK.blue, 0.5 * (1 - tap)); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(cx + cw / 2, dy, cw * (0.15 + tap * 0.35), 0, Math.PI * 2); ctx.stroke();
      },
    };
  },

  // Rule 30 growing row by row, scrolling up forever
  rule30(ctx, w, h) {
    const cell = 7, cols = Math.ceil((w * 0.62) / cell), x0 = w - cols * cell;
    const maxRows = Math.ceil(h / cell) + 1;
    let row = new Uint8Array(cols);
    row[Math.floor(cols * 0.55)] = 1;
    const rows: Uint8Array[] = [];
    const step = () => {
      rows.push(row);
      if (rows.length > maxRows) rows.shift();
      const next = new Uint8Array(cols);
      for (let c = 0; c < cols; c++) {
        const l = c > 0 ? row[c - 1] : 0, m = row[c], r = c < cols - 1 ? row[c + 1] : 0;
        next[c] = (30 >> ((l << 2) | (m << 1) | r)) & 1;
      }
      row = next;
    };
    for (let i = 0; i < maxRows * 0.6; i++) step();
    let acc = 0;
    return {
      draw(_t, dt) {
        acc += dt;
        while (acc > 0.09) { step(); acc -= 0.09; }
        ctx.clearRect(0, 0, w, h);
        const sx = x0 + Math.floor(cols * 0.55) * cell;
        const g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, ink(INK.orange, 0.85)); g.addColorStop(1, ink(INK.orange, 0.2));
        ctx.fillStyle = g; ctx.fillRect(sx - w * 0.09, 0, w * 0.18, h);
        ctx.fillStyle = ink(INK.blue, 0.9);
        const off = h - rows.length * cell;
        rows.forEach((r, y) => { for (let c = 0; c < cols; c++) if (r[c]) ctx.fillRect(x0 + c * cell, off + y * cell, cell - 1.4, cell - 1.4); });
      },
    };
  },

  // Two inks of flow crossing like weights in a network
  field(ctx, w, h) {
    const N = 900;
    const mk = (off: number) => Array.from({ length: N }, () => ({ x: w * 0.3 + Math.random() * w * 0.7, y: Math.random() * h, off, life: Math.random() * 200 }));
    const ps = [...mk(0), ...mk(3.7)];
    return {
      trails: true,
      draw(t) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.015)"; ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
        for (const c of [INK.blue, INK.pink]) {
          ctx.strokeStyle = ink(c, 0.5); ctx.lineWidth = 1.1; ctx.beginPath();
          for (const p of ps) {
            if ((c === INK.blue) !== (p.off === 0)) continue;
            const a = fbm(p.x / 520 + p.off, p.y / 520 + t * 0.015) * Math.PI * 3;
            ctx.moveTo(p.x, p.y); p.x += Math.cos(a) * 1.6; p.y += Math.sin(a) * 1.6; p.life--; ctx.lineTo(p.x, p.y);
            if (p.life < 0 || p.x < w * 0.25 || p.x > w || p.y < 0 || p.y > h) { p.x = w * 0.3 + Math.random() * w * 0.7; p.y = Math.random() * h; p.life = 150 + Math.random() * 250; }
          }
          ctx.stroke();
        }
      },
    };
  },

  // A programme of circles and squares pulsing across a grid
  system(ctx, w, h) {
    return {
      draw(t) {
        ctx.clearRect(0, 0, w, h);
        const step = Math.min(w, h) * 0.105, x0 = w * 0.42;
        for (let gy = 0; gy * step < h + step; gy++) for (let gx = 0; x0 + gx * step < w + step; gx++) {
          const x = x0 + gx * step, y = step * 0.5 + gy * step;
          const v = Math.sin(gx * 0.55 + gy * 0.35 + t * 0.7) * 0.5 + 0.5;
          ctx.fillStyle = ink(INK.blue, 0.9);
          ctx.beginPath(); ctx.arc(x, y, 3 + v * step * 0.36, 0, Math.PI * 2); ctx.fill();
          const s = 3 + (1 - v) * step * 0.28;
          ctx.fillStyle = ink(INK.orange, 0.9); ctx.fillRect(x + step / 2 - s, y + step / 2 - s, s * 2, s * 2);
        }
      },
    };
  },

  // A halftone ampersand whose dots swell in a slow wave
  ampersand(ctx, w, h) {
    const fam = getComputedStyle(document.body).getPropertyValue("--font-object-heavy") || "sans-serif";
    const size = h * 0.95, gx = w * 0.68, gy = h * 0.86;
    const m = document.createElement("canvas"); m.width = w; m.height = h;
    const mc = m.getContext("2d")!;
    mc.font = `900 ${size}px ${fam}`; mc.textAlign = "center"; mc.fillStyle = "#000"; mc.fillText("&", gx, gy);
    const data = mc.getImageData(0, 0, w, h).data;
    const step = 11, ang = 0.26, dots: { x: number; y: number; tone: number }[] = [];
    for (let yy = -h; yy < h * 2; yy += step) for (let xx = -w; xx < w * 2; xx += step) {
      const x = xx * Math.cos(ang) - yy * Math.sin(ang), y = xx * Math.sin(ang) + yy * Math.cos(ang);
      if (x < 0 || y < 0 || x >= w || y >= h) continue;
      if (data[((y | 0) * w + (x | 0)) * 4 + 3] > 128) dots.push({ x, y, tone: 0.3 + 0.7 * (1 - y / h) });
    }
    return {
      draw(t) {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = ink(INK.yellow, 0.92); ctx.fillRect(w * 0.73, h * 0.12, w * 0.2, h * 0.42);
        ctx.fillStyle = ink(INK.pink, 0.92);
        for (const d of dots) {
          const wave = 0.75 + 0.25 * Math.sin(t * 1.4 - (d.x + d.y) * 0.006);
          ctx.beginPath(); ctx.arc(d.x, d.y, step * 0.6 * Math.sqrt(d.tone) * wave, 0, Math.PI * 2); ctx.fill();
        }
      },
    };
  },

  // Stacked sheets in graded tints, gently shifting
  layers(ctx, w, h) {
    return {
      draw(t) {
        ctx.clearRect(0, 0, w, h);
        const sw = w * 0.3, sh = h * 0.36;
        for (let i = 0; i < 7; i++) {
          const x = w * 0.45 + i * w * 0.045 + Math.sin(t * 0.5 + i * 0.6) * 10;
          const y = h * 0.1 + i * h * 0.075 + Math.cos(t * 0.4 + i * 0.5) * 6;
          ctx.fillStyle = ink(i === 3 ? INK.pink : INK.blue, i === 3 ? 0.9 : 0.1 + i * 0.1);
          ctx.fillRect(x, y, sw, sh);
        }
      },
    };
  },
};

/* ---------- grain: punch tiny holes in the ink, like a riso screen ---------- */
function grainPattern(ctx: CanvasRenderingContext2D) {
  const g = document.createElement("canvas"); g.width = g.height = 160;
  const gc = g.getContext("2d")!; const img = gc.createImageData(160, 160);
  for (let i = 0; i < img.data.length; i += 4) { img.data[i + 3] = Math.random() < 0.28 ? 120 + Math.random() * 135 : 0; }
  gc.putImageData(img, 0, 0);
  return ctx.createPattern(g, "repeat")!;
}

export default function HeroArt({ art, className }: { art: ArtKey; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, visible = true, last = performance.now(), t = 0;
    let sys!: ReturnType<System>, grain!: CanvasPattern, w = 0, h = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width)); h = Math.max(1, Math.round(r.height));
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grain = grainPattern(ctx);
      sys = systems[art](ctx, w, h);
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
      sys.draw(t, dt);
      if (!sys.trails) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = grain; ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      }
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    };

    setup();
    if (reduce) {
      // A settled still for people who prefer less motion
      for (let i = 0; i < (sys.trails ? 240 : 1); i++) { t += 0.05; sys.draw(t, 0.05); }
      frame(performance.now());
    } else raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => {
      const was = visible; visible = e.isIntersecting;
      if (visible && !was && !reduce) { last = performance.now(); raf = requestAnimationFrame(frame); }
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { cancelAnimationFrame(raf); setup(); if (visible && !reduce) raf = requestAnimationFrame(frame); else frame(performance.now()); });
    ro.observe(canvas);

    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, [art]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
