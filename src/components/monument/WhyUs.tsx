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

const STATS = [
  { value: "12+", label: "лет на рынке" },
  { value: "5 000+", label: "выполненных заказов" },
  { value: "5 лет", label: "гарантия на изделия" },
  { value: "3 дня", label: "срок изготовления" },
];

const CARDS = [
  {
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="28" width="32" height="4" rx="2" fill="#C9A96E" opacity="0.3"/>
        <rect x="8" y="14" width="24" height="14" rx="1" fill="#C9A96E" opacity="0.15"/>
        <rect x="12" y="8" width="16" height="6" rx="1" fill="#C9A96E" opacity="0.25"/>
        <rect x="18" y="4" width="4" height="4" rx="1" fill="#C9A96E"/>
        <rect x="11" y="20" width="4" height="8" rx="1" fill="#C9A96E" opacity="0.6"/>
        <rect x="18" y="20" width="4" height="8" rx="1" fill="#C9A96E" opacity="0.6"/>
        <rect x="25" y="20" width="4" height="8" rx="1" fill="#C9A96E" opacity="0.6"/>
      </svg>
    ),
    title: "Собственное производство",
    desc: "Полный цикл на собственном заводе — от распила камня до финальной полировки. Никаких посредников. Гранит и мрамор напрямую из карельских и уральских карьеров.",
    highlight: "Без посредников — цена ниже на 30%",
  },
  {
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="#C9A96E" strokeWidth="1.5" opacity="0.3"/>
        <path d="M14 20 L18 24 L26 16" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="9" r="2" fill="#C9A96E"/>
        <circle cx="31" cy="20" r="2" fill="#C9A96E" opacity="0.5"/>
        <circle cx="20" cy="31" r="2" fill="#C9A96E" opacity="0.5"/>
        <circle cx="9" cy="20" r="2" fill="#C9A96E" opacity="0.5"/>
      </svg>
    ),
    title: "Индивидуальный дизайн",
    desc: "Каждый памятник создаётся по вашему эскизу. Любая форма, фотопортрет, гравировка, орнамент. Наш художник разработает проект бесплатно.",
    highlight: "Бесплатная разработка эскиза",
  },
  {
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="#C9A96E" strokeWidth="1.5" opacity="0.3"/>
        <circle cx="20" cy="20" r="10" stroke="#C9A96E" strokeWidth="1" opacity="0.2"/>
        <line x1="20" y1="20" x2="20" y2="10" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round"/>
        <line x1="20" y1="20" x2="27" y2="23" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="2" fill="#C9A96E"/>
      </svg>
    ),
    title: "Сроки от 3 дней",
    desc: "Срочное изготовление без потери качества. Доставка по всей Москве и области. Установка в удобное для вас время — даже в выходные.",
    highlight: "Доставка и установка включены",
  },
  {
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 6 L23.5 14.5 L33 15.5 L26.5 22 L28.5 31.5 L20 27 L11.5 31.5 L13.5 22 L7 15.5 L16.5 14.5 Z" stroke="#C9A96E" strokeWidth="1.5" fill="#C9A96E" fillOpacity="0.1"/>
        <path d="M20 10 L22.5 16.5 L30 17.3 L24.8 22.2 L26.4 29.5 L20 26 L13.6 29.5 L15.2 22.2 L10 17.3 L17.5 16.5 Z" fill="#C9A96E" opacity="0.4"/>
      </svg>
    ),
    title: "Гарантия 5 лет",
    desc: "Официальная гарантия на все изделия — закрепляем договором. Если в течение 5 лет появятся дефекты по нашей вине — устраним бесплатно.",
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

function StatCounter({ value, label, index }: { value: string; label: string; index: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
      }}
    >
      <div style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: "clamp(2rem, 4vw, 2.8rem)",
        fontWeight: 700,
        color: "#2C2C2C",
        lineHeight: 1,
        marginBottom: "6px",
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: "0.75rem",
        color: "#888",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}>
        {label}
      </div>
    </div>
  );
}

function FeatureCard({ svg, title, desc, highlight, index }: {
  svg: React.ReactNode; title: string; desc: string; highlight: string; index: number;
}) {
  const { ref, visible } = useReveal(0.05);

  return (
    <div
      ref={ref}
      style={{
        background: "#ffffff",
        borderRadius: "8px",
        padding: "36px 32px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: `opacity 0.65s ease ${index * 0.12}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
      }}
    >
      {/* Gold accent line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "3px",
        background: "linear-gradient(90deg, #C9A96E, #e8c98a)",
      }} />

      {/* Icon */}
      <div style={{ marginBottom: "20px" }}>{svg}</div>

      <h3 style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: "1.2rem",
        fontWeight: 700,
        color: "#2C2C2C",
        marginBottom: "12px",
        lineHeight: 1.3,
      }}>
        {title}
      </h3>

      <p style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: "0.85rem",
        color: "#666",
        lineHeight: 1.75,
        marginBottom: "20px",
      }}>
        {desc}
      </p>

      {/* Highlight badge */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: "rgba(201,169,110,0.1)",
        border: "1px solid rgba(201,169,110,0.3)",
        borderRadius: "20px",
        padding: "5px 12px",
      }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C9A96E", flexShrink: 0 }} />
        <span style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "#b8934d",
          letterSpacing: "0.04em",
        }}>
          {highlight}
        </span>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const { ref: headRef, visible: headVisible } = useReveal(0.1);
  const { ref: statsRef, visible: statsVisible } = useReveal(0.1);
  const { ref: ctaRef, visible: ctaVisible } = useReveal(0.1);

  return (
    <section id="about" style={{ background: "#F5F5F0" }}>

      {/* Stats strip */}
      <div
        ref={statsRef}
        style={{
          background: "#2C2C2C",
          padding: "40px 24px",
        }}
      >
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
        }}
        className="stats-grid"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                textAlign: "center",
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? "none" : "translateY(16px)",
                transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`,
              }}
            >
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
                color: "#C9A96E",
                lineHeight: 1,
                marginBottom: "6px",
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "88px 24px 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div
            ref={headRef}
            style={{
              textAlign: "center",
              marginBottom: "64px",
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? "none" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
              <span style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#C9A96E",
                fontWeight: 500,
              }}>
                О компании
              </span>
              <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
            </div>
            <h2 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#2C2C2C",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}>
              Почему выбирают Монумент Сервис
            </h2>
            <p style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.95rem",
              color: "#666",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}>
              Более 12 лет мы помогаем семьям создать достойный мемориал.
              Собственное производство — гарантия качества и честных цен.
            </p>
          </div>

          {/* Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
            marginBottom: "56px",
          }}>
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
                padding: "14px 44px",
                borderRadius: "3px",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                marginBottom: "36px",
              }}
            >
              Заказать памятник
            </a>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 6px", justifyContent: "center", alignItems: "center" }}>
              <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.78rem", color: "#999", marginRight: "4px" }}>
                Виды памятников:
              </span>
              {CATALOG_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.78rem",
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
