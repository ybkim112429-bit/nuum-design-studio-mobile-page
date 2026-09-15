import { useEffect, useRef, useState, type ReactNode } from "react";
import { RollingNumber, StaggerText } from "./motion";

/* ------------------------------------------------------------------ *
 * PAGE 03 · EXPERIENCE / CAPABILITY
 * Proof of capability between brand and work. Numbers roll once,
 * fast then decelerating — like a precise architectural instrument.
 * ------------------------------------------------------------------ */

function Cell({
  dimension,
  label,
  children,
  className = "",
}: {
  dimension: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group px-6 py-10 md:py-14 transition-[transform,opacity] duration-500 hover:-translate-y-[1.5px] ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-sans text-[10px] text-ink" style={{ letterSpacing: "0.2em" }}>
          {label}
        </span>
        <span className="font-sans text-[9px] text-stone" style={{ letterSpacing: "0.2em" }}>
          {dimension}
        </span>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export default function Experience({ onNext }: { onNext: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  const [langStep, setLangStep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setGo(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!go) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setLangStep(3);
      return;
    }
    const t = [
      setTimeout(() => setLangStep(1), 300),
      setTimeout(() => setLangStep(2), 560),
      setTimeout(() => setLangStep(3), 820),
    ];
    return () => t.forEach(clearTimeout);
  }, [go]);

  const bigNum =
    "font-sans leading-[0.95] tracking-[-0.02em] text-ink whitespace-nowrap";
  const numSize = { fontSize: "clamp(38px,12vw,64px)", fontWeight: 600 } as const;
  const sub = (shown: boolean) =>
    `font-sans mt-6 text-[10px] leading-[1.6] text-charcoal transition-opacity duration-700 ${
      shown ? "opacity-100" : "opacity-0"
    }`;

  return (
    <section id="experience" className="bg-ivory">
      <div className="px-6 pt-28">
        <span className="font-sans block text-[11px] text-stone" style={{ letterSpacing: "0.24em" }}>
          03 / EXPERIENCE
        </span>
        <h2 className="font-sans mt-8 leading-[1.02]" style={{ fontSize: "clamp(40px,13vw,64px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
          <StaggerText text="EXPERIENCE" />
          <br />
          <StaggerText text="IN NUMBERS." start={120} />
        </h2>
        <p className="font-hei mt-6 text-[14px] text-charcoal" style={{ letterSpacing: "0.04em" }}>
          经验，不需要被过度解释。
        </p>
      </div>

      {/* DATA GRID — 2×2 mobile, 4-col desktop, 1px hairlines */}
      <div
        ref={ref}
        className="mt-16 grid grid-cols-2 border-t border-b border-ink/15 md:grid-cols-4"
      >
        {/* 01 PROJECTS */}
        <Cell
          dimension="EXPERIENCE"
          label="PROJECTS"
          className="border-r border-b border-ink/15 md:border-r-0 md:border-b-0"
        >
          <RollingNumber value="87" trigger={go} delay={0} className={bigNum} style={numSize} />
          <p className={sub(go)} style={{ letterSpacing: "0.14em" }}>
            COMPLETED &amp; PARTICIPATED
            <br />
            PROJECTS
          </p>
        </Cell>

        {/* 02 SCALE */}
        <Cell
          dimension="SCALE"
          label="SCALE"
          className="border-b border-ink/15 md:border-b-0 md:border-l"
        >
          <div className={`${bigNum} flex items-baseline`} style={numSize}>
            <RollingNumber value="1.6M+" trigger={go} delay={100} />
            <span className="ml-1.5 font-sans" style={{ fontSize: "0.42em", fontWeight: 500 }}>
              m<sup style={{ fontSize: "0.6em", verticalAlign: "super" }}>2</sup>
            </span>
          </div>
          <p className={sub(go)} style={{ letterSpacing: "0.14em" }}>
            TOTAL PROJECT SCALE
          </p>
        </Cell>

        {/* 03 AWARDS */}
        <Cell
          dimension="RECOGNITION"
          label="AWARDS"
          className="border-r border-ink/15 md:border-r-0 md:border-l"
        >
          <RollingNumber value="2" trigger={go} delay={200} className={bigNum} style={numSize} />
          <p className={sub(go)} style={{ letterSpacing: "0.14em" }}>
            INTERNATIONAL
            <br />
            DESIGN AWARDS
          </p>
          <p
            className={`font-sans mt-3 text-[9px] text-stone transition-opacity duration-700 ${
              langStep >= 3 ? "opacity-100" : "opacity-0"
            }`}
            style={{ letterSpacing: "0.16em" }}
          >
            MUSE DESIGN AWARDS · A&rsquo; DESIGN AWARD
          </p>
        </Cell>

        {/* 04 LANGUAGES */}
        <Cell dimension="COMMUNICATION" label="LANGUAGES" className="md:border-l md:border-ink/15">
          <div
            className={`${bigNum} flex items-baseline`}
            style={{ fontSize: "clamp(26px,8vw,44px)", fontWeight: 600 }}
          >
            <span>CN</span>
            <span className={`transition-opacity duration-500 ${langStep >= 2 ? "opacity-100" : "opacity-0"}`}>
              &nbsp;/&nbsp;KR
            </span>
            <span className={`transition-opacity duration-500 ${langStep >= 3 ? "opacity-100" : "opacity-0"}`}>
              &nbsp;/&nbsp;EN
            </span>
          </div>
          <p className={sub(go)} style={{ letterSpacing: "0.14em" }}>
            CHINESE · KOREAN · ENGLISH
          </p>
        </Cell>
      </div>

      {/* transition into SELECTED WORK */}
      <div className="px-6 py-20">
        <button
          onClick={onNext}
          className="group inline-flex items-center gap-3 font-sans text-[12px] text-ink transition-colors duration-500 hover:text-stone"
          style={{ letterSpacing: "0.22em" }}
        >
          SELECTED WORK
          <span className="transition-transform duration-500 group-hover:translate-y-1">↓</span>
        </button>
      </div>
    </section>
  );
}
