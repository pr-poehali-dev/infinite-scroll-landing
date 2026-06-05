import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.08) {
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
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/d54a3c28-564d-4109-8157-f98060ee2585.jpg",
    title: "Оградки",
    desc: "Кованые и сварные ограды любой сложности. Металл с порошковым покрытием, устойчивым к коррозии и перепадам температур.",
    price: "от 8 000 ₽",
    tag: "Металл с защитным покрытием",
  },
  {
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/6f28b471-0a9f-4f43-8444-3a7446451e8f.jpg",
    title: "Вазы и подсвечники",
    desc: "Гранитные, мраморные, керамические изделия. Органично дополнят любой памятник и прослужат десятилетия.",
    price: "от 1 500 ₽",
    tag: "Натуральный камень",
  },
  {
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/f7c8ab93-4bda-49b3-b303-210871bcbdef.jpg",
    title: "Столы и лавки",
    desc: "Гранитные и деревянные комплекты. Устойчивы к морозам, не требуют ухода. Изготавливаем под размер участка.",
    price: "от 5 000 ₽",
    tag: "Гранит или дерево",
  },
  {
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/9bafbb93-c734-4fae-b1f0-2f4d8838c668.jpg",
    title: "Облицовка плиткой",
    desc: "Профессиональная укладка тротуарной плитки на участке захоронения. Аккуратно, быстро, под ключ — с подготовкой основания.",
    price: "от 3 000 ₽/м²",
    tag: "Под ключ с подготовкой",
  },
];

function ExtrasCard({ item, index }: { item: typeof ITEMS[0]; index: number }) {
  const { ref, visible } = useReveal(0.05);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: hovered ? "0 20px 56px rgba(0,0,0,0.14)" : "0 4px 20px rgba(0,0,0,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: `opacity 0.65s ease ${index * 0.12}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s, box-shadow 0.3s ease`,
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", height: "220px" }}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          background: "#2C2C2C",
          color: "#C9A96E",
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 700,
          fontSize: "0.9rem",
          padding: "6px 14px",
          borderRadius: "20px",
        }}>
          {item.price}
        </div>
      </div>

      <div style={{ padding: "28px 28px 32px" }}>
        <h3 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#2C2C2C",
          marginBottom: "10px",
        }}>
          {item.title}
        </h3>
        <p style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.84rem",
          color: "#666",
          lineHeight: 1.72,
          marginBottom: "18px",
        }}>
          {item.desc}
        </p>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(201,169,110,0.08)",
          border: "1px solid rgba(201,169,110,0.25)",
          borderRadius: "20px",
          padding: "4px 12px",
          marginBottom: "20px",
        }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C9A96E", flexShrink: 0 }} />
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "#b8934d" }}>
            {item.tag}
          </span>
        </div>

        <div>
          <a
            href="#contacts"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#2C2C2C",
              textDecoration: "none",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              borderBottom: "1.5px solid #C9A96E",
              paddingBottom: "2px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C9A96E"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#2C2C2C"; }}
          >
            Узнать стоимость
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
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
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.9rem", color: "#777", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
            Всё для полного обустройства места захоронения в едином стиле — от ограды до плитки
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}>
          {ITEMS.map((item, i) => (
            <ExtrasCard key={item.title} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
