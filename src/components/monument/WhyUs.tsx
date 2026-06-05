import { useEffect, useRef, useState } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const CARDS = [
  {
    icon: "🏛️",
    title: "Собственное производство",
    desc: "Контроль качества на каждом этапе. Гранит и мрамор напрямую из карельских и уральских карьеров.",
  },
  {
    icon: "🎨",
    title: "Индивидуальный дизайн",
    desc: "Разработаем эскиз с учётом всех пожеланий. Любая форма, цвет, гравировка, портрет.",
  },
  {
    icon: "⏱️",
    title: "Сроки от 3 дней",
    desc: "Срочное изготовление без потери качества. Доставка и установка в удобное время.",
  },
  {
    icon: "💎",
    title: "Гарантия 5 лет",
    desc: "На все изделия. Закрепляем договором.",
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

function FeatureCard({
  icon,
  title,
  desc,
  index,
}: {
  icon: string;
  title: string;
  desc: string;
  index: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className="ms-card"
      style={{
        background: "#ffffff",
        borderRadius: "6px",
        padding: "32px 28px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        borderTop: "3px solid #C9A96E",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
      }}
    >
      <div
        style={{
          fontSize: "2.2rem",
          marginBottom: "16px",
          lineHeight: 1,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "#2C2C2C",
          marginBottom: "10px",
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.85rem",
          color: "#555",
          lineHeight: 1.65,
          fontWeight: 400,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

export default function WhyUs() {
  const { ref: headRef, visible: headVisible } = useReveal();
  const { ref: ctaRef, visible: ctaVisible } = useReveal();

  return (
    <section
      id="about"
      style={{
        background: "#F5F5F0",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: "64px",
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
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
              О компании
            </span>
            <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
          </div>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#2C2C2C",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Почему выбирают Монумент Сервис
          </h2>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.95rem",
              color: "#666",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Более 12 лет мы помогаем семьям создать достойный мемориал.
            Собственное производство — гарантия качества и честных цен.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            marginBottom: "56px",
          }}
        >
          {CARDS.map((card, i) => (
            <FeatureCard key={card.title} {...card} index={i} />
          ))}
        </div>

        {/* CTA + catalog links */}
        <div
          ref={ctaRef}
          style={{
            textAlign: "center",
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          <a
            href="#catalog"
            className="ms-btn-gold"
            style={{
              display: "inline-block",
              padding: "14px 40px",
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

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 6px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.78rem",
                color: "#999",
                marginRight: "4px",
              }}
            >
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
                {i < CATALOG_LINKS.length - 1 && (
                  <span style={{ color: "#ccc", marginLeft: "6px" }}>·</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
