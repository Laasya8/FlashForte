import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
import { StarField } from "../components/StarField.jsx";
import ss1 from "../../images/Gameathon/Gameathon_ss1.webp";
import ss2 from "../../images/Gameathon/Gameathon_ss2.webp";

function GalaxyBackground({
  density          = 0.8,
  glowIntensity    = 0.25,
  saturation       = 0.3,
  hueShift         = 280,
  twinkleIntensity = 0.2,
  rotationSpeed    = 0.08,
  repulsionStrength = 1,
  starSpeed        = 0.3,
  speed            = 0.5,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H, cx, cy;
    const mouse = { x: -9999, y: -9999 };
    let rot = 0;
    let raf;

    const COUNT = Math.floor(480 * density);

    function mkStar() {
      const angle      = Math.random() * Math.PI * 2;
      const maxR       = Math.hypot(W, H) * 0.55;
      const dist       = 10 + Math.random() * maxR;
      const size       = 0.4 + Math.random() * 1.7;
      const spd        = (0.04 + Math.random() * 0.11) * starSpeed * speed;
      const twinkPhase = Math.random() * Math.PI * 2;
      const twinkSpeed = 0.4 + Math.random() * 1.4;
      const colorT     = Math.random();
      return { angle, dist, size, speed: spd, twinkPhase, twinkSpeed, colorT, ox: 0, oy: 0 };
    }

    let stars = [];

    function resize() {
      const parent = canvas.parentElement;
      W = canvas.width  = parent ? parent.offsetWidth  : window.innerWidth;
      H = canvas.height = parent ? parent.offsetHeight : document.documentElement.scrollHeight;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      cx = W / 2;
      cy = H / 2;
      stars = Array.from({ length: COUNT }, mkStar);
    }
    resize();

    const parent = canvas.parentElement;
    const ro = parent ? new ResizeObserver(resize) : null;
    ro?.observe(parent);
    window.addEventListener("resize", resize);

    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    }
    window.addEventListener("mousemove", onMouseMove);

    let t = 0;
    function draw() {
      t  += 0.016 * speed;
      rot += rotationSpeed * 0.0002 * speed;

      ctx.clearRect(0, 0, W, H);

      stars.forEach((s) => {
        s.angle += s.speed * 0.004;
        const worldX = cx + s.dist * Math.cos(s.angle + rot);
        const worldY = cy + s.dist * Math.sin(s.angle + rot) * 0.52;

        const dx  = worldX - mouse.x;
        const dy  = worldY - mouse.y;
        const d   = Math.sqrt(dx * dx + dy * dy) || 1;
        const REP = 90 * repulsionStrength;
        if (d < REP) {
          const force = (1 - d / REP) * 18 * repulsionStrength;
          s.ox += (dx / d) * force * 0.08;
          s.oy += (dy / d) * force * 0.08;
        }
        s.ox *= 0.92;
        s.oy *= 0.92;

        const px = worldX + s.ox;
        const py = worldY + s.oy;

        const twinkle = 1 - twinkleIntensity + twinkleIntensity * Math.sin(t * s.twinkSpeed + s.twinkPhase);
        const alpha   = (0.35 + s.colorT * 0.55) * twinkle;
        const hue     = hueShift + (s.colorT - 0.5) * 40;
        const sat     = Math.round(55 + saturation * 40);
        const lit     = Math.round(72 + s.colorT * 20);

        if (glowIntensity > 0) {
          const gr = ctx.createRadialGradient(px, py, 0, px, py, s.size * 3.8);
          gr.addColorStop(0, `hsla(${hue},70%,75%,${alpha * glowIntensity * 1.8})`);
          gr.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(px, py, s.size * 3.8, 0, Math.PI * 2);
          ctx.fillStyle = gr;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue},${sat}%,${lit}%,${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "absolute",
        top:           0,
        left:          0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",
        zIndex:        0,
        opacity:       0.60,
        display:       "block",
      }}
      aria-hidden="true"
    />
  );
}

function MagicBentoCard({
  children,
  className = "",
  style     = {},
  cardBackground    = "rgba(10, 8, 28, 0.82)",
  enableStars       = true,
  enableSpotlight   = true,
  enableBorderGlow  = true,
  clickEffect       = true,
  spotlightRadius   = 400,
  particleCount     = 12,
  glowColor         = "132, 0, 255",
  disableAnimations = false,
}) {
  const cardRef    = useRef(null);
  const starsRef   = useRef([]);
  const rippleRef  = useRef(null);
  const spotRef    = useRef(null);
  const glowRef    = useRef(null);
  const rafRef     = useRef(null);
  const mouseRef   = useRef({ x: 0, y: 0, inside: false });

  useEffect(() => {
    if (!enableStars || disableAnimations) return;
    starsRef.current = Array.from({ length: particleCount }, (_, i) => ({
      x:      Math.random() * 100,
      y:      Math.random() * 100,
      size:   0.8 + Math.random() * 1.8,
      op:     0.2 + Math.random() * 0.7,
      phase:  Math.random() * Math.PI * 2,
      speed:  0.4 + Math.random() * 1.2,
      color:  Math.random() > 0.5 ? `rgba(${glowColor},` : "rgba(216,180,254,",
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableStars, particleCount]);

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect  = card.getBoundingClientRect();
    const x     = e.clientX - rect.left;
    const y     = e.clientY - rect.top;
    mouseRef.current = { x, y, inside: true };

    if (enableSpotlight && spotRef.current) {
      const pctX = (x / rect.width)  * 100;
      const pctY = (y / rect.height) * 100;
      spotRef.current.style.background =
        `radial-gradient(circle ${spotlightRadius}px at ${pctX}% ${pctY}%, rgba(${glowColor},0.13) 0%, transparent 70%)`;
    }
    if (enableBorderGlow && glowRef.current) {
      const pctX = (x / rect.width)  * 100;
      const pctY = (y / rect.height) * 100;
      glowRef.current.style.background =
        `radial-gradient(circle 160px at ${pctX}% ${pctY}%, rgba(${glowColor},0.55) 0%, transparent 70%)`;
    }
  }, [enableSpotlight, enableBorderGlow, spotlightRadius, glowColor]);

  const onMouseLeave = useCallback(() => {
    mouseRef.current.inside = false;
    if (spotRef.current)  spotRef.current.style.background  = "none";
    if (glowRef.current)  glowRef.current.style.background  = "none";
  }, []);

  const onClick = useCallback((e) => {
    if (!clickEffect || disableAnimations) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;

    const rip = document.createElement("span");
    rip.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:0; height:0;
      left:${x}px; top:${y}px;
      transform:translate(-50%,-50%);
      background:radial-gradient(circle,rgba(${glowColor},0.35) 0%,transparent 65%);
      animation:mbRipple 0.55s cubic-bezier(0.4,0,0.2,1) forwards;
      z-index:10;
    `;
    card.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
  }, [clickEffect, disableAnimations, glowColor]);

  useEffect(() => {
    if (!enableStars || disableAnimations) return;
    const canvas = cardRef.current?.querySelector(".mb-stars");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let t = 0;

    function draw() {
      const card = cardRef.current;
      if (!card) return;
      const W = canvas.width  = card.offsetWidth;
      const H = canvas.height = card.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      starsRef.current.forEach((s) => {
        const alpha = s.op * (0.65 + 0.35 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc((s.x / 100) * W, (s.y / 100) * H, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color + alpha + ")";
        ctx.fill();
      });
      t += 0.018;
      rafRef.current = requestAnimationFrame(draw);
    }
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [enableStars, disableAnimations]);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ position: "relative", overflow: "hidden", background: cardBackground, ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {enableStars && !disableAnimations && (
        <canvas
          className="mb-stars"
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}
          aria-hidden="true"
        />
      )}

      {enableSpotlight && !disableAnimations && (
        <div
          ref={spotRef}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, borderRadius: "inherit" }}
          aria-hidden="true"
        />
      )}

      {enableBorderGlow && !disableAnimations && (
        <div
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3, borderRadius: "inherit", padding: "1px" }}
          aria-hidden="true"
        >
          <div
            ref={glowRef}
            style={{ position: "absolute", inset: 0, borderRadius: "inherit" }}
          />
        </div>
      )}

      <div style={{ position: "relative", zIndex: 4, height: "100%" }}>
        {children}
      </div>

      <style>{`
        @keyframes mbRipple {
          0%   { width:0;     height:0;     opacity:1; }
          100% { width:280px; height:280px; opacity:0; }
        }
      `}</style>
    </div>
  );
}

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

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navbar      = document.querySelector("nav");
  const navH        = navbar ? navbar.offsetHeight : 72;
  const usableH     = window.innerHeight - navH;
  const elH         = el.offsetHeight;
  const elTop       = el.getBoundingClientRect().top + window.scrollY;

  let top;
  if (elH >= usableH) {
    top = elTop - navH - 16;
  } else {
    const offset = (usableH - elH) / 2;
    top = elTop - navH - offset;
  }

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

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

function RibbonCursor() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const pointsRef = useRef([]);
  const activeRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const TRAIL = 28;
    const THICKNESS = 14;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    pointsRef.current = Array.from({ length: TRAIL }, () => ({
      x: -200,
      y: -200,
    }));

    function onMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!activeRef.current) {
        activeRef.current = true;
        pointsRef.current = Array.from({ length: TRAIL }, () => ({
          x: e.clientX,
          y: e.clientY,
        }));
      }
    }
    window.addEventListener("mousemove", onMove);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const head = pointsRef.current[0];
      head.x += (mouseRef.current.x - head.x) * 0.36;
      head.y += (mouseRef.current.y - head.y) * 0.36;

      for (let i = 1; i < TRAIL; i++) {
        const prev = pointsRef.current[i - 1];
        const cur = pointsRef.current[i];
        cur.x += (prev.x - cur.x) * 0.42;
        cur.y += (prev.y - cur.y) * 0.42;
      }

      for (let i = 0; i < TRAIL - 1; i++) {
        const t = i / (TRAIL - 1);
        const p1 = pointsRef.current[i];
        const p2 = pointsRef.current[i + 1];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = (-dy / len) * THICKNESS * (1 - t) * 0.5;
        const ny = (dx / len) * THICKNESS * (1 - t) * 0.5;

        const alpha = (1 - t) * 0.55;

        const r = Math.round(168 - t * 55);
        const g = Math.round(85 - t * 52);
        const b = Math.round(247 - t * 115);

        ctx.beginPath();
        ctx.moveTo(p1.x + nx, p1.y + ny);
        ctx.lineTo(p1.x - nx, p1.y - ny);
        ctx.lineTo(p2.x - nx * (1 - 1 / TRAIL), p2.y - ny * (1 - 1 / TRAIL));
        ctx.lineTo(p2.x + nx * (1 - 1 / TRAIL), p2.y + ny * (1 - 1 / TRAIL));
        ctx.closePath();

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

function PortalVideo({ className = "" }) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.6;
  }, []);

  const MASK =
    "radial-gradient(circle at center, black 30%, rgba(0,0,0,0.85) 48%, rgba(0,0,0,0.40) 62%, transparent 75%)";

  return (
    <div
      className={`relative flex items-center justify-center aspect-square mx-auto w-full max-w-[clamp(312px,90vw,576px)] lg:max-w-none lg:w-full ${className}`}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-30%",
          zIndex: 0,
          filter: "blur(80px)",
          background:
            "radial-gradient(circle at center, rgba(168,85,247,0.26) 0%, rgba(147,51,234,0.14) 45%, rgba(107,33,168,0.06) 65%, transparent 80%)",
        }}
      />

      <div
        className="absolute"
        style={{
          inset: 0,
          zIndex: 1,
          maskImage: MASK,
          WebkitMaskImage: MASK,
        }}
      >
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
            filter: "grayscale(1) brightness(1.1) contrast(1.08)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            mixBlendMode: "color",
            background:
              "conic-gradient(from 180deg at 50% 50%, #A855F7 0deg, #9333EA 80deg, #7E22CE 160deg, #6B21A8 220deg, #7E22CE 280deg, #9333EA 330deg, #A855F7 360deg)",
            opacity: 0.95,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            mixBlendMode: "screen",
            background:
              "radial-gradient(ellipse at 55% 38%, rgba(168,85,247,0.35) 0%, rgba(147,51,234,0.18) 40%, transparent 65%)",
          }}
        />

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

function GameArenaCard({ icon: Icon, title, description, accentColor = "#A855F7", delay = 0 }) {
  return (
    <ScrollReveal variants={scaleUp} delay={delay}>
      <MagicBentoCard
        className="glass-card rounded-[20px] h-full"
        cardBackground="linear-gradient(145deg, rgba(16,10,36,0.96) 0%, rgba(12,8,28,0.94) 100%)"
        style={{
          transition:  "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1)",
          willChange:  "transform",
          boxShadow:   "0 4px 24px rgba(168,85,247,0.14), 0 1px 0 rgba(168,85,247,0.12) inset",
        }}
        enableStars
        enableSpotlight
        enableBorderGlow
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="132, 0, 255"
        onMouseEnter={(e) => {
          const card = e.currentTarget;
          card.style.transform = "translateY(-10px) scale(1.025)";
          card.style.boxShadow = [
            `0 24px 64px ${accentColor}35`,
            `0 10px 28px ${accentColor}22`,
            `0 0 0 1px ${accentColor}55`,
            `inset 0 1px 0 ${accentColor}28`,
            `0 0 40px rgba(168,85,247,0.18)`,
          ].join(", ");
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          card.style.transform = "";
          card.style.boxShadow = "0 4px 24px rgba(168,85,247,0.14), 0 1px 0 rgba(168,85,247,0.12) inset";
        }}
      >
        <div className="p-6 flex flex-col gap-4 cursor-default h-full">
          <div
            className="icon-box w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
            style={{
              background: `linear-gradient(135deg, ${accentColor}22 0%, ${accentColor}11 100%)`,
              border:     `1px solid ${accentColor}44`,
              boxShadow:  `0 0 16px ${accentColor}20`,
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
      </MagicBentoCard>
    </ScrollReveal>
  );
}

function SkillCard({ icon: Icon, title, delay = 0 }) {
  return (
    <ScrollReveal variants={scaleUp} delay={delay}>
      <MagicBentoCard
        className="glass-card rounded-[16px] h-full"
        cardBackground="linear-gradient(145deg, rgba(14,9,32,0.96) 0%, rgba(10,6,24,0.94) 100%)"
        style={{
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
          boxShadow:  "0 4px 20px rgba(168,85,247,0.13), 0 0 0 1px rgba(168,85,247,0.06)",
        }}
        enableStars
        enableSpotlight
        enableBorderGlow
        clickEffect
        spotlightRadius={300}
        particleCount={8}
        glowColor="132, 0, 255"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-9px) scale(1.05)";
          e.currentTarget.style.boxShadow = [
            "0 22px 52px rgba(168,85,247,0.28)",
            "0 8px 22px rgba(147,51,234,0.18)",
            "0 0 0 1px rgba(168,85,247,0.50)",
            "inset 0 1px 0 rgba(168,85,247,0.22)",
            "0 0 36px rgba(168,85,247,0.16)",
          ].join(", ");
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(168,85,247,0.13), 0 0 0 1px rgba(168,85,247,0.06)";
        }}
      >
        <div className="px-5 py-6 flex flex-col items-center gap-3 text-center cursor-default">
          <div
            className="skill-icon-ring w-11 h-11 rounded-full flex items-center justify-center bg-[rgba(168,85,247,0.14)] border border-[rgba(168,85,247,0.28)] shadow-[0_0_14px_rgba(168,85,247,0.16)]"
            style={{ transition: "box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease" }}
          >
            <Icon size={20} color="#A855F7" />
          </div>
          <span className="text-[#C8D3F5] text-[13px] font-semibold tracking-[0.03em]">
            {title}
          </span>
        </div>
      </MagicBentoCard>
    </ScrollReveal>
  );
}

const GALLERY_ITEMS = [
  {
    accent: "#A855F7",
    image:  ss1,
  },
  {
    accent: "#9333EA",
    image:  ss2,
  },
];

function TalentGallery() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
    >
      {GALLERY_ITEMS.map((item, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            height: "clamp(220px, 40vw, 380px)",
            boxShadow: [
              `0 0 0 1px ${item.accent}44`,
              `0 8px 40px ${item.accent}35`,
              `0 28px 80px ${item.accent}1a`,
              "0 4px 16px rgba(0,0,0,0.65)",
            ].join(", "),
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px) scale(1.015)";
            e.currentTarget.style.boxShadow = [
              `0 0 0 1px ${item.accent}66`,
              `0 16px 56px ${item.accent}45`,
              `0 32px 90px ${item.accent}26`,
              "0 6px 20px rgba(0,0,0,0.70)",
            ].join(", ");
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow = [
              `0 0 0 1px ${item.accent}44`,
              `0 8px 40px ${item.accent}35`,
              `0 28px 80px ${item.accent}1a`,
              "0 4px 16px rgba(0,0,0,0.65)",
            ].join(", ");
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-24px",
              borderRadius: "32px",
              background: `radial-gradient(ellipse at 50% 65%, ${item.accent}30 0%, ${item.accent}0a 55%, transparent 75%)`,
              filter: "blur(22px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <img
            src={item.image}
            alt={`GameAThon highlight ${i + 1}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              borderRadius: "16px",
              zIndex: 1,
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

function GameAThonLoader({ onDone }) {
  const canvasRef  = useRef(null);
  const frameRef   = useRef(null);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const PURPLE_PALETTE = [
      "rgba(168,85,247,",
      "rgba(147,51,234,",
      "rgba(192,132,252,",
      "rgba(107,33,168,",
      "rgba(216,180,254,",
    ];
    const particles = Array.from({ length: 80 }, () => {
      const angle  = Math.random() * Math.PI * 2;
      const dist   = 60 + Math.random() * 220;
      const speed  = 0.3 + Math.random() * 0.9;
      const size   = 1.2 + Math.random() * 3.5;
      const color  = PURPLE_PALETTE[Math.floor(Math.random() * PURPLE_PALETTE.length)];
      const alpha  = 0.35 + Math.random() * 0.65;
      return { angle, dist, speed, size, color, alpha, baseAlpha: alpha };
    });

    let t = 0;
    function draw() {
      t += 0.016;
      const cx = canvas.width  / 2;
      const cy = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.angle += p.speed * 0.012;
        const r  = p.dist + Math.sin(t * p.speed + p.angle) * 18;
        const px = cx + r * Math.cos(p.angle);
        const py = cy + r * Math.sin(p.angle) * 0.45;
        const a  = p.baseAlpha * (0.7 + 0.3 * Math.sin(t * 2 + p.angle));

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + a + ")";
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(draw);
    }
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setExit(true),  1550);
    const doneTimer = setTimeout(() => onDone?.(),     1900);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          99999,
        background:      "#050816",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        flexDirection:   "column",
        gap:             "0",
        opacity:         exit ? 0 : 1,
        transition:      "opacity 0.38s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents:   exit ? "none" : "all",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />

      <div
        style={{
          position:     "absolute",
          width:        "clamp(260px,50vw,420px)",
          height:       "clamp(260px,50vw,420px)",
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(147,51,234,0.10) 40%, transparent 70%)",
          filter:       "blur(32px)",
          animation:    "gtPulse 2s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position:     "absolute",
          width:        "clamp(180px,36vw,300px)",
          height:       "clamp(180px,36vw,300px)",
          borderRadius: "50%",
          border:       "1.5px solid rgba(168,85,247,0.30)",
          boxShadow:    "0 0 40px rgba(168,85,247,0.20), inset 0 0 40px rgba(168,85,247,0.10)",
          animation:    "gtSpin 3s linear infinite",
        }}
      />
      <div
        style={{
          position:     "absolute",
          width:        "clamp(220px,42vw,360px)",
          height:       "clamp(220px,42vw,360px)",
          borderRadius: "50%",
          border:       "1px solid rgba(147,51,234,0.18)",
          animation:    "gtSpin 5s linear infinite reverse",
        }}
      />

      <div
        style={{
          position:     "absolute",
          width:        "10px",
          height:       "10px",
          borderRadius: "50%",
          background:   "#A855F7",
          boxShadow:    "0 0 24px 8px rgba(168,85,247,0.60)",
          animation:    "gtPulse 1.2s ease-in-out infinite",
        }}
      />

      <div style={{ position: "relative", textAlign: "center", zIndex: 2, marginTop: "0" }}>
        <h1
          style={{
            fontFamily:    "'Orbitron', sans-serif",
            fontSize:      "clamp(28px,6vw,52px)",
            fontWeight:    900,
            letterSpacing: "0.12em",
            color:         "#F8FAFC",
            margin:        0,
            textShadow:    "0 0 40px rgba(168,85,247,0.60), 0 0 80px rgba(168,85,247,0.25)",
            animation:     "gtGlow 1.6s ease-in-out infinite alternate",
          }}
        >
          GAME-A-THON
        </h1>

        <div
          style={{
            marginTop:     "20px",
            display:       "flex",
            alignItems:    "center",
            justifyContent:"center",
            gap:           "8px",
          }}
        >
          <span
            style={{
              fontFamily:    "'Orbitron', sans-serif",
              fontSize:      "11px",
              fontWeight:    600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "#7E89A8",
            }}
          >
            Loading Reality
          </span>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display:       "inline-block",
                width:         "5px",
                height:        "5px",
                borderRadius:  "50%",
                background:    "#A855F7",
                boxShadow:     "0 0 8px rgba(168,85,247,0.8)",
                animation:     `gtDot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        <div
          style={{
            marginTop:    "28px",
            width:        "clamp(160px,30vw,240px)",
            height:       "2px",
            background:   "rgba(168,85,247,0.15)",
            borderRadius: "2px",
            overflow:     "hidden",
            marginInline: "auto",
          }}
        >
          <div
            style={{
              height:     "100%",
              borderRadius: "2px",
              background: "linear-gradient(90deg, #A855F7, #9333EA)",
              boxShadow:  "0 0 10px rgba(168,85,247,0.8)",
              animation:  "gtBar 1.7s cubic-bezier(0.4,0,0.2,1) forwards",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes gtPulse {
          0%,100% { opacity:0.7; transform:scale(1); }
          50%      { opacity:1;   transform:scale(1.06); }
        }
        @keyframes gtSpin {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes gtGlow {
          from { text-shadow: 0 0 30px rgba(168,85,247,0.50), 0 0 60px rgba(168,85,247,0.20); }
          to   { text-shadow: 0 0 55px rgba(168,85,247,0.85), 0 0 100px rgba(168,85,247,0.40); }
        }
        @keyframes gtDot {
          0%,80%,100% { transform:scale(0.6); opacity:0.4; }
          40%          { transform:scale(1.3); opacity:1; }
        }
        @keyframes gtBar {
          from { width:0%; }
          to   { width:100%; }
        }
      `}</style>
    </div>
  );
}

const ARENA_CARDS = [
  {
    icon: Brain,
    title: "Memory Challenge",
    description:
      "Push your recall to the limit. Sequences, patterns, and grids designed to train short-term and spatial memory under competitive pressure.",
    accentColor: "#A855F7",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Real-time co-op missions where communication and coordination matter as much as individual skill. Win together or fall apart.",
    accentColor: "#A855F7",
  },
  {
    icon: Sword,
    title: "Strategy & Logic",
    description:
      "Puzzle-solving, route planning, and decision trees that reward structured thinking. Fast reflexes help, but brains win.",
    accentColor: "#A855F7",
  },
  {
    icon: Zap,
    title: "Gaming Skills",
    description:
      "Speed, accuracy, and adaptability tested across multiple mini-game formats — from typing races to drawing sprints.",
    accentColor: "#A855F7",
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

export function GameAThonPage() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full max-w-[100vw] overflow-x-hidden flex flex-col font-inter" style={{ background: "#050816", isolation: "isolate" }}>
      {/* CHANGE 1: Hide the navbar/header while the loading screen is active */}
      {loading && (
        <style>{`
          nav { display: none !important; }
        `}</style>
      )}

      <GalaxyBackground
        density={0.8}
        glowIntensity={0.25}
        saturation={0.3}
        hueShift={280}
        twinkleIntensity={0.2}
        rotationSpeed={0.08}
        repulsionStrength={1}
        starSpeed={0.3}
        speed={0.5}
      />

      {loading && <GameAThonLoader onDone={() => setLoading(false)} />}
      <RibbonCursor />

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-space-radial" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="bg-planet-top-right" />
        <div className="bg-planet-left" />
        <div className="bg-ambient-depth" />
      </div>
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 90% 65% at 50% 0%, rgba(168,85,247,0.17) 0%, transparent 65%)",
            "radial-gradient(ellipse 70% 50% at 80% 80%, rgba(147,51,234,0.12) 0%, transparent 60%)",
            "radial-gradient(ellipse 55% 40% at 20% 55%, rgba(107,33,168,0.10) 0%, transparent 55%)",
            "radial-gradient(ellipse 40% 35% at 60% 30%, rgba(126,34,206,0.07) 0%, transparent 50%)",
          ].join(", "),
        }}
      />
      <StarField />

      {/* SECTION 1 — HERO */}
      <section
        id="hero"
        className="relative z-10 flex flex-col lg:flex-row lg:justify-between items-center lg:items-center px-5 pt-4 md:pt-6 lg:pt-6 pb-12 lg:pb-20 w-full max-w-[1400px] mx-auto gap-0 lg:gap-0"
        style={{
          minHeight: "calc(100dvh - 72px)",
          scrollMarginTop: "72px",
        }}
      >
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

          <motion.div
            className="lg:hidden w-full flex justify-center my-3"
            variants={fadeIn}
          >
            <PortalVideo className="w-[86%] max-w-[385px]" />
          </motion.div>

          <motion.p
            className="text-[#FFFFFF] text-[clamp(17px,3.2vw,26px)] font-extrabold leading-[1.35] tracking-[0.01em] mb-2 mt-0"
            variants={slideUp}
          >
            Compete. Collaborate.{" "}
            <span className="bg-gradient-to-r from-[#A855F7] to-[#9333EA] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
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

          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-3 w-full"
            variants={scaleUp}
          >
            <button
              onClick={() => scrollToSection("gaming-skills")}
              className="flex items-center justify-center gap-2 px-7 py-3 rounded-[50px] border-none text-[#FFFFFF] text-[clamp(13px,1.6vw,15px)] font-bold tracking-[0.02em] cursor-pointer"
              style={{
                background: "#a855f7",
                boxShadow:  "0 4px 30px rgba(168,85,247,0.45), inset 0 0 15px rgba(168,85,247,0.3)",
              }}
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
              className="flex items-center justify-center gap-1.5 px-7 py-3 rounded-[50px] text-[#7E89A8] text-[clamp(13px,1.6vw,15px)] font-semibold tracking-[0.02em] cursor-pointer border border-[rgba(126,137,168,0.3)] bg-transparent hover:text-[#C8D3F5] hover:border-[rgba(168,85,247,0.35)] transition-all duration-300"
            >
              <Trophy size={13} /> View Highlights
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden lg:flex lg:w-[48%] justify-end w-full relative lg:translate-x-4"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ willChange: "opacity" }}
        >
          <PortalVideo className="w-[100%] lg:w-[141%]" />
        </motion.div>
      </section>

      {/* SECTION 2 — QUOTE CARD */}
      <section className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pb-16 md:pb-24 flex justify-center">
        <ScrollReveal variants={scaleUp} className="w-full max-w-[760px]">
          <div
            className="relative rounded-[28px] px-8 py-12 md:px-16 md:py-14 text-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,12,60,0.94) 0%, rgba(16,10,40,0.90) 100%)",
              border: "1px solid rgba(168,85,247,0.30)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              boxShadow: [
                "0 0 0 1px rgba(168,85,247,0.16)",
                "0 12px 56px rgba(168,85,247,0.22)",
                "0 2px 8px rgba(147,51,234,0.12)",
                "inset 0 1px 0 rgba(168,85,247,0.22)",
              ].join(", "),
            }}
          >
            <div
              className="absolute top-0 left-0 pointer-events-none"
              style={{
                width: "220px",
                height: "220px",
                background:
                  "radial-gradient(circle at 0% 0%, rgba(168,85,247,0.18) 0%, transparent 70%)",
                borderRadius: "0 0 100% 0",
              }}
            />
            <div
              className="absolute bottom-0 right-0 pointer-events-none"
              style={{
                width: "180px",
                height: "180px",
                background:
                  "radial-gradient(circle at 100% 100%, rgba(147,51,234,0.14) 0%, transparent 70%)",
                borderRadius: "100% 0 0 0",
              }}
            />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                width: "55%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(168,85,247,0.80), rgba(147,51,234,0.60), transparent)",
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
                  "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.08) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 18px rgba(168,85,247,0.22))",
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
                  textShadow: "0 0 48px rgba(168,85,247,0.30)",
                }}
              >
                The game is not about winning.
                <br className="hidden sm:block" />
                It's about how fast you{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #A855F7, #9333EA)",
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
                      "linear-gradient(90deg, transparent, rgba(168,85,247,0.60))",
                  }}
                />
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "32px",
                    fontWeight: 700,
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #A855F7 0%, #9333EA 100%)",
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
                      "linear-gradient(90deg, rgba(147,51,234,0.60), transparent)",
                  }}
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 3 — GAMING ARENA */}
      <section
        id="gaming-arena"
        className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pt-20 pb-20 md:pt-24 md:pb-28"
        style={{
          scrollMarginTop: "88px",
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(107,33,168,0.06) 0%, transparent 70%)",
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

      {/* SECTION 4 — GAMING SKILLS & TOOLS */}
      <section
        id="gaming-skills"
        className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pt-20 pb-20 md:pt-24 md:pb-28"
        style={{
          scrollMarginTop: "88px",
          background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(126,34,206,0.07) 0%, transparent 65%)",
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

      {/* SECTION 5 — LAST YEAR'S TALENT */}
      <section
        id="highlights"
        className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pt-20 pb-20 md:pt-24 md:pb-28"
        style={{
          scrollMarginTop: "88px",
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

        <ScrollReveal variants={fadeIn}>
          <div className="flex justify-center">
            <TalentGallery />
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 6 — READY TO GAME */}
      <section
        id="ready-to-game"
        className="relative z-10 w-full px-5 pb-24 md:pb-32"
        style={{ scrollMarginTop: "92px" }}
      >
        <ScrollReveal variants={scaleUp}>
          <div className="relative max-w-[900px] mx-auto rounded-[28px] overflow-hidden px-8 py-14 md:px-16 md:py-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e0a3c] via-[#0d0826] to-[#050816]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(168,85,247,0.36)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(147,51,234,0.20)_0%,transparent_65%)]" />
            <div className="absolute inset-0 rounded-[28px] border border-[rgba(168,85,247,0.32)] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-[#A855F7] to-transparent" />

            <div className="relative z-10">
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[rgba(168,85,247,0.17)] border border-[rgba(168,85,247,0.38)] shadow-[0_0_24px_rgba(168,85,247,0.30)]">
                  <Gamepad2 size={26} color="#A855F7" />
                </div>
              </div>

              <h2 className="font-orbitron text-[clamp(26px,5vw,48px)] font-black text-[#F8FAFC] tracking-[0.05em] m-0 mb-4 leading-[1.1]">
                Ready to{" "}
                <span style={{ color: "#A855F7" }}>Game?</span>
              </h2>

              <p className="text-[#C8D3F5] text-[clamp(13px,1.8vw,17px)] leading-[1.7] max-w-[460px] mx-auto mb-8">
                Seats are limited. The arena is live on June 26–27.
                Lock in your spot and let the best gamer win.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/registration-test"
                  className="flex items-center justify-center gap-2 px-10 py-4 rounded-[50px] text-[#FFFFFF] text-[clamp(14px,1.8vw,16px)] font-bold tracking-[0.02em] cursor-pointer no-underline shadow-[0_4px_30px_rgba(168,85,247,0.38),inset_0_0_15px_rgba(168,85,247,0.5)]"
                  style={{ background: "linear-gradient(135deg, #A855F7, #7C3AED)" }}
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