export function DesignAThonPage() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(ellipse 120% 60% at 50% 0%, #0B1120 0%, #050816 45%, #030712 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h1
        style={{
          fontFamily: "'Orbitron', 'Inter', sans-serif",
          fontSize: "clamp(32px, 6vw, 56px)",
          fontWeight: 900,
          color: "#F8FAFC",
          textAlign: "center",
          letterSpacing: "0.06em",
          textShadow: "0 0 20px rgba(66,183,255,0.4), 0 0 50px rgba(143,107,255,0.3)",
        }}
      >
        DESIGN-A-THON
      </h1>
      <p style={{ color: "#C8D3F5", marginTop: "16px" }}>Coming Soon...</p>
    </div>
  );
}
