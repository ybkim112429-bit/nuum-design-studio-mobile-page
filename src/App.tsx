import wechatQR from "./imports/wechat-qr.png";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type React from "react";
import PresenceRipple from "./PresenceRipple";
import BrandPhilosophy from "./BrandPhilosophy";
import Experience from "./Experience";
import SoundControl from "./SoundControl";
import RippleField from "./RippleField";
import {
  StaggerText,
  CadText,
  Marquee,
  ScrollWord,
  PlateImage,
} from "./motion";
import {
  PROJECTS,
  CATEGORIES,
  activeCategories,
  type Project,
  type CatKey,
} from "./projects";

const catLabel = (key: CatKey) =>
  CATEGORIES.find((c) => c.key === key) ?? { key, en: "WORK", cn: "项目" };

/* ---------- scroll reveal ---------- */
function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as any;

  return (
    <Comp
      ref={ref as any}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}

function Label({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`block font-sans text-[11px] font-medium uppercase ${className}`}
      style={{ letterSpacing: "0.24em" }}
    >
      {children}
    </span>
  );
}

/* ---------- data ---------- */
const SERVICES = [
  ["01", "INTERIOR DESIGN", "Hospitality / Commercial / Residential"],
  ["02", "SPATIAL DESIGN", "Architecture / Landscape / Environment"],
  ["03", "BRAND DESIGN", "Identity / Strategy / Visual System"],
  ["04", "VISUAL DESIGN", "Art Direction / Graphic / Motion"],
  ["05", "CREATIVE DIRECTION", "Concept / Narrative / Experience"],
];

const PAD = "px-6";

/* ================= APP ================= */
export default function App() {
  const [menu, setMenu] = useState(false);
  const [navDark, setNavDark] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [filter, setFilter] = useState<CatKey | "all">("all");

  const cats = activeCategories();
  const shown =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);
  const openProject = open === null ? null : PROJECTS[open];
  const nextProject =
    open === null ? null : PROJECTS[(open + 1) % PROJECTS.length];

  useEffect(() => {
    const darks = Array.from(
      document.querySelectorAll<HTMLElement>("[data-dark]")
    );

    const onScroll = () => {
      const y = 32;
      setNavDark(
        darks.some((d) => {
          const r = d.getBoundingClientRect();
          return r.top <= y && r.bottom >= y;
        })
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  useEffect(() => {
    if (open !== null) window.scrollTo(0, 0);
  }, [open]);

  const navColor =
    navDark || menu || open !== null ? "text-ivory" : "text-ink";

  const go = (id: string) => {
    setMenu(false);
    setOpen(null);

    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <div className="relative w-full bg-ivory">
      <SoundControl />

      {/* ---------- NAV ---------- */}
      <header
        className={`fixed inset-x-0 top-0 z-50 ${PAD} flex items-center justify-between py-5 transition-colors duration-700 ${navColor} mix-blend-difference`}
      >
        <button
          onClick={() => go("top")}
          className="font-sans text-[15px]"
          style={{ letterSpacing: "0.18em", fontWeight: 500 }}
        >
          NUUM
        </button>

        <button
          onClick={() => setMenu((m) => !m)}
          className="font-sans text-[12px]"
          style={{ letterSpacing: "0.24em", fontWeight: 500 }}
        >
          {menu ? "CLOSE" : "MENU"}
        </button>
      </header>

      {/* ---------- MENU OVERLAY ---------- */}
      <div
        className={`fixed inset-0 z-40 bg-ink text-ivory transition-[opacity,transform] duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          menu
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-4"
        }`}
      >
        <div
          className={`flex h-full flex-col justify-between ${PAD} pb-12 pt-28`}
        >
          <nav className="flex flex-col gap-6">
            {[
              ["WORK", "work"],
              ["STUDIO", "studio"],
              ["SERVICES", "services"],
              ["PHILOSOPHY", "philosophy"],
              ["CONTACT", "contact"],
            ].map(([m, id], i) => (
              <button
                key={m}
                onClick={() => go(id)}
                className="text-left font-song leading-none transition-[color,transform,opacity] duration-[600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:text-stone"
                style={{
                  fontSize: "clamp(38px,13vw,56px)",
                  fontWeight: 400,
                  transform: menu ? "translateY(0)" : "translateY(30px)",
                  opacity: menu ? 1 : 0,
                  transitionDelay: `${menu ? 120 + i * 60 : 0}ms`,
                }}
              >
                {m}
              </button>
            ))}
          </nav>

          <div className="space-y-3">
            <div
              className="font-hei text-[15px] text-stone"
              style={{ letterSpacing: "0.05em" }}
            >
              久在创意设计工作室
            </div>
            <div className="font-song text-[19px]">历久，仍在。</div>
          </div>
        </div>
      </div>

      {/* ---------- PROJECT DETAIL ---------- */}
      {openProject && nextProject ? (
        <ProjectDetail
          project={openProject}
          onClose={() => go("work")}
          onNext={() => setOpen(((open as number) + 1) % PROJECTS.length)}
          next={nextProject}
        />
      ) : (
        <main id="top">
          {/* ===== 01 HERO · PRESENCE RIPPLE ===== */}
          <PresenceRipple />

          {/* ===== BRAND PHILOSOPHY · 艺术场景 ===== */}
          <BrandPhilosophy />

          {/* ===== 02 POSITIONING ===== */}
          <section className={`${PAD} py-28`}>
            <div className="flex flex-col gap-4">
              {["SPACE", "BRAND", "VISUAL", "EXPERIENCE"].map((w, i) => (
                <CadText
                  key={w}
                  text={w}
                  start={i * 160}
                  className="font-sans leading-[0.98]"
                  style={{
                    fontSize: "clamp(44px,15vw,72px)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                  }}
                />
              ))}
            </div>

            <Reveal delay={120}>
              <p className="font-hei mt-14 max-w-[30ch] text-[16px] leading-[1.85] text-charcoal">
                久在是一家跨越空间、品牌与视觉的独立创意设计工作室。我们关注的不只是设计如何被看见，更关注它是否真正成立。
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="font-sans mt-8 max-w-[42ch] text-[13px] leading-[1.7] text-stone">
                NUUM is an independent creative design studio working across
                space, brand, visual and experience.
              </p>
            </Reveal>
          </section>

          {/* ===== 03 EXPERIENCE / CAPABILITY ===== */}
          <Experience onNext={() => go("work")} />

          {/* scroll-linked typography + marquee band */}
          <ScrollWord word="SELECTED WORK" className="py-6" />
          <Marquee
            items={["INTERIOR", "SPACE", "BRAND", "VISUAL", "EXPERIENCE"]}
          />

          {/* ===== 04 SELECTED WORK ===== */}
          <section id="work" className="pt-16">
            <div className={PAD}>
              <span
                className="font-sans block text-[11px] text-stone"
                style={{ letterSpacing: "0.24em" }}
              >
                04 / PROJECTS
              </span>

              <h2
                className="font-sans mt-8 leading-[1.02]"
                style={{
                  fontSize: "clamp(40px,13vw,64px)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                <StaggerText text="SELECTED" />
                <br />
                <StaggerText text="WORK." start={120} />
              </h2>

              <p
                className="font-hei mt-6 text-[14px] text-charcoal"
                style={{ letterSpacing: "0.04em" }}
              >
                精选项目 · 真实作品档案
              </p>
            </div>

            {/* category nav */}
            <div
              className="mt-12 overflow-x-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <div className={`flex w-max items-baseline gap-7 ${PAD}`}>
                {[
                  {
                    key: "all" as const,
                    en: "ALL",
                    cn: "全部",
                    count: PROJECTS.length,
                  },
                  ...cats,
                ].map((c) => {
                  const on = filter === c.key;

                  return (
                    <button
                      key={c.key}
                      onClick={() => setFilter(c.key as CatKey | "all")}
                      className="group flex shrink-0 items-baseline gap-1.5 transition-colors duration-500"
                      style={{
                        color: on ? "var(--ink)" : "rgba(17,17,17,0.4)",
                      }}
                    >
                      <span
                        className="font-sans text-[12px]"
                        style={{
                          letterSpacing: "0.14em",
                          fontWeight: on ? 600 : 400,
                        }}
                      >
                        {c.en}
                      </span>

                      <span
                        className="font-sans text-[9px] tabular-nums"
                        style={{
                          letterSpacing: "0.06em",
                          opacity: 0.6,
                        }}
                      >
                        {String(c.count).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* project grid */}
            <div key={filter} className="mt-12 flex flex-col gap-24 pb-8">
              {shown.map((p) => {
                const idx = PROJECTS.indexOf(p);
                const lc = catLabel(p.cat);

                return (
                  <article
                    key={p.slug}
                    className={PAD}
                    style={{
                      animation:
                        "nuum-fade-up 600ms cubic-bezier(0.16,1,0.3,1) both",
                    }}
                  >
                    <button
                      onClick={() => setOpen(idx)}
                      className="group block w-full text-left transition-transform duration-150 active:scale-[0.99]"
                    >
                      <PlateImage src={p.cover} alt={p.en} desaturate />

                      <div className="mt-5 flex items-start justify-between gap-4">
                        <div>
                          <div
                            className="font-hei text-[18px] leading-[1.3] text-ink"
                            style={{
                              letterSpacing: "0.02em",
                              fontWeight: 500,
                            }}
                          >
                            {p.cn}
                          </div>

                          <div
                            className="font-sans mt-1.5 text-[11px] text-charcoal"
                            style={{ letterSpacing: "0.14em" }}
                          >
                            {p.en}
                          </div>

                          <div
                            className="font-sans mt-3 text-[10px] text-stone"
                            style={{ letterSpacing: "0.18em" }}
                          >
                            {[lc.en, p.place.toUpperCase(), p.year]
                              .filter(Boolean)
                              .join("  ·  ")}
                          </div>
                        </div>

                        <span
                          className="font-sans mt-1 shrink-0 text-[11px] text-ink transition-transform duration-500 group-hover:translate-x-1"
                          style={{ letterSpacing: "0.18em" }}
                        >
                          →
                        </span>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          {/* ===== 05 WHAT WE DO ===== */}
          <section id="services" className={`${PAD} py-28`}>
            <StaggerText
              text="WHAT WE DO"
              className="font-sans text-[11px] font-medium uppercase text-stone"
              style={{ letterSpacing: "0.24em" }}
              step={20}
            />

            <div className="mt-12 flex flex-col">
              {SERVICES.map(([no, title, sub], i) => (
                <Reveal key={title} delay={i * 60}>
                  <div className="border-t border-ink/12 py-7">
                    <div className="flex items-baseline gap-4">
                      <span
                        className="font-sans text-[11px] text-stone"
                        style={{ letterSpacing: "0.2em" }}
                      >
                        {no}
                      </span>

                      <span
                        className="font-sans leading-none"
                        style={{
                          fontSize: "clamp(24px,7vw,34px)",
                          fontWeight: 400,
                          letterSpacing: "0.01em",
                        }}
                      >
                        {title}
                      </span>
                    </div>

                    <p
                      className="font-sans mt-3 pl-8 text-[12px] text-charcoal"
                      style={{ letterSpacing: "0.08em" }}
                    >
                      {sub}
                    </p>
                  </div>
                </Reveal>
              ))}

              <div className="border-t border-ink/12" />
            </div>
          </section>

          {/* ===== 05 ABOUT NUUM ===== */}
          <section id="about" data-dark className="bg-ink text-ivory">
            <div className={`${PAD} py-32`}>
              <Reveal>
                <Label className="text-stone">ABOUT NUUM</Label>
              </Reveal>

              <Reveal delay={120}>
                <p className="font-hei mt-12 max-w-[28ch] text-[17px] leading-[2] text-ivory/90">
                  久在相信，真正成立的设计，不应该只属于某一个时代。潮流会改变，材料会留下时间的痕迹，人的生活也不断变化。我们希望作品在这些变化之后，依然保持它应有的尺度、关系与精神。
                </p>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-song mt-10 text-[20px]">历久，仍在。</p>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-20">
                  <span
                    className="font-sans block leading-none text-stone"
                    style={{
                      fontSize: "clamp(34px,11vw,54px)",
                      fontWeight: 300,
                    }}
                  >
                    FORM AGES.
                  </span>

                  <span
                    className="font-sans mt-3 block leading-none"
                    style={{
                      fontSize: "clamp(34px,11vw,54px)",
                      fontWeight: 400,
                    }}
                  >
                    ESSENCE ENDURES.
                  </span>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ===== 06 STUDIO ===== */}
          <section id="studio" className={`${PAD} py-28`}>
            <Reveal>
              <Label className="text-stone">STUDIO</Label>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-12">
                <div
                  className="font-sans text-[15px]"
                  style={{ letterSpacing: "0.14em", fontWeight: 500 }}
                >
                  NUUM CREATIVE DESIGN STUDIO
                </div>

                <div
                  className="font-hei mt-2 text-[15px] text-charcoal"
                  style={{ letterSpacing: "0.06em" }}
                >
                  久在创意设计工作室
                </div>
              </div>
            </Reveal>

            <div className="mt-16 flex flex-col divide-y divide-ink/10">
              {[
                [
                  "DISCIPLINES",
                  "Interior · Space · Brand · Visual · Creative Direction",
                ],
                ["FOUNDER / CREATIVE DIRECTOR", "— / NUUM"],
                ["AWARDS", "Selected international design recognition"],
                ["SELECTED CLIENTS", "Hospitality · Culture · Retail · Private"],
                ["LOCATIONS", "Qingdao · Shanghai"],
              ].map(([k, v]) => (
                <Reveal key={k}>
                  <div className="grid grid-cols-3 gap-4 py-6">
                    <div
                      className="col-span-1 font-sans text-[10px] text-stone"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      {k}
                    </div>

                    <div className="col-span-2 font-sans text-[13px] text-charcoal leading-[1.6]">
                      {v}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ===== 07 BRAND STATEMENTS / SLOGAN ===== */}
          <Philosophy />

          {/* ===== 08 CONTACT ===== */}
          <Contact go={go} />
        </main>
      )}
    </div>
  );
}

/* ================= BRAND PHILOSOPHY / SLOGAN ================= */
function Philosophy() {
  const blocks: {
    label: string;
    cn: string;
    en: string;
    finale?: boolean;
  }[] = [
    {
      label: "品牌 SLOGAN",
      cn: "不止于当下。",
      en: "BEYOND THE NOW.",
    },
    {
      label: "设计哲学 · PHILOSOPHY",
      cn: "不属于某一个时代。",
      en: "NOT OF AN ERA.",
    },
    {
      label: "核心思想 · CORE IDEA",
      cn: "变化之中，持续成立。",
      en: "ENDURING THROUGH CHANGE.",
    },
    {
      label: "品牌结尾 · SIGN-OFF",
      cn: "久在。",
      en: "NUUM.",
      finale: true,
    },
  ];

  return (
    <section
      id="brand-statements"
      data-dark
      className="relative bg-ink text-ivory"
    >
      {/* persistent rain-ripple surface */}
      <div className="pointer-events-none sticky top-0 z-0 h-[100svh] w-full overflow-hidden">
        <RippleField dark className="absolute inset-0 h-full w-full" />
      </div>

      <div className="relative z-10 -mt-[100svh]">
        {blocks.map((b) => (
          <div
            key={b.en}
            className="flex min-h-[88svh] flex-col items-center justify-center px-6 text-center"
          >
            <Reveal>
              <span
                className="font-sans block text-[10px] text-stone"
                style={{ letterSpacing: "0.28em" }}
              >
                {b.label}
              </span>
            </Reveal>

            <Reveal delay={140}>
              <p
                className="font-song mt-10 text-ivory"
                style={{
                  fontSize: b.finale
                    ? "clamp(60px,22vw,120px)"
                    : "clamp(30px,9vw,52px)",
                  fontWeight: 400,
                  lineHeight: 1.25,
                  letterSpacing: "0.02em",
                }}
              >
                {b.cn}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p
                className="font-sans mt-6 text-ivory/70"
                style={{
                  fontSize: b.finale
                    ? "clamp(15px,5vw,20px)"
                    : "clamp(12px,3.6vw,15px)",
                  letterSpacing: "0.26em",
                }}
              >
                {b.en}
              </p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */
function Contact({ go }: { go: (id: string) => void }) {
  return (
    <section id="contact" data-dark className="bg-ink text-ivory">
      <div className={`${PAD} pb-16 pt-32`}>
        <h2
          className="font-sans leading-[1.02]"
          style={{
            fontSize: "clamp(40px,13vw,64px)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          <StaggerText text="LET’S CREATE" />
          <br />
          <StaggerText text="SOMETHING" start={100} />
          <br />
          <StaggerText text="THAT LASTS." start={200} />
        </h2>

        <Reveal delay={120}>
          <a
            href="mailto:ybkim112429@gmail.com"
            className="mt-14 inline-flex items-center gap-3 border-b border-ivory/40 pb-2 font-sans text-[14px] transition-colors duration-500 hover:text-stone"
            style={{ letterSpacing: "0.14em" }}
          >
            PROJECT INQUIRY →
          </a>
        </Reveal>

        <div className="mt-16">
          <Reveal>
            <a
              href="mailto:ybkim112429@gmail.com"
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-ivory/12 py-5"
            >
              <span
                className="font-sans text-[11px]"
                style={{ letterSpacing: "0.2em" }}
              >
                EMAIL
              </span>

              <span className="font-sans text-[14px] text-ivory/85 break-all">
                ybkim112429@gmail.com
              </span>
            </a>
          </Reveal>

          <Reveal delay={80}>
            <a
              href="tel:+8615621157323"
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-ivory/12 py-5"
            >
              <span
                className="font-sans text-[11px]"
                style={{ letterSpacing: "0.16em" }}
              >
                PHONE / 联系电话
              </span>

              <span className="font-sans text-[14px] text-ivory/85">
                15621157323
              </span>
            </a>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex flex-wrap items-start justify-between gap-6 py-6">
              <span
                className="font-sans pt-1 text-[11px]"
                style={{ letterSpacing: "0.16em" }}
              >
                WECHAT / 微信
              </span>

              <div className="flex flex-col items-center gap-3">
                <a
                  href={wechatQR}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="打开微信二维码原图"
                  className="block bg-white p-3"
                >
                  <img
                    src={wechatQR}
                    alt="金永范的微信联系二维码"
                    width={176}
                    height={176}
                    className="block h-auto w-[176px]"
                    loading="lazy"
                  />
                </a>

                <p className="font-hei text-[11px] leading-relaxed text-ivory/60">
                  扫码添加微信 · 点击查看原图
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-24">
          <div className="font-song text-[28px] leading-none">
            久在
          </div>

          <div
            className="font-sans mt-3 text-[11px] text-stone"
            style={{ letterSpacing: "0.22em" }}
          >
            NUUM CREATIVE DESIGN STUDIO
          </div>

          <div className="mt-10 flex items-center justify-between">
            <span
              className="font-sans text-[10px] text-stone"
              style={{ letterSpacing: "0.2em" }}
            >
              © 2026 NUUM
            </span>

            <button
              onClick={() => go("top")}
              className="font-sans text-[10px] text-stone transition-colors duration-500 hover:text-ivory"
              style={{ letterSpacing: "0.2em" }}
            >
              BACK TO TOP ↑
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ================= PROJECT DETAIL ================= */
function ProjectDetail({
  project,
  onClose,
  onNext,
  next,
}: {
  project: Project;
  onClose: () => void;
  onNext: () => void;
  next: Project;
}) {
  const lc = catLabel(project.cat);
  const nextLc = catLabel(next.cat);

  const info: [string, string][] = [
    ["TYPE", `${lc.en} · ${lc.cn}`],
    ...(project.place
      ? ([["LOCATION", project.place]] as [string, string][])
      : []),
    ...(project.year ? ([["YEAR", project.year]] as [string, string][]) : []),
    ...(project.award
      ? ([["AWARD", project.award]] as [string, string][])
      : []),
  ];

  return (
    <main className="bg-ivory">
      <div className={`${PAD} pt-28 pb-10`}>
        <Reveal>
          <button
            onClick={onClose}
            className="font-sans text-[11px] text-stone transition-colors duration-500 hover:text-ink"
            style={{ letterSpacing: "0.2em" }}
          >
            ← ALL WORK
          </button>
        </Reveal>

        <Reveal delay={80}>
          <h1
            className="font-hei mt-10 leading-[1.15]"
            style={{
              fontSize: "clamp(28px,8.5vw,44px)",
              fontWeight: 500,
              letterSpacing: "0.01em",
            }}
          >
            {project.cn}
          </h1>

          <div
            className="font-sans mt-3 text-[12px] text-charcoal"
            style={{ letterSpacing: "0.14em" }}
          >
            {project.en}
          </div>

          <div
            className="font-sans mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-stone"
            style={{ letterSpacing: "0.16em" }}
          >
            <span>{lc.en}</span>
            {project.place && <span>{project.place.toUpperCase()}</span>}
            {project.year && <span>{project.year}</span>}
          </div>
        </Reveal>
      </div>

      {/* hero image */}
      <PlateImage src={project.cover} alt={project.en} />

      <Marquee
        items={[lc.en, project.place || "CHINA", "NUUM", "SELECTED WORK"]}
        dark
        duration={30}
      />

      <div className="h-6" />

      {/* overview — bilingual */}
      <div className={`${PAD} py-20`}>
        <Reveal>
          <p
            className="font-song max-w-[22ch] text-charcoal"
            style={{
              fontSize: "clamp(20px,6vw,28px)",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            {project.overviewCn}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <p className="font-sans mt-8 max-w-[42ch] text-[13px] leading-[1.8] text-stone">
            {project.overviewEn}
          </p>
        </Reveal>
      </div>

      {/* full sequence */}
      <PlateImage
        src={project.stitch}
        alt={`${project.en} — full sequence`}
      />

      {/* project information */}
      <div className={`${PAD} py-20`}>
        <Reveal>
          <Label className="text-stone">PROJECT INFORMATION</Label>
        </Reveal>

        <div className="mt-10 flex flex-col divide-y divide-ink/10">
          {info.map(([k, v]) => (
            <Reveal key={k}>
              <div className="grid grid-cols-3 gap-4 py-5">
                <div
                  className="col-span-1 font-sans text-[10px] text-stone"
                  style={{ letterSpacing: "0.18em" }}
                >
                  {k}
                </div>

                <div className="col-span-2 font-sans text-[13px] text-charcoal">
                  {v}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <p
            className="font-sans mt-8 max-w-[40ch] text-[10px] leading-[1.8] text-stone"
            style={{ letterSpacing: "0.06em" }}
          >
            项目角色因合作方式而异（创意指导 / 项目主创 / 设计参与 /
            过往职业经历）。
            <br />
            Roles vary by engagement — creative direction, project lead, or
            design participation.
          </p>
        </Reveal>
      </div>

      {/* next project */}
      <button
        onClick={onNext}
        data-dark
        className="group block w-full bg-ink text-ivory"
      >
        <div className={`${PAD} py-16 text-left`}>
          <div
            className="font-sans text-[10px] text-stone"
            style={{ letterSpacing: "0.24em" }}
          >
            NEXT PROJECT
          </div>

          <div className="mt-5 flex items-baseline justify-between gap-4">
            <span
              className="font-hei"
              style={{
                fontSize: "clamp(22px,6.5vw,34px)",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              {next.cn}
            </span>

            <span
              className="font-sans text-[13px] shrink-0 transition-transform duration-500 group-hover:translate-x-1"
              style={{ letterSpacing: "0.18em" }}
            >
              →
            </span>
          </div>

          <div
            className="font-sans mt-3 text-[11px] text-stone"
            style={{ letterSpacing: "0.16em" }}
          >
            {nextLc.en}
            {next.place ? ` · ${next.place.toUpperCase()}` : ""}
          </div>
        </div>
      </button>
    </main>
  );
}