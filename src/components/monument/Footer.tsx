export default function Footer() {
  return (
    <footer style={{
      background: "#2C2C2C",
      borderTop: "1px solid rgba(201,169,110,0.15)",
      padding: "48px 24px 36px",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Logo */}
        <img
          src="https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/bucket/b43853ec-1979-4ba6-976f-5ea9bd550f70.png"
          alt="Монумент Сервис"
          style={{
            height: "52px",
            width: "auto",
            display: "block",
            margin: "0 auto 24px",
            filter: "brightness(0) invert(1)",
            opacity: 0.85,
          }}
        />

        {/* Divider */}
        <div style={{ width: "48px", height: "1px", background: "#C9A96E", margin: "0 auto 24px", opacity: 0.6 }} />

        {/* Links */}
        <div style={{ display: "flex", gap: "8px 24px", justifyContent: "center", flexWrap: "wrap", marginBottom: "28px" }}>
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
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                letterSpacing: "0.08em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C9A96E"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Phone */}
        <a
          href="tel:+74951234567"
          style={{
            display: "inline-block",
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#C9A96E",
            textDecoration: "none",
            marginBottom: "28px",
            letterSpacing: "0.02em",
          }}
        >
          +7 (495) 123-45-67
        </a>

        {/* Copyright */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "24px" }}>
          <p style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.25)",
            lineHeight: 1.7,
            marginBottom: "10px",
          }}>
            © Все права защищены. Монумент Сервис 2026 г. Памятники на заказ и оптом.
            <br />
            Информация на сайте не является публичной офертой.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            {["Политика конфиденциальности", "Пользовательское соглашение"].map((t) => (
              <a
                key={t}
                href="#"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.2)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.2)"; }}
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
