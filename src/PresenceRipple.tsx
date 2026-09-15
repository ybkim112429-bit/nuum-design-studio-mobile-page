import { useEffect, useRef, useState } from "react";
import Group1 from "./imports/Group1";

/* ------------------------------------------------------------------ *
 * PRESENCE RIPPLE · 存在涟漪
 * A quiet liquid cover — water drops settle and ripple across a still
 * surface, refracting the logo. Core motion identity for NUUM.
 * ------------------------------------------------------------------ */

type Ripple = {
  x: number;
  y: number;
  born: number;
  life: number; // ms
  max: number; // px
  strength: number; // 0..1
};

const IVORY = "#f3f0ea";

export default function PresenceRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const reduced = useRef(false);

  const [stage, setStage] = useState(0); // intro reveal steps

  // ---- intro choreography ----
  useEffect(() => {
    reduced.current =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const t = [
      setTimeout(() => setStage(1), 300), // 久在
      setTimeout(() => setStage(2), 700), // NUUM
      setTimeout(() => setStage(3), 1100), // studio line
      setTimeout(() => {
        // first quiet ambient drop
        if (!reduced.current) spawn(window.innerWidth / 2, window.innerHeight * 0.42, 0.35, 300);
      }, 1800),
      setTimeout(() => setStage(4), 2500), // hint
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  // ---- ambient water drops (auto — rain settling on a still pool) ----
  useEffect(() => {
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduced) return;
    let timer: number;
    const drop = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      spawn(
        rand(w * 0.1, w * 0.9),
        rand(h * 0.12, h * 0.88),
        rand(0.28, 0.55),
        rand(170, 320),
        rand(1500, 2100)
      );
      timer = window.setTimeout(drop, rand(450, 1300));
    };
    timer = window.setTimeout(drop, 700);
    return () => clearTimeout(timer);
  }, []);

  function spawn(x: number, y: number, strength = 0.6, max = 260, life = 1600) {
    const arr = ripplesRef.current;
    arr.push({ x, y, born: performance.now(), life, max, strength });
    if (arr.length > 60) arr.splice(0, arr.length - 60);
  }

  // ---- canvas + animation loop ----
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // easing
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    let raf = 0;

    const render = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, w, h);

      // static is fully still — ripples only from presence (touch / drag)
      const alive: Ripple[] = [];
      let logoDX = 0;
      let logoDY = 0;
      let logoBlur = 0;
      const lc = logoRef.current;
      let lx = w / 2;
      let ly = h * 0.44;
      if (lc) {
        const r = lc.getBoundingClientRect();
        lx = r.left + r.width / 2;
        ly = r.top + r.height / 2;
      }

      for (const rp of ripplesRef.current) {
        const p = (now - rp.born) / rp.life;
        if (p >= 1) continue;
        alive.push(rp);

        const e = easeOut(p);
        const radius = rp.max * e;
        // opacity envelope 12% -> 6% -> 0
        const env = (1 - p) * (0.12 * rp.strength * 2);
        const band = 26 + 40 * p; // ring softens as it grows

        // glassy ring: faint highlight inner edge, faint shadow outer edge
        drawRing(ctx, rp.x, rp.y, radius, band, env);

        // optical refraction of the logo as the wavefront passes it
        const d = Math.hypot(lx - rp.x, ly - rp.y);
        const near = Math.abs(d - radius);
        if (near < band * 1.6) {
          const infl = (1 - near / (band * 1.6)) * env * 40 * rp.strength;
          if (d > 0.001) {
            logoDX += ((lx - rp.x) / d) * infl;
            logoDY += ((ly - rp.y) / d) * infl;
          }
          logoBlur += infl * 0.12;
        }
      }
      ripplesRef.current = alive;

      if (lc) {
        const cx = clamp(logoDX, -3, 3);
        const cy = clamp(logoDY, -3, 3);
        const b = clamp(logoBlur, 0, 0.7);
        lc.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
        lc.style.filter = b > 0.02 ? `blur(${b.toFixed(2)}px)` : "none";
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ---- scroll-out transition: ripple + logo lift + ivory -> black ----
  const [exit, setExit] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const p = clamp(window.scrollY / vh, 0, 1);
      setExit(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden" style={{ background: IVORY }}>
      {/* liquid surface */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* logo lockup (refracts, never moves on its own) */}
      <div
        ref={logoRef}
        className="relative z-10 flex flex-col items-center text-ink pointer-events-none"
        style={{
          transform: `translateY(${(-exit * 64).toFixed(1)}px)`,
          transition: "opacity 200ms linear",
        }}
      >
        <div
          className="leading-none"
          style={{
            width: "clamp(140px,44vw,204px)",
            aspectRatio: "260 / 208.804",
            opacity: stage >= 1 ? 1 : 0,
            transition: "opacity 1200ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Group1 />
        </div>
      </div>

      {/* ivory -> black exit veil */}
      <div
        className="absolute inset-0 z-20 bg-ink pointer-events-none"
        style={{ opacity: exit * 0.96 }}
      />
    </section>
  );
}

/* ---------- helpers ---------- */
function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}
function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function drawRing(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  band: number,
  env: number
) {
  if (radius < 1) return;
  const inner = Math.max(radius - band, 0);
  const outer = radius + band * 0.4;
  const g = ctx.createRadialGradient(x, y, inner, x, y, outer);
  // faint refractive lens: soft shadow, bright highlight crest, soft shadow
  g.addColorStop(0, "rgba(41,41,41,0)");
  g.addColorStop(0.62, `rgba(41,41,41,${(env * 0.5).toFixed(4)})`); // trailing shadow
  g.addColorStop(0.82, `rgba(255,255,255,${(env * 1.1).toFixed(4)})`); // highlight crest
  g.addColorStop(0.93, `rgba(41,41,41,${(env * 0.35).toFixed(4)})`); // leading shadow
  g.addColorStop(1, "rgba(41,41,41,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, outer, 0, Math.PI * 2);
  ctx.fill();
}
