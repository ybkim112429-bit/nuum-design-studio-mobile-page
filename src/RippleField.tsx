import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ *
 * RIPPLE FIELD · reusable ambient water surface
 * The same quiet liquid identity as the cover — drops settle at random
 * and ripple outward. Sizes itself to its container; use as a
 * pointer-transparent background layer behind content.
 * ------------------------------------------------------------------ */

type Ripple = {
  x: number;
  y: number;
  born: number;
  life: number;
  max: number;
  strength: number;
};

export default function RippleField({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripples = useRef<Ripple[]>([]);

  // ---- canvas + animation loop ----
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    const render = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, w, h);
      const alive: Ripple[] = [];
      for (const rp of ripples.current) {
        const p = (now - rp.born) / rp.life;
        if (p >= 1) continue;
        alive.push(rp);
        const e = easeOut(p);
        const radius = rp.max * e;
        const env = (1 - p) * (0.12 * rp.strength * 2);
        const band = 26 + 40 * p;
        drawRing(ctx, rp.x, rp.y, radius, band, env, dark);
      }
      ripples.current = alive;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [dark]);

  // ---- ambient water drops ----
  useEffect(() => {
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduced) return;
    const canvas = canvasRef.current!;
    let timer: number;
    const drop = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ripples.current.push({
        x: rand(w * 0.05, w * 0.95),
        y: rand(h * 0.08, h * 0.92),
        born: performance.now(),
        life: rand(1500, 2100),
        max: rand(160, 320),
        strength: rand(0.28, 0.55),
      });
      if (ripples.current.length > 80)
        ripples.current.splice(0, ripples.current.length - 80);
      timer = window.setTimeout(drop, rand(450, 1300));
    };
    timer = window.setTimeout(drop, 500);
    return () => clearTimeout(timer);
  }, []);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} />;
}

/* ---------- helpers ---------- */
function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function drawRing(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  band: number,
  env: number,
  dark: boolean
) {
  if (radius < 1) return;
  const inner = Math.max(radius - band, 0);
  const outer = radius + band * 0.4;
  const g = ctx.createRadialGradient(x, y, inner, x, y, outer);
  const shadow = dark ? "0,0,0" : "41,41,41";
  const hi = "255,255,255";
  g.addColorStop(0, `rgba(${shadow},0)`);
  g.addColorStop(0.62, `rgba(${shadow},${(env * 0.5).toFixed(4)})`);
  g.addColorStop(0.82, `rgba(${hi},${(env * (dark ? 1.5 : 1.1)).toFixed(4)})`);
  g.addColorStop(0.93, `rgba(${shadow},${(env * 0.35).toFixed(4)})`);
  g.addColorStop(1, `rgba(${shadow},0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, outer, 0, Math.PI * 2);
  ctx.fill();
}
