import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ================================================================== *
 * NUUM MOTION TOOLKIT
 * Static: very still. User moves → interface responds.
 * Architectural / quiet / precise / premium.
 * ================================================================== */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function useReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    setR(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  }, []);
  return r;
}

/* one-shot in-view trigger ---------------------------------------- */
export function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ---------------- StaggerText: fast per-letter reveal ------------- */
export function StaggerText({
  text,
  className = "",
  style,
  step = 28,
  start = 0,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  step?: number;
  start?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const reduced = useReduced();
  const chars = Array.from(text);
  return (
    <span ref={ref} className={className} style={{ display: "inline-block", ...style }}>
      {chars.map((c, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <span
            style={{
              display: "inline-block",
              transform: inView || reduced ? "translateY(0)" : "translateY(105%)",
              opacity: inView || reduced ? 1 : 0,
              transition: reduced ? "none" : `transform 620ms ${EASE}, opacity 620ms ${EASE}`,
              transitionDelay: `${start + i * step}ms`,
              whiteSpace: "pre",
            }}
          >
            {c === " " ? " " : c}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ---------------- CadText: drafted like CAD line-work ------------- *
 * Thin construction lines converge and letters resolve from hairline
 * outlines into solid type — like a drawing being drafted.
 * ----------------------------------------------------------------- */
export function CadText({
  text,
  className = "",
  style,
  start = 0,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  start?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.45);
  const reduced = useReduced();
  const on = inView || reduced;
  const chars = Array.from(text);

  const line = (extra: CSSProperties): CSSProperties => ({
    position: "absolute",
    background: "currentColor",
    opacity: 0.22,
    transition: reduced ? "none" : `transform 760ms ${EASE} ${start}ms`,
    ...extra,
  });

  return (
    <div ref={ref} className={`relative inline-block ${className}`} style={style}>
      {/* cap + base construction lines draw outward from the ends */}
      <span
        aria-hidden
        style={line({
          left: 0,
          right: 0,
          top: "0.06em",
          height: "1px",
          transformOrigin: "left",
          transform: on ? "scaleX(1)" : "scaleX(0)",
        })}
      />
      <span
        aria-hidden
        style={line({
          left: 0,
          right: 0,
          bottom: "0.12em",
          height: "1px",
          transformOrigin: "right",
          transform: on ? "scaleX(1)" : "scaleX(0)",
        })}
      />
      {/* end measure ticks */}
      <span
        aria-hidden
        style={line({
          left: 0,
          top: "0.02em",
          bottom: "0.08em",
          width: "1px",
          transformOrigin: "top",
          transform: on ? "scaleY(1)" : "scaleY(0)",
        })}
      />
      <span
        aria-hidden
        style={line({
          right: 0,
          top: "0.02em",
          bottom: "0.08em",
          width: "1px",
          transformOrigin: "bottom",
          transform: on ? "scaleY(1)" : "scaleY(0)",
        })}
      />

      {chars.map((c, i) => {
        const dir = i % 2 ? 1 : -1;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              color: on ? "currentColor" : "transparent",
              WebkitTextStroke: on ? "0px transparent" : "0.6px rgba(17,17,17,0.55)",
              transform: on
                ? "translateY(0) scaleY(1)"
                : `translateY(${dir * 0.42}em) scaleY(1.35)`,
              transition: reduced
                ? "none"
                : `transform 760ms ${EASE}, color 520ms linear, -webkit-text-stroke 520ms linear`,
              transitionDelay: `${start + 140 + i * 55}ms`,
            }}
          >
            {c === " " ? " " : c}
          </span>
        );
      })}
    </div>
  );
}

/* ---------------- RollingNumber: mechanical odometer -------------- */
function Digit({ d, trigger, delay, cycles }: { d: number; trigger: boolean; delay: number; cycles: number }) {
  const reduced = useReduced();
  const [y, setY] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    if (reduced) {
      setY(cycles * 10 + d);
      return;
    }
    const t = setTimeout(() => setY(cycles * 10 + d), delay);
    return () => clearTimeout(t);
  }, [trigger, d, delay, cycles, reduced]);
  const strip = Array.from({ length: cycles * 10 + 10 }, (_, i) => i % 10);
  return (
    <span style={{ display: "inline-block", height: "1em", lineHeight: 1, overflow: "hidden", verticalAlign: "bottom" }}>
      <span
        style={{
          display: "block",
          transform: `translateY(-${y}em)`,
          transition: reduced ? "none" : `transform 1200ms ${EASE}`,
        }}
      >
        {strip.map((n, i) => (
          <span key={i} style={{ display: "block", height: "1em", lineHeight: 1 }}>
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export function RollingNumber({
  value,
  trigger,
  delay = 0,
  className = "",
  style,
  cycles = 2,
}: {
  value: string;
  trigger: boolean;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  cycles?: number;
}) {
  const chars = Array.from(value);
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "flex-end", ...style }}>
      {chars.map((c, i) =>
        /[0-9]/.test(c) ? (
          <Digit key={i} d={Number(c)} trigger={trigger} delay={delay + i * 60} cycles={cycles} />
        ) : (
          <span key={i} style={{ display: "inline-block" }}>
            {c}
          </span>
        )
      )}
    </span>
  );
}

/* ---------------- Marquee: slow horizontal band ------------------ */
export function Marquee({
  items,
  dark = false,
  duration = 26,
}: {
  items: string[];
  dark?: boolean;
  duration?: number;
}) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div
      className={`overflow-hidden border-y ${dark ? "border-ivory/15 bg-ink text-ivory" : "border-ink/12 bg-ivory text-ink"}`}
      style={{ height: 40 }}
    >
      <div className="flex h-full items-center whitespace-nowrap" style={{ animation: `nuum-marquee ${duration}s linear infinite` }}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="font-sans text-[11px]" style={{ letterSpacing: "0.24em" }}>
              {t}
            </span>
            <span className="mx-6 text-[8px] opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- ScrollWord: giant scroll-linked text ----------- */
export function ScrollWord({
  word,
  className = "",
  dark = false,
}: {
  word: string;
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when entering bottom, 1 when leaving top
      const p = 1 - (r.top + r.height / 2) / (vh + r.height / 2);
      const x = (0.5 - p) * 60; // +30% -> -30% vw
      inner.style.transform = `translate3d(${x}vw,0,0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);
  return (
    <div ref={ref} className={`overflow-hidden ${dark ? "bg-ink" : "bg-ivory"} ${className}`}>
      <div
        ref={innerRef}
        className={`whitespace-nowrap font-sans leading-none ${dark ? "text-ivory/8" : "text-ink/[0.06]"}`}
        style={{ fontSize: "clamp(120px,40vw,320px)", fontWeight: 600, letterSpacing: "-0.03em", willChange: "transform" }}
      >
        {word}&nbsp;{word}
      </div>
    </div>
  );
}

/* ---------------- MaskImage: reveal + parallax ------------------- */
export function MaskImage({
  src,
  alt,
  ratio = "4 / 5",
  className = "",
  parallax = 4,
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  parallax?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  useEffect(() => {
    if (reduced || parallax <= 0) return;
    const wrap = wrapRef.current;
    const layer = layerRef.current;
    if (!wrap || !layer) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // ~[-1,1]
      const clamped = Math.max(-1, Math.min(1, t));
      layer.style.transform = `translate3d(0, ${(-clamped * parallax).toFixed(2)}%, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, parallax]);

  const revealed = inView || reduced;

  return (
    <div ref={ref} className={`overflow-hidden bg-stone/20 ${className}`} style={{ aspectRatio: ratio }}>
      <div
        ref={wrapRef}
        className="h-full w-full"
        style={{
          clipPath: revealed ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
          transition: reduced ? "none" : `clip-path 900ms ${EASE}`,
        }}
      >
        {/* parallax layer (over-sized so edges never show) */}
        <div
          ref={layerRef}
          className="h-full w-full"
          style={{ height: `${100 + parallax * 2}%`, marginTop: `-${parallax}%` }}
        >
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            style={{
              transform: revealed ? "scale(1)" : "scale(1.06)",
              transition: reduced ? "none" : `transform 1100ms ${EASE}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- PlateImage: full-width, never cropped ----------- *
 * For real project photography of varying proportions. Fills the
 * container width, keeps the image's natural aspect ratio (no crop),
 * and reveals with the same quiet clip-path wipe.
 * ----------------------------------------------------------------- */
export function PlateImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  desaturate = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** grey until scrolled into view, then eases to full colour (no hover needed) */
  desaturate?: boolean;
}) {
  const reduced = useReduced();
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const revealed = inView || reduced;
  return (
    <div
      ref={ref}
      className={`overflow-hidden bg-stone/20 ${className}`}
      style={{
        clipPath: revealed ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
        transition: reduced ? "none" : `clip-path 900ms ${EASE}`,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`block h-auto w-full ${imgClassName}`}
        style={{
          opacity: revealed ? 1 : 0,
          filter: desaturate ? (revealed ? "grayscale(0)" : "grayscale(1)") : undefined,
          transition: reduced
            ? "none"
            : `opacity 1100ms ${EASE}, filter 1500ms ${EASE}`,
        }}
      />
    </div>
  );
}

/* ---------------- SlideUp: block reveal from below --------------- */
export function SlideUp({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const reduced = useReduced();
  const on = inView || reduced;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: on ? "translateY(0)" : "translateY(22px)",
        opacity: on ? 1 : 0,
        transition: reduced ? "none" : `transform 900ms ${EASE}, opacity 900ms ${EASE}`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
