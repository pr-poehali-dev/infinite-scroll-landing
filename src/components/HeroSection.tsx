export default function HeroSection() {
  return (
    <>
      <header
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100svh", padding: "0 24px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/5eeff636-ba38-4387-a127-e006b8d29cbf.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(18,8,3,0.82) 0%, rgba(20,10,4,0.72) 60%, rgba(16,8,4,0.88) 100%)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-7 max-w-xl mx-auto">
          <h1
            className="font-cormorant animate-hero-reveal"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 7rem)",
              fontWeight: 300,
              color: "hsl(40,38%,92%)",
              lineHeight: 0.95,
              letterSpacing: "-0.015em",
              animationDelay: "0.05s",
            }}
          >
            Mikee
          </h1>

          <p
            className="font-golos animate-fade-up"
            style={{
              color: "rgba(240,228,210,0.58)",
              fontSize: "0.78rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              animationDelay: "0.65s",
              maxWidth: "320px",
            }}
          >
            Авторская кухня · Живая атмосфера · Настоящий вкус
          </p>

          <p
            className="font-cormorant animate-fade-up"
            style={{
              color: "rgba(240,228,210,0.38)",
              fontSize: "0.95rem",
              letterSpacing: "0.08em",
              fontStyle: "italic",
              animationDelay: "0.8s",
            }}
          >
            Планета Земля
          </p>

          <div
            className="animate-fade-up flex flex-col items-center gap-2 mt-5"
            style={{ animationDelay: "1s" }}
          >
            <span
              className="font-golos text-xs"
              style={{ color: "rgba(240,228,210,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.65rem" }}
            >
              листайте вниз
            </span>
            <div className="animate-float-slow mt-1">
              <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                <rect x="5" y="1" width="4" height="9" rx="2" stroke="rgba(240,228,210,0.35)" strokeWidth="1.2" />
                <circle cx="7" cy="5" r="1.3" fill="rgba(240,228,210,0.45)" />
                <path d="M3 16l4 4 4-4" stroke="rgba(240,228,210,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery intro */}
      <div className="flex items-center justify-center py-10 sm:py-14">
        <div className="flex items-center gap-5">
          <div style={{ width: "36px", height: "1px", background: "hsl(var(--terracotta))", opacity: 0.4 }} />
          <span
            className="font-cormorant-sc text-xs tracking-widest"
            style={{ color: "hsl(var(--terracotta))", letterSpacing: "0.3em" }}
          >
            наша история в деталях
          </span>
          <div style={{ width: "36px", height: "1px", background: "hsl(var(--terracotta))", opacity: 0.4 }} />
        </div>
      </div>

      {/* Pull quote */}
      <div className="text-center px-6 max-w-2xl mx-auto mb-10 sm:mb-14">
        <p
          className="font-cormorant font-light italic"
          style={{ fontSize: "clamp(1.4rem,4vw,2.2rem)", color: "hsl(24,40%,22%)", lineHeight: 1.45 }}
        >
          «Хорошая еда — это любовь,<br className="hidden sm:block" /> которую можно почувствовать на вкус»
        </p>
        <p
          className="font-golos text-xs mt-4 uppercase tracking-widest"
          style={{ color: "hsl(var(--terracotta))", letterSpacing: "0.22em" }}
        >
          — шеф-повар
        </p>
      </div>
    </>
  );
}