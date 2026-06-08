import { MapPin, Wifi, Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   StarField — static background stars
   ═══════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════
   PortalVideo — right-column portal
   ═══════════════════════════════════════════════════════════ */
function PortalVideo({ children }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <div
      className="relative flex items-center justify-center aspect-square mx-auto my-0 md:my-4 w-full max-w-[clamp(340px,85vw,600px)] lg:max-w-none lg:w-full"
    >
      {/* Outer Glow effects blending into background */}
      <div
        className="absolute rounded-full blur-[40px] mix-blend-screen z-0 inset-[-15%]"
        style={{
          background: "radial-gradient(circle at center, rgba(78, 187, 255, 0.12) 0%, rgba(166, 120, 255, 0.08) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 rounded-full blur-[20px] mix-blend-screen z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(166, 120, 255, 0.15) 0%, transparent 60%)",
        }}
      />
      <video
        ref={videoRef}
        src="/Portal Animation.webm"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover drop-shadow-[0_0_30px_rgba(181,141,255,0.4)]"
        style={{
          WebkitMaskImage: "radial-gradient(circle at center, black 50%, transparent 75%)",
          maskImage: "radial-gradient(circle at center, black 50%, transparent 75%)",
        }}
      />
      {/* Overlay container so you can put a logo in the portal later */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Global Easing & Timing Constants
   ═══════════════════════════════════════════════════════════ */
const BUTTERY_EASE = [0.16, 1, 0.3, 1];
const PHASE3_DURATION = 1.2; // "Buttery" prolonged fade duration

/* ═══════════════════════════════════════════════════════════
   Phase 1: Portal Fade-In — T=0s, 1.5s duration
   Anchors the layout by appearing first.
   ═══════════════════════════════════════════════════════════ */
const portalVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: BUTTERY_EASE,
      delay: 0, // T=0s — the very first thing
    },
  },
};

/* ═══════════════════════════════════════════════════════════
   Phase 2: Left Column Stagger — T=0.5s
   Begins while portal is still fading in, drawing the eye
   to event details. Parent orchestrator with 0.25s stagger.
   ═══════════════════════════════════════════════════════════ */
const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,  // breathing room between children
      delayChildren: 0.5,     // Phase 2 starts at T=0.5s
    },
  },
};

// Badge & Title: slide-in from right (x: 20 → 0)
const slideFromRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: PHASE3_DURATION,
      ease: BUTTERY_EASE,
    },
  },
};

// Description + Tagline: slide-up (y: 20 → 0)
const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: PHASE3_DURATION,
      ease: BUTTERY_EASE,
    },
  },
};

// CTA & Card: scale-up (0.95 → 1.0)
const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: PHASE3_DURATION,
      ease: BUTTERY_EASE,
    },
  },
};

// 2K26 divider: container fade-in
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: PHASE3_DURATION,
      ease: BUTTERY_EASE,
    },
  },
};

// Divider lines: scaleX expansion
const dividerLineVariant = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: PHASE3_DURATION,
      ease: BUTTERY_EASE,
    },
  },
};

/* ═══════════════════════════════════════════════════════════
   HeroPage Component
   ═══════════════════════════════════════════════════════════ */
export function HeroPage() {
  // Ambient loop activation: fires once all Phase 3 children finish
  const [entranceComplete, setEntranceComplete] = useState(false);

  return (
    <div className="relative w-full max-w-[100vw] overflow-x-hidden flex flex-col min-h-[100dvh] font-inter">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-space-radial" />
      <StarField />

      {/* Background decorations wrapper to prevent overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Planet upper-right decoration */}
        <div
          style={{
            position: "absolute",
            top: "-30px",
            right: "-60px",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, #0B1120 0%, #050816 50%, #030712 100%)",
            boxShadow: "0 0 50px rgba(143,107,255,0.15)", // Subtle purple glow
            opacity: 0.6,
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
            zIndex: 0,
          }}
        />
      </div>


      {/* ── Hero Body ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:justify-between items-center lg:items-start px-5 pt-4 md:pt-8 lg:pt-6 pb-12 lg:pb-24 w-full max-w-[1400px] mx-auto">

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            LEFT COLUMN — Phase 2: Staggered Content Reveal
            T=0.5s start, 0.25s stagger, 1.2s per element
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div
          className="contents lg:flex lg:flex-col lg:items-center lg:w-[40%] lg:max-w-[560px] text-center lg:pl-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => setEntranceComplete(true)}
        >

          {/* ─── 1. Top Badge: CSI VNRVJIET — slideFromRight ─── */}
          <motion.div
            className="order-1 flex justify-center items-center gap-1 mb-3 w-full text-[10px] text-[#C8D3F5]"
            variants={slideFromRight}
          >
            <div className="w-[12px] h-[12px] rounded-full border border-[#3FE0FF] shrink-0 shadow-[0_0_4px_rgba(63,224,255,0.4)]" style={{ background: "radial-gradient(circle, #3FE0FF 0%, #050816 100%)" }} />
            <span className="whitespace-nowrap font-semibold tracking-[0.02em] text-[clamp(10px,2vw,12px)]">
              Computer Society of India, VNRVJIET
            </span>
          </motion.div>

          {/* ─── 2. FLASHFORTE Title — slideFromRight ─── */}
          <motion.h1
            className={`order-2 font-orbitron text-[clamp(38px,7vw,65px)] font-black text-[#F8FAFC] tracking-[0.06em] text-glow m-0 leading-[1.05] ${entranceComplete ? "animate-title-glow" : ""}`}
            variants={slideFromRight}
          >
            FLASHFORTE
          </motion.h1>

          {/* ─── 3. 2K26 Divider — lines expand, text fades ─── */}
          <motion.div
            className="order-3 flex justify-center items-center gap-[clamp(8px,2vw,16px)] w-full font-orbitron text-[clamp(26px,5vw,48px)] font-black tracking-[0.12em] mt-0 mb-4"
            variants={fadeIn}
          >
            {/* Violet line and circle on left — scaleX entrance */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <motion.div
                style={{
                  width: "clamp(20px, 4vw, 50px)",
                  height: "2px",
                  background: "linear-gradient(90deg, transparent 0%, #8F6BFF 100%)",
                  transformOrigin: "right center",
                }}
                variants={dividerLineVariant}
              />
              <motion.div
                style={{
                  width: "clamp(6px, 1.5vw, 10px)",
                  height: "clamp(6px, 1.5vw, 10px)",
                  borderRadius: "50%",
                  background: "#8F6BFF",
                  boxShadow: "0 0 8px rgba(143, 107, 255, 0.6)",
                }}
                variants={fadeIn}
              />
            </div>

            {/* 2K26 text */}
            <motion.span 
              variants={fadeIn}
              style={{
                background: "linear-gradient(90deg, #8F6BFF 0%, #42B7FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              2K26
            </motion.span>

            {/* Cyan line and circle on right — scaleX entrance */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <motion.div
                style={{
                  width: "clamp(6px, 1.5vw, 10px)",
                  height: "clamp(6px, 1.5vw, 10px)",
                  borderRadius: "50%",
                  background: "#3FE0FF",
                  boxShadow: "0 0 8px rgba(63, 224, 255, 0.6)",
                }}
                variants={fadeIn}
              />
              <motion.div
                style={{
                  width: "clamp(20px, 4vw, 50px)",
                  height: "2px",
                  background: "linear-gradient(90deg, #3FE0FF 0%, transparent 100%)",
                  transformOrigin: "left center",
                }}
                variants={dividerLineVariant}
              />
            </div>
          </motion.div>

          {/* ─── 4. Tagline — slideUp ─── */}
          <motion.p
            className="order-5 w-full mt-4 mb-2 lg:mt-6 lg:mb-4 text-[#FFFFFF] text-[clamp(20px,4vw,32px)] font-extrabold leading-[1.3] tracking-[0.01em]"
            variants={slideUp}
          >
            One Event.{" "}
            <span className="bg-gradient-to-r from-[#8F6BFF] to-[#3FE0FF] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Many Realities.
            </span>
          </motion.p>

          {/* ─── 5. Description Text — slideUp ─── */}
          <motion.p
            className="order-6 w-full mx-auto mb-6 lg:mb-8 text-[#C8D3F5] text-[clamp(14px,2vw,17px)] leading-[1.6] max-w-[480px]"
            variants={slideUp}
          >
            Step into a universe of ideas, innovation,
            <br />
            games, voices, and designs.
            <br />
            Where imagination meets impact.
          </motion.p>

          {/* ─── 6. CTA Button — scaleUp entrance → gradient pan loop ─── */}
          <motion.div
            className="order-7 flex justify-center w-full mb-6 lg:mb-8"
            variants={scaleUp}
          >
            <Link
              to="/registration-test"
              className={`flex items-center justify-center gap-2 w-full max-w-[320px] px-10 py-4 rounded-[50px] border-none text-[#FFFFFF] text-[clamp(15px,2vw,17px)] font-bold tracking-[0.02em] cursor-pointer no-underline shadow-[0_4px_30px_rgba(66,183,255,0.3),inset_0_0_15px_rgba(143,107,255,0.5)] ${entranceComplete ? "animate-cta-gradient" : ""}`}
              style={{
                background: entranceComplete
                  ? undefined // CSS class takes over for gradient pan
                  : "linear-gradient(90deg, #8F6BFF 0%, #42B7FF 50%, #3FE0FF 100%)",
              }}
            >
              <span className="text-[12px]">✦</span> Enter the Multiverse{" "}
              <span>→</span>
            </Link>
          </motion.div>

          {/* ─── 7. Date/Time Card — scaleUp entrance → levitation loop ─── */}
          <motion.div
            className="order-8 flex w-full mx-auto lg:max-w-md justify-center mt-2"
            variants={scaleUp}
          >
            <div className={`w-full lg:w-fit mt-2 lg:mt-0 glass-card px-6 py-5 rounded-[16px] ${entranceComplete ? "animate-card-levitate" : ""}`}>
              <div className="flex items-center gap-4">
                {/* Date block */}
                <div className="flex items-start gap-3 flex-1">
                  <Calendar size={16} color="#8F6BFF" className="mt-[3px] shrink-0" />
                  <div>
                    <div className="text-[#C8D3F5] text-[10px] mb-1">
                      June 2026
                    </div>
                    <div className="flex items-end gap-3">
                      <div>
                        <div className="text-[#F8FAFC] text-[24px] font-extrabold leading-none">
                          26
                        </div>
                        <div className="text-[#CBD5E1] text-[10px] tracking-[0.05em]">
                          FRI
                        </div>
                      </div>
                      <div className="text-[#CBD5E1] text-[14px] mb-[6px]">–</div>
                      <div>
                        <div className="text-[#F8FAFC] text-[24px] font-extrabold leading-none">
                          27
                        </div>
                        <div className="text-[#CBD5E1] text-[10px] tracking-[0.05em]">
                          SAT
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-[1px] h-[52px] bg-[rgba(63,224,255,0.3)] shrink-0" />

                {/* Mode + Location */}
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <Wifi size={14} color="#3FE0FF" />
                    <span className="text-[#F8FAFC] text-[12px] whitespace-nowrap">Online</span>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            RIGHT COLUMN — Phase 1: Portal Fade-In
            T=0s, 1.5s duration — anchors the layout first
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div
          className="order-4 lg:order-none lg:w-[55%] flex justify-center lg:justify-end -mt-2 -mb-2 lg:-mt-16 lg:mb-0 w-full relative lg:translate-x-12 lg:-translate-y-8"
          variants={portalVariants}
          initial="hidden"
          animate="visible"
          style={{ willChange: "opacity" }}
        >
          <PortalVideo className="w-[115%] lg:w-[130%]" />
        </motion.div>

      </div>
    </div>
  );
}
