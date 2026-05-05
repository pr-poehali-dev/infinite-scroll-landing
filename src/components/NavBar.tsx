interface NavBarProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function NavBar({ onLogin, onRegister }: NavBarProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 40,
        display: "flex",
        gap: "8px",
      }}
    >
      <button
        onClick={onLogin}
        style={{
          padding: "9px 20px",
          background: "rgba(18,8,3,0.7)",
          border: "1px solid rgba(200,160,100,0.25)",
          borderRadius: "2px",
          color: "hsl(40,38%,88%)",
          fontFamily: '"Golos Text", sans-serif',
          fontSize: "0.7rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          transition: "background 0.25s, border-color 0.25s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(18,8,3,0.9)";
          e.currentTarget.style.borderColor = "rgba(200,160,100,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(18,8,3,0.7)";
          e.currentTarget.style.borderColor = "rgba(200,160,100,0.25)";
        }}
      >
        Войти
      </button>
      <button
        onClick={onRegister}
        style={{
          padding: "9px 20px",
          background: "hsl(16,68%,48%)",
          border: "1px solid transparent",
          borderRadius: "2px",
          color: "hsl(40,38%,94%)",
          fontFamily: '"Golos Text", sans-serif',
          fontSize: "0.7rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "background 0.25s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(16,68%,42%)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(16,68%,48%)")}
      >
        Регистрация
      </button>
    </div>
  );
}
