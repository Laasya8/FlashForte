export function StarField() {
  const stableStars = [
    { id: 0, x: 5, y: 8, size: 1.2, opacity: 0.4 }, { id: 1, x: 15, y: 3, size: 0.8, opacity: 0.6 },
    { id: 2, x: 25, y: 12, size: 1.5, opacity: 0.3 }, { id: 3, x: 38, y: 5, size: 0.6, opacity: 0.5 },
    { id: 4, x: 55, y: 9, size: 1.0, opacity: 0.4 }, { id: 5, x: 68, y: 4, size: 1.3, opacity: 0.7 },
    { id: 6, x: 80, y: 11, size: 0.7, opacity: 0.3 }, { id: 7, x: 92, y: 6, size: 1.1, opacity: 0.5 },
    { id: 8, x: 10, y: 20, size: 0.9, opacity: 0.4 }, { id: 9, x: 30, y: 25, size: 1.4, opacity: 0.3 },
    { id: 10, x: 48, y: 18, size: 0.6, opacity: 0.6 }, { id: 11, x: 72, y: 22, size: 1.2, opacity: 0.4 },
    { id: 12, x: 88, y: 17, size: 0.8, opacity: 0.5 }, { id: 13, x: 3, y: 35, size: 1.0, opacity: 0.3 },
    { id: 14, x: 20, y: 40, size: 0.7, opacity: 0.7 }, { id: 15, x: 42, y: 32, size: 1.5, opacity: 0.4 },
    { id: 16, x: 62, y: 38, size: 0.9, opacity: 0.3 }, { id: 17, x: 78, y: 30, size: 1.1, opacity: 0.5 },
    { id: 18, x: 95, y: 42, size: 0.6, opacity: 0.4 }, { id: 19, x: 8, y: 55, size: 1.3, opacity: 0.3 },
    { id: 20, x: 35, y: 50, size: 0.8, opacity: 0.6 }, { id: 21, x: 58, y: 48, size: 1.0, opacity: 0.4 },
    { id: 22, x: 82, y: 52, size: 0.7, opacity: 0.5 }, { id: 23, x: 12, y: 65, size: 1.2, opacity: 0.3 },
    { id: 24, x: 28, y: 70, size: 0.9, opacity: 0.4 }, { id: 25, x: 50, y: 62, size: 1.5, opacity: 0.3 },
    { id: 26, x: 70, y: 68, size: 0.6, opacity: 0.7 }, { id: 27, x: 90, y: 60, size: 1.1, opacity: 0.4 },
    { id: 28, x: 6, y: 80, size: 0.8, opacity: 0.5 }, { id: 29, x: 22, y: 85, size: 1.3, opacity: 0.3 },
    { id: 30, x: 45, y: 78, size: 0.7, opacity: 0.6 }, { id: 31, x: 65, y: 82, size: 1.0, opacity: 0.4 },
    { id: 32, x: 85, y: 75, size: 1.2, opacity: 0.3 }, { id: 33, x: 15, y: 92, size: 0.9, opacity: 0.5 },
    { id: 34, x: 40, y: 95, size: 0.6, opacity: 0.4 }, { id: 35, x: 60, y: 90, size: 1.4, opacity: 0.3 },
    { id: 36, x: 75, y: 88, size: 0.8, opacity: 0.6 }, { id: 37, x: 96, y: 85, size: 1.1, opacity: 0.4 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-5]" style={{ contain: 'strict' }}>
      {stableStars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            background: "white",
            opacity: star.opacity,
            willChange: "opacity",
            animation: `starPulse ${2 + star.id % 3}s infinite alternate`,
            contain: 'layout style'
          }}
        />
      ))}
      <style>{`
        @keyframes starPulse {
          0% { opacity: 0.2; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
