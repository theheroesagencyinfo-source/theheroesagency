import { useEffect, useRef } from "react";
import bookF1 from "@/assets/book_frame_1.webp.asset.json";
import bookF2 from "@/assets/book_frame_2.webp.asset.json";
import bookF3 from "@/assets/book_frame_3.webp.asset.json";
import bookF4 from "@/assets/book_frame_4.webp.asset.json";
import bookF5 from "@/assets/book_frame_5.webp.asset.json";

const FRAMES = [bookF1, bookF2, bookF3, bookF4, bookF5];
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => t * t * (3 - 2 * t);

/** Original editorial opening: faint headline behind a real book that opens and draws the camera in as you scroll. */
export function BookOpening() {
  const stage = useRef<HTMLDivElement>(null);
  const spacer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = stage.current, sp = spacer.current;
    if (!st || !sp) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      st.style.display = "none"; sp.style.display = "none"; return;
    }
    const q = <T extends HTMLElement>(s: string) => st.querySelector<T>(s);
    const cam = q<HTMLDivElement>("[data-cam]"), shadow = q<HTMLDivElement>("[data-shadow]");
    const editorial = q<HTMLDivElement>("[data-editorial]"), side = q<HTMLDivElement>("[data-side]"), hint = q<HTMLDivElement>("[data-hint]");
    const frames = Array.from(st.querySelectorAll<HTMLImageElement>("[data-frame]"));
    let target = 0, shown = 0, running = false;

    const paint = (p: number) => {
      // Book sequence runs over the first 86% of scroll; the rest hands over to the homepage.
      const b = clamp(p / 0.86);
      const n = FRAMES.length - 1, f = b * n, i = Math.min(n - 1, Math.floor(f));
      const mix = ease(clamp((f - i - 0.15) / 0.7));
      frames.forEach((im, k) => { im.style.opacity = String(k === i ? 1 : k === i + 1 ? mix : 0); });
      const zoom = 1 + ease(clamp(b / 0.9)) * 0.42;
      const lift = -Math.sin(b * Math.PI) * 26;
      const tilt = (1 - b) * 6;
      if (cam) cam.style.transform = `translate3d(0,${lift}px,0) scale(${zoom}) rotateX(${tilt}deg)`;
      if (shadow) shadow.style.opacity = String(0.85 - b * 0.35);
      if (editorial) editorial.style.opacity = String(1 - clamp((b - 0.55) / 0.35));
      const s = clamp((b - 0.12) / 0.24);
      if (side) { side.style.opacity = String(s * (1 - clamp((b - 0.7) / 0.2))); side.style.transform = `translateY(${(1 - s) * 12}px)`; }
      if (hint) hint.style.opacity = String(1 - clamp(p * 3.1));
      const out = ease(clamp((p - 0.86) / 0.14));
      st.style.opacity = String(1 - out);
      st.style.visibility = out >= 1 ? "hidden" : "visible";
      st.style.pointerEvents = out > 0.5 ? "none" : "auto";
    };
    const tick = () => {
      shown += (target - shown) * 0.16;
      if (Math.abs(target - shown) < 0.0004) shown = target;
      paint(shown);
      if (shown !== target) requestAnimationFrame(tick); else running = false;
    };
    const onScroll = () => {
      const range = Math.max(1, sp.offsetHeight - window.innerHeight * 0.2);
      target = clamp(window.scrollY / range);
      if (!running) { running = true; requestAnimationFrame(tick); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <>
      <div ref={stage} aria-hidden="true" className="book-opening fixed inset-0 z-[60] overflow-hidden bg-background">
        <div className="book-opening-glow" />
        <div data-editorial className="absolute inset-0 grid place-items-center px-6 text-center">
          <p className="absolute left-[clamp(22px,7vw,110px)] top-[10%] text-[9px] font-bold uppercase tracking-[0.24em] text-primary">TheHeroes Agency · Author Studio</p>
          <h2 className="book-opening-title font-serif">A book is only<br />the <em>beginning.</em></h2>
        </div>
        <div className="absolute inset-0 grid place-items-center [perspective:1800px]">
          <div className="relative aspect-[941/1672] h-[min(92svh,calc(96vw*1672/941))]">
            <div data-cam className="absolute inset-0 will-change-transform [transform-style:preserve-3d]">
              <div data-shadow className="book-opening-shadow" />
              {FRAMES.map((f, k) => (
                <img key={k} data-frame src={f.url} alt="" draggable={false} decoding="async" fetchPriority={k < 2 ? "high" : "auto"}
                  className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain" style={{ opacity: k === 0 ? 1 : 0 }} />
              ))}
            </div>
          </div>
        </div>
        <div data-side className="absolute bottom-[15%] right-[clamp(22px,7vw,110px)] w-[190px] text-left text-[11px] leading-relaxed text-foreground opacity-0">
          <strong className="mb-2 block font-serif text-[19px] font-medium leading-tight">We build what comes next.</strong>
        </div>
        <div data-hint className="book-opening-hint absolute inset-x-0 bottom-[clamp(28px,6vh,60px)] text-center text-[9px] uppercase tracking-[0.22em] text-muted-foreground">Scroll to open the story</div>
      </div>
      <div ref={spacer} className="h-[240vh] md:h-[280vh]" aria-hidden="true" />
    </>
  );
}
