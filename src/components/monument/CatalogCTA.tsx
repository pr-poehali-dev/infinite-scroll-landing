import { useEffect, useRef, useState } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

export default function CatalogCTA() {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      style={{
        background: "#2C2C2C",
        padding: "72px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Marble texture */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url('https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/bfbce3ca-47d6-49bc-b298-099b33c84f14.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.04,
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#ffffff",
            lineHeight: 1.5,
            marginBottom: "10px",
          }}
        >
          Не можете определиться?
        </p>
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            marginBottom: "36px",
          }}
        >
          Оставьте заявку — менеджер бесплатно проконсультирует
          по&nbsp;всем видам памятников и поможет с&nbsp;выбором.
        </p>
        <a
          href="#contacts"
          className="ms-btn-gold"
          style={{
            display: "inline-block",
            padding: "15px 48px",
            borderRadius: "3px",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.82rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Связаться с менеджером
        </a>
      </div>
    </div>
  );
}