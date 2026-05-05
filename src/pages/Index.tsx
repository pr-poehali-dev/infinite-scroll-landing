import { useState, useEffect, useRef, useCallback } from "react";
import AuthModal from "@/components/AuthModal";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { generateBatch, buildGridEntries, textIndexRef } from "@/components/gallery/types";
import type { GridEntry } from "@/components/gallery/types";

export default function Index() {
  const [allEntries, setAllEntries] = useState<GridEntry[]>([]);
  const [batch, setBatch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [authOpen, setAuthOpen] = useState<false | "login" | "register">(false);
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

  return (
    <div className="grain-overlay min-h-screen" style={{ background: "hsl(40,30%,93%)" }}>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} initialMode={authOpen} />}

      <NavBar
        onLogin={() => setAuthOpen("login")}
        onRegister={() => setAuthOpen("register")}
      />

      <HeroSection />

      <GalleryGrid
        allEntries={allEntries}
        loaderRef={loaderRef}
        loading={loading}
      />

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
