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

const CONTACT_ITEMS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .97h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    label: "Телефон",
    value: "+7 (495) 123-45-67",
    href: "tel:+74951234567",
    accent: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email",
    value: "info@monumentservice.ru",
    href: "mailto:info@monumentservice.ru",
    accent: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Адрес",
    value: "г. Москва, ул. Каменная, д. 15",
    href: undefined,
    accent: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    label: "Режим работы",
    value: "Пн–Сб, 9:00–20:00",
    href: undefined,
    accent: false,
  },
];

const SOCIALS = [
  {
    label: "Telegram",
    href: "#",
    bg: "#229ED9",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.06 14.316l-2.95-.924c-.64-.203-.654-.64.135-.948l11.57-4.461c.537-.194 1.006.131.747.265z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    bg: "#25D366",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "ВКонтакте",
    href: "#",
    bg: "#4C75A3",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    bg: "#FF0000",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    label: "Rutube",
    href: "#",
    bg: "#2D3F8F",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 13.5l-6 3.5V7l6 3.5-6 3.5z"/>
      </svg>
    ),
  },
  {
    label: "MAX",
    href: "#",
    bg: "#7B2D8B",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 14l-3.5-5-3.5 5V8l7 8z"/>
      </svg>
    ),
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "0.88rem",
  color: "#2C2C2C",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "4px",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
  boxSizing: "border-box",
};

export default function Contacts() {
  const { ref: leftRef, visible: leftVisible } = useReveal(0.08);
  const { ref: rightRef, visible: rightVisible } = useReveal(0.08);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", contact: "Звонок", comment: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contacts"
      style={{
        background: "#1e1e1e",
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div style={{
        position: "absolute",
        top: "-200px",
        right: "-200px",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "88px 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A96E", fontWeight: 500 }}>
              Контакты
            </span>
            <div style={{ width: "32px", height: "1px", background: "#C9A96E" }} />
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#ffffff" }}>
            Свяжитесь с нами
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }} className="contacts-grid">

          {/* LEFT — info */}
          <div
            ref={leftRef}
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "none" : "translateX(-32px)",
              transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Contact cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {CONTACT_ITEMS.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    padding: "18px 22px",
                    background: item.accent ? "rgba(201,169,110,0.1)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${item.accent ? "rgba(201,169,110,0.3)" : "rgba(255,255,255,0.07)"}`,
                    borderRadius: "8px",
                    transition: "background 0.2s",
                  }}
                >
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: item.accent ? "#C9A96E" : "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.accent ? "#fff" : "rgba(255,255,255,0.5)",
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.95rem", fontWeight: 600, color: item.accent ? "#C9A96E" : "#ffffff", textDecoration: "none" }}>
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.95rem", fontWeight: 500, color: "#ffffff", margin: 0 }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>
                Мы в соцсетях и мессенджерах
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    title={s.label}
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: s.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                      transition: "transform 0.2s ease, opacity 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.12)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — form */}
          <div
            ref={rightRef}
            style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? "none" : "translateX(32px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "40px",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px", fontSize: "1.8rem",
                }}>✅</div>
                <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                  Заявка принята!
                </h3>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>
                  Мы свяжемся с вами в течение 30 минут.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ marginBottom: "8px" }}>
                  <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
                    Оставить заявку
                  </h3>
                  <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>
                    Ответим в течение 30 минут
                  </p>
                </div>

                {[
                  { key: "name", label: "Имя", type: "text", placeholder: "Ваше имя", required: true },
                  { key: "phone", label: "Телефон", type: "tel", placeholder: "+7 (___) ___-__-__", required: true },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ display: "block", fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>
                      {field.label}{field.required && " *"}
                    </label>
                    <input
                      required={field.required}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      style={{ ...inputStyle, color: "#ffffff" }}
                      onFocus={(e) => {
                        (e.target as HTMLElement).style.borderColor = "#C9A96E";
                        (e.target as HTMLElement).style.background = "rgba(201,169,110,0.05)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                        (e.target as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ display: "block", fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>
                    Способ связи
                  </label>
                  <select
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    style={{ ...inputStyle, color: "#ffffff", cursor: "pointer" }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#C9A96E"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
                  >
                    <option style={{ background: "#2c2c2c" }}>Звонок</option>
                    <option style={{ background: "#2c2c2c" }}>WhatsApp</option>
                    <option style={{ background: "#2c2c2c" }}>Telegram</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>
                    Комментарий
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Расскажите о вашем запросе..."
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "80px", color: "#ffffff" }}
                    onFocus={(e) => {
                      (e.target as HTMLElement).style.borderColor = "#C9A96E";
                      (e.target as HTMLElement).style.background = "rgba(201,169,110,0.05)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                      (e.target as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="ms-btn-gold"
                  style={{
                    padding: "15px",
                    borderRadius: "4px",
                    border: "none",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    marginTop: "4px",
                  }}
                >
                  Отправить заявку
                </button>

                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.2)", lineHeight: 1.5, textAlign: "center" }}>
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