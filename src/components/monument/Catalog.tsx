import { useEffect, useRef, useState } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const ITEMS = [
  {
    id: "granite",
    title: "Памятники из гранита",
    subtitle: "Классика, проверенная временем",
    desc: "Памятники из натурального гранита габбро-диабаз. Высокая прочность, устойчивость к морозам, глубокий чёрный цвет. Срок службы — более 100 лет. Изготавливаем классические прямоугольные, овальные, фигурные стелы.",
    price: "от 15 000 ₽",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/131b07cf-dbc8-4851-9906-7ecf8b34bdfd.jpg",
  },
  {
    id: "marble",
    title: "Памятники из мрамора",
    subtitle: "Благородство и элегантность",
    desc: "Мрамор — светлая горная порода с цветными вкраплениями. Легко поддаётся обработке, позволяет создавать уникальные формы и скульптурные элементы. Высокая декоративность.",
    price: "от 25 000 ₽",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/d03f6a9a-71d3-4f8d-9bb8-087ba54d7981.jpg",
  },
  {
    id: "combined",
    title: "Комбинированные памятники",
    subtitle: "Сочетание гранита и мрамора",
    desc: "Монументы из разных цветов и материалов. Например, на чёрный гранитный памятник крепится белый мраморный крест. Уникальное оформление места захоронения за счёт контраста фактур и оттенков.",
    price: "от 35 000 ₽",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/000eede2-3f7d-469a-95d6-709cf94f28fd.jpg",
  },
  {
    id: "family",
    title: "Семейные (двойные) памятники",
    subtitle: "Для супружеских и родственных захоронений",
    desc: "Двойные стелы на общем фундаменте. Экономия места и средств. Возможность разместить две портретные гравировки, общая цветочница.",
    price: "от 45 000 ₽",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/80e2db11-f0b6-45f5-8d31-e5ba4e29e517.jpg",
  },
  {
    id: "cross",
    title: "Памятники с крестом",
    subtitle: "Православные надгробия",
    desc: "Памятники с гранитным крестом в верхней части стелы. Крест может быть как частью монолита, так и отдельным элементом. Строгий, традиционный дизайн.",
    price: "от 18 000 ₽",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/09914e9d-00a1-4136-a684-b9db37a7823d.jpg",
  },
  {
    id: "muslim",
    title: "Мусульманские памятники",
    subtitle: "С учётом религиозных традиций",
    desc: "Памятники с полумесяцем, восточным орнаментом, арабской вязью. Строгие формы, предпочтительно из тёмного гранита. Соблюдение всех канонов.",
    price: "от 15 000 ₽",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/aa7790ea-cf2c-44c8-a705-8aea0bdad045.jpg",
  },
  {
    id: "arch",
    title: "Памятники с аркой",
    subtitle: "Элегантная архитектурная форма",
    desc: "Стелы с арочным (полукруглым) верхом. Символизируют врата в вечность. Возможно комбинирование с крестом, портретом, орнаментом.",
    price: "от 20 000 ₽",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/18f7cbe8-518c-42e6-804e-5def61a79e05.jpg",
  },
  {
    id: "carved",
    title: "Резные 3D-памятники",
    subtitle: "Объёмная художественная резьба по камню",
    desc: "Памятники с трёхмерной резьбой: фигуры ангелов, цветы, портреты, иконы. Выполняются на станках с ЧПУ с последующей ручной доработкой художником.",
    price: "от 60 000 ₽",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/47a9a215-799d-48f9-b8e2-ba9ab839e8b4.jpg",
  },
  {
    id: "memorial",
    title: "Мемориальные комплексы",
    subtitle: "Обустройство места захоронения «под ключ»",
    desc: "Полный комплекс работ: памятник + ограда + стол + лавка + цветник + облицовка плиткой. Единый стиль, гармоничное сочетание всех элементов.",
    price: "от 80 000 ₽",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/78426d84-aa0c-4ebc-b867-ad007ea112e5.jpg",
  },
  {
    id: "elite",
    title: "Элитные памятники",
    subtitle: "Эксклюзивные проекты из редких пород камня",
    desc: "Монументы премиум-класса из редких пород гранита и мрамора. Скульптурные композиции, бронзовые элементы, художественная подсветка. Индивидуальный проект под ключ.",
    price: "от 150 000 ₽",
    image: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/6f70f37e-e4fc-4412-8c1c-d8a8b8b5d22e.jpg",
  },
];

function CatalogItem({
  item,
  index,
}: {
  item: (typeof ITEMS)[0];
  index: number;
}) {
  const { ref, visible } = useReveal();
  const isEven = index % 2 === 0;

  return (
    <div
      id={item.id}
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        background: isEven ? "#ffffff" : "#F5F5F0",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          minHeight: "420px",
        }}
        className="catalog-row"
      >
        {/* Image side */}
        <div
          style={{
            width: "48%",
            flexShrink: 0,
            overflow: "hidden",
            order: isEven ? 0 : 1,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : `translateX(${isEven ? "-30px" : "30px"})`,
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
          className="catalog-img-col"
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.6s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
          />
        </div>

        {/* Text side */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "56px 56px",
            order: isEven ? 1 : 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : `translateX(${isEven ? "30px" : "-30px"})`,
            transition: "opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
          className="catalog-text-col"
        >
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C9A96E",
              fontWeight: 500,
              marginBottom: "12px",
            }}
          >
            {item.subtitle}
          </p>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
              fontWeight: 700,
              color: "#2C2C2C",
              lineHeight: 1.2,
              marginBottom: "20px",
            }}
          >
            {item.title}
          </h2>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.88rem",
              color: "#555",
              lineHeight: 1.75,
              marginBottom: "28px",
              maxWidth: "440px",
            }}
          >
            {item.desc}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#2C2C2C",
              }}
            >
              {item.price}
            </span>
            <a
              href="#contacts"
              className="ms-btn-gold"
              style={{
                display: "inline-block",
                padding: "12px 32px",
                borderRadius: "3px",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Заказать
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Catalog() {
  const { ref: headRef, visible: headVisible } = useReveal();

  return (
    <section id="catalog">
      {/* Section header */}
      <div
        ref={headRef}
        style={{
          textAlign: "center",
          padding: "88px 24px 64px",
          background: "#2C2C2C",
          position: "relative",
          overflow: "hidden",
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {/* Stone texture */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/278e575a-54d3-4698-ade6-6bbfa3eb350a.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.05,
          pointerEvents: "none",
        }} />
        <div
          style={{
            display: "inline-flex",
            position: "relative",
            zIndex: 1,
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
            Продукция
          </span>
          <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
        </div>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: "14px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Каталог памятников
        </h2>
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.5)",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.7,
            position: "relative",
            zIndex: 1,
          }}
        >
          Более 10 видов изделий из натурального камня. Любой проект — от типового до эксклюзивного.
        </p>
      </div>

      {/* Items */}
      {ITEMS.map((item, i) => (
        <CatalogItem key={item.id} item={item} index={i} />
      ))}
    </section>
  );
}