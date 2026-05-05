import { useState, useEffect, useRef, useCallback } from "react";

const IMAGES = [
  {
    id: 1,
    src: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/3237b0ac-65e5-4c26-bc63-5e866186fc7d.jpg",
    alt: "Паста карбонара",
    label: "Паста карбонара",
    tall: true,
    type: "image" as const,
  },
  {
    id: 2,
    src: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/5eeff636-ba38-4387-a127-e006b8d29cbf.jpg",
    alt: "Атмосфера ресторана",
    label: "Живая атмосфера",
    tall: false,
    type: "image" as const,
  },
  {
    id: 3,
    src: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/8b4f0695-7d2f-4fa3-bb71-3fd22a21179e.jpg",
    alt: "Шеф-повар",
    label: "Искусство подачи",
    tall: false,
    type: "image" as const,
  },
  {
    id: 4,
    src: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/0369352b-5ec7-4540-b174-7136f2fce437.jpg",
    alt: "Красное вино",
    label: "Избранное вино",
    tall: true,
    type: "image" as const,
  },
  {
    id: 5,
    src: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/493b1105-b0a2-4c52-8a1e-2764c978a1cf.jpg",
    alt: "Хлебная корзина",
    label: "Домашний хлеб",
    tall: false,
    type: "image" as const,
  },
];

const VIDEO_PLACEHOLDERS = [
  {
    id: "v1",
    type: "video" as const,
    poster: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/8b4f0695-7d2f-4fa3-bb71-3fd22a21179e.jpg",
    label: "Магия кухни",
    tall: false,
  },
  {
    id: "v2",
    type: "video" as const,
    poster: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/5eeff636-ba38-4387-a127-e006b8d29cbf.jpg",
    label: "Вечер в ресторане",
    tall: true,
  },
];

type MediaItem = {
  id: string | number;
  src?: string;
  poster?: string;
  alt?: string;
  label: string;
  tall: boolean;
  type: "image" | "video";
};

type GridEntry =
  | { type: "media"; data: MediaItem }
  | { type: "text"; textData: { text: string; subtext: string } }
  | { type: "divider" };

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateBatch(seed: number): MediaItem[] {
  const allItems: MediaItem[] = [
    ...IMAGES,
    ...VIDEO_PLACEHOLDERS,
  ];
  return shuffleArray(allItems).map((item, i) => ({
    ...item,
    id: `${item.id}-${seed}-${i}`,
  }));
}

const TEXT_CARDS = [
  { text: "Каждое блюдо — история, рождённая из огня и терпения", subtext: "философия кухни" },
  { text: "Сезонные продукты. Живой вкус. Без компромиссов", subtext: "наш подход" },
  { text: "Место, где время замедляется и вкус становится главным", subtext: "атмосфера" },
  { text: "Традиции и новаторство на одной тарелке", subtext: "о нас" },
];

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

const textIndexRef = { current: 0 };

function buildGridEntries(mediaItems: MediaItem[], batchNum: number): GridEntry[] {
  const result: GridEntry[] = [];
  mediaItems.forEach((item, i) => {
    result.push({ type: "media", data: item });
    if ((i + 1) % 4 === 0) {
      const tIdx = textIndexRef.current % TEXT_CARDS.length;
      result.push({ type: "text", textData: TEXT_CARDS[tIdx] });
      textIndexRef.current++;
      if (batchNum > 0) {
        result.push({ type: "divider" });
      }
    }
  });
  return result;
}

export default function Index() {
  const [allEntries, setAllEntries] = useState<GridEntry[]>([]);
  const [batch, setBatch] = useState(0);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    textIndexRef.current = 0;
    const initial = generateBatch(0);
    setAllEntries(buildGridEntries(initial, 0));
    setBatch(1);
  }, []);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newItems = generateBatch(batch);
      const newEntries = buildGridEntries(newItems, batch);
      setAllEntries((prev) => [...prev, ...newEntries]);
      setBatch((b) => b + 1);
      setLoading(false);
    }, 700);
  }, [batch, loading]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  let textCardCount = 0;

  return (
    <div className="grain-overlay min-h-screen" style={{ background: "hsl(40,30%,93%)" }}>

      {/* Hero */}
      <header
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100svh", padding: "0 24px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/5eeff636-ba38-4387-a127-e006b8d29cbf.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(18,8,3,0.82) 0%, rgba(20,10,4,0.72) 60%, rgba(16,8,4,0.88) 100%)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-7 max-w-xl mx-auto">
          <div className="flex items-center gap-4">
            <div style={{ width: "50px", height: "1px", background: "hsl(40,65%,55%)", opacity: 0.7 }} />
            <span
              className="font-cormorant-sc text-xs tracking-widest animate-fade-up"
              style={{ color: "hsl(40,65%,60%)", letterSpacing: "0.32em", animationDelay: "0.3s" }}
            >
              с 2019 года
            </span>
            <div style={{ width: "50px", height: "1px", background: "hsl(40,65%,55%)", opacity: 0.7 }} />
          </div>

          <h1
            className="font-cormorant animate-hero-reveal"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 7rem)",
              fontWeight: 300,
              color: "hsl(40,38%,92%)",
              lineHeight: 0.95,
              letterSpacing: "-0.015em",
              animationDelay: "0.05s",
            }}
          >
            Mikee
          </h1>

          <p
            className="font-golos animate-fade-up"
            style={{
              color: "rgba(240,228,210,0.58)",
              fontSize: "0.78rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              animationDelay: "0.65s",
              maxWidth: "320px",
            }}
          >
            Авторская кухня · Живая атмосфера · Настоящий вкус
          </p>

          <p
            className="font-cormorant animate-fade-up"
            style={{
              color: "rgba(240,228,210,0.38)",
              fontSize: "0.95rem",
              letterSpacing: "0.08em",
              fontStyle: "italic",
              animationDelay: "0.8s",
            }}
          >
            Планета Земля
          </p>

          <div
            className="animate-fade-up flex flex-col items-center gap-2 mt-5"
            style={{ animationDelay: "1s" }}
          >
            <span
              className="font-golos text-xs"
              style={{ color: "rgba(240,228,210,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.65rem" }}
            >
              листайте вниз
            </span>
            <div className="animate-float-slow mt-1">
              <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                <rect x="5" y="1" width="4" height="9" rx="2" stroke="rgba(240,228,210,0.35)" strokeWidth="1.2" />
                <circle cx="7" cy="5" r="1.3" fill="rgba(240,228,210,0.45)" />
                <path d="M3 16l4 4 4-4" stroke="rgba(240,228,210,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery intro */}
      <div className="flex items-center justify-center py-10 sm:py-14">
        <div className="flex items-center gap-5">
          <div style={{ width: "36px", height: "1px", background: "hsl(var(--terracotta))", opacity: 0.4 }} />
          <span
            className="font-cormorant-sc text-xs tracking-widest"
            style={{ color: "hsl(var(--terracotta))", letterSpacing: "0.3em" }}
          >
            наша история в деталях
          </span>
          <div style={{ width: "36px", height: "1px", background: "hsl(var(--terracotta))", opacity: 0.4 }} />
        </div>
      </div>

      {/* Pull quote */}
      <div className="text-center px-6 max-w-2xl mx-auto mb-10 sm:mb-14">
        <p
          className="font-cormorant font-light italic"
          style={{ fontSize: "clamp(1.4rem,4vw,2.2rem)", color: "hsl(24,40%,22%)", lineHeight: 1.45 }}
        >
          «Хорошая еда — это любовь,<br className="hidden sm:block" /> которую можно почувствовать на вкус»
        </p>
        <p
          className="font-golos text-xs mt-4 uppercase tracking-widest"
          style={{ color: "hsl(var(--terracotta))", letterSpacing: "0.22em" }}
        >
          — шеф-повар
        </p>
      </div>

      {/* Masonry */}
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

      {/* Footer */}
      <footer
        className="text-center py-12 px-6"
        style={{
          background: "hsl(24,40%,14%)",
          borderTop: "1px solid rgba(180,130,80,0.12)",
        }}
      >
        <p className="font-cormorant text-3xl font-light" style={{ color: "hsl(40,38%,88%)" }}>
          Mikee
        </p>
        <p
          className="font-cormorant italic mt-1"
          style={{ color: "rgba(240,228,210,0.4)", fontSize: "1rem" }}
        >
          Планета Земля
        </p>
        <p
          className="font-golos text-xs mt-4 uppercase tracking-widest"
          style={{ color: "rgba(240,228,210,0.25)", letterSpacing: "0.2em" }}
        >
          © 2026 · с любовью к каждому гостю
        </p>
      </footer>
    </div>
  );
}