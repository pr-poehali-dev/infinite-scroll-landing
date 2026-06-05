import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "О нас", href: "#about" },
  { label: "Технология", href: "#technology" },
  { label: "Работы", href: "#gallery" },
  { label: "Контакты", href: "#contacts" },
];

const CATALOG_ITEMS = [
  { label: "Памятники из гранита", href: "#granite" },
  { label: "Памятники из мрамора", href: "#marble" },
  { label: "Комбинированные", href: "#combined" },
  { label: "Семейные (двойные)", href: "#family" },
  { label: "С крестом", href: "#cross" },
  { label: "Мусульманские", href: "#muslim" },
  { label: "С аркой", href: "#arch" },
  { label: "Резные 3D", href: "#carved" },
  { label: "Мемориальные комплексы", href: "#memorial" },
  { label: "Элитные памятники", href: "#elite" },
];

const SOCIALS = [
  {
    label: "Telegram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.06 14.316l-2.95-.924c-.64-.203-.654-.64.135-.948l11.57-4.461c.537-.194 1.006.131.747.265z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "VK",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z" />
      </svg>
    ),
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
    setCatalogOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
        transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Logo */}
        <a href="#top" style={{ textDecoration: "none", flexShrink: 0 }}>
          <img
            src="https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/bucket/0243199c-d156-4157-b0e4-24aaf81aac9d.png"
            alt="Монумент Сервис"
            style={{
              height: "88px",
              width: "auto",
              display: "block",
              maxWidth: "420px",
            }}
          />
        </a>

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            flex: 1,
            justifyContent: "center",
          }}
          className="hidden lg:flex"
        >
          <a href="#about" style={navLinkStyle}>О нас</a>

          {/* Catalog dropdown */}
          <div className="ms-dropdown-trigger" style={{ position: "relative" }}>
            <button
              style={{
                ...navLinkStyle,
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Каталог
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.5 }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="ms-dropdown">
              {CATALOG_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={dropdownLinkStyle}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#faf9f7";
                    (e.currentTarget as HTMLElement).style.color = "#C9A96E";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#2C2C2C";
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} style={navLinkStyle}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Phone + Socials */}
        <div
          className="hidden lg:flex"
          style={{ alignItems: "center", gap: "12px", flexShrink: 0 }}
        >
          <a
            href="tel:+74951234567"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#2C2C2C",
              textDecoration: "none",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            +7 (495) 123-45-67
          </a>
          <div style={{ display: "flex", gap: "6px" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b6b6b",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#C9A96E";
                  (e.currentTarget as HTMLElement).style.background = "rgba(201,169,110,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#6b6b6b";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Burger */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
          aria-label="Меню"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "#2C2C2C",
                borderRadius: "2px",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform:
                  menuOpen && i === 0
                    ? "translateY(7px) rotate(45deg)"
                    : menuOpen && i === 2
                    ? "translateY(-7px) rotate(-45deg)"
                    : menuOpen && i === 1
                    ? "scaleX(0)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "#ffffff",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            padding: "16px 24px 24px",
          }}
        >
          <a href="#about" onClick={handleNavClick} style={mobileNavLinkStyle}>О нас</a>

          <button
            onClick={() => setCatalogOpen(!catalogOpen)}
            style={{
              ...mobileNavLinkStyle,
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            Каталог
            <svg
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              style={{
                transform: catalogOpen ? "rotate(180deg)" : "none",
                transition: "transform 0.25s",
                opacity: 0.5,
              }}
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {catalogOpen && (
            <div style={{ paddingLeft: "16px", marginBottom: "4px" }}>
              {CATALOG_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  style={{
                    display: "block",
                    padding: "8px 0",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.82rem",
                    color: "#555",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={handleNavClick} style={mobileNavLinkStyle}>
              {item.label}
            </a>
          ))}

          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <a
              href="tel:+74951234567"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#2C2C2C",
                textDecoration: "none",
                display: "block",
                marginBottom: "12px",
              }}
            >
              +7 (495) 123-45-67
            </a>
            <div style={{ display: "flex", gap: "8px" }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{ color: "#6b6b6b", padding: "4px" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

const navLinkStyle: React.CSSProperties = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "0.82rem",
  fontWeight: 500,
  color: "#2C2C2C",
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: "4px",
  transition: "color 0.2s, background 0.2s",
  whiteSpace: "nowrap",
};

const dropdownLinkStyle: React.CSSProperties = {
  display: "block",
  padding: "10px 16px",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "0.82rem",
  color: "#2C2C2C",
  textDecoration: "none",
  transition: "background 0.2s, color 0.2s",
  borderBottom: "1px solid rgba(0,0,0,0.04)",
};

const mobileNavLinkStyle: React.CSSProperties = {
  display: "block",
  padding: "12px 0",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "#2C2C2C",
  textDecoration: "none",
  borderBottom: "1px solid rgba(0,0,0,0.07)",
};