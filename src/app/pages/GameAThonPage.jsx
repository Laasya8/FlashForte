import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "framer-motion";
import {
  ChevronRight,
  Gamepad2,
  Brain,
  Users,
  Sword,
  Eye,
  Map,
  Keyboard,
  Pencil,
  MessageSquare,
  Zap,
  Trophy,
} from "lucide-react";
import { StarField } from "../components/HeroSection.jsx";

/* ═══════════════════════════════════════════════════════════
   Shared Motion Constants
   ═══════════════════════════════════════════════════════════ */
const BUTTERY_EASE = [0.16, 1, 0.3, 1];
const PHASE_DURATION = 1.2;

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: PHASE_DURATION, ease: BUTTERY_EASE },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: PHASE_DURATION, ease: BUTTERY_EASE },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: PHASE_DURATION, ease: BUTTERY_EASE },
  },
};

/* ═══════════════════════════════════════════════════════════
   scrollToSection
   Accounts for sticky navbar + breathing room.
   ═══════════════════════════════════════════════════════════ */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navbar = document.querySelector("nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 72;
  const BREATHING = 20;
  const top =
    el.getBoundingClientRect().top + window.scrollY - navbarHeight - BREATHING;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ═══════════════════════════════════════════════════════════
   ScrollReveal
   ═══════════════════════════════════════════════════════════ */
function ScrollReveal({ children, variants = fadeIn, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const adjustedVariants = delay
    ? {
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: { ...variants.visible.transition, delay },
        },
      }
    : variants;

  return (
    <motion.div
      ref={ref}
      variants={adjustedVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PortalVideo — MASKIMAGE BLEND (no geometric boundary)

   Key insight: overflow+borderRadius always produces a hard
   geometric circle that the eye can detect. mask-image with
   a radial gradient instead fades the actual pixels of every
   layer to transparent — there is no boundary, no edge,
   no circle. The portal simply dissolves into the page.

   All layers (video + color + screen + multiply) sit inside
   a wrapper that carries the mask. The mask is a radial
   gradient: fully opaque at center, fully transparent at
   ~72% radius. Because mask-image works in alpha space the
   page background shows through naturally.
   ═══════════════════════════════════════════════════════════ */
function PortalVideo({ className = "" }) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.6;
  }, []);

  // Radial mask: visible center, fades to nothing well before the edge
  const MASK =
    "radial-gradient(circle at center, black 30%, rgba(0,0,0,0.85) 48%, rgba(0,0,0,0.40) 62%, transparent 75%)";

  return (
    <div
      className={`relative flex items-center justify-center aspect-square mx-auto w-full max-w-[clamp(260px,75vw,480px)] lg:max-w-none lg:w-full ${className}`}
    >
      {/* Soft ambient energy — bleeds freely into the page bg */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-25%",
          zIndex: 0,
          filter: "blur(70px)",
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.18) 0%, rgba(143,107,255,0.10) 45%, transparent 72%)",
        }}
      />

      {/* Masked portal wrapper — all layers fade together via mask */}
      <div
        className="absolute"
        style={{
          inset: 0,
          zIndex: 1,
          maskImage: MASK,
          WebkitMaskImage: MASK,
        }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src="/Portal Animation.webm"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
            filter: "grayscale(1) brightness(1.15) contrast(1.05)",
          }}
        />

        {/* Color: purple-blue tint over grayscale video */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            mixBlendMode: "color",
            background:
              "conic-gradient(from 200deg at 45% 45%, #6366f1 0deg, #8b5cf6 60deg, #a855f7 100deg, #3b82f6 160deg, #6366f1 220deg, #8b5cf6 280deg, #3b82f6 360deg)",
            opacity: 0.92,
          }}
        />

        {/* Screen: inner luminous highlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            mixBlendMode: "screen",
            background:
              "radial-gradient(ellipse at 60% 38%, rgba(99,102,241,0.28) 0%, rgba(59,130,246,0.18) 35%, transparent 65%)",
          }}
        />

        {/* Multiply: darkens perimeter so fade starts from near-black */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            mixBlendMode: "multiply",
            background:
              "radial-gradient(circle at center, transparent 20%, rgba(5,8,22,0.60) 65%, rgba(5,8,22,0.95) 100%)",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GameArenaCard
   ═══════════════════════════════════════════════════════════ */
function GameArenaCard({ icon: Icon, title, description, accentColor = "#8F6BFF", delay = 0 }) {
  return (
    <ScrollReveal variants={scaleUp} delay={delay}>
      <div
        className="glass-card rounded-[20px] p-6 h-full flex flex-col gap-4 cursor-default"
        style={{
          transition:
            "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease",
          willChange: "transform",
        }}
        onMouseEnter={(e) => {
          const card = e.currentTarget;
          card.style.transform = "translateY(-8px) scale(1.02)";
          card.style.boxShadow = [
            `0 20px 60px ${accentColor}28`,
            `0 8px 24px ${accentColor}18`,
            `0 0 0 1px ${accentColor}44`,
            `inset 0 1px 0 ${accentColor}22`,
          ].join(", ");
          card.style.borderColor = `${accentColor}55`;
          const iconBox = card.querySelector(".icon-box");
          if (iconBox) {
            iconBox.style.boxShadow = `0 0 28px ${accentColor}55, 0 0 8px ${accentColor}33`;
            iconBox.style.background = `linear-gradient(135deg, ${accentColor}35 0%, ${accentColor}18 100%)`;
          }
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          card.style.transform = "";
          card.style.boxShadow = "";
          card.style.borderColor = "";
          const iconBox = card.querySelector(".icon-box");
          if (iconBox) {
            iconBox.style.boxShadow = "";
            iconBox.style.background = "";
          }
        }}
      >
        <div
          className="icon-box w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, ${accentColor}22 0%, ${accentColor}11 100%)`,
            border: `1px solid ${accentColor}44`,
            boxShadow: `0 0 16px ${accentColor}18`,
            transition: "box-shadow 0.4s ease, background 0.4s ease",
          }}
        >
          <Icon size={22} style={{ color: accentColor }} />
        </div>
        <div>
          <h3 className="text-[#F8FAFC] text-[16px] font-bold mb-2 tracking-[0.01em] leading-snug">
            {title}
          </h3>
          <p className="text-[#7E89A8] text-[13px] leading-[1.7]">{description}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ═══════════════════════════════════════════════════════════
   SkillCard
   ═══════════════════════════════════════════════════════════ */
function SkillCard({ icon: Icon, title, delay = 0 }) {
  return (
    <ScrollReveal variants={scaleUp} delay={delay}>
      <div
        className="glass-card rounded-[16px] px-5 py-6 flex flex-col items-center gap-3 text-center cursor-default"
        style={{
          transition:
            "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease",
          willChange: "transform",
        }}
        onMouseEnter={(e) => {
          const card = e.currentTarget;
          card.style.transform = "translateY(-7px) scale(1.04)";
          card.style.boxShadow = [
            "0 20px 50px rgba(143,107,255,0.22)",
            "0 6px 20px rgba(143,107,255,0.14)",
            "0 0 0 1px rgba(143,107,255,0.45)",
            "inset 0 1px 0 rgba(143,107,255,0.18)",
          ].join(", ");
          card.style.borderColor = "rgba(143,107,255,0.5)";
          const ring = card.querySelector(".skill-icon-ring");
          if (ring) {
            ring.style.boxShadow = "0 0 24px rgba(143,107,255,0.5), 0 0 8px rgba(66,183,255,0.3)";
            ring.style.background = "rgba(143,107,255,0.22)";
            ring.style.borderColor = "rgba(143,107,255,0.55)";
          }
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          card.style.transform = "";
          card.style.boxShadow = "";
          card.style.borderColor = "";
          const ring = card.querySelector(".skill-icon-ring");
          if (ring) {
            ring.style.boxShadow = "";
            ring.style.background = "";
            ring.style.borderColor = "";
          }
        }}
      >
        <div
          className="skill-icon-ring w-11 h-11 rounded-full flex items-center justify-center bg-[rgba(143,107,255,0.12)] border border-[rgba(143,107,255,0.25)] shadow-[0_0_12px_rgba(143,107,255,0.12)]"
          style={{ transition: "box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease" }}
        >
          <Icon size={20} color="#8F6BFF" />
        </div>
        <span className="text-[#C8D3F5] text-[13px] font-semibold tracking-[0.03em]">
          {title}
        </span>
      </div>
    </ScrollReveal>
  );
}

/* ═══════════════════════════════════════════════════════════
   GalleryCard — uniform aspect-ratio grid
   ═══════════════════════════════════════════════════════════ */
function GalleryCard({ caption, index, delay = 0 }) {
  const gradients = [
    "from-[#1a0d2e] via-[#0d1a3a] to-[#050816]",
    "from-[#0d1a3a] via-[#0a1628] to-[#1a0d2e]",
    "from-[#050816] via-[#1a0d2e] to-[#0d1a3a]",
    "from-[#0a1628] via-[#050816] to-[#1a0d2e]",
    "from-[#1a0d2e] via-[#050816] to-[#0a1628]",
    "from-[#0d1a3a] via-[#1a0d2e] to-[#050816]",
  ];

  return (
    <ScrollReveal variants={scaleUp} delay={delay}>
      <div
        className="relative aspect-[4/3] rounded-[16px] overflow-hidden group cursor-pointer"
        style={{ transition: "transform 0.35s ease" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % 6]}`} />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(143,107,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(143,107,255,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[rgba(143,107,255,0.12)] border border-[rgba(143,107,255,0.2)]">
            <Gamepad2 size={24} color="rgba(143,107,255,0.5)" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,8,22,0.9)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-[#F8FAFC] text-[13px] font-semibold">{caption}</p>
        </div>
        <div className="absolute inset-0 rounded-[16px] border border-[rgba(143,107,255,0)] group-hover:border-[rgba(143,107,255,0.4)] transition-colors duration-300 pointer-events-none" />
      </div>
    </ScrollReveal>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION DATA
   ═══════════════════════════════════════════════════════════ */
const ARENA_CARDS = [
  {
    icon: Brain,
    title: "Memory Challenge",
    description:
      "Push your recall to the limit. Sequences, patterns, and grids designed to train short-term and spatial memory under competitive pressure.",
    accentColor: "#8F6BFF",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Real-time co-op missions where communication and coordination matter as much as individual skill. Win together or fall apart.",
    accentColor: "#42B7FF",
  },
  {
    icon: Sword,
    title: "Strategy & Logic",
    description:
      "Puzzle-solving, route planning, and decision trees that reward structured thinking. Fast reflexes help, but brains win.",
    accentColor: "#42B7FF",
  },
  {
    icon: Zap,
    title: "Gaming Skills",
    description:
      "Speed, accuracy, and adaptability tested across multiple mini-game formats — from typing races to drawing sprints.",
    accentColor: "#8F6BFF",
  },
];

const SKILL_CARDS = [
  { icon: Eye, title: "Observation" },
  { icon: Brain, title: "Memory" },
  { icon: Map, title: "Geography" },
  { icon: Keyboard, title: "Speed Typing" },
  { icon: Pencil, title: "Drawing" },
  { icon: MessageSquare, title: "Communication" },
];

const GALLERY_ITEMS = [
  { caption: "Speed Typing Showdown" },
  { caption: "Team Strategy Round" },
  { caption: "Memory Grid Finals" },
  { caption: "Drawing Blitz Challenge" },
  { caption: "Geography Rapid Fire" },
  { caption: "Grand Prize Ceremony" },
];

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function GameAThonPage() {
  const [entranceComplete, setEntranceComplete] = useState(false);

  return (
    <div className="relative w-full max-w-[100vw] overflow-x-hidden flex flex-col font-inter bg-[#050816]">
      {/* Fixed backgrounds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-space-radial" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="bg-planet-top-right" />
        <div className="bg-planet-left" />
        <div className="bg-ambient-depth" />
      </div>
      <StarField />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1 — HERO
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="hero"
        className="relative z-10 flex flex-col lg:flex-row lg:justify-between items-center lg:items-center px-5 pt-4 md:pt-6 lg:pt-6 pb-12 lg:pb-20 w-full max-w-[1400px] mx-auto gap-0 lg:gap-0"
        style={{
          minHeight: "calc(100dvh - 72px)",
          scrollMarginTop: "72px",
        }}
      >
        {/* LEFT — Staggered content */}
        <motion.div
          className="flex flex-col items-center lg:items-start lg:w-[48%] lg:max-w-[580px] text-center lg:text-left lg:pl-8 w-full"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => setEntranceComplete(true)}
        >
          <motion.h1
            className={`font-orbitron text-[clamp(32px,8.5vw,68px)] font-black text-[#F8FAFC] tracking-[0.05em] m-0 leading-[1.05] whitespace-nowrap ${entranceComplete ? "animate-title-glow" : "text-glow"}`}
            variants={slideUp}
          >
            GAME-A-THON
          </motion.h1>

          {/* Portal — mobile only */}
          <motion.div
            className="lg:hidden w-full flex justify-center my-3"
            variants={fadeIn}
          >
            <PortalVideo className="w-[72%] max-w-[300px]" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-[#FFFFFF] text-[clamp(17px,3.2vw,26px)] font-extrabold leading-[1.35] tracking-[0.01em] mb-2 mt-0"
            variants={slideUp}
          >
            Compete. Collaborate.{" "}
            <span className="bg-gradient-to-r from-[#8F6BFF] to-[#42B7FF] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Conquer.
            </span>
          </motion.p>

          <motion.p
            className="text-[#C8D3F5] text-[clamp(13px,1.8vw,16px)] leading-[1.7] max-w-[460px] mb-6"
            variants={slideUp}
          >
            A multi-format gaming showdown spanning memory battles, team
            challenges, speed typing, and live drawing sprints — all under one
            electric arena.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-3 w-full"
            variants={scaleUp}
          >
            <button
              onClick={() => scrollToSection("gaming-skills")}
              className={`flex items-center justify-center gap-2 px-7 py-3 rounded-[50px] border-none text-[#FFFFFF] text-[clamp(13px,1.6vw,15px)] font-bold tracking-[0.02em] cursor-pointer shadow-[0_4px_30px_rgba(66,183,255,0.3),inset_0_0_15px_rgba(143,107,255,0.5)] ${entranceComplete ? "animate-cta-gradient" : "bg-cta-initial"}`}
            >
              <Zap size={14} /> Start Gaming
            </button>

            <Link
              to="/registration-test"
              className="flex items-center justify-center gap-1.5 px-7 py-3 rounded-[50px] text-[#FFFFFF] text-[clamp(13px,1.6vw,15px)] font-bold tracking-[0.02em] cursor-pointer no-underline btn-outline-glow"
            >
              Join Game-A-Thon <ChevronRight size={13} />
            </Link>

            <button
              onClick={() => scrollToSection("highlights")}
              className="flex items-center justify-center gap-1.5 px-7 py-3 rounded-[50px] text-[#7E89A8] text-[clamp(13px,1.6vw,15px)] font-semibold tracking-[0.02em] cursor-pointer border border-[rgba(126,137,168,0.3)] bg-transparent hover:text-[#C8D3F5] hover:border-[rgba(143,107,255,0.3)] transition-all duration-300"
            >
              <Trophy size={13} /> View Highlights
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT — Portal (desktop only) */}
        <motion.div
          className="hidden lg:flex lg:w-[48%] justify-end w-full relative lg:translate-x-4"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ willChange: "opacity" }}
        >
          <PortalVideo className="w-[100%] lg:w-[110%]" />
        </motion.div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2 — QUOTE CARD
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pb-16 md:pb-24 flex justify-center">
        <ScrollReveal variants={scaleUp} className="w-full max-w-[760px]">
          <div
            className="relative rounded-[28px] px-8 py-12 md:px-16 md:py-14 text-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(26,13,53,0.88) 0%, rgba(13,26,58,0.82) 100%)",
              border: "1px solid rgba(143,107,255,0.22)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              boxShadow: [
                "0 0 0 1px rgba(143,107,255,0.10)",
                "0 12px 48px rgba(143,107,255,0.14)",
                "0 2px 8px rgba(66,183,255,0.06)",
                "inset 0 1px 0 rgba(143,107,255,0.16)",
              ].join(", "),
            }}
          >
            {/* Corner glows */}
            <div
              className="absolute top-0 left-0 pointer-events-none"
              style={{
                width: "220px",
                height: "220px",
                background:
                  "radial-gradient(circle at 0% 0%, rgba(143,107,255,0.16) 0%, transparent 70%)",
                borderRadius: "0 0 100% 0",
              }}
            />
            <div
              className="absolute bottom-0 right-0 pointer-events-none"
              style={{
                width: "180px",
                height: "180px",
                background:
                  "radial-gradient(circle at 100% 100%, rgba(66,183,255,0.12) 0%, transparent 70%)",
                borderRadius: "100% 0 0 0",
              }}
            />
            {/* Top accent line */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                width: "55%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(143,107,255,0.75), rgba(66,183,255,0.55), transparent)",
              }}
            />

            <div
              className="absolute pointer-events-none select-none"
              aria-hidden="true"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(140px, 22vw, 200px)",
                fontWeight: 700,
                lineHeight: 1,
                top: "-12px",
                left: "clamp(12px, 4vw, 40px)",
                background:
                  "linear-gradient(135deg, rgba(143,107,255,0.13) 0%, rgba(66,183,255,0.07) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 18px rgba(143,107,255,0.20))",
              }}
            >
              &#x201C;
            </div>

            <div className="relative z-10">
              <p className="text-[#7E89A8] text-[10px] font-bold tracking-[0.18em] uppercase mb-7">
                GameAThon Manifesto
              </p>

              <blockquote
                className="font-orbitron text-[clamp(15px,2.8vw,22px)] font-bold text-[#F8FAFC] leading-[1.65] tracking-[0.02em] m-0 mb-8"
                style={{
                  textShadow: "0 0 48px rgba(143,107,255,0.28)",
                }}
              >
                The game is not about winning.
                <br className="hidden sm:block" />
                It's about how fast you{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #8F6BFF, #42B7FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  learn to adapt.
                </span>
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div
                  style={{
                    height: "1px",
                    width: "64px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(143,107,255,0.55))",
                  }}
                />
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "32px",
                    fontWeight: 700,
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #8F6BFF 0%, #42B7FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    opacity: 0.75,
                    display: "block",
                    transform: "translateY(6px)",
                  }}
                >
                  &#x201D;
                </span>
                <div
                  style={{
                    height: "1px",
                    width: "64px",
                    background:
                      "linear-gradient(90deg, rgba(66,183,255,0.55), transparent)",
                  }}
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 3 — GAMING ARENA
          
          FIX: minHeight changed from "70dvh" to "100dvh"
          and display/flexDirection/justifyContent added so
          content is vertically centered within the viewport.
          This ensures when scrolled to, only this section
          occupies the frame — the next section heading
          cannot peek into the bottom of the viewport.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="gaming-arena"
        className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pb-20 md:pb-28"
        style={{
          scrollMarginTop: "92px",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="text-center mb-10">
          <ScrollReveal variants={slideUp}>
            <h2 className="font-orbitron text-[clamp(24px,4.5vw,42px)] font-black text-[#F8FAFC] tracking-[0.04em] text-glow m-0 mb-4">
              Gaming Arena
            </h2>
            <p className="text-[#7E89A8] text-[clamp(13px,1.8vw,16px)] leading-[1.7] max-w-[520px] mx-auto">
              Four battlegrounds. One leaderboard. Every challenge is designed to
              test a different dimension of your mind and team.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {ARENA_CARDS.map((card, i) => (
            <GameArenaCard key={card.title} {...card} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4 — GAMING SKILLS & TOOLS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="gaming-skills"
        className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pb-20 md:pb-28"
        style={{
          scrollMarginTop: "92px",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="text-center mb-10">
          <ScrollReveal variants={slideUp}>
            <h2 className="font-orbitron text-[clamp(24px,4.5vw,42px)] font-black text-[#F8FAFC] tracking-[0.04em] text-glow m-0 mb-4">
              Gaming Skills &amp; Tools
            </h2>
            <p className="text-[#7E89A8] text-[clamp(13px,1.8vw,16px)] leading-[1.7] max-w-[480px] mx-auto">
              Six core competencies, each challenged in isolation and under
              team pressure. Know your strength before you enter.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {SKILL_CARDS.map((card, i) => (
            <SkillCard key={card.title} {...card} delay={i * 0.07} />
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 5 — LAST YEAR'S TALENT
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="highlights"
        className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pb-20 md:pb-28"
        style={{
          scrollMarginTop: "92px",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="text-center mb-10">
          <ScrollReveal variants={slideUp}>
            <h2 className="font-orbitron text-[clamp(24px,4.5vw,42px)] font-black text-[#F8FAFC] tracking-[0.04em] text-glow m-0 mb-4">
              Glimpse of Last Year's Talent
            </h2>
            <p className="text-[#7E89A8] text-[clamp(13px,1.8vw,16px)] leading-[1.7] max-w-[480px] mx-auto">
              The moments that defined GameAThon. Relive the intensity
              before you write your own chapter.
            </p>
          </ScrollReveal>
        </div>

        {/* Uniform grid — all cards identical aspect-[4/3] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryCard key={i} caption={item.caption} index={i} delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 6 — READY TO GAME
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="ready-to-game"
        className="relative z-10 w-full px-5 pb-24 md:pb-32"
        style={{ scrollMarginTop: "92px" }}
      >
        <ScrollReveal variants={scaleUp}>
          <div className="relative max-w-[900px] mx-auto rounded-[28px] overflow-hidden px-8 py-14 md:px-16 md:py-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0d35] via-[#0d0826] to-[#050816]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(143,107,255,0.25)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(66,183,255,0.12)_0%,transparent_65%)]" />
            <div className="absolute inset-0 rounded-[28px] border border-[rgba(143,107,255,0.3)] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-[#8F6BFF] to-transparent" />

            <div className="relative z-10">
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[rgba(143,107,255,0.15)] border border-[rgba(143,107,255,0.35)] shadow-[0_0_20px_rgba(143,107,255,0.25)]">
                  <Gamepad2 size={26} color="#8F6BFF" />
                </div>
              </div>

              <h2 className="font-orbitron text-[clamp(26px,5vw,48px)] font-black text-[#F8FAFC] tracking-[0.05em] m-0 mb-4 leading-[1.1]">
                Ready to{" "}
                <span className="text-2k26-gradient">Game?</span>
              </h2>

              <p className="text-[#C8D3F5] text-[clamp(13px,1.8vw,17px)] leading-[1.7] max-w-[460px] mx-auto mb-8">
                Seats are limited. The arena is live on June 26–27.
                Lock in your spot and let the best gamer win.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/registration-test"
                  className="flex items-center justify-center gap-2 px-10 py-4 rounded-[50px] text-[#FFFFFF] text-[clamp(14px,1.8vw,16px)] font-bold tracking-[0.02em] cursor-pointer no-underline animate-cta-gradient shadow-[0_4px_30px_rgba(66,183,255,0.3),inset_0_0_15px_rgba(143,107,255,0.5)]"
                >
                  <span className="text-[11px]">✦</span> Register Now{" "}
                  <ChevronRight size={14} />
                </Link>
                <button
                  onClick={() => scrollToSection("gaming-skills")}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-[50px] text-[#C8D3F5] text-[clamp(14px,1.8vw,16px)] font-semibold tracking-[0.02em] cursor-pointer bg-transparent btn-outline-glow"
                >
                  Explore Skills
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}