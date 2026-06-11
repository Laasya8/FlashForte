export function UniversalLoader({ 
  titleStart = "IDEA", 
  titleEnd = "THON", 
  colorHex = "#f5c518", 
  colorRgb = "245,197,24" 
}) {
  return (
    <div className="loader-screen" style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#080810",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes loader-progress {
          0%   { width: 0%; opacity: 1; }
          80%  { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        @keyframes loader-pulse {
          0%, 100% { transform: scale(1);   opacity: 0.6; }
          50%       { transform: scale(1.08); opacity: 1;   }
        }
        @keyframes loader-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes loader-ring-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes loader-ring-spin-rev {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes loader-fade-out {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.04); }
        }
        @keyframes particle-drift {
          0%   { transform: translate(0, 0) scale(1);   opacity: 0.7; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
        }
        .loader-screen {
          animation: loader-fade-out 0.4s ease forwards;
          animation-delay: 1.2s;
          animation-fill-mode: forwards;
        }
      `}</style>

      {/* Background bloom */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 60% 55% at 50% 50%, rgba(${colorRgb},0.1) 0%, rgba(${colorRgb},0.05) 40%, transparent 70%)`,
        animation: "loader-pulse 2s ease-in-out infinite",
      }} />

      {/* Particle dots */}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle  = (i / 18) * 360;
        const radius = 140 + Math.random() * 120;
        const x      = Math.cos((angle * Math.PI) / 180) * radius;
        const y      = Math.sin((angle * Math.PI) / 180) * radius;
        const size   = 2 + Math.random() * 4;
        return (
          <div key={i} style={{
            position: "absolute",
            left: "50%", top: "50%",
            width: size, height: size,
            borderRadius: "50%",
            background: i % 3 === 0 ? colorHex : "rgba(255,255,255,0.6)",
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            boxShadow: i % 3 === 0 ? `0 0 6px rgba(${colorRgb},0.8)` : "none",
            animation: `particle-drift ${1.5 + Math.random()}s ease-out infinite`,
            "--dx": `${(Math.random() - 0.5) * 60}px`,
            "--dy": `${(Math.random() - 0.5) * 60}px`,
            animationDelay: `${Math.random() * 1.5}s`,
          }} />
        );
      })}

      {/* Outer spinning ring */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: 340, height: 340, borderRadius: "50%",
        border: `1px solid rgba(${colorRgb},0.15)`,
        transform: "translate(-50%, -50%)",
      }} />
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: 340, height: 340, borderRadius: "50%",
        border: "1.5px solid transparent",
        borderTopColor: `rgba(${colorRgb},0.5)`,
        borderRightColor: `rgba(${colorRgb},0.2)`,
        animation: "loader-ring-spin 2.5s linear infinite",
      }} />

      {/* Inner counter-spinning ring */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: 260, height: 260, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.06)",
        transform: "translate(-50%, -50%)",
      }} />
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: 260, height: 260, borderRadius: "50%",
        border: "1.5px solid transparent",
        borderBottomColor: `rgba(${colorRgb},0.35)`,
        borderLeftColor: `rgba(${colorRgb},0.15)`,
        animation: "loader-ring-spin-rev 3.5s linear infinite",
      }} />

      {/* Center content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", animation: "loader-float 3s ease-in-out infinite" }}>
        {/* Glow disc behind text */}
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          width: 180, height: 180, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${colorRgb},0.18) 0%, transparent 70%)`,
          filter: "blur(20px)",
        }} />

        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "clamp(3rem, 8vw, 5.5rem)",
          fontWeight: 900, color: "#ffffff",
          letterSpacing: "-0.02em", lineHeight: 1,
          textShadow: `0 0 40px rgba(${colorRgb},0.5), 0 0 80px rgba(${colorRgb},0.25)`,
          margin: 0,
          position: "relative",
        }}>
          {titleStart}<span style={{ color: colorHex }}>{titleEnd}</span>
        </h1>

        <p style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "0.72rem", letterSpacing: "0.45em",
          color: `rgba(${colorRgb},0.8)`,
          textTransform: "uppercase", marginTop: "0.9rem",
          fontWeight: 600, position: "relative",
        }}>
          Loading Reality
        </p>

        {/* Progress bar */}
        <div style={{
          marginTop: "1.25rem", width: 200,
          height: 2, background: "rgba(255,255,255,0.08)",
          borderRadius: 999, overflow: "hidden",
          position: "relative",
          marginInline: "auto",
        }}>
          <div style={{
            height: "100%", borderRadius: 999,
            background: `linear-gradient(90deg, ${colorHex}, #ffffff)`,
            boxShadow: `0 0 8px rgba(${colorRgb},0.7)`,
            animation: "loader-progress 1.3s ease-in-out forwards",
          }} />
        </div>
      </div>
    </div>
  );
}
