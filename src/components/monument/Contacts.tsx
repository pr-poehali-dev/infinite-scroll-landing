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

const SOCIALS = [
  {
    label: "Telegram",
    href: "#",
    color: "#229ED9",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.06 14.316l-2.95-.924c-.64-.203-.654-.64.135-.948l11.57-4.461c.537-.194 1.006.131.747.265z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    color: "#25D366",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "ВКонтакте",
    href: "#",
    color: "#4C75A3",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z" />
      </svg>
    ),
  },
];

export default function Contacts() {
  const { ref: wrapRef, visible } = useReveal(0.08);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", contact: "Звонок", comment: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacts" style={{ background: "#F5F5F0", padding: "88px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A96E", fontWeight: 500 }}>
              Контакты
            </span>
            <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#2C2C2C" }}>
            Свяжитесь с нами
          </h2>
        </div>

        {/* Two columns */}
        <div
          ref={wrapRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "start",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
          className="contacts-grid"
        >
          {/* Left — info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

            <div style={{
              background: "#ffffff",
              borderRadius: "6px",
              padding: "36px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            }}>
              {[
                {
                  icon: "📞",
                  label: "Телефон",
                  value: "+7 (495) 123-45-67",
                  href: "tel:+74951234567",
                },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "info@monument-service.ru",
                  href: "mailto:info@monument-service.ru",
                },
                {
                  icon: "📍",
                  label: "Адрес",
                  value: "г. Москва, ул. Каменная, д. 15",
                  href: undefined,
                },
                {
                  icon: "🕐",
                  label: "Режим работы",
                  value: "Пн–Сб 9:00–20:00",
                  href: undefined,
                },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", gap: "16px", marginBottom: "22px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: "2px" }}>{row.icon}</span>
                  <div>
                    <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "3px" }}>
                      {row.label}
                    </p>
                    {row.href ? (
                      <a href={row.href} style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#2C2C2C", textDecoration: "none" }}>
                        {row.value}
                      </a>
                    ) : (
                      <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.95rem", fontWeight: 500, color: "#2C2C2C", margin: 0 }}>
                        {row.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Socials */}
              <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Мессенджеры и соцсети
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      title={s.label}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: s.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        textDecoration: "none",
                        transition: "transform 0.2s ease, opacity 0.2s ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right — form */}
          <div style={{
            background: "#ffffff",
            borderRadius: "6px",
            padding: "40px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
                <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "1.4rem", fontWeight: 700, color: "#2C2C2C", marginBottom: "10px" }}>
                  Спасибо!
                </h3>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.9rem", color: "#666", lineHeight: 1.6 }}>
                  Ваша заявка принята. Мы свяжемся с вами в течение 30 минут.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "1.35rem", fontWeight: 700, color: "#2C2C2C", marginBottom: "4px" }}>
                  Оставить заявку
                </h3>

                <div>
                  <label style={labelStyle}>Имя *</label>
                  <input
                    required
                    type="text"
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#C9A96E"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(0,0,0,0.12)"; }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Телефон *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#C9A96E"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(0,0,0,0.12)"; }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Удобный способ связи</label>
                  <select
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#C9A96E"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(0,0,0,0.12)"; }}
                  >
                    <option>Звонок</option>
                    <option>WhatsApp</option>
                    <option>Telegram</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Комментарий</label>
                  <textarea
                    rows={3}
                    placeholder="Расскажите о вашем запросе..."
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#C9A96E"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(0,0,0,0.12)"; }}
                  />
                </div>

                <button
                  type="submit"
                  className="ms-btn-gold"
                  style={{
                    padding: "14px",
                    borderRadius: "3px",
                    border: "none",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    marginTop: "4px",
                  }}
                >
                  Отправить заявку
                </button>

                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", color: "#aaa", lineHeight: 1.5, textAlign: "center" }}>
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "0.72rem",
  fontWeight: 500,
  color: "#888",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: "7px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "0.9rem",
  color: "#2C2C2C",
  background: "#fafafa",
  border: "1.5px solid rgba(0,0,0,0.12)",
  borderRadius: "4px",
  outline: "none",
  transition: "border-color 0.2s ease",
  boxSizing: "border-box",
};
