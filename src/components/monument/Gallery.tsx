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

const WORKS = [
  {
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/c18913de-c8c1-4107-8eee-97b4628ca0ec.jpg",
    title: "Гранитный памятник с портретом",
    material: "Габбро-диабаз",
    price: "38 000 ₽",
  },
  {
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/6a77ccf9-2bcb-4a6a-86d3-731517e1deb1.jpg",
    title: "Мраморный памятник с розой",
    material: "Белый мрамор",
    price: "42 000 ₽",
  },
  {
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/d29d9834-76e8-480d-94b0-2d67c27490e4.jpg",
    title: "Мемориальный комплекс",
    material: "Гранит + ограда + плитка",
    price: "95 000 ₽",
  },
  {
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/d3cc0e45-5d8c-426f-a45d-f25d4a1e9ee8.jpg",
    title: "Семейный памятник",
    material: "Чёрный гранит",
    price: "58 000 ₽",
  },
  {
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/47a9a215-799d-48f9-b8e2-ba9ab839e8b4.jpg",
    title: "3D-резной памятник «Ангел»",
    material: "Габбро-диабаз, резьба ЧПУ",
    price: "74 000 ₽",
  },
  {
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/6f70f37e-e4fc-4412-8c1c-d8a8b8b5d22e.jpg",
    title: "Элитный мемориал",
    material: "Редкий гранит + бронза",
    price: "от 180 000 ₽",
  },
];

function GalleryCard({ work, index }: { work: typeof WORKS[0]; index: number }) {
  const { ref, visible } = useReveal(0.05);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "4/3",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={work.image}
        alt={work.title}
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
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(44,44,44,0.82)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "24px",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      >
        <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", marginBottom: "6px", lineHeight: 1.3 }}>
          {work.title}
        </p>
        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginBottom: "10px", letterSpacing: "0.05em" }}>
          {work.material}
        </p>
        <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "1.1rem", fontWeight: 700, color: "#C9A96E" }}>
          {work.price}
        </p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { ref: headRef, visible: headVisible } = useReveal(0.15);

  return (
    <section id="gallery" style={{ background: "#ffffff", padding: "88px 24px" }}>
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
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A96E", fontWeight: 500 }}>
              Портфолио
            </span>
            <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#2C2C2C", marginBottom: "14px" }}>
            Наши работы
          </h2>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.9rem", color: "#777", maxWidth: "440px", margin: "0 auto", lineHeight: 1.7 }}>
            Наведите на фото, чтобы узнать материал и стоимость изделия
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
          className="gallery-grid"
        >
          {WORKS.map((work, i) => (
            <GalleryCard key={work.title} work={work} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <a
            href="#contacts"
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
            }}
          >
            Заказать такой же
          </a>
        </div>

      </div>
    </section>
  );
}
