import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, useInView } from "framer-motion";
import {
  ChevronRight,
  LayoutGrid,
  Palette,
  Box,
  Trophy,
  Layers,
  PenTool,
  Wand2,
  Monitor,
  Sparkles,
  Zap
} from "lucide-react";
import { CursorTrail } from "../components/CursorTrail.jsx";
import { UniversalLoader } from "../components/UniversalLoader.jsx";

import designathon1 from "../../images/designathon/designathon1.webp";
import designathon2 from "../../images/designathon/designathon2.webp";
import designathon3 from "../../images/designathon/designathon3.webp";
import designathon4 from "../../images/designathon/designathon4.webp";
import designathon8 from "../../images/designathon/designathon8.webp";
import designathon9 from "../../images/designathon/designathon9.webp";
import designathon10 from "../../images/designathon/designathon10.webp";

/* ═══════════════════════════════════════════════════════════
   Shared Motion Constants  (identical to GameAThonPage)
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
      className={`relative flex items-center justify-center aspect-square mx-auto my-0 md:my-4 w-full max-w-[clamp(340px,85vw,600px)] lg:max-w-none lg:w-full ${className}`}
    >
      {/* Soft ambient energy — bleeds freely into the page bg */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-30%",
          zIndex: 0,
          filter: "blur(80px)",
          background:
            "radial-gradient(circle at center, rgba(34,197,94,0.26) 0%, rgba(34,197,94,0.14) 45%, rgba(34,197,94,0.06) 65%, transparent 80%)",
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
              "conic-gradient(from 200deg at 45% 45%, #22C55E 0deg, #4ADE80 60deg, #86EFAC 100deg, #14B8A6 160deg, #22C55E 220deg, #4ADE80 280deg, #14B8A6 360deg)",
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
              "radial-gradient(ellipse at 55% 38%, rgba(34,197,94,0.35) 0%, rgba(34,197,94,0.18) 40%, transparent 65%)",
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
              "radial-gradient(circle at center, transparent 20%, rgba(5,8,22,0.55) 65%, rgba(5,8,22,0.96) 100%)",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DesignCard  (matches GameArenaCard architecture exactly,
   re-themed with green accent palette)
   ═══════════════════════════════════════════════════════════ */
function DesignCard({ icon: Icon, title, description, accentColor = "#22C55E", delay = 0 }) {
  return (
    <ScrollReveal variants={scaleUp} delay={delay} className="h-full">
      <div
        className="glass-card rounded-[20px] p-6 h-full flex flex-col gap-4 cursor-default"
        style={{
          border: `1px solid ${accentColor}33`,
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
   ToolCard  (matches SkillCard architecture, green palette)
   ═══════════════════════════════════════════════════════════ */
function ToolCard({ icon: Icon, title, delay = 0 }) {
  return (
    <ScrollReveal variants={scaleUp} delay={delay}>
      <div
        className="glass-card rounded-[16px] px-5 py-6 flex flex-col items-center gap-3 text-center cursor-default"
        style={{
          border: "1px solid rgba(34,197,94,0.2)",
          transition:
            "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease",
          willChange: "transform",
        }}
        onMouseEnter={(e) => {
          const card = e.currentTarget;
          card.style.transform = "translateY(-7px) scale(1.04)";
          card.style.boxShadow = [
            "0 20px 50px rgba(34,197,94,0.22)",
            "0 6px 20px rgba(34,197,94,0.14)",
            "0 0 0 1px rgba(34,197,94,0.45)",
            "inset 0 1px 0 rgba(34,197,94,0.18)",
          ].join(", ");
          card.style.borderColor = "rgba(34,197,94,0.5)";
          const ring = card.querySelector(".tool-icon-ring");
          if (ring) {
            ring.style.boxShadow = "0 0 24px rgba(34,197,94,0.5), 0 0 8px rgba(20,184,166,0.3)";
            ring.style.background = "rgba(34,197,94,0.22)";
            ring.style.borderColor = "rgba(34,197,94,0.55)";
          }
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          card.style.transform = "";
          card.style.boxShadow = "";
          card.style.borderColor = "";
          const ring = card.querySelector(".tool-icon-ring");
          if (ring) {
            ring.style.boxShadow = "";
            ring.style.background = "";
            ring.style.borderColor = "";
          }
        }}
      >
        <div
          className="tool-icon-ring w-11 h-11 rounded-full flex items-center justify-center bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.25)] shadow-[0_0_12px_rgba(34,197,94,0.12)]"
          style={{ transition: "box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease" }}
        >
          <Icon size={20} color="#22C55E" />
        </div>
        <span className="text-[#C8D3F5] text-[13px] font-semibold tracking-[0.03em]">
          {title}
        </span>
      </div>
    </ScrollReveal>
  );
}

/* ═══════════════════════════════════════════════════════════
   WorkCard — gallery of design deliverables
   (matches GalleryCard architecture, green grid aesthetic)
   ═══════════════════════════════════════════════════════════ */
function WorkCard({ caption, index, image, position = "top" }) {
  return (
    <div
      className="relative w-full h-full rounded-[16px] overflow-hidden group cursor-pointer"
      style={{ transition: "transform 0.35s ease, box-shadow 0.35s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(34,197,94,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {image && (
        <img src={image} alt={caption} className="w-full h-full object-cover" style={{ objectPosition: position }} loading="lazy" />
      )}
      <div className="absolute inset-0 rounded-[16px] border border-[rgba(34,197,94,0.2)] group-hover:border-[rgba(34,197,94,0.5)] transition-colors duration-300 pointer-events-none" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION DATA
   ═══════════════════════════════════════════════════════════ */
const DESIGN_CARDS = [
  {
    icon: Sparkles,
    title: "Domain 1",
    description:
      "To be revealed. Stay tuned for exciting updates.",
  },
  {
    icon: Sparkles,
    title: "Domain 2",
    description:
      "To be revealed. Stay tuned for exciting updates.",
  },
  {
    icon: Sparkles,
    title: "Domain 3",
    description:
      "To be revealed. Stay tuned for exciting updates.",
  },
  {
    icon: Sparkles,
    title: "Domain 4",
    description:
      "To be revealed. Stay tuned for exciting updates.",
  },
  {
    icon: Sparkles,
    title: "Domain 5",
    description:
      "To be revealed. Stay tuned for exciting updates.",
  },
];

const TOOL_CARDS = [
  { icon: PenTool, title: "Figma" },
  { icon: Layers, title: "Adobe" },
  { icon: Box, title: "Sketch" },
  { icon: Palette, title: "Illustrator" },
  { icon: Wand2, title: "Photoshop" },
  { icon: Sparkles, title: "Canva" },
];

const GALLERY_ITEMS = [
  { caption: "Poster Drafting", image: designathon1, position: "top" },
  { caption: "Typography Play", image: designathon2, position: "top" },
  { caption: "Creative Review", image: designathon3, position: "top" },
  { caption: "Moodboarding", image: designathon4, position: "top" },
  { caption: "3D Compositions", image: designathon8, position: "top" },
  { caption: "Final Polish", image: designathon9, position: "top" },
  { caption: "Judge Presentation", image: designathon10, position: "top" },
];

/* ═══════════════════════════════════════════════════════════
   RibbonCursor — green-themed canvas ribbon trail
   (mirrors GameAThonPage RibbonCursor, re-colored for green)
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function DesignAThonPage() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full max-w-[100vw] overflow-x-hidden flex flex-col font-inter bg-[#050816]">
      <CursorTrail colorRgb={[34, 197, 94]} />
      {loading && (
        <UniversalLoader
          titleStart="DESIGN"
          titleEnd="ATHON"
          colorHex="#22C55E"
          colorRgb="34,197,94"
        />
      )}
      <motion.div
        className="w-full flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >

        {/* Fixed backgrounds */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-space-radial" />
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="bg-planet-top-right" />
          <div className="bg-planet-left" />
          <div className="bg-ambient-depth" />
        </div>

        {/* Green ambient tint layered over the existing space bg */}
        <div
          className="fixed inset-0 overflow-hidden pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(34,197,94,0.055) 0%, transparent 65%)",
          }}
        />



        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1 — HERO
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <style>{`
          @media (max-width: 768px) {
            .hero-layout {
              flex-direction: column !important;
              align-items: center !important;
              padding: 2rem 1.25rem 3rem !important;
              min-height: unset !important;
              gap: 0 !important;
            }
            .hero-left {
              width: 100% !important;
              max-width: 100% !important;
              padding-left: 0 !important;
              transform: none !important;
              align-items: center !important;
              text-align: center !important;
            }
            .hero-left p { text-align: center !important; }
            .hero-btns { justify-content: center !important; }
            .hero-portal-mobile {
              width: 85% !important;
              transform: none !important;
              justify-content: center !important;
              margin: 0 auto !important;
            }
            .hero-right { display: none !important; }
            .hero-portal-mobile-slot { display: flex !important; }
          }
          @media (min-width: 769px) {
            .hero-portal-mobile-slot { display: none !important; }
          }
        `}</style>
        <section
          id="hero"
          className="hero-layout"
          style={{
            position: "relative", zIndex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1.5rem 3rem",
            width: "100%",
            maxWidth: 1400,
            margin: "0 auto",
            minHeight: "calc(100dvh - 80px)",
          }}
        >
          {/* LEFT COLUMN */}
          <motion.div
            className="hero-left"
            style={{
              display: "flex", flexDirection: "column",
              alignItems: "flex-start",
              width: "40%", maxWidth: 560,
              paddingLeft: "3rem",
              transform: "translateY(-80px)",
            }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => setEntranceComplete(true)}
          >
            <motion.h1
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(1.8rem, 4.2vw, 3.8rem)",
                fontWeight: 900,
                color: "#F8FAFC",
                letterSpacing: "0.08em",
                lineHeight: 1,
                whiteSpace: "nowrap",
                marginBottom: "0.5rem",
                textShadow: entranceComplete
                  ? "0 0 40px rgba(34,197,94,0.5), 0 0 80px rgba(34,197,94,0.2)"
                  : "0 0 30px rgba(34,197,94,0.4)",
              }}
              variants={slideUp}
            >
              DESIGN<span
                style={{
                  background: "linear-gradient(90deg, #22C55E 0%, #4ADE80 50%, #86EFAC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >-A-THON</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-[#FFFFFF] text-[clamp(17px,3.2vw,26px)] font-extrabold leading-[1.35] tracking-[0.08em] mb-6 mt-0 capitalize"
              variants={slideUp}
            >
              Design.{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #22C55E, #4ADE80)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Create.
              </span>{" "}
              Elevate.
            </motion.p>

            {/* ── MOBILE ONLY PORTAL ── */}
            <div className="hero-portal-mobile-slot" style={{
              width: "100%",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}>
              <div style={{ width: "70%", aspectRatio: "1 / 1", position: "relative" }}>
                <PortalVideo className="w-full h-full" />
              </div>
            </div>

            <motion.p
              className="text-[#C8D3F5] text-[clamp(13px,1.8vw,16px)] leading-[1.8] max-w-[500px] mb-6"
              variants={slideUp}
            >
              Step into the ultimate design challenge where ideas become icons.
              <br />
              Craft visuals so powerful, they inspire, engage, and leave a mark.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="hero-btns"
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
              variants={scaleUp}
            >
              {/* Primary CTA */}
              <Link
                to="/registration-test"
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-[50px] text-[#0B1120] text-[clamp(13px,1.6vw,15px)] font-bold tracking-[0.02em] cursor-pointer no-underline"
                style={{
                  background: "linear-gradient(135deg, #22C55E 0%, #4ADE80 50%, #14B8A6 100%)",
                  boxShadow: "0 4px 30px rgba(34,197,94,0.4), 0 0 60px rgba(34,197,94,0.15)",
                }}
              >
                <Zap size={14} /> Enter Designathon
              </Link>

              {/* Scroll CTA */}
              <button
                onClick={() => scrollToSection("design-domains")}
                className="flex items-center justify-center gap-1.5 px-7 py-3 rounded-[50px] text-[#F8FAFC] text-[clamp(13px,1.6vw,15px)] font-bold tracking-[0.02em] cursor-pointer"
                style={{
                  border: "1px solid rgba(34,197,94,0.4)",
                  background: "rgba(34,197,94,0.06)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  transition: "border-color 0.3s, background 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(34,197,94,0.7)";
                  e.currentTarget.style.background = "rgba(34,197,94,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)";
                  e.currentTarget.style.background = "rgba(34,197,94,0.06)";
                }}
              >
                Explore Domains <ChevronRight size={13} />
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN — desktop only */}
          <motion.div
            className="hero-right"
            style={{
              width: "55%",
              display: "flex",
              justifyContent: "flex-end",
              transform: "translateX(3rem) translateY(-2rem)",
              position: "relative",
            }}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="w-[115%] lg:w-[130%] aspect-square relative">
              <PortalVideo className="w-full h-full" />
            </div>
          </motion.div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2 — QUOTE CARD
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pb-10 md:pb-16 flex justify-center">
          <ScrollReveal variants={scaleUp} className="w-full max-w-[800px]">
            <div
              className="relative rounded-[28px] px-8 py-14 md:px-24 md:py-20 text-center overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(6,26,14,0.88) 0%, rgba(10,28,20,0.82) 100%)",
                border: "1px solid rgba(34,197,94,0.22)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                boxShadow: [
                  "0 0 0 1px rgba(34,197,94,0.08)",
                  "0 12px 48px rgba(34,197,94,0.12)",
                  "0 2px 8px rgba(20,184,166,0.06)",
                  "inset 0 1px 0 rgba(34,197,94,0.14)",
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
                    "radial-gradient(circle at 0% 0%, rgba(34,197,94,0.14) 0%, transparent 70%)",
                  borderRadius: "0 0 100% 0",
                }}
              />
              <div
                className="absolute bottom-0 right-0 pointer-events-none"
                style={{
                  width: "180px",
                  height: "180px",
                  background:
                    "radial-gradient(circle at 100% 100%, rgba(20,184,166,0.10) 0%, transparent 70%)",
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
                    "linear-gradient(90deg, transparent, rgba(34,197,94,0.75), rgba(20,184,166,0.55), transparent)",
                }}
              />

              {/* Decorative quote mark */}
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
                    "linear-gradient(135deg, rgba(34,197,94,0.13) 0%, rgba(20,184,166,0.07) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 18px rgba(34,197,94,0.20))",
                }}
              >
                &#x201C;
              </div>

              <div className="relative z-10">
                <p className="text-[#7E89A8] text-[10px] font-bold tracking-[0.18em] uppercase mb-7">
                  DesignAThon Manifesto
                </p>

                <blockquote
                  className="font-orbitron text-[clamp(20px,4vw,30px)] font-bold text-[#F8FAFC] leading-[1.65] tracking-[0.02em] m-0 mb-8"
                  style={{
                    textShadow: "0 0 48px rgba(34,197,94,0.25)",
                  }}
                >
                  Design is not how it looks.
                  <br className="hidden sm:block" />
                  It's how it{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg, #22C55E, #14B8A6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    makes people feel.
                  </span>
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <div
                    style={{
                      height: "1px",
                      width: "64px",
                      background:
                        "linear-gradient(90deg, transparent, rgba(34,197,94,0.55))",
                    }}
                  />
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: "32px",
                      fontWeight: 700,
                      lineHeight: 1,
                      background: "linear-gradient(135deg, #22C55E 0%, #14B8A6 100%)",
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
                        "linear-gradient(90deg, rgba(20,184,166,0.55), transparent)",
                    }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 3 — DESIGN DOMAINS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          id="design-domains"
          className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pt-10 pb-10 md:pt-16 md:pb-20"
        >
          <div className="text-center mb-10">
            <ScrollReveal variants={slideUp}>
              <h2
                className="font-orbitron text-[clamp(24px,4.5vw,42px)] font-black text-[#F8FAFC] tracking-[0.04em] m-0 mb-4"
                style={{ textShadow: "0 0 40px rgba(34,197,94,0.35)" }}
              >
                Design Domains
              </h2>
              <p className="text-[#7E89A8] text-[clamp(13px,1.8vw,16px)] leading-[1.7] max-w-[520px] mx-auto">
                Five creative arenas. One canvas. Every challenge is a chance to
                show that great design solves problems beautifully.
              </p>
            </ScrollReveal>
          </div>

          <div
            className="flex flex-wrap justify-center mx-auto"
            style={{ gap: "2rem", maxWidth: "1100px" }}
          >
            {DESIGN_CARDS.map((card, i) => (
              <div
                key={card.title}
                style={{
                  flex: "1 1 300px",
                  maxWidth: "360px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <DesignCard {...card} delay={i * 0.1} />
              </div>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 3.5 — DESIGN JOURNEY
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          id="design-journey"
          className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pt-10 pb-10 md:pt-16 md:pb-16"
          style={{ scrollMarginTop: "92px" }}
        >
          <div className="text-center mb-10">
            <ScrollReveal variants={slideUp}>
              <h2
                className="font-orbitron text-[clamp(24px,4.5vw,42px)] font-black text-[#F8FAFC] tracking-[0.04em] m-0 mb-4"
                style={{ textShadow: "0 0 40px rgba(34,197,94,0.35)" }}
              >
                The Design Realm
              </h2>
              <p className="text-[#7E89A8] text-[clamp(13px,1.8vw,16px)] leading-[1.7] max-w-[520px] mx-auto">
                Your journey from a raw concept to a polished, high-fidelity masterpiece. Two rounds to the stage.
              </p>
            </ScrollReveal>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch max-w-[1100px] mx-auto">
            {/* Round 1 */}
            <ScrollReveal className="flex-1">
              <div className="glass-card rounded-[20px] p-10 h-full flex flex-col relative overflow-hidden group cursor-default" style={{ border: '1px solid rgba(34,197,94,0.2)', borderTop: '2px solid #22C55E' }}>
                <div className="absolute top-4 right-6 font-orbitron text-[5rem] font-black text-[#22C55E]/25 leading-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:text-[#22C55E]/40">01</div>
                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 mb-5 relative z-10" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(34,197,94,0.1) 100%)', border: '1px solid rgba(34,197,94,0.4)' }}>
                  <Palette size={24} color="#22C55E" />
                </div>
                <p className="text-[12px] tracking-[0.25em] text-[#22C55E] uppercase font-semibold mb-2 relative z-10">Round One</p>
                <h3 className="text-[#F8FAFC] text-[18px] font-bold mb-3 tracking-[0.04em] relative z-10">THE DESIGN FLOOR</h3>
                <p className="text-[#7E89A8] text-[14px] leading-[1.75] relative z-10 flex-1">
                  Pick your theme from a curated list and pour your sharpest instincts into a poster that commands attention and tells a story.
                </p>
                <div className="mt-6 flex items-center gap-3 relative z-10">
                  <div className="w-8 h-[1px] bg-[#22C55E]/60" />
                  <span className="text-[12px] tracking-[0.2em] text-[#22C55E] uppercase font-bold">Online Submission</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Arrow */}
            <div className="hidden md:flex items-center shrink-0">
              <div className="flex flex-col items-center gap-2">
                <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-[#22C55E]/40" />
                <span className="text-[#22C55E]/60 text-[16px] leading-none">▶</span>
                <div className="w-[1px] h-8 bg-gradient-to-t from-transparent to-[#22C55E]/40" />
              </div>
            </div>

            {/* Round 2 */}
            <ScrollReveal className="flex-1" delay={0.15}>
              <div className="glass-card rounded-[20px] p-10 h-full flex flex-col relative overflow-hidden group cursor-default" style={{ border: '1px solid rgba(34,197,94,0.2)', borderTop: '2px solid #22C55E' }}>
                <div className="absolute top-4 right-6 font-orbitron text-[5rem] font-black text-[#22C55E]/25 leading-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:text-[#22C55E]/40">02</div>
                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 mb-5 relative z-10" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(34,197,94,0.1) 100%)', border: '1px solid rgba(34,197,94,0.4)' }}>
                  <Monitor size={24} color="#22C55E" />
                </div>
                <p className="text-[12px] tracking-[0.25em] text-[#22C55E] uppercase font-semibold mb-2 relative z-10">Round Two</p>
                <h3 className="text-[#F8FAFC] text-[18px] font-bold mb-3 tracking-[0.04em] relative z-10">THE FINAL VERDICT</h3>
                <p className="text-[#7E89A8] text-[14px] leading-[1.75] relative z-10 flex-1">
                  Present your designs to a panel of judges — break down your vision, your process, and the thinking behind every choice that made your poster what it is.
                </p>
                <div className="mt-6 flex items-center gap-3 relative z-10">
                  <div className="w-8 h-[1px] bg-[#22C55E]/60" />
                  <span className="text-[12px] tracking-[0.2em] text-[#22C55E] uppercase font-bold">Live Presentation</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4 — TOOLS & SKILLS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          id="design-tools"
          className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pt-10 pb-10 md:pt-16 md:pb-20"
          style={{
            scrollMarginTop: "92px",
          }}
        >
          <div className="text-center mb-10">
            <ScrollReveal variants={slideUp}>
              <h2
                className="font-orbitron text-[clamp(24px,4.5vw,42px)] font-black text-[#F8FAFC] tracking-[0.04em] m-0 mb-4"
                style={{ textShadow: "0 0 40px rgba(34,197,94,0.35)" }}
              >
                Skills &amp; Tools
              </h2>
              <p className="text-[#7E89A8] text-[clamp(13px,1.8vw,16px)] leading-[1.7] max-w-[480px] mx-auto">
                Six creative competencies tested across every discipline. Know your
                medium, sharpen your edge.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-[1100px] mx-auto">
            {TOOL_CARDS.map((card, i) => (
              <ToolCard key={card.title} {...card} delay={i * 0.07} />
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 5 — LAST YEAR'S HIGHLIGHTS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          id="highlights"
          className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pt-10 pb-16 md:pt-16 md:pb-24"
          style={{
            scrollMarginTop: "92px",
          }}
        >
          <div className="text-center mb-10">
            <ScrollReveal variants={slideUp}>
              <h2
                className="font-orbitron text-[clamp(24px,4.5vw,42px)] font-black text-[#F8FAFC] tracking-[0.04em] m-0 mb-4"
                style={{ textShadow: "0 0 40px rgba(34,197,94,0.35)" }}
              >
                Glimpse of Last Year's Work
              </h2>
              <p className="text-[#7E89A8] text-[clamp(13px,1.8vw,16px)] leading-[1.7] max-w-[480px] mx-auto">
                Designs that moved the judges. Relive the creative energy before
                you add your own work to the legacy.
              </p>
            </ScrollReveal>
          </div>

          <style>{`
            @keyframes gallery-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .gallery-track {
              animation: gallery-scroll 28s linear infinite;
            }
            .gallery-track:hover {
              animation-play-state: paused;
            }
            .gallery-mask {
              mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
              -webkit-mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
            }
          `}</style>

          <ScrollReveal>
            <div className="gallery-mask" style={{ width: "100%", overflow: "hidden", marginTop: "2.5rem" }}>
              <div className="gallery-track" style={{ display: "flex", gap: "0.75rem", width: "max-content" }}>
                {[...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, i) => (
                  <div key={i} style={{ flexShrink: 0, width: "clamp(340px, 45vw, 540px)", height: "clamp(220px, 32vw, 360px)" }}>
                    <WorkCard caption={item.caption} index={i} image={item.image} position={item.position} />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 6 — READY TO DESIGN CTA
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          id="ready-to-design"
          className="relative z-10 w-full px-5 pb-16 md:pb-24"
          style={{ scrollMarginTop: "92px" }}
        >
          <ScrollReveal variants={scaleUp}>
            <div className="relative max-w-[900px] mx-auto rounded-[28px] overflow-hidden px-8 py-14 md:px-16 md:py-20 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#061a0e] via-[#080f1a] to-[#050816]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(34,197,94,0.22)_0%,transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(20,184,166,0.10)_0%,transparent_65%)]" />
              <div className="absolute inset-0 rounded-[28px] border border-[rgba(34,197,94,0.28)] pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-[#22C55E] to-transparent" />

              {/* Grid overlay — creative studio detail */}
              <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(34,197,94,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="relative z-10">
                <div className="flex justify-center mb-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(34,197,94,0.12)",
                      border: "1px solid rgba(34,197,94,0.35)",
                      boxShadow: "0 0 24px rgba(34,197,94,0.25)",
                    }}
                  >
                    <Palette size={26} color="#22C55E" />
                  </div>
                </div>

                <h2
                  className="font-orbitron text-[clamp(26px,5vw,48px)] font-black text-[#F8FAFC] tracking-[0.05em] m-0 mb-4 leading-[1.1]"
                  style={{ textShadow: "0 0 40px rgba(34,197,94,0.3)" }}
                >
                  Ready to{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg, #22C55E 0%, #4ADE80 50%, #14B8A6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Design?
                  </span>
                </h2>

                <p className="text-[#C8D3F5] text-[clamp(13px,1.8vw,17px)] leading-[1.7] max-w-[460px] mx-auto mb-8">
                  Seats are limited. The studio opens June 26–27.
                  Lock in your spot and let your designs speak.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    to="/registration-test"
                    className="flex items-center justify-center gap-2 px-10 py-4 rounded-[50px] text-[#0B1120] text-[clamp(14px,1.8vw,16px)] font-bold tracking-[0.02em] cursor-pointer no-underline"
                    style={{
                      background: "linear-gradient(135deg, #22C55E 0%, #4ADE80 50%, #14B8A6 100%)",
                      boxShadow: "0 4px 30px rgba(34,197,94,0.45), 0 0 60px rgba(34,197,94,0.15)",
                    }}
                  >
                    <span className="text-[11px]">✦</span> Register Now{" "}
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </motion.div>
    </div>
  );
}