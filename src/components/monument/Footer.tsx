export default function Footer() {
  return (
    <footer style={{
      background: "#1a1a1a",
      borderTop: "1px solid rgba(201,169,110,0.1)",
      padding: "52px 24px 36px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Thematic background image — ghosted */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url('https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/b6657243-e79e-419a-8f32-54306c738352.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.06,
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        <img
          src="https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/bucket/b43853ec-1979-4ba6-976f-5ea9bd550f70.png"
          alt="Монумент Сервис"
          style={{
            height: "48px",
            width: "auto",
            display: "block",
            margin: "0 auto 20px",
            filter: "brightness(0) invert(1)",
            opacity: 0.75,
          }}
        />

        <div style={{ width: "40px", height: "1px", background: "#C9A96E", margin: "0 auto 20px", opacity: 0.5 }} />

        <div style={{ display: "flex", gap: "6px 20px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
          {[
            { label: "О нас", href: "#about" },
            { label: "Каталог", href: "#catalog" },
            { label: "Технология", href: "#technology" },
            { label: "Работы", href: "#gallery" },
            { label: "Контакты", href: "#contacts" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                letterSpacing: "0.08em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C9A96E"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="tel:+74951234567"
          style={{
            display: "inline-block",
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#C9A96E",
            textDecoration: "none",
            marginBottom: "28px",
          }}
        >
          +7 (495) 123-45-67
        </a>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "22px" }}>
          <p style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.2)",
            lineHeight: 1.7,
            marginBottom: "10px",
          }}>
            © Все права защищены. Монумент Сервис 2026 г. Памятники на заказ и оптом.<br />
            Информация на сайте не является публичной офертой.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            {["Политика конфиденциальности", "Пользовательское соглашение"].map((t) => (
              <a
                key={t}
                href="#"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "0.66rem",
                  color: "rgba(255,255,255,0.18)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.18)"; }}
              >
                {t}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}