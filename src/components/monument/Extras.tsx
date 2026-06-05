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

const ITEMS = [
  {
    icon: "🔒",
    title: "Оградки",
    desc: "Кованые и сварные ограды любой сложности. Металл с порошковым покрытием, устойчивым к коррозии.",
    price: "от 8 000 ₽",
  },
  {
    icon: "🏺",
    title: "Вазы и подсвечники",
    desc: "Гранитные, мраморные, керамические. Подходят к любому типу памятников.",
    price: "от 1 500 ₽",
  },
  {
    icon: "🪑",
    title: "Столы и лавки",
    desc: "Гранитные и деревянные. Прочные, устойчивы к любым погодным условиям.",
    price: "от 5 000 ₽",
  },
  {
    icon: "🧱",
    title: "Облицовка плиткой",
    desc: "Укладка тротуарной плитки на участке захоронения. Аккуратно, быстро, под ключ.",
    price: "от 3 000 ₽/м²",
  },
];

function ExtraCard({ item, index }: { item: typeof ITEMS[0]; index: number }) {
  const { ref, visible } = useReveal(0.05);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="ms-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: "6px",
        padding: "36px 28px",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.12)" : "0 2px 16px rgba(0,0,0,0.06)",
        borderBottom: `3px solid ${hovered ? "#C9A96E" : "transparent"}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, box-shadow 0.3s ease, border-color 0.3s ease`,
        cursor: "default",
      }}
    >
      <div style={{ fontSize: "2.4rem", marginBottom: "18px", lineHeight: 1 }}>{item.icon}</div>
      <h3 style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: "1.2rem",
        fontWeight: 700,
        color: "#2C2C2C",
        marginBottom: "10px",
      }}>
        {item.title}
      </h3>
      <p style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: "0.85rem",
        color: "#666",
        lineHeight: 1.7,
        marginBottom: "20px",
      }}>
        {item.desc}
      </p>
      <p style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: "1.15rem",
        fontWeight: 700,
        color: "#C9A96E",
      }}>
        {item.price}
      </p>
    </div>
  );
}

export default function Extras() {
  const { ref: headRef, visible: headVisible } = useReveal(0.15);

  return (
    <section style={{ background: "#F5F5F0", padding: "88px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

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
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A96E", fontWeight: 500 }}>
              Дополнительно
            </span>
            <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
          </div>
          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 700,
            color: "#2C2C2C",
            marginBottom: "14px",
          }}>
            Дополнительные товары и услуги
          </h2>
          <p style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.9rem",
            color: "#777",
            maxWidth: "460px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Всё для полного обустройства места захоронения в едином стиле
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
        }}>
          {ITEMS.map((item, i) => (
            <ExtraCard key={item.title} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
