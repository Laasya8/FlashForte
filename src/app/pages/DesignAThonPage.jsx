import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, useInView } from "framer-motion";
import {
  ChevronRight,
  Palette,
  Box,
  Layers,
  PenTool,
  Wand2,
  Monitor,
  Sparkles,
  Calendar,
  Clock,
  Eye,
  Leaf,
  Gamepad2,
  Brain,
} from "lucide-react";
import { CursorTrail } from "../components/CursorTrail.jsx";

import designathon1 from "../../images/Designathon/designathon1.webp";
import designathon2 from "../../images/Designathon/designathon2.webp";
import designathon3 from "../../images/Designathon/designathon3.webp";
import designathon4 from "../../images/Designathon/designathon4.webp";
import designathon8 from "../../images/Designathon/designathon8.webp";
import designathon9 from "../../images/Designathon/designathon9.webp";
import designathon10 from "../../images/Designathon/designathon10.webp";

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

  const MASK =
    "radial-gradient(circle at center, black 30%, rgba(0,0,0,0.85) 48%, rgba(0,0,0,0.40) 62%, transparent 72%)";

  return (
    <div
      className={`relative flex items-center justify-center aspect-square mx-auto my-0 md:my-4 w-full max-w-[clamp(340px,85vw,600px)] lg:max-w-none lg:w-full ${className}`}
    >
      {/* Outer ambient glow */}
      <div
        className="absolute rounded-full blur-[40px] mix-blend-screen z-0 inset-[-15%]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.48) 0%, rgba(22,163,74,0.25) 50%, transparent 75%)",
        }}
      />
      {/* Inner ambient glow */}
      <div
        className="absolute inset-0 rounded-full blur-[20px] mix-blend-screen z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(74,222,128,0.30) 0%, rgba(34,197,94,0.15) 60%, transparent 100%)",
        }}
      />
      {/* Masked portal wrapper — all layers fade together via mask */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          maskImage: MASK,
          WebkitMaskImage: MASK,
        }}
      >
        {/* Video with green color filter */}
        <video
          ref={videoRef}
          src="/Portal Animation.webm"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter:
              "sepia(1) saturate(3.5) hue-rotate(85deg) brightness(1.0) contrast(1.1) drop-shadow(0 0 30px rgba(34,197,94,0.7))",
          }}
        />
      </div>

      {/* Completely solid black center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(circle at center, #000000 0%, #000000 14%, transparent 24%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DesignCard  (matches GameArenaCard architecture exactly,
   re-themed with green accent palette)
   ═══════════════════════════════════════════════════════════ */
function DesignCard({ icon: Icon, title, description, accentColor = "#22C55E", delay = 0 }) {
  return (
    <ScrollReveal variants={scaleUp} delay={delay} className="h-full relative">
      {/* Background neon radiance blended with bg */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[20px]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}22 0%, transparent 75%)`,
          filter: "blur(20px)",
          zIndex: 0,
          transform: "scale(1.15)",
        }}
      />
      <div
        className="glass-card rounded-[20px] p-6 h-full flex flex-col gap-4 cursor-default relative"
        style={{
          zIndex: 1,
          border: `1px solid ${accentColor}44`,
          boxShadow: `0 0 20px ${accentColor}18, 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 ${accentColor}15`,
          transition:
            "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease",
          willChange: "transform",
        }}
        onMouseEnter={(e) => {
          const card = e.currentTarget;
          card.style.transform = "translateY(-8px) scale(1.02)";
          card.style.boxShadow = [
            `0 20px 60px ${accentColor}35`,
            `0 8px 24px ${accentColor}22`,
            `0 0 0 1px ${accentColor}66`,
            `inset 0 1px 0 ${accentColor}33`,
            `0 0 30px ${accentColor}30`,
          ].join(", ");
          card.style.borderColor = `${accentColor}66`;
          const iconBox = card.querySelector(".icon-box");
          if (iconBox) {
            iconBox.style.boxShadow = `0 0 28px ${accentColor}55, 0 0 8px ${accentColor}33`;
            iconBox.style.background = `linear-gradient(135deg, ${accentColor}35 0%, ${accentColor}18 100%)`;
          }
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          card.style.transform = "";
          card.style.boxShadow = `0 0 20px ${accentColor}18, 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 ${accentColor}15`;
          card.style.borderColor = `${accentColor}44`;
          const iconBox = card.querySelector(".icon-box");
          if (iconBox) {
            iconBox.style.boxShadow = "";
            iconBox.style.background = "";
          }
        }}
      >
        <div
          className="icon-box w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 relative z-10"
          style={{
            background: `linear-gradient(135deg, ${accentColor}22 0%, ${accentColor}11 100%)`,
            border: `1px solid ${accentColor}44`,
            boxShadow: `0 0 16px ${accentColor}18`,
            transition: "box-shadow 0.4s ease, background 0.4s ease",
          }}
        >
          <Icon size={22} style={{ color: accentColor }} />
        </div>
        <div className="relative z-10">
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
    <ScrollReveal variants={scaleUp} delay={delay} className="relative">
      {/* Background neon radiance blended with bg */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[16px]"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(34,197,94,0.14) 0%, transparent 75%)`,
          filter: "blur(16px)",
          zIndex: 0,
          transform: "scale(1.15)",
        }}
      />
      <div
        className="glass-card rounded-[16px] px-5 py-6 flex flex-col items-center gap-3 text-center cursor-default relative"
        style={{
          zIndex: 1,
          border: "1px solid rgba(34,197,94,0.35)",
          boxShadow: "0 0 15px rgba(34,197,94,0.15), 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(34,197,94,0.12)",
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
            "0 0 20px rgba(34,197,94,0.20)",
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
          card.style.boxShadow = "0 0 15px rgba(34,197,94,0.15), 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(34,197,94,0.12)";
          card.style.borderColor = "rgba(34,197,94,0.35)";
          const ring = card.querySelector(".tool-icon-ring");
          if (ring) {
            ring.style.boxShadow = "";
            ring.style.background = "";
            ring.style.borderColor = "";
          }
        }}
      >
        <div
          className="tool-icon-ring w-11 h-11 rounded-full flex items-center justify-center bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.25)] shadow-[0_0_12px_rgba(34,197,94,0.12)] relative z-10"
          style={{ transition: "box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease" }}
        >
          <Icon size={20} color="#22C55E" />
        </div>
        <span className="text-[#C8D3F5] text-[13px] font-semibold tracking-[0.03em] relative z-10">
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
    <div className="w-full h-full relative">
      {/* Background neon radiance blended with bg */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[16px]"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(34,197,94,0.15) 0%, transparent 75%)`,
          filter: "blur(18px)",
          zIndex: 0,
          transform: "scale(1.1)",
        }}
      />
      <div
        className="relative w-full h-full rounded-[16px] overflow-hidden group cursor-pointer"
        style={{
          zIndex: 1,
          boxShadow: "0 0 12px rgba(34,197,94,0.18), 0 4px 18px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,197,94,0.25)",
          transition: "transform 0.35s ease, box-shadow 0.35s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 0 20px rgba(34,197,94,0.30), 0 10px 30px rgba(34,197,94,0.22)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 0 12px rgba(34,197,94,0.18), 0 4px 18px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,197,94,0.25)";
        }}
      >
        {image && (
          <img src={image} alt={caption} className="w-full h-full object-cover" style={{ objectPosition: position }} loading="lazy" />
        )}
        <div className="absolute inset-0 rounded-[16px] border border-[rgba(34,197,94,0.2)] group-hover:border-[rgba(34,197,94,0.5)] transition-colors duration-300 pointer-events-none" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION DATA
   ═══════════════════════════════════════════════════════════ */
const DESIGN_CARDS = [
  {
    icon: Eye,
    title: "A World Through Different Eyes",
    description:
      "Exploring how different people perceive the same world through their unique experiences, emotions, and perspectives, fostering empathy and understanding.",
  },
  {
    icon: Brain,
    title: "Mind Over Machine",
    description:
      "Exploring how human creativity and intelligence can work alongside advancing technology to create meaningful solutions.",
  },
  {
    icon: Leaf,
    title: "Borrowed Earth",
    description:
      "It emphasizes that Earth is not ours to exploit but a gift we hold in trust for future generations. It inspires people to protect the environment and make sustainable choices.",
  },
  {
    icon: Monitor,
    title: "Digital Detox",
    description:
      "A conscious effort to reduce screen time and digital distractions, promoting mental well-being, healthier habits, and stronger connections with the world beyond technology.",
  },
  {
    icon: Gamepad2,
    title: "Gaming Beyond Entertainment",
    description:
      "Examining how gaming can evolve beyond entertainment to foster innovation, solve societal challenges, and inspire positive change.",
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
   GreenFloatingParticlesBackground — animated 3D bubble bg
   (matches FloatingParticlesBackground from other thon pages,
   re-colored with green accent palette)
   ═══════════════════════════════════════════════════════════ */
function GreenFloatingParticlesBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((window.innerWidth / 8) * 0.7);
      for (let i = 0; i < numParticles; i++) {
        const isForeground = Math.random() > 0.85;
        const vx = (Math.random() - 0.5) * 0.3;
        const vy = (Math.random() - 0.5) * 0.3 - (isForeground ? 0.4 : 0.15);
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: isForeground ? Math.random() * 4 + 2 : Math.random() * 2 + 1,
          vx: vx,
          vy: vy,
          baseVx: vx,
          baseVy: vy,
          life: Math.random() * 100,
          alpha: isForeground ? Math.random() * 0.6 + 0.4 : Math.random() * 0.7 + 0.2,
          isForeground
        });
      }
    };

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      particles.forEach(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx -= (dx / dist) * force * 0.6;
          p.vy -= (dy / dist) * force * 0.6;
        }

        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        p.life += 0.02;
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.life));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isForeground) {
          ctx.shadowBlur = p.radius * 2.5;
          ctx.shadowColor = 'rgba(34, 197, 94, 0.5)';
          ctx.fillStyle = `rgba(74, 222, 128, ${currentAlpha * 0.85})`;
        } else {
          ctx.shadowBlur = p.radius * 1.2;
          ctx.shadowColor = 'rgba(22, 163, 74, 0.3)';
          ctx.fillStyle = `rgba(34, 197, 94, ${currentAlpha * 0.8})`;
        }

        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
      aria-hidden="true"
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   DesignAThonLoader — Custom themed loading screen
   ═══════════════════════════════════════════════════════════ */
function DesignAThonLoader({ onDone }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const [exit, setExit] = useState(false);
  const [progress, setProgress] = useState(0);

  // Lock scroll
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  // Progress animation
  useEffect(() => {
    const start = Date.now();
    const duration = 1250;
    function tick() {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }, []);

  // Vector Design Canvas builder animation simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Cubic Bezier math helper
    function getBezierPoint(p0, p1, p2, p3, t) {
      const oneMinusT = 1 - t;
      const x = Math.pow(oneMinusT, 3) * p0.x +
                3 * Math.pow(oneMinusT, 2) * t * p1.x +
                3 * oneMinusT * Math.pow(t, 2) * p2.x +
                Math.pow(t, 3) * p3.x;
      const y = Math.pow(oneMinusT, 3) * p0.y +
                3 * Math.pow(oneMinusT, 2) * t * p1.y +
                3 * oneMinusT * Math.pow(t, 2) * p2.y +
                Math.pow(t, 3) * p3.y;
      return { x, y };
    }

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2 - 130;

      // 1. Draw coordinate grid blueprint
      ctx.strokeStyle = "rgba(34, 197, 94, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Palette path coordinates
      const p0 = { x: cx - 80, y: cy - 60 };
      const cp1_1 = { x: cx - 20, y: cy - 140 }, cp1_2 = { x: cx + 80, y: cy - 140 }, p1 = { x: cx + 120, y: cy - 60 };
      const cp2_1 = { x: cx + 150, y: cy - 10 }, cp2_2 = { x: cx + 130, y: cy + 80 }, p2 = { x: cx + 60, y: cy + 110 };
      const cp3_1 = { x: cx + 20, y: cy + 130 }, cp3_2 = { x: cx - 80, y: cy + 120 }, p3 = { x: cx - 110, y: cy + 40 };
      const cp4_1 = { x: cx - 130, y: cy - 20 }, cp4_2 = { x: cx - 120, y: cy - 40 }, p4 = p0;

      const points = [];
      const steps = 40;
      for (let i = 0; i <= steps; i++) points.push(getBezierPoint(p0, cp1_1, cp1_2, p1, i / steps));
      for (let i = 1; i <= steps; i++) points.push(getBezierPoint(p1, cp2_1, cp2_2, p2, i / steps));
      for (let i = 1; i <= steps; i++) points.push(getBezierPoint(p2, cp3_1, cp3_2, p3, i / steps));
      for (let i = 1; i <= steps; i++) points.push(getBezierPoint(p3, cp4_1, cp4_2, p4, i / steps));

      // Paint wells
      const wells = [
        { x: cx + 70, y: cy - 40, color: "#EC4899" }, // Fuchsia
        { x: cx + 55, y: cy + 10, color: "#F97316" }, // Orange
        { x: cx + 10, y: cy + 45, color: "#EAB308" }, // Yellow
        { x: cx - 40, y: cy + 35, color: "#06B6D4" }  // Cyan
      ];
      const thumbhole = { x: cx - 60, y: cy - 10, r: 12 };

      // Initialize drawing cursor (mx, my)
      let mx = cx;
      let my = cy;

      // Draw state based on progress
      if (progress < 50) {
        // Phase 1: Draw Palette Outline
        const ratio = progress / 50;
        const currentLen = Math.floor(ratio * (points.length - 1));
        
        ctx.strokeStyle = "rgba(34, 197, 94, 0.6)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i <= currentLen; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        mx = points[currentLen].x;
        my = points[currentLen].y;
      } else {
        // Outline completed
        ctx.strokeStyle = "rgba(34, 197, 94, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.stroke();

        // Phase 2: Draw Paint Wells (50 to 75)
        wells.forEach((w, index) => {
          const startP = 50 + index * 5;
          const endP = 50 + (index + 1) * 5;
          if (progress >= startP) {
            ctx.beginPath();
            ctx.arc(w.x, w.y, 10, 0, Math.PI * 2);
            if (progress >= endP) {
              ctx.fillStyle = w.color;
              ctx.fill();
              ctx.strokeStyle = "rgba(255,255,255,0.2)";
              ctx.stroke();
            } else {
              const ratio = (progress - startP) / 5;
              ctx.fillStyle = w.color;
              ctx.globalAlpha = ratio;
              ctx.fill();
              ctx.globalAlpha = 1.0;
            }
          }
        });

        // Draw thumbhole
        if (progress >= 70) {
          ctx.beginPath();
          ctx.arc(thumbhole.x, thumbhole.y, thumbhole.r, 0, Math.PI * 2);
          ctx.fillStyle = "#050816";
          ctx.fill();
          ctx.strokeStyle = "rgba(34,197,94,0.3)";
          ctx.stroke();
        }

        // Determine cursor position mx, my in Phase 2/3/4
        if (progress < 75) {
          const wellIndex = Math.min(3, Math.floor((progress - 50) / 5));
          const w = wells[wellIndex];
          const startP = 50 + wellIndex * 5;
          const ratio = (progress - startP) / 5;
          const lastX = wellIndex === 0 ? points[points.length-1].x : wells[wellIndex-1].x;
          const lastY = wellIndex === 0 ? points[points.length-1].y : wells[wellIndex-1].y;
          
          mx = lastX + (w.x - lastX) * ratio;
          my = lastY + (w.y - lastY) * ratio;
        } else if (progress < 92) {
          // Phase 3: Paintbrush Stroke sweep (75 to 92)
          const ratio = (progress - 75) / 17;
          
          const sweepX1 = cx - 110;
          const sweepX2 = cx + 110;
          const sweepX = sweepX1 + (sweepX2 - sweepX1) * ratio;
          const sweepY = cy + 20 * Math.sin((sweepX - cx) * 0.035);
          
          mx = sweepX;
          my = sweepY;

          ctx.strokeStyle = "rgba(74, 222, 128, 0.75)";
          ctx.lineWidth = 12;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.beginPath();
          ctx.moveTo(sweepX1, cy + 20 * Math.sin((sweepX1 - cx) * 0.035));
          for (let sx = sweepX1; sx <= sweepX; sx += 2) {
            ctx.lineTo(sx, cy + 20 * Math.sin((sx - cx) * 0.035));
          }
          ctx.stroke();
          ctx.lineWidth = 1;
        } else {
          mx = cx + 110;
          my = cy + 20 * Math.sin(110 * 0.035);
          
          ctx.strokeStyle = "rgba(74, 222, 128, 0.75)";
          ctx.lineWidth = 12;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.beginPath();
          const sweepX1 = cx - 110;
          const sweepX2 = cx + 110;
          ctx.moveTo(sweepX1, cy + 20 * Math.sin((sweepX1 - cx) * 0.035));
          for (let sx = sweepX1; sx <= sweepX2; sx += 2) {
            ctx.lineTo(sx, cy + 20 * Math.sin((sx - cx) * 0.035));
          }
          ctx.stroke();
          ctx.lineWidth = 1;
        }
      }

      if (progress >= 85) {
        ctx.fillStyle = "#22C55E";
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1;
        const nodePoints = [p0, p1, p2, p3];
        nodePoints.forEach(node => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });
      }

      ctx.strokeStyle = "#4ADE80";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(mx - 8, my); ctx.lineTo(mx + 8, my);
      ctx.moveTo(mx, my - 8); ctx.lineTo(mx, my + 8);
      ctx.stroke();

      ctx.fillStyle = "rgba(5, 8, 22, 0.85)";
      ctx.strokeStyle = "rgba(34, 197, 94, 0.5)";
      const tVal = `X: ${Math.round(mx)} Y: ${Math.round(my)}`;
      const tw = ctx.measureText(tVal).width + 12;
      ctx.beginPath();
      ctx.roundRect(mx + 10, my + 10, tw, 18, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#4ADE80";
      ctx.font = "bold 8px monospace";
      ctx.textAlign = "left";
      ctx.fillText(tVal, mx + 16, my + 22);

      ctx.strokeStyle = "rgba(34, 197, 94, 0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 3]);
      const guideY = cy + 160;
      ctx.beginPath();
      ctx.moveTo(cx - 150, guideY);
      ctx.lineTo(cx + 150, guideY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - 150, guideY - 4); ctx.lineTo(cx - 150, guideY + 4);
      ctx.moveTo(cx + 150, guideY - 4); ctx.lineTo(cx + 150, guideY + 4);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "rgba(34, 197, 94, 0.65)";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";

      let phaseText = "INITIALIZING VECTOR PALETTE CANVAS";
      if (progress >= 92) phaseText = "FINISHING CONTRAST CALIBRATION";
      else if (progress >= 75) phaseText = "APPLYING BRUSH CHROMATIC SWEEP";
      else if (progress >= 50) phaseText = "FILLING CAROUSEL PALETTE WELLS";
      else if (progress >= 3) phaseText = "RENDERING VECTOR PATH CONTOURS";

      ctx.fillText(`DESIGN SYSTEM ENGINE // ${phaseText} [${progress}%]`, cx, guideY - 4);

      frameRef.current = requestAnimationFrame(draw);
    }
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [progress]);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setExit(true), 1300);
    const doneTimer = setTimeout(() => onDone?.(), 1500);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#050816",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: exit ? 0 : 1,
        transition: "opacity 0.28s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: exit ? "none" : "all",
        overflow: "hidden",
      }}
    >
      {/* Ambient particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />

      {/* Ambient radial glow behind canvas */}
      <div style={{
        position: "absolute",
        width: "clamp(320px,55vw,520px)",
        height: "clamp(320px,55vw,520px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, rgba(22,163,74,0.08) 45%, transparent 70%)",
        filter: "blur(40px)",
        animation: "loaderPulse 1.6s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Artboard Corner Crop Marks */}
      {/* Top Left Bracket */}
      <div style={{ position: "absolute", top: "24px", left: "24px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ width: "20px", height: "20px", borderLeft: "2px solid #22C55E", borderTop: "2px solid #22C55E" }} />
        <span style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(34, 197, 94, 0.5)" }}>LOC // 00.00</span>
      </div>
      {/* Top Right Bracket */}
      <div style={{ position: "absolute", top: "24px", right: "24px", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
        <div style={{ width: "20px", height: "20px", borderRight: "2px solid #22C55E", borderTop: "2px solid #22C55E" }} />
        <span style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(34, 197, 94, 0.5)" }}>SYS // STABLE</span>
      </div>
      {/* Bottom Left Bracket */}
      <div style={{ position: "absolute", bottom: "24px", left: "24px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <span style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(34, 197, 94, 0.5)" }}>GRID // 45PX</span>
        <div style={{ width: "20px", height: "20px", borderLeft: "2px solid #22C55E", borderBottom: "2px solid #22C55E" }} />
      </div>
      {/* Bottom Right Bracket */}
      <div style={{ position: "absolute", bottom: "24px", right: "24px", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
        <span style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(34, 197, 94, 0.5)" }}>SCALE // 1.0</span>
        <div style={{ width: "20px", height: "20px", borderRight: "2px solid #22C55E", borderBottom: "2px solid #22C55E" }} />
      </div>

      {/* Central content */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "0", marginTop: "160px" }}>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "clamp(26px,5.5vw,48px)",
          fontWeight: 900,
          letterSpacing: "0.13em",
          margin: 0,
          lineHeight: 1,
          textShadow: "0 0 40px rgba(34, 197, 94, 0.55), 0 0 80px rgba(34, 197, 94, 0.22)",
          animation: "loaderGlow 1.1s ease-in-out infinite alternate",
        }}>
          <span style={{ color: "#FFFFFF" }}>DESIGN-A</span>
          <span style={{ color: "#22C55E" }}>-THON</span>
        </h1>

        {/* Tag line */}
        <p style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "clamp(9px,1.4vw,11px)",
          fontWeight: 600,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "#7E89A8",
          margin: "10px 0 0 0",
        }}>
          Rendering canvas
        </p>

        {/* Progress track */}
        <div style={{
          marginTop: "22px",
          width: "clamp(180px,28vw,260px)",
          height: "3px",
          background: "rgba(34, 197, 94, 0.12)",
          borderRadius: "3px",
          overflow: "hidden",
          position: "relative",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #16A34A, #22C55E, #4ADE80)",
            borderRadius: "3px",
            boxShadow: "0 0 12px rgba(34, 197, 94, 0.80)",
            transition: "width 0.05s linear",
            position: "relative",
          }}>
            {/* shimmer */}
            <div style={{
              position: "absolute",
              top: 0, right: 0, bottom: 0,
              width: "40px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              animation: "loaderShimmer 0.6s ease-in-out infinite",
            }} />
          </div>
        </div>

        {/* Pct label */}
        <p style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "10px",
          color: "rgba(34, 197, 94, 0.65)",
          margin: "8px 0 0 0",
          letterSpacing: "0.10em",
        }}>
          {progress}%
        </p>
      </div>

      <style>{`
        @keyframes loaderPulse {
          0%,100% { opacity:0.75; transform:scale(1); }
          50%      { opacity:1;   transform:scale(1.05); }
        }
        @keyframes loaderGlow {
          from { text-shadow: 0 0 28px rgba(34,197,94,0.45), 0 0 60px rgba(34,197,94,0.18); }
          to   { text-shadow: 0 0 52px rgba(34,197,94,0.85), 0 0 100px rgba(34,197,94,0.38); }
        }
        @keyframes loaderShimmer {
          0%   { opacity:0; transform:translateX(-30px); }
          50%  { opacity:1; }
          100% { opacity:0; transform:translateX(10px); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function DesignAThonPage() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full max-w-[100vw] overflow-x-hidden flex flex-col font-inter bg-[#050816]">
      {loading && (
        <style>{`
          nav { display: none !important; }
        `}</style>
      )}
      {!loading && (
        <style>{`
          nav { animation: navQuickIn 0.18s ease-out; }
          @keyframes navQuickIn {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      )}
      <GreenFloatingParticlesBackground />
      <CursorTrail colorRgb={[34, 197, 94]} />
      {loading && <DesignAThonLoader onDone={() => setLoading(false)} />}
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

        {/* Layered green and teal neon ambient glows all over the page background */}
        <div
          className="fixed inset-0 pointer-events-none -z-10"
          style={{
            background: [
              "radial-gradient(ellipse 90% 65% at 50% 0%, rgba(34,197,94,0.18) 0%, transparent 65%)",
              "radial-gradient(ellipse 70% 50% at 80% 80%, rgba(22,163,74,0.14) 0%, transparent 60%)",
              "radial-gradient(ellipse 55% 40% at 20% 55%, rgba(20,184,166,0.11) 0%, transparent 55%)",
              "radial-gradient(ellipse 40% 35% at 60% 30%, rgba(74,222,128,0.08) 0%, transparent 50%)",
            ].join(", "),
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
            .hero-btns {
              justify-content: center !important;
              flex-direction: column !important;
              align-items: stretch !important;
              width: 100% !important;
              max-width: 280px !important;
              margin: 0 auto !important;
              gap: 0.75rem !important;
            }
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
          @keyframes greenTitleGlow {
            0%, 100% {
              filter: drop-shadow(0 0 20px rgba(34,197,94,0.45)) drop-shadow(0 0 50px rgba(34,197,94,0.20));
            }
            50% {
              filter: drop-shadow(0 0 28px rgba(74,222,128,0.70)) drop-shadow(0 0 65px rgba(34,197,94,0.35));
            }
          }
          .animate-title-glow-green {
            animation: greenTitleGlow 4s ease-in-out infinite;
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
              className={entranceComplete ? "animate-title-glow-green" : ""}
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(1.8rem, 4.2vw, 3.8rem)",
                fontWeight: 900,
                color: "#F8FAFC",
                letterSpacing: "0.08em",
                lineHeight: 1,
                whiteSpace: "nowrap",
                marginBottom: "0.5rem",
                filter: "drop-shadow(0 0 20px rgba(34,197,94,0.45)) drop-shadow(0 0 50px rgba(34,197,94,0.20))",
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
              className="text-[#FFFFFF] text-[clamp(17px,3.2vw,26px)] font-extrabold leading-[1.35] tracking-[0.01em] mb-2 mt-0"
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
              alignItems: "center",
              marginBottom: "1.5rem",
            }}>
              <div style={{ width: "70%", aspectRatio: "1 / 1", position: "relative" }}>
                <PortalVideo className="w-full h-full" />
              </div>
            </div>

            {/* Date/Time Badge */}
            <motion.div
              className="flex justify-center lg:justify-start w-full mb-5"
              variants={fadeIn}
            >
              <div
                className="inline-flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 py-2.5 rounded-[14px]"
                style={{
                  background: "linear-gradient(135deg, rgba(6,26,14,0.85) 0%, rgba(10,28,20,0.85) 100%)",
                  border: "1px solid rgba(34,197,94,0.28)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  boxShadow: "0 4px 20px rgba(34,197,94,0.16), inset 0 1px 0 rgba(34,197,94,0.14)",
                }}
              >
                <span className="flex items-center gap-1.5 text-white text-[12px] sm:text-[13px] font-semibold tracking-[0.01em]">
                  <Calendar size={14} color="#22C55E" />
                  June 26–27, 2026
                </span>
                <span
                  aria-hidden="true"
                  style={{ width: "1px", height: "14px", background: "rgba(34,197,94,0.30)" }}
                />
                <span className="flex items-center gap-1.5 text-white text-[12px] sm:text-[13px] font-semibold tracking-[0.01em]">
                  <Clock size={14} color="#22C55E" />
                  9:00 AM – 4:00 PM
                </span>
              </div>
            </motion.div>

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
                to="/design-a-thon/register"
                className="flex items-center justify-center gap-1.5 px-7 py-3 rounded-[50px] text-[#FFFFFF] text-[clamp(13px,1.6vw,15px)] font-bold tracking-[0.02em] cursor-pointer no-underline"
                style={{
                  background: "linear-gradient(135deg, #22C55E, #16A34A)",
                  boxShadow: "0 4px 24px rgba(34,197,94,0.40), inset 0 0 12px rgba(34,197,94,0.30)",
                  transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.06)";
                  e.currentTarget.style.boxShadow = "0 8px 36px rgba(34,197,94,0.60), inset 0 0 18px rgba(34,197,94,0.40)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(34,197,94,0.40), inset 0 0 12px rgba(34,197,94,0.30)";
                }}
              >
                Register Now <ChevronRight size={13} />
              </Link>

              {/* Secondary CTA — outline style */}
              <Link
                to="/design-a-thon/submit"
                className="flex items-center justify-center gap-1.5 px-7 py-3 rounded-[50px] text-[#FFFFFF] text-[clamp(13px,1.6vw,15px)] font-bold tracking-[0.02em] cursor-pointer no-underline btn-outline-glow"
                style={{
                  transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.06)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(34,197,94,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                Submit Design <ChevronRight size={13} />
              </Link>

            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN — desktop only */}
          <motion.div
            className="hero-right"
            style={{
              width: "55%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              transform: "translateX(3rem) translateY(-2rem)",
              position: "relative",
            }}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="w-[115%] lg:w-[130%] aspect-square relative" style={{ alignSelf: "center" }}>
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
                  "linear-gradient(135deg, rgba(6,26,14,0.94) 0%, rgba(10,28,20,0.90) 100%)",
                border: "1.5px solid rgba(34,197,94,0.50)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                boxShadow: [
                  "0 0 0 1px rgba(34,197,94,0.25)",
                  "0 16px 80px rgba(34,197,94,0.38)",
                  "0 4px 20px rgba(20,184,166,0.22)",
                  "inset 0 1px 0 rgba(34,197,94,0.35)",
                  "0 0 50px rgba(34,197,94,0.26)",
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
            <ScrollReveal className="flex-1 relative">
              {/* Background neon radiance blended with bg */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[20px]"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(34,197,94,0.15) 0%, transparent 75%)',
                  filter: 'blur(20px)',
                  zIndex: 0,
                  transform: 'scale(1.1)',
                }}
              />
              <div
                className="glass-card rounded-[20px] p-10 h-full flex flex-col relative overflow-hidden group cursor-default"
                style={{
                  zIndex: 1,
                  border: '1px solid rgba(34,197,94,0.35)',
                  borderTop: '2.5px solid #22C55E',
                  boxShadow: '0 0 20px rgba(34,197,94,0.18), 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(34,197,94,0.15)',
                  transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease',
                  willChange: 'transform',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.015)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(34,197,94,0.28), inset 0 1px 0 rgba(34,197,94,0.20), 0 0 25px rgba(34,197,94,0.20)';
                  e.currentTarget.style.borderColor = 'rgba(34,197,94,0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(34,197,94,0.18), 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(34,197,94,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(34,197,94,0.35)';
                }}
              >
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
            <ScrollReveal className="flex-1 relative" delay={0.15}>
              {/* Background neon radiance blended with bg */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[20px]"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(34,197,94,0.15) 0%, transparent 75%)',
                  filter: 'blur(20px)',
                  zIndex: 0,
                  transform: 'scale(1.1)',
                }}
              />
              <div
                className="glass-card rounded-[20px] p-10 h-full flex flex-col relative overflow-hidden group cursor-default"
                style={{
                  zIndex: 1,
                  border: '1px solid rgba(34,197,94,0.35)',
                  borderTop: '2.5px solid #22C55E',
                  boxShadow: '0 0 20px rgba(34,197,94,0.18), 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(34,197,94,0.15)',
                  transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease',
                  willChange: 'transform',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.015)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(34,197,94,0.28), inset 0 1px 0 rgba(34,197,94,0.20), 0 0 25px rgba(34,197,94,0.20)';
                  e.currentTarget.style.borderColor = 'rgba(34,197,94,0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(34,197,94,0.18), 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(34,197,94,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(34,197,94,0.35)';
                }}
              >
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
          <ScrollReveal variants={scaleUp} className="relative">
            {/* Background neon radiance blended with bg */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[28px]"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(34,197,94,0.18) 0%, transparent 75%)',
                filter: 'blur(30px)',
                zIndex: 0,
                transform: 'scale(1.12)',
              }}
            />
            <div
              className="relative max-w-[900px] mx-auto rounded-[28px] overflow-hidden px-8 py-14 md:px-16 md:py-20 text-center"
              style={{
                zIndex: 1,
                boxShadow: "0 0 25px rgba(34,197,94,0.15), 0 8px 32px rgba(34,197,94,0.12)",
              }}
            >
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

                <p className="text-[#C8D3F5] text-[clamp(13px,1.8vw,17px)] leading-[1.7] max-w-[520px] mx-auto mb-8">
                  Seats are limited. The stage is live on FlashForte 2K26. Lock in your spot and let the best gamer win.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    to="/design-a-thon/register"
                    className="flex items-center justify-center gap-1.5 px-7 py-3 rounded-[50px] text-[#FFFFFF] text-[clamp(13px,1.6vw,15px)] font-bold tracking-[0.02em] cursor-pointer no-underline"
                    style={{
                      background: "linear-gradient(135deg, #22C55E, #16A34A)",
                      boxShadow: "0 4px 24px rgba(34,197,94,0.40), inset 0 0 12px rgba(34,197,94,0.30)",
                      transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.06)";
                      e.currentTarget.style.boxShadow = "0 8px 36px rgba(34,197,94,0.60), inset 0 0 18px rgba(34,197,94,0.40)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.boxShadow = "0 4px 24px rgba(34,197,94,0.40), inset 0 0 12px rgba(34,197,94,0.30)";
                    }}
                  >
                    Register Now <ChevronRight size={13} />
                  </Link>

                  <Link
                    to="/design-a-thon/submit"
                    className="flex items-center justify-center gap-1.5 px-7 py-3 rounded-[50px] text-[#FFFFFF] text-[clamp(13px,1.6vw,15px)] font-bold tracking-[0.02em] cursor-pointer no-underline btn-outline-glow"
                    style={{
                      transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.06)";
                      e.currentTarget.style.boxShadow = "0 8px 28px rgba(34,197,94,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    Submit Design <ChevronRight size={13} />
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