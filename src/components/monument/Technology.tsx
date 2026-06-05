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

const STEPS = [
  {
    num: "01",
    title: "Выбор и распил камня",
    desc: "Гранит габбро-диабаз поставляем напрямую из Карелии. Распил выполняется на гидравлическом станке с точностью до 1 мм.",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/bd058c8c-f78e-4caa-92bd-45c4035cc29d.jpg",
  },
  {
    num: "02",
    title: "Фрезеровка и обработка",
    desc: "3D-фрезер с ЧПУ формирует профиль изделия. Точная обработка краёв, выборка рельефа, подготовка поверхности под полировку.",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/c610a505-eef0-4b71-a2a2-5ef3b90c2b54.jpg",
  },
  {
    num: "03",
    title: "Полировка",
    desc: "Поверхность шлифуется алмазными кругами до зеркального блеска. Наносится водоотталкивающее покрытие для защиты камня.",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/7b2498f4-62db-4a5f-9fac-9cf52b6e99c2.jpg",
  },
  {
    num: "04",
    title: "Гравировка",
    desc: "Лазерная гравировка портрета, надписей, орнаментов. Финальная доводка вручную художником для точности деталей.",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/fd6cf517-03de-4ebd-af37-07aba4435c69.jpg",
  },
  {
    num: "05",
    title: "Сборка и упаковка",
    desc: "Памятник комплектуется подставкой и цветочником. Упаковывается в защитную стрейч-плёнку для безопасной доставки.",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/209f247c-c3fa-4ae5-9570-5cf3cd358d64.jpg",
  },
];

function TimelineStep({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const { ref, visible } = useReveal(0.1);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: "0",
        marginBottom: "0",
        position: "relative",
      }}
      className="timeline-step"
    >
      {/* Left column */}
      <div
        style={{
          flex: 1,
          padding: "56px 48px 56px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "right",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateX(-32px)",
          transition: `opacity 0.65s ease ${index * 0.1}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
        }}
        className="timeline-left"
      >
        {isEven ? (
          <>
            <span style={stepNumStyle}>{step.num}</span>
            <h3 style={stepTitleStyle}>{step.title}</h3>
            <p style={stepDescStyle}>{step.desc}</p>
          </>
        ) : (
          <div style={imgWrapStyle}>
            <img src={step.image} alt={step.title} style={imgStyle} loading="lazy" />
          </div>
        )}
      </div>

      {/* Center line */}
      <div style={{ width: "80px", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ flex: 1, width: "1px", background: "rgba(201,169,110,0.2)" }} />
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: visible ? "#C9A96E" : "#e5e5e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: `background 0.4s ease ${index * 0.1 + 0.3}s`,
            boxShadow: visible ? "0 0 0 6px rgba(201,169,110,0.15)" : "none",
          }}
        >
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#fff" }}>
            {step.num}
          </span>
        </div>
        <div style={{ flex: 1, width: "1px", background: "rgba(201,169,110,0.2)" }} />
      </div>

      {/* Right column */}
      <div
        style={{
          flex: 1,
          padding: "56px 0 56px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateX(32px)",
          transition: `opacity 0.65s ease ${index * 0.1 + 0.05}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.1 + 0.05}s`,
        }}
        className="timeline-right"
      >
        {isEven ? (
          <div style={imgWrapStyle}>
            <img src={step.image} alt={step.title} style={imgStyle} loading="lazy" />
          </div>
        ) : (
          <>
            <span style={{ ...stepNumStyle, textAlign: "left" }}>{step.num}</span>
            <h3 style={{ ...stepTitleStyle, textAlign: "left" }}>{step.title}</h3>
            <p style={{ ...stepDescStyle, textAlign: "left" }}>{step.desc}</p>
          </>
        )}
      </div>
    </div>
  );
}

const stepNumStyle: React.CSSProperties = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: "3rem",
  fontWeight: 700,
  color: "rgba(201,169,110,0.2)",
  lineHeight: 1,
  marginBottom: "8px",
};

const stepTitleStyle: React.CSSProperties = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: "1.35rem",
  fontWeight: 700,
  color: "#2C2C2C",
  marginBottom: "12px",
  lineHeight: 1.3,
};

const stepDescStyle: React.CSSProperties = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "0.87rem",
  color: "#666",
  lineHeight: 1.75,
  maxWidth: "360px",
  marginLeft: "auto",
};

const imgWrapStyle: React.CSSProperties = {
  borderRadius: "4px",
  overflow: "hidden",
  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  maxWidth: "420px",
};

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "280px",
  objectFit: "cover",
  display: "block",
};

export default function Technology() {
  const { ref: headRef, visible: headVisible } = useReveal(0.15);
  const { ref: quoteRef, visible: quoteVisible } = useReveal(0.15);

  return (
    <section id="technology" style={{ background: "#F5F5F0", padding: "0 24px 80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            padding: "88px 0 72px",
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A96E", fontWeight: 500 }}>
              Производство
            </span>
            <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#2C2C2C", marginBottom: "14px" }}>
            Как создаются наши памятники
          </h2>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.9rem", color: "#777", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
            От камня до готового изделия — полный цикл на собственном производстве
          </p>
        </div>

        {/* Timeline */}
        <div>
          {STEPS.map((step, i) => (
            <TimelineStep key={step.num} step={step} index={i} />
          ))}
        </div>

        {/* Quote */}
        <div
          ref={quoteRef}
          style={{
            textAlign: "center",
            marginTop: "72px",
            padding: "40px 48px",
            background: "#2C2C2C",
            borderRadius: "4px",
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div style={{ width: "32px", height: "1px", background: "#C9A96E", margin: "0 auto 20px" }} />
          <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontStyle: "italic", color: "#ffffff", lineHeight: 1.6 }}>
            «Каждый памятник проходит тройной контроль качества»
          </p>
          <div style={{ width: "32px", height: "1px", background: "#C9A96E", margin: "20px auto 0" }} />
        </div>

      </div>
    </section>
  );
}
