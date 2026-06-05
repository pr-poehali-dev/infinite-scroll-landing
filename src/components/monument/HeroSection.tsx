import { useEffect, useRef } from "react";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/d780e35f-2c2d-4191-998e-4d93c686c4be.jpg";

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="top"
      style={{
        position: "relative",
        height: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="ms-hero-bg"
        style={{
          position: "absolute",
          inset: "-15%",
          backgroundImage: `url("${HERO_IMAGE}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient overlay — darker at bottom for clean transition */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(170deg, rgba(20,20,20,0.72) 0%, rgba(20,20,20,0.58) 50%, rgba(20,20,20,0.82) 100%)",
      }} />

      {/* Content — fits within viewport */}
      <div style={{
        position: "relative",
        zIndex: 10,
        textAlign: "center",
        padding: "0 24px",
        maxWidth: "760px",
        margin: "0 auto",
        width: "100%",
      }}>

        {/* Eyebrow */}
        <div
          className="animate-fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
            animationDelay: "0.2s",
          }}
        >
          <div style={{ width: "36px", height: "1px", background: "#C9A96E", opacity: 0.8 }} />
          <span style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C9A96E",
            fontWeight: 500,
          }}>
            Собственное производство
          </span>
          <div style={{ width: "36px", height: "1px", background: "#C9A96E", opacity: 0.8 }} />
        </div>

        {/* H1 */}
        <h1
          className="animate-hero-reveal"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)",
            color: "#ffffff",
            lineHeight: 1.22,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: "16px",
            animationDelay: "0.05s",
          }}
        >
          Памятники, которые хранят
          <br />
          <span style={{ color: "#C9A96E", fontWeight: 700 }}>память на века</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7,
            maxWidth: "520px",
            margin: "0 auto 32px",
            fontWeight: 400,
            animationDelay: "0.5s",
          }}
        >
          Изготовление гранитных и мраморных памятников «под ключ».
          Индивидуальные проекты, работа с камнем любых пород,
          полный цикл производства.
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-up"
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
            animationDelay: "0.7s",
          }}
        >
          <a
            href="#contacts"
            className="ms-btn-gold"
            style={{
              display: "inline-block",
              padding: "13px 32px",
              borderRadius: "3px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.76rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Бесплатная консультация
          </a>
          <a
            href="#catalog"
            style={{
              display: "inline-block",
              padding: "13px 32px",
              borderRadius: "3px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.76rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#ffffff",
              border: "1.5px solid rgba(255,255,255,0.4)",
              transition: "border-color 0.25s, background 0.25s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#C9A96E";
              (e.currentTarget as HTMLElement).style.background = "rgba(201,169,110,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Смотреть каталог
          </a>
        </div>

        {/* Scroll hint */}
        <div
          className="animate-fade-up animate-float-slow"
          style={{ marginTop: "32px", animationDelay: "1.1s" }}
        >
          <svg width="22" height="32" viewBox="0 0 24 36" fill="none" style={{ margin: "0 auto", display: "block" }}>
            <rect x="1" y="1" width="22" height="34" rx="11" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <circle cx="12" cy="10" r="3" fill="rgba(255,255,255,0.35)" />
          </svg>
        </div>
      </div>

      {/* Stats strip — pinned to bottom of hero */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        background: "rgba(20,20,20,0.72)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(201,169,110,0.12)",
        padding: "20px 24px",
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
          className="stats-grid"
        >
          {[
            { value: "12+", label: "лет на рынке" },
            { value: "5 000+", label: "выполненных заказов" },
            { value: "5 лет", label: "гарантия на изделия" },
            { value: "3 дня", label: "срок изготовления" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 700,
                color: "#C9A96E",
                lineHeight: 1,
                marginBottom: "4px",
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.62rem",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}