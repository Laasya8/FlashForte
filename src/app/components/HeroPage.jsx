import { MapPin, Wifi, Calendar } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { Navbar } from "./Navbar.jsx";

function StarField() {
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            animation: `pulse ${2 + star.id % 3}s infinite alternate`
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

function PortalVideo({ children }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div 
      className="relative flex items-center justify-center aspect-square mx-auto my-0 md:my-4 w-full max-w-[clamp(340px,85vw,600px)] lg:max-w-none lg:w-[120%]"
    >
      {/* Outer Glow effects blending into background */}
      <div
        style={{
          position: "absolute",
          inset: "-15%",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(78, 187, 255, 0.12) 0%, rgba(166, 120, 255, 0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
          mixBlendMode: "screen",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "0%",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(166, 120, 255, 0.15) 0%, transparent 60%)",
          filter: "blur(20px)",
          mixBlendMode: "screen",
          zIndex: 0,
        }}
      />
      <video
        ref={videoRef}
        src="/Portal Animation.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          WebkitMaskImage: "radial-gradient(circle at center, black 50%, transparent 75%)",
          maskImage: "radial-gradient(circle at center, black 50%, transparent 75%)",
          filter: "drop-shadow(0 0 30px rgba(181, 141, 255, 0.4))",
        }}
      />
      {/* Overlay container so you can put a logo in the portal later */}
      <div 
        className="relative z-10 flex items-center justify-center"
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </div>
    </div>
  );
}

export function HeroPage() {
  return (
    <div
      className="relative w-full flex flex-col min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 120% 60% at 50% 0%, #0B1120 0%, #050816 45%, #030712 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <StarField />

      {/* Planet upper-right decoration */}
      <div
        style={{
          position: "absolute",
          top: "-30px",
          right: "-60px",
          width: "210px",
          height: "210px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #0B1120 0%, #050816 50%, #030712 100%)",
          boxShadow: "0 0 50px rgba(143,107,255,0.15)", // Subtle purple glow
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      {/* Small planet left */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "-20px",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 40%, #0B1120 0%, #030712 100%)",
          boxShadow: "0 0 20px rgba(66,183,255,0.1)", // Subtle blue glow
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />
      
      {/* Additional ambient depth layer */}
      <div 
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "20%",
          width: "60vw",
          height: "40vh",
          background: "radial-gradient(ellipse at center, rgba(143,107,255,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />


      {/* ── Hero Body ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:justify-between items-center lg:items-start px-5 pt-4 md:pt-8 lg:pt-6 pb-12 lg:pb-24 w-full max-w-[1400px] mx-auto">
        
        {/* LEFT COLUMN */}
        <div className="contents lg:flex lg:flex-col lg:items-start lg:w-[40%] lg:max-w-[560px] text-center lg:text-left lg:pl-12">
          
          {/* Center label */}
          <div
            className="order-1 flex items-center gap-1 mb-3"
            style={{ fontSize: "10px", color: "#C8D3F5" }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #3FE0FF 0%, #050816 100%)",
                border: "1px solid #3FE0FF",
                boxShadow: "0 0 4px rgba(63,224,255,0.4)",
                flexShrink: 0,
              }}
            />
            <span style={{ whiteSpace: "nowrap", fontWeight: 600, letterSpacing: "0.02em", fontSize: "clamp(10px, 2vw, 12px)" }}>
              Computer Society of India, VNRVJIET
            </span>
          </div>

          {/* FLASHFORTE */}
          <h1
            className="order-2"
            style={{
              fontFamily: "'Orbitron', 'Inter', sans-serif",
              fontSize: "clamp(38px, 7vw, 65px)",
              fontWeight: 900,
              color: "#F8FAFC",
              letterSpacing: "0.06em",
              textShadow: "0 0 20px rgba(66,183,255,0.4), 0 0 50px rgba(143,107,255,0.3)",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            FLASHFORTE
          </h1>

          {/* 2K26 */}
          <div
            className="order-3 flex justify-center lg:justify-start w-full"
            style={{
              fontFamily: "'Orbitron', 'Inter', sans-serif",
              fontSize: "clamp(26px, 5vw, 48px)",
              fontWeight: 900,
              background: "linear-gradient(90deg, #8F6BFF 0%, #42B7FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.12em",
              marginTop: "0px",
              marginBottom: "16px",
              alignItems: "center",
              gap: "clamp(8px, 2vw, 16px)",
            }}
          >
            {/* Violet line and circle on left */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "clamp(20px, 4vw, 50px)",
                  height: "2px",
                  background: "linear-gradient(90deg, transparent 0%, #8F6BFF 100%)",
                }}
              />
              <div
                style={{
                  width: "clamp(6px, 1.5vw, 10px)",
                  height: "clamp(6px, 1.5vw, 10px)",
                  borderRadius: "50%",
                  background: "#8F6BFF",
                  boxShadow: "0 0 8px rgba(143, 107, 255, 0.6)",
                }}
              />
            </div>

            {/* 2K26 text */}
            <span>2K26</span>

            {/* Cyan line and circle on right */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "clamp(6px, 1.5vw, 10px)",
                  height: "clamp(6px, 1.5vw, 10px)",
                  borderRadius: "50%",
                  background: "#3FE0FF",
                  boxShadow: "0 0 8px rgba(63, 224, 255, 0.6)",
                }}
              />
              <div
                style={{
                  width: "clamp(20px, 4vw, 50px)",
                  height: "2px",
                  background: "linear-gradient(90deg, #3FE0FF 0%, transparent 100%)",
                }}
              />
            </div>
          </div>

          {/* Tagline */}
          <p
            className="order-5 lg:text-left w-full mt-4 mb-2 lg:mt-6 lg:mb-4"
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(20px, 4vw, 32px)",
              fontWeight: 800,
              lineHeight: 1.3,
              letterSpacing: "0.01em",
            }}
          >
            One Event.{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #8F6BFF, #3FE0FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Many Realities.
            </span>
          </p>

          {/* Description */}
          <p
            className="order-6 lg:text-left w-full mx-auto lg:mx-0 mb-6 lg:mb-8"
            style={{
              color: "#C8D3F5",
              fontSize: "clamp(14px, 2vw, 17px)",
              lineHeight: 1.6,
              maxWidth: "480px",
            }}
          >
            Step into a universe of ideas, innovation,
            <br />
            games, voices, and designs.
            <br />
            Where imagination meets impact.
          </p>

          {/* Primary CTA */}
          <Link
            to="/registration-test"
            className="order-7 lg:w-fit mb-6 lg:mb-8"
            style={{
              background: "linear-gradient(90deg, #8F6BFF 0%, #42B7FF 50%, #3FE0FF 100%)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "50px",
              padding: "16px 40px",
              fontSize: "clamp(15px, 2vw, 17px)",
              fontWeight: 700,
              width: "100%",
              maxWidth: "320px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 30px rgba(66,183,255,0.3), inset 0 0 15px rgba(143,107,255,0.5)",
              letterSpacing: "0.02em",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.filter = "brightness(1.1)";
              e.currentTarget.style.boxShadow = "0 4px 40px rgba(66,183,255,0.5), inset 0 0 20px rgba(143,107,255,0.6)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter = "brightness(1)";
              e.currentTarget.style.boxShadow = "0 4px 30px rgba(66,183,255,0.3), inset 0 0 15px rgba(143,107,255,0.5)";
            }}
          >
            <span style={{ fontSize: "12px" }}>✦</span> Enter the Multiverse{" "}
            <span>→</span>
          </Link>

          {/* Event Details */}
          <div className="order-8 flex w-full mx-auto lg:mx-0 lg:max-w-md justify-center lg:justify-start mt-2">
            <div
              className="w-full lg:w-fit mt-2 lg:mt-0"
              style={{
                background: "rgba(5, 8, 22, 0.6)",
                border: "1px solid rgba(143, 107, 255, 0.3)",
                borderRadius: "16px",
                padding: "20px 24px",
                boxShadow: "0 0 30px rgba(143, 107, 255, 0.05)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center gap-4">
                {/* Date block */}
                <div className="flex items-start gap-3 flex-1">
                  <Calendar size={16} color="#8F6BFF" style={{ marginTop: "3px", flexShrink: 0 }} />
                  <div>
                    <div style={{ color: "#C8D3F5", fontSize: "10px", marginBottom: "4px" }}>
                      June 2026
                    </div>
                    <div className="flex items-end gap-3">
                      <div>
                        <div style={{ color: "#F8FAFC", fontSize: "24px", fontWeight: 800, lineHeight: 1 }}>
                          26
                        </div>
                        <div style={{ color: "#CBD5E1", fontSize: "10px", letterSpacing: "0.05em" }}>
                          FRI
                        </div>
                      </div>
                      <div style={{ color: "#CBD5E1", fontSize: "14px", marginBottom: "6px" }}>–</div>
                      <div>
                        <div style={{ color: "#F8FAFC", fontSize: "24px", fontWeight: 800, lineHeight: 1 }}>
                          27
                        </div>
                        <div style={{ color: "#CBD5E1", fontSize: "10px", letterSpacing: "0.05em" }}>
                          SAT
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: "1px",
                    height: "52px",
                    background: "rgba(63,224,255,0.3)",
                    flexShrink: 0,
                  }}
                />

                {/* Mode + Location */}
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <Wifi size={14} color="#3FE0FF" />
                    <span style={{ color: "#F8FAFC", fontSize: "12px", whiteSpace: "nowrap" }}>Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="order-4 lg:order-none lg:w-[55%] flex justify-center lg:justify-end -mt-2 -mb-2 lg:-mt-16 lg:mb-0 w-full relative lg:translate-x-12 lg:-translate-y-8">
          <PortalVideo className="w-[115%] lg:w-[130%]" />
        </div>

      </div>
    </div>
  );
}
