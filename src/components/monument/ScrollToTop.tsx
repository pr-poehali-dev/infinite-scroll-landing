import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handler = () => {
      const heroHeight = window.innerHeight;
      setVisible(window.scrollY > heroHeight);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Наверх"
      style={{
        position: "fixed",
        bottom: "32px",
        right: "28px",
        zIndex: 100,
        width: "46px",
        height: "46px",
        borderRadius: "50%",
        border: `1.5px solid ${hovered ? "#C9A96E" : "rgba(201,169,110,0.35)"}`,
        background: hovered ? "rgba(201,169,110,0.15)" : "rgba(20,20,20,0.45)",
        backdropFilter: "blur(10px)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? (hovered ? 1 : 0.45) : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.35s ease, transform 0.35s ease, border-color 0.2s, background 0.2s",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ color: hovered ? "#C9A96E" : "rgba(255,255,255,0.7)", transition: "color 0.2s" }}
      >
        <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}
