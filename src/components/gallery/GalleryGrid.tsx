import { useState, useEffect, useRef } from "react";
import type { MediaItem, GridEntry } from "./types";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const { ref, visible } = useReveal();
  const delay = (index % 5) * 90;

  return (
    <div
      ref={ref}
      className="masonry-item"
      style={{
        animationDelay: `${delay}ms`,
        animation: visible ? `item-appear 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` : "none",
        opacity: visible ? undefined : 0,
      }}
    >
      <div
        className="media-card"
        style={{ borderRadius: "3px", boxShadow: "0 2px 24px rgba(24,14,6,0.12)" }}
      >
        {item.type === "video" ? (
          <div
            className="relative flex items-center justify-center"
            style={{ paddingBottom: item.tall ? "138%" : "74%", overflow: "hidden" }}
          >
            <img
              src={item.poster}
              alt={item.label}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.45) saturate(0.7)" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1.5px solid rgba(255,255,255,0.35)",
                  backdropFilter: "blur(8px)",
                  transition: "transform 0.3s ease, background 0.3s ease",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "2px" }}>
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <span
                className="font-cormorant text-white/80 text-sm italic"
                style={{ letterSpacing: "0.18em" }}
              >
                {item.label}
              </span>
            </div>
          </div>
        ) : (
          <div
            className="relative"
            style={{ paddingBottom: item.tall ? "138%" : "68%", overflow: "hidden" }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="media-label absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 pt-8"
              style={{
                background: "linear-gradient(to top, rgba(18,9,3,0.72), transparent)",
                opacity: 0,
                transition: "opacity 0.35s ease",
              }}
            >
              <p className="font-cormorant text-white text-lg font-light italic">{item.label}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TextCard({ text, subtext, index }: { text: string; subtext: string; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className="masonry-item">
      <div
        className="p-7 sm:p-8"
        style={{
          minHeight: "170px",
          background: index % 2 === 0 ? "hsl(var(--terracotta))" : "hsl(24,40%,16%)",
          borderRadius: "3px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(18px)",
          transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p
          className="font-cormorant text-2xl sm:text-3xl font-light italic leading-snug"
          style={{ color: "hsl(40,38%,92%)" }}
        >
          {text}
        </p>
        <p
          className="font-golos text-xs mt-3 uppercase tracking-widest"
          style={{ color: "rgba(240,228,210,0.5)", letterSpacing: "0.2em" }}
        >
          {subtext}
        </p>
      </div>
    </div>
  );
}

function DividerCard() {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className="masonry-item">
      <div
        className="flex flex-col items-center justify-center py-8 gap-2"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
      >
        <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, transparent, hsl(var(--terracotta)), transparent)" }} />
        <span className="font-cormorant text-base" style={{ color: "hsl(var(--terracotta))" }}>✦</span>
        <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, transparent, hsl(var(--terracotta)), transparent)" }} />
      </div>
    </div>
  );
}

interface GalleryGridProps {
  allEntries: GridEntry[];
  loaderRef: React.RefObject<HTMLDivElement>;
  loading: boolean;
}

export default function GalleryGrid({ allEntries, loaderRef, loading }: GalleryGridProps) {
  let textCardCount = 0;

  return (
    <main className="pb-16">
      <div className="masonry-grid" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {allEntries.map((entry, i) => {
          if (entry.type === "media") {
            return <MediaCard key={`m-${entry.data.id}-${i}`} item={entry.data} index={i} />;
          }
          if (entry.type === "text") {
            const cardI = textCardCount++;
            return <TextCard key={`t-${i}`} text={entry.textData.text} subtext={entry.textData.subtext} index={cardI} />;
          }
          if (entry.type === "divider") {
            return <DividerCard key={`d-${i}`} />;
          }
          return null;
        })}
      </div>

      <div ref={loaderRef} className="flex justify-center py-12">
        {loading && (
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-7 h-7 rounded-full border-2 animate-spin-slow"
              style={{ borderColor: "hsl(var(--terracotta))", borderTopColor: "transparent" }}
            />
            <span
              className="font-cormorant-sc text-xs"
              style={{ color: "hsl(var(--terracotta))", letterSpacing: "0.25em" }}
            >
              загрузка
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
