import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const CARDS = [
  {
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/dc3eabeb-2012-4a65-97ad-3535ee53eb54.jpg",
    number: "01",
    title: "Собственное производство",
    desc: "Полный цикл на собственном заводе — от распила камня до финальной полировки. Никаких посредников. Гранит напрямую из карельских карьеров.",
    highlight: "Цена ниже на 30% без посредников",
  },
  {
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/17b545b1-48e9-45c0-81b7-95dcb8aa63bd.jpg",
    number: "02",
    title: "Индивидуальный дизайн",
    desc: "Каждый памятник создаётся по вашему эскизу. Любая форма, фотопортрет, гравировка, орнамент. Художник разработает проект бесплатно.",
    highlight: "Бесплатная разработка эскиза",
  },
  {
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/eee2d971-d344-4596-8347-01d633df7d33.jpg",
    number: "03",
    title: "Сроки от 3 дней",
    desc: "Срочное изготовление без потери качества. Доставка и установка в удобное для вас время — даже в выходные.",
    highlight: "Доставка и установка включены",
  },
  {
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/446a0fb9-1281-4d2c-a127-a4447ef8b13f.jpg",
    number: "04",
    title: "Гарантия 5 лет",
    desc: "Официальная гарантия на все изделия, закреплённая договором. Дефекты по нашей вине устраняем бесплатно.",
    highlight: "Официальный договор с печатью",
  },
];

const CATALOG_LINKS = [
  { label: "Гранитные", href: "#granite" },
  { label: "Мраморные", href: "#marble" },
  { label: "Комбинированные", href: "#combined" },
  { label: "Семейные", href: "#family" },
  { label: "Мусульманские", href: "#muslim" },
  { label: "Мемориальные комплексы", href: "#memorial" },
];

function FeatureCard({ image, number, title, desc, highlight, index }: {
  image: string; number: string; title: string; desc: string; highlight: string; index: number;
}) {
  const { ref, visible } = useReveal(0.05);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "10px",
        overflow: "hidden",
        minHeight: "320px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: `opacity 0.65s ease ${index * 0.12}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
        boxShadow: hovered ? "0 24px 56px rgba(0,0,0,0.22)" : "0 6px 24px rgba(0,0,0,0.12)",
      }}
    >
      {/* Background photo */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "grayscale(30%)",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }} />

      {/* Base dark gradient */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(15,15,15,0.95) 0%, rgba(15,15,15,0.65) 50%, rgba(15,15,15,0.15) 100%)",
        transition: "opacity 0.3s ease",
      }} />

      {/* Hover golden tint */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, rgba(201,169,110,0.08) 0%, transparent 60%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />

      {/* Number — top right */}
      <div style={{
        position: "absolute",
        top: "20px",
        right: "22px",
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: "3.5rem",
        fontWeight: 700,
        color: "rgba(201,169,110,0.18)",
        lineHeight: 1,
        transition: "color 0.3s",
      }}>
        {number}
      </div>

      {/* Gold top-left accent line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: hovered ? "100%" : "48px",
        height: "2px",
        background: "linear-gradient(90deg, #C9A96E, transparent)",
        transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: "28px" }}>
        <h3 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: "1.2rem",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "10px",
          lineHeight: 1.3,
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.82rem",
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.7,
          marginBottom: "16px",
          maxHeight: hovered ? "100px" : "0",
          overflow: "hidden",
          opacity: hovered ? 1 : 0,
          transition: "max-height 0.4s ease, opacity 0.35s ease",
        }}>
          {desc}
        </p>
        {/* Highlight badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(201,169,110,0.15)",
          border: "1px solid rgba(201,169,110,0.4)",
          borderRadius: "20px",
          padding: "5px 12px",
        }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C9A96E", flexShrink: 0 }} />
          <span style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "#C9A96E",
            letterSpacing: "0.04em",
          }}>
            {highlight}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const { ref: headRef, visible: headVisible } = useReveal(0.1);
  const { ref: ctaRef, visible: ctaVisible } = useReveal(0.1);

  return (
    <section id="about" style={{ background: "#F5F5F0" }}>

      {/* Main content */}
      <div style={{ padding: "80px 24px 72px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div
            ref={headRef}
            style={{
              textAlign: "center",
              marginBottom: "56px",
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? "none" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
              <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", fontWeight: 500 }}>
                О компании
              </span>
              <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
            </div>
            <h2 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)",
              fontWeight: 700,
              color: "#2C2C2C",
              lineHeight: 1.2,
              marginBottom: "14px",
            }}>
              Почему выбирают Монумент Сервис
            </h2>
            <p style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.9rem",
              color: "#777",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}>
              Более 12 лет мы помогаем семьям создать достойный мемориал
            </p>
          </div>

          {/* Cards — 4 in a row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "52px",
          }}
            className="whyus-grid"
          >
            {CARDS.map((card, i) => (
              <FeatureCard key={card.title} {...card} index={i} />
            ))}
          </div>

          {/* CTA */}
          <div
            ref={ctaRef}
            style={{
              textAlign: "center",
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "none" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            <a
              href="#catalog"
              className="ms-btn-gold"
              style={{
                display: "inline-block",
                padding: "13px 40px",
                borderRadius: "3px",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                marginBottom: "32px",
              }}
            >
              Заказать памятник
            </a>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 6px", justifyContent: "center", alignItems: "center" }}>
              <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.76rem", color: "#999" }}>
                Виды памятников:
              </span>
              {CATALOG_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.76rem",
                    color: "#2C2C2C",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(201,169,110,0.5)",
                    paddingBottom: "1px",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#C9A96E";
                    (e.currentTarget as HTMLElement).style.borderColor = "#C9A96E";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#2C2C2C";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.5)";
                  }}
                >
                  {link.label}
                  {i < CATALOG_LINKS.length - 1 && <span style={{ color: "#ccc", marginLeft: "6px" }}>·</span>}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}