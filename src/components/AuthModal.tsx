import { useState } from "react";

type Mode = "login" | "register";

interface AuthModalProps {
  onClose: () => void;
  initialMode?: Mode;
}

export default function AuthModal({ onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [phone, setPhone] = useState("");

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 0) return "";
    let result = "+7";
    if (digits.length > 1) result += " (" + digits.slice(1, 4);
    if (digits.length >= 4) result += ") " + digits.slice(4, 7);
    if (digits.length >= 7) result += "-" + digits.slice(7, 9);
    if (digits.length >= 9) result += "-" + digits.slice(9, 11);
    return result;
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(200,160,100,0.2)",
    borderRadius: "2px",
    padding: "12px 16px",
    color: "hsl(40,38%,92%)",
    fontFamily: '"Golos Text", sans-serif',
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.25s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: '"Golos Text", sans-serif',
    fontSize: "0.68rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "rgba(240,228,210,0.45)",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(12,6,2,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full mx-4"
        style={{
          maxWidth: "420px",
          background: "hsl(24,40%,13%)",
          border: "1px solid rgba(200,160,100,0.12)",
          borderRadius: "4px",
          padding: "40px 36px",
          animation: "item-appear 0.45s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "20px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(240,228,210,0.35)",
            fontSize: "1.3rem",
            lineHeight: 1,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(240,228,210,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,228,210,0.35)")}
        >
          ×
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "1.9rem",
              fontWeight: 300,
              color: "hsl(40,38%,90%)",
              letterSpacing: "0.05em",
            }}
          >
            Mikee
          </p>
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "hsl(16,68%,48%)",
              margin: "8px auto 0",
              opacity: 0.7,
            }}
          />
        </div>

        {/* Tabs */}
        <div
          className="flex mb-8"
          style={{
            borderBottom: "1px solid rgba(200,160,100,0.12)",
          }}
        >
          {(["login", "register"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 0 12px",
                fontFamily: '"Golos Text", sans-serif',
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: mode === m ? "hsl(40,38%,90%)" : "rgba(240,228,210,0.35)",
                borderBottom: mode === m ? "1.5px solid hsl(16,68%,48%)" : "1.5px solid transparent",
                marginBottom: "-1px",
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              {m === "login" ? "Войти" : "Регистрация"}
            </button>
          ))}
        </div>

        {mode === "login" ? (
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={labelStyle}>Логин</label>
              <input
                type="text"
                placeholder="ваш логин"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(200,160,100,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(200,160,100,0.2)")}
              />
            </div>
            <div>
              <label style={labelStyle}>Пароль</label>
              <input
                type="password"
                placeholder="••••••••"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(200,160,100,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(200,160,100,0.2)")}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: "6px",
                padding: "13px",
                background: "hsl(16,68%,48%)",
                border: "none",
                borderRadius: "2px",
                color: "hsl(40,38%,94%)",
                fontFamily: '"Golos Text", sans-serif',
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(16,68%,42%)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(16,68%,48%)")}
            >
              Войти
            </button>
          </form>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={labelStyle}>Имя</label>
              <input
                type="text"
                placeholder="как вас зовут"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(200,160,100,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(200,160,100,0.2)")}
              />
            </div>
            <div>
              <label style={labelStyle}>Номер телефона</label>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(200,160,100,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(200,160,100,0.2)")}
              />
            </div>
            <div>
              <label style={labelStyle}>Пароль</label>
              <input
                type="password"
                placeholder="придумайте пароль"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(200,160,100,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(200,160,100,0.2)")}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: "6px",
                padding: "13px",
                background: "hsl(16,68%,48%)",
                border: "none",
                borderRadius: "2px",
                color: "hsl(40,38%,94%)",
                fontFamily: '"Golos Text", sans-serif',
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(16,68%,42%)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(16,68%,48%)")}
            >
              Зарегистрироваться
            </button>

            <p
              style={{
                textAlign: "center",
                fontFamily: '"Golos Text", sans-serif',
                fontSize: "0.7rem",
                color: "rgba(240,228,210,0.25)",
                marginTop: "-4px",
              }}
            >
              Регистрируясь, вы соглашаетесь с условиями использования
            </p>
          </form>
        )}
      </div>
    </div>
  );
}