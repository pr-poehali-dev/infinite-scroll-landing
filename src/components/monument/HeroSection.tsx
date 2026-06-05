import { useEffect, useRef } from "react";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/b56f6609-6d44-4fd3-8d3a-3d4872151f10.jpg";

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const y = window.scrollY;
      bgRef.current.style.transform = `translateY(${y * 0.38}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100svh",
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
          inset: "-20%",
          backgroundImage: `url("${HERO_IMAGE}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(44,44,44,0.65)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "120px 24px 80px",
          maxWidth: "820px",
          margin: "0 auto",
        }}
      >
        {/* Eyebrow */}
        <div
          className="animate-fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "28px",
            animationDelay: "0.2s",
          }}
        >
          <div style={{ width: "40px", height: "1px", background: "#C9A96E", opacity: 0.8 }} />
          <span
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C9A96E",
              fontWeight: 500,
            }}
          >
            Собственное производство · Москва и область
          </span>
          <div style={{ width: "40px", height: "1px", background: "#C9A96E", opacity: 0.8 }} />
        </div>

        {/* H1 */}
        <h1
          className="animate-hero-reveal"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            fontSize: "clamp(2.2rem, 6vw, 4.2rem)",
            color: "#ffffff",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            marginBottom: "24px",
            animationDelay: "0.05s",
          }}
        >
          Памятники, которые&nbsp;хранят
          <br />
          <span style={{ color: "#C9A96E", fontStyle: "italic" }}>память на века</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.7,
            maxWidth: "600px",
            margin: "0 auto 40px",
            fontWeight: 400,
            animationDelay: "0.55s",
          }}
        >
          Изготовление гранитных и мраморных памятников «под ключ»
          в&nbsp;Москве и области. Индивидуальные проекты, работа с камнем
          любых пород, полный цикл производства.
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-up"
          style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexWrap: "wrap",
            animationDelay: "0.75s",
          }}
        >
          <a
            href="#contacts"
            className="ms-btn-gold"
            style={{
              display: "inline-block",
              padding: "15px 36px",
              borderRadius: "3px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.82rem",
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
              padding: "15px 36px",
              borderRadius: "3px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#ffffff",
              border: "1.5px solid rgba(255,255,255,0.45)",
              transition: "border-color 0.25s, background 0.25s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#C9A96E";
              (e.currentTarget as HTMLElement).style.background = "rgba(201,169,110,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.45)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Смотреть каталог
          </a>
        </div>

        {/* Stats */}
        <div
          className="animate-fade-up"
          style={{
            display: "flex",
            gap: "40px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "60px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            animationDelay: "0.95s",
          }}
        >
          {[
            { value: "12+", label: "лет на рынке" },
            { value: "5 000+", label: "выполненных заказов" },
            { value: "5 лет", label: "гарантия" },
            { value: "3 дня", label: "срочное изготовление" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 700,
                  color: "#C9A96E",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className="animate-fade-up animate-float-slow"
          style={{ marginTop: "48px", animationDelay: "1.2s" }}
        >
          <svg width="24" height="36" viewBox="0 0 24 36" fill="none" style={{ margin: "0 auto", display: "block" }}>
            <rect x="1" y="1" width="22" height="34" rx="11" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <circle cx="12" cy="10" r="3" fill="rgba(255,255,255,0.4)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
