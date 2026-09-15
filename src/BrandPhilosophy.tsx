import type { CSSProperties } from "react";
import { StaggerText } from "./motion";
import background from "./imports/nuum-scene.png";
import branch from "./imports/nuum-branch.png";
import shadow from "./imports/nuum-shadow.png";
import stone from "./imports/nuum-stone.png";

const statements = [
  {
    label: "品牌 SLOGAN",
    lines: ["BEYOND", "THE NOW."],
    cn: "不止于当下。",
  },
  {
    label: "设计哲学",
    lines: ["NOT OF", "AN ERA."],
    cn: "不属于某一个时代。",
  },
  {
    label: "核心思想",
    lines: ["ENDURING", "THROUGH", "CHANGE."],
    cn: "变化之中，持续成立。",
  },
];

const rain = Array.from({ length: 12 }, (_, i) => ({
  x: 8 + ((i * 19) % 86),
  y: 77 + ((i * 7) % 21),
  delay: -(i * 0.43),
  duration: 2.8 + (i % 4) * 0.4,
}));

export default function BrandPhilosophy() {
  return (
    <section
      id="philosophy"
      className="nuum-art"
      aria-label="久在品牌哲学"
    >
      <style>{styles}</style>

      <div className="nuum-art-scene" aria-hidden="true">
        <img className="nuum-art-layer" src={background} alt="" />
        <img className="nuum-art-layer" src={stone} alt="" />
        <img
          className="nuum-art-layer nuum-art-shadow"
          src={shadow}
          alt=""
        />
        <img
          className="nuum-art-layer nuum-art-branch"
          src={branch}
          alt=""
        />

        <div className="nuum-art-light" />
        <div className="nuum-art-mist" />

        {rain.map((drop, i) => (
          <div
            key={i}
            className="nuum-art-rain"
            style={
              {
                left: `${drop.x}%`,
                top: `${drop.y}%`,
                "--delay": `${drop.delay}s`,
                "--duration": `${drop.duration}s`,
              } as CSSProperties
            }
          >
            <span className="nuum-art-drop" />
            <span className="nuum-art-ring" />
            <span className="nuum-art-ring nuum-art-ring-second" />
          </div>
        ))}

        <div className="nuum-art-stone-water">
          <span className="nuum-art-stone-bead" />
          <span className="nuum-art-stone-fall" />
          <span className="nuum-art-stone-ring" />
        </div>
      </div>

      <div className="nuum-art-copy">
        {statements.map((statement) => (
          <div className="nuum-art-statement" key={statement.cn}>
            <p className="nuum-art-label font-hei">
              <StaggerText text={statement.label} step={24} />
            </p>

            <h2 className="nuum-art-english font-sans">
              {statement.lines.map((line, lineIndex) => (
                <span className="nuum-art-line" key={line}>
                  <StaggerText
                    text={line}
                    start={100 + lineIndex * 140}
                    step={32}
                  />
                </span>
              ))}
            </h2>

            <p className="nuum-art-chinese font-hei">
              <StaggerText
                text={statement.cn}
                start={360}
                step={42}
              />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = `
.nuum-art {
  position: relative;
  isolation: isolate;
  width: 100%;
  min-height: 100svh;
  background: #c5ceca;
  color: #172321;
}

.nuum-art-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: -2;
}

.nuum-art-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.nuum-art-branch {
  transform-origin: 100% 15%;
  animation: nuum-art-wind 6.5s ease-in-out infinite alternate;
  will-change: transform;
}

.nuum-art-shadow {
  transform-origin: 100% 20%;
  animation: nuum-art-shadow-move 6.5s ease-in-out infinite alternate;
  will-change: transform, opacity;
}

.nuum-art-light {
  position: absolute;
  left: -35%;
  bottom: -8%;
  width: 170%;
  height: 42%;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 235, .65),
    rgba(230, 240, 231, .18) 38%,
    transparent 68%
  );
  mix-blend-mode: screen;
  animation: nuum-art-light-move 8s ease-in-out infinite alternate;
}

.nuum-art-mist {
  position: absolute;
  inset: 15% -25% 15%;
  background: radial-gradient(
    ellipse at center,
    rgba(241, 244, 233, .22),
    transparent 68%
  );
  animation: nuum-art-mist-move 12s ease-in-out infinite alternate;
}

/* 柔和渐变保证文字可读，不出现矩形底板 */
.nuum-art::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(236, 240, 228, .83) 0%,
    rgba(236, 240, 228, .67) 35%,
    rgba(236, 240, 228, .24) 70%,
    transparent 100%
  );
}

.nuum-art-copy {
  position: relative;
  width: 100%;
  padding: clamp(88px, 11svh, 112px) 24px 56px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.nuum-art-label {
  margin: 0 0 8px;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: .12em;
  color: #3d4b46;
}

.nuum-art-english {
  margin: 0;
  font-size: clamp(30px, 11.8vw, 64px);
  font-weight: 400;
  line-height: .94;
  letter-spacing: -.045em;
}

.nuum-art-line {
  display: block;
  white-space: nowrap;
}

.nuum-art-chinese {
  margin: 10px 0 0;
  font-size: 17px;
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: .02em;
  color: #25332e;
}

/* 雨滴与落点使用同一坐标 */
.nuum-art-rain {
  position: absolute;
  width: 0;
  height: 0;
}

.nuum-art-drop {
  position: absolute;
  left: 0;
  top: -34px;
  width: 1px;
  height: 34px;
  background: linear-gradient(
    transparent,
    rgba(255, 255, 255, .9)
  );
  animation: nuum-art-rainfall var(--duration) linear infinite;
  animation-delay: var(--delay);
}

.nuum-art-ring {
  position: absolute;
  left: -28px;
  top: -8px;
  width: 56px;
  height: 16px;
  border: 1px solid rgba(247, 255, 250, .9);
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(26, 54, 50, .25);
  opacity: 0;
  animation: nuum-art-ripple var(--duration) linear infinite;
  animation-delay: var(--delay);
}

.nuum-art-ring-second {
  width: 38px;
  height: 11px;
  left: -19px;
  top: -5.5px;
  animation-name: nuum-art-ripple-second;
}

/* 石板尖端凝聚水珠，然后滴落 */
.nuum-art-stone-water {
  position: absolute;
  left: 70%;
  top: 66%;
  width: 0;
  height: 0;
}

.nuum-art-stone-bead,
.nuum-art-stone-fall {
  position: absolute;
  left: -2px;
  top: 0;
  width: 4px;
  height: 7px;
  border-radius: 45% 45% 55% 55%;
  background: rgba(244, 255, 255, .9);
  box-shadow: 0 0 3px rgba(255, 255, 255, .5);
}

.nuum-art-stone-bead {
  transform-origin: top;
  animation: nuum-art-bead 4s linear infinite;
}

.nuum-art-stone-fall {
  animation: nuum-art-stone-fall 4s linear infinite;
}

.nuum-art-stone-ring {
  position: absolute;
  left: -28px;
  top: 100px;
  width: 56px;
  height: 15px;
  border: 1px solid rgba(245, 255, 251, .9);
  border-radius: 50%;
  animation: nuum-art-stone-ripple 4s linear infinite;
}

@keyframes nuum-art-wind {
  from { transform: rotate(-1.1deg) translate(0, 0); }
  to { transform: rotate(1.2deg) translate(-5px, 4px); }
}

@keyframes nuum-art-shadow-move {
  from { transform: translate(0, 0) rotate(-.6deg); opacity: .45; }
  to { transform: translate(-12px, 7px) rotate(1deg); opacity: .7; }
}

@keyframes nuum-art-light-move {
  from { transform: translateX(-8%) scale(.95); opacity: .4; }
  to { transform: translateX(10%) scale(1.08); opacity: .85; }
}

@keyframes nuum-art-mist-move {
  from { transform: translateX(-5%); opacity: .3; }
  to { transform: translateX(7%); opacity: .65; }
}

@keyframes nuum-art-rainfall {
  0% { transform: translateY(-65svh); opacity: 0; }
  7% { opacity: .7; }
  35% { transform: translateY(0); opacity: .8; }
  36%, 100% { transform: translateY(0); opacity: 0; }
}

@keyframes nuum-art-ripple {
  0%, 34% { transform: scale(.08); opacity: 0; }
  36% { transform: scale(.12); opacity: .85; }
  80%, 100% { transform: scale(1.9); opacity: 0; }
}

@keyframes nuum-art-ripple-second {
  0%, 40% { transform: scale(.08); opacity: 0; }
  43% { transform: scale(.2); opacity: .6; }
  92%, 100% { transform: scale(2.1); opacity: 0; }
}

@keyframes nuum-art-bead {
  0% { transform: scale(.1); opacity: 0; }
  15% { opacity: .8; }
  55% { transform: scale(1); opacity: 1; }
  58%, 100% { transform: scale(.1); opacity: 0; }
}

@keyframes nuum-art-stone-fall {
  0%, 55% { transform: translateY(0); opacity: 0; }
  56% { transform: translateY(0); opacity: 1; }
  70% { transform: translateY(100px); opacity: 1; }
  71%, 100% { transform: translateY(100px); opacity: 0; }
}

@keyframes nuum-art-stone-ripple {
  0%, 69% { transform: scale(.05); opacity: 0; }
  72% { transform: scale(.2); opacity: .9; }
  100% { transform: scale(1.8); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .nuum-art-scene *,
  .nuum-art-scene *::before,
  .nuum-art-scene *::after {
    animation: none !important;
  }

  .nuum-art-rain,
  .nuum-art-stone-water {
    display: none;
  }
}
`;