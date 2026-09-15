import { useEffect, useRef, useState } from "react";
import trackSrc from "@/imports/Marble_and_Evening_Air.mp3";

/* ------------------------------------------------------------------ *
 * AMBIENT SOUND · quiet lounge control
 * Drop a high-end lounge / neo-soul / jazz-hiphop instrumental at
 *   public/audio/lounge-bgm.mp3
 * (any looping .mp3 works). Playback starts enabled at low volume and
 * falls back to the first user gesture when a browser blocks autoplay.
 * ------------------------------------------------------------------ */

const SRC = trackSrc;
const TARGET_VOL = 0.32;

export default function SoundControl() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(true);
  const [ready, setReady] = useState(false);
  const [missing, setMissing] = useState(false);
  const fadeRef = useRef<number | null>(null);
  const wantsSoundRef = useRef(true);

  const fadeTo = (to: number, done?: () => void) => {
    const a = audioRef.current;
    if (!a) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const from = a.volume;
    const dur = 1400;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      a.volume = from + (to - from) * p;
      if (p < 1) fadeRef.current = requestAnimationFrame(step);
      else done?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      wantsSoundRef.current = false;
      fadeTo(0, () => a.pause());
      setPlaying(false);
    } else {
      wantsSoundRef.current = true;
      try {
        a.volume = 0;
        await a.play();
        setPlaying(true);
        fadeTo(TARGET_VOL);
      } catch {
        /* blocked until a user gesture — the click itself will satisfy it */
      }
    }
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const unlockEvents = ["pointerdown", "touchstart", "keydown"] as const;
    const removeUnlockListeners = () => {
      unlockEvents.forEach((event) =>
        window.removeEventListener(event, startPlayback)
      );
    };
    const startPlayback = async () => {
      if (!wantsSoundRef.current || !a.paused) {
        removeUnlockListeners();
        return;
      }

      try {
        a.volume = 0;
        await a.play();
        setPlaying(true);
        fadeTo(TARGET_VOL);
        removeUnlockListeners();
      } catch {
        // Browsers may require a user gesture before audible playback.
      }
    };

    const onCanPlay = () => {
      setReady(true);
      setMissing(false);
    };
    const onError = () => setMissing(true);
    unlockEvents.forEach((event) =>
      window.addEventListener(event, startPlayback, { passive: true })
    );
    a.addEventListener("canplaythrough", onCanPlay);
    a.addEventListener("error", onError);
    void startPlayback();

    return () => {
      removeUnlockListeners();
      a.removeEventListener("canplaythrough", onCanPlay);
      a.removeEventListener("error", onError);
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload="auto" autoPlay playsInline />

      <button
        onClick={toggle}
        aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 mix-blend-difference text-ivory"
      >
        {/* equalizer */}
        <span className="flex h-3.5 items-end gap-[2px]">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[2px] bg-current"
              style={{
                height: playing ? undefined : "3px",
                animation: playing ? `eq 900ms ease-in-out ${i * 140}ms infinite` : "none",
              }}
            />
          ))}
        </span>
        <span className="font-sans text-[10px]" style={{ letterSpacing: "0.24em" }}>
          {missing ? "NO TRACK" : playing ? "SOUND ON" : "SOUND"}
        </span>
      </button>

      {missing && (
        <div
          className="fixed bottom-14 left-6 z-50 max-w-[220px] font-sans text-[9px] leading-[1.6] text-ivory mix-blend-difference"
          style={{ letterSpacing: "0.12em" }}
        >
          ADD YOUR TRACK AT public/audio/lounge-bgm.mp3
        </div>
      )}

      <style>{`
        @keyframes eq {
          0%, 100% { height: 3px; }
          50% { height: 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes eq { 0%,100% { height: 7px; } }
        }
      `}</style>
    </>
  );
}
