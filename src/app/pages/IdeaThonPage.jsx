import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronUp, ChevronDown, Lightbulb } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Footer } from "../components/Footer.jsx";

import ideathon1 from "../../images/Ideathon/ideathon1.webp";
import ideathon2 from "../../images/Ideathon/ideathon2.webp";
import ideathon3 from "../../images/Ideathon/ideathon3.webp";
import ideathon4 from "../../images/Ideathon/ideathon4.webp";
import ideathon5 from "../../images/Ideathon/ideathon5.webp";

import { CursorTrail } from "../components/CursorTrail.jsx";
import { UniversalLoader } from "../components/UniversalLoader.jsx";
/* ─────────────────────────────────────────────
   IDEATHON PAGE — FlashForte 2K26
   ───────────────────────────────────────────── */

const DOMAINS = [
  {
    name: "Sustainability & Environment",
    desc: "Innovative solutions for greener living and resource conservation."
  },
  {
    name: "Smart Logistics Solutions",
    desc: "Transform transportation, supply chains, delivery systems, and logistics through innovation."
  },
  {
    name: "Digital Governance",
    desc: "Improve public services, citizen engagement, transparency, and accessibility using technology."
  },
  {
    name: "Disaster Management",
    desc: "Preparedness, response, and recovery through innovation."
  },
  {
    name: "Gaming for Impact",
    desc: "Meaningful games that inspire positive social change."
  },
  {
    name: "Digital Trust & Integrity",
    desc: "Building confidence in safe digital interactions."
  },
];

const DOMAIN_ICONS = [
  /* Sustainability & Environment — leaf/sun */
  <svg key="sus" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="1.4">
    <path d="M12 22V12"/>
    <path d="M12 12C12 12 7 10 5 6c4 0 7 2 7 6z"/>
    <path d="M12 12C12 12 17 10 19 6c-4 0-7 2-7 6z"/>
    <circle cx="12" cy="4" r="2"/>
  </svg>,

  /* Smart Logistics — truck/route */
  <svg key="log" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="1.4">
    <rect x="1" y="8" width="13" height="9" rx="1"/>
    <path d="M14 10h4l3 4v3h-7V10z"/>
    <circle cx="5.5" cy="19" r="1.5"/>
    <circle cx="18.5" cy="19" r="1.5"/>
  </svg>,

  /* Digital Governance — building/landmark */
  <svg key="gov" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="1.4">
    <path d="M3 21h18M3 10h18M5 10V21M19 10V21M12 3L3 10h18L12 3z"/>
    <rect x="9" y="14" width="6" height="7"/>
  </svg>,

  /* Disaster Management — alert/shield-warning */
  <svg key="dis" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="1.4">
    <path d="M12 2l8 4v6c0 5-4 9-8 10C8 21 4 17 4 12V6l8-4z"/>
    <path d="M12 9v4M12 17h.01"/>
  </svg>,

  /* Gaming for Impact — gamepad */
  <svg key="game" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="1.4">
    <rect x="2" y="7" width="20" height="12" rx="3"/>
    <path d="M8 11v4M6 13h4"/>
    <circle cx="16" cy="11" r="1" fill="#c9a84c"/>
    <circle cx="18" cy="13" r="1" fill="#c9a84c"/>
  </svg>,

  /* Digital Trust & Integrity — lock/verified */
  <svg key="trust" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="1.4">
    <rect x="5" y="11" width="14" height="10" rx="1"/>
    <path d="M8 11V7a4 4 0 018 0v4"/>
    <path d="M12 15v2"/>
  </svg>,
];

/* ── Intersection Observer hook ── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeSection({ children, className = "", delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionHeading({ label, title }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      <p style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "0.7rem",
        letterSpacing: "0.35em",
        color: "#c9a84c",
        textTransform: "uppercase",
        marginBottom: "0.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
      }}>
        <span style={{ display: "inline-block", width: 32, height: 1, background: "linear-gradient(90deg,transparent,#c9a84c)" }} />
        {label}
        <span style={{ display: "inline-block", width: 32, height: 1, background: "linear-gradient(90deg,#c9a84c,transparent)" }} />
      </p>
      <h2 style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
        fontWeight: 700,
        color: "#f5e6c0",
        letterSpacing: "0.05em",
        margin: 0,
        textShadow: "0 0 30px rgba(201,168,76,0.35), 0 2px 8px rgba(0,0,0,0.6)",
      }}>
        {title}
      </h2>
    </div>
  );
}

/* ── PortalVideo — mirrors HeroSection.jsx exactly, gold-graded ── */
function PortalVideo({ className = "" }) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.6;
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center aspect-square mx-auto my-0 md:my-4 w-full max-w-[clamp(340px,85vw,600px)] lg:max-w-none lg:w-full ${className}`}
    >
      {/* outer glow — gold hue instead of purple */}
      <div
        className="absolute rounded-full blur-[40px] mix-blend-screen z-0 inset-[-15%]"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.35) 0%, rgba(180,120,20,0.15) 50%, transparent 75%)" }}
      />
      {/* inner glow */}
      <div
        className="absolute inset-0 rounded-full blur-[20px] mix-blend-screen z-0"
        style={{ background: "radial-gradient(circle, rgba(232,201,106,0.25) 0%, rgba(201,168,76,0.1) 60%, transparent 100%)" }}
      />
      {/* portal video — same src & attrs as HeroSection, gold CSS filter */}
      <video
        ref={videoRef}
        src="/Portal Animation.webm"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover portal-mask"
        style={{
          /* Gold color grading:*/
          filter: "sepia(1) saturate(3) hue-rotate(5deg) brightness(1.05) contrast(1.1) drop-shadow(0 0 30px rgba(201,168,76,0.5))",
        }}
      />
    </div>
  );
}

/* ── TiltedCard Component ── */
const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale
        }}
      >
        {imageSrc && (
          <motion.img
            src={imageSrc}
            alt={altText}
            className="tilted-card-img"
            style={{
              width: imageWidth,
              height: imageHeight
            }}
          />
        )}

        {displayOverlayContent && overlayContent && (
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}

/* ── Golden Click Burst Effect ── */
function ClickBurst() {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newBurst = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setBursts((prev) => [...prev, newBurst]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
      }, 500);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99999 }}>
      {bursts.map((burst) => (
        <div key={burst.id} className="click-burst" style={{ left: burst.x, top: burst.y }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="burst-particle" style={{ "--i": i }} />
          ))}
        </div>
      ))}
    </div>
  );
}


/* ── Golden Particles Background ── */
function GoldenParticles() {
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
      const numParticles = Math.floor((window.innerWidth / 8) * 0.7); // Reduced density by 30%
      for (let i = 0; i < numParticles; i++) {
        // Create varied particles for depth
        const isForeground = Math.random() > 0.85;
        const vx = (Math.random() - 0.5) * 0.3;
        const vy = (Math.random() - 0.5) * 0.3 - (isForeground ? 0.4 : 0.15);
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: isForeground ? Math.random() * 4 + 2 : Math.random() * 2 + 1, // Larger
          vx: vx,
          vy: vy,
          baseVx: vx,
          baseVy: vy,
          life: Math.random() * 100,
          alpha: isForeground ? Math.random() * 0.6 + 0.4 : Math.random() * 0.7 + 0.2, // More visible
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
        // Cursor sensitivity: gently repel particles
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx -= (dx / dist) * force * 0.6;
          p.vy -= (dy / dist) * force * 0.6;
        }
        
        // Return to base velocity slowly
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around smoothly
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;
        
        // Twinkle effect using sine wave
        p.life += 0.02;
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.life));
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        if (p.isForeground) {
          // Large, blurred glowing particles (Bokeh effect)
          ctx.shadowBlur = p.radius * 2.5;
          ctx.shadowColor = 'rgba(245, 160, 30, 0.5)';
          ctx.fillStyle = `rgba(255, 210, 100, ${currentAlpha * 0.85})`;
        } else {
          // Smaller, sharper background dust
          ctx.shadowBlur = p.radius * 1.2;
          ctx.shadowColor = 'rgba(230, 140, 40, 0.3)';
          ctx.fillStyle = `rgba(220, 160, 60, ${currentAlpha * 0.8})`;
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
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }} 
    />
  );
}

export function IdeaThonPage() {
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.add("ideathon-page-active");
    return () => document.body.classList.remove("ideathon-page-active");
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const borderLine = footer.querySelector("div");
    const heading = footer.querySelector("h2");
    const subtext = footer.querySelector("p");

    // Store originals
    const origBorder = borderLine?.style.background;
    const origColor = heading?.style.color;
    const origShadow = heading?.style.textShadow;
    const origPColor = subtext?.style.color;

    // Apply golden
    if (borderLine) borderLine.style.background = "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 30%, rgba(232,201,106,0.5) 70%, transparent 100%)";
    if (heading) { heading.style.color = "#c9a84c"; heading.style.textShadow = "0 0 30px rgba(201,168,76,0.4), 0 0 60px rgba(201,168,76,0.15)"; }
    if (subtext) subtext.style.color = "rgba(245,230,192,0.75)";

    return () => {
      // Restore originals on unmount
      if (borderLine) borderLine.style.background = origBorder || "";
      if (heading) { heading.style.color = origColor || ""; heading.style.textShadow = origShadow || ""; }
      if (subtext) subtext.style.color = origPColor || "";
    };
  }, []);

  const scrollToNextOrTop = () => {
    if (scrollY > 300) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.8, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Rajdhani:wght@300;400;500;600&display=swap');

        /* ── Navbar tint on this page ── */
        body.ideathon-page-active .glass-nav {
          background: #0a0c0e !important;
          border-bottom: 1px solid rgba(201,168,76,0.14) !important;
        }

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

        body.ideathon-page-active a[href="/"] {
          color: #7E89A8 !important;
        }
        body.ideathon-page-active a[href="/"]:hover {
          color: #ffffff !important;
        }
        body.ideathon-page-active a[href="/"] > div,
        body.ideathon-page-active a[href="/"]::after {
          opacity: 0 !important;
          width: 0 !important;
          height: 0 !important;
          border: none !important;
          background: transparent !important;
        }
        body.ideathon-page-active a[href="/ideathon"] {
          color: #ffffff !important;
          position: relative !important;
        }
        body.ideathon-page-active a[href="/ideathon"]::after {
          content: "";
          position: absolute;
          left: 0; bottom: -6px;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, #c9a84c, #f5a623);
          border-radius: 2px;
          box-shadow: 0 0 16px rgba(245,166,35,0.35), 0 0 16px rgba(201,168,76,0.25);
        }

        .ideathon-page {
          background: transparent;
          color: #f5e6c0;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        /* ── click burst animations ── */
        .click-burst {
          position: absolute;
          width: 0; height: 0;
        }
        .burst-particle {
          position: absolute;
          width: 2.5px; height: 8px;
          background: #c9a84c;
          border-radius: 2px;
          left: -1.25px; top: -4px;
          animation: burst-anim 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes burst-anim {
          0% {
            transform: rotate(calc(var(--i) * 30deg)) translateY(-8px) scaleY(0.5);
            opacity: 1;
            box-shadow: 0 0 8px rgba(201,168,76,0.8);
          }
          100% {
            transform: rotate(calc(var(--i) * 30deg)) translateY(-26px) scaleY(1);
            opacity: 0;
            box-shadow: 0 0 16px rgba(201,168,76,0);
          }
        }

        /* scanlines */
        .ideathon-page::before {
          content: '';
          position: fixed; inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(201,168,76,0.012) 2px, rgba(201,168,76,0.012) 4px
          );
          pointer-events: none; z-index: 0;
        }
        .ideathon-page > * { position: relative; z-index: 1; }

        /* ── buttons ── */
        .btn-gold {
          background: linear-gradient(135deg, #fedf49 0%, #f5c518 35%, #ffe169 70%, #f5c518 100%);
          color: #0a0c0e; border: none;
          padding: 0.95rem 2.2rem;
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer;
          border-radius: 24px;
          white-space: nowrap;
          transition: all 0.25s ease;
          box-shadow: 0 0 28px rgba(245,197,24,0.45), 0 0 110px rgba(245,197,24,0.22);
        }
        .btn-gold:hover {
          background: linear-gradient(135deg, #f5c518 0%, #ffea8a 30%, #fff2b7 65%, #f5c518 100%);
          box-shadow: 0 0 36px rgba(245,197,24,0.55), 0 0 120px rgba(245,197,24,0.28);
          transform: translateY(-2px);
        }
        .btn-outline {
          background: rgba(245,197,24,0.08); color: #ffe27a;
          border: 1.5px solid rgba(245,197,24,0.9);
          padding: 0.9rem 2rem;
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer;
          border-radius: 24px;
          white-space: nowrap;
          transition: all 0.25s ease;
          box-shadow: 0 0 14px rgba(245,197,24,0.45), 0 0 35px rgba(245,197,24,0.25), inset 0 0 10px rgba(245,197,24,0.15);
          text-shadow: 0 0 8px rgba(245,197,24,0.6);
        }
        .btn-outline:hover {
          background: rgba(245,197,24,0.15);
          border-color: #ffe27a;
          color: #fff8de;
          box-shadow: 0 0 22px rgba(245,197,24,0.7), 0 0 55px rgba(245,197,24,0.4), inset 0 0 14px rgba(245,197,24,0.25);
          transform: translateY(-2px);
        }

        /* ── round cards ── */
        .round-card {
          background: linear-gradient(145deg, rgba(245,197,24,0.03) 0%, rgba(10,12,14,0.95) 100%);
          border: 1px solid rgba(245,197,24,0.15);
          padding: 2.5rem 2.2rem; flex: 1;
          position: relative; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 20px;
          box-shadow: inset 0 0 12px rgba(255,255,255,0.02), 0 8px 24px rgba(0,0,0,0.4);
        }
        .round-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,197,24,0.4), transparent);
          opacity: 0.5;
          transition: opacity 0.4s ease;
        }
        .round-card:hover {
          border-color: rgba(245,197,24,0.4);
          background: linear-gradient(145deg, rgba(245,197,24,0.08) 0%, rgba(10,12,14,0.98) 100%);
          box-shadow: 0 12px 40px -10px rgba(245,197,24,0.25), inset 0 0 20px rgba(245,197,24,0.05);
          transform: translateY(-6px);
        }
        .round-card:hover::before {
          opacity: 1;
          background: linear-gradient(90deg, transparent, rgba(245,197,24,0.8), transparent);
        }

        /* ── domain cards ── */
        .domain-card {
          background: #0f1114;
          border: 1px solid rgba(245,197,24,0.35);
          padding: 1.6rem 1.4rem;
          position: relative; overflow: hidden;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 20px;
          filter: drop-shadow(0 0 8px rgba(245,197,24,0.15));
        }
        .domain-card::after {
          content: ''; position: absolute; top: 0; right: 0;
          width: 12px; height: 12px;
          border-left: 1px solid rgba(245,197,24,0.35);
          border-bottom: 1px solid rgba(245,197,24,0.35);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .domain-card:hover {
          border-color: rgba(245,197,24,0.9);
          background: #121518;
          filter: drop-shadow(0 0 20px rgba(245,197,24,0.22));
          transform: translateY(-5px);
        }
        .domain-card:hover::after {
          border-left-color: rgba(245,197,24,0.9);
          border-bottom-color: rgba(245,197,24,0.9);
        }
        .domain-card:hover .domain-icon-box {
          box-shadow: 0 0 16px rgba(245,197,24,0.22);
          border-color: rgba(245,197,24,0.6);
        }
        .domain-icon-box {
          width: 44px; height: 44px;
          border: 1px solid rgba(245,197,24,0.3);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem; transition: all 0.3s ease;
          border-radius: 16px;
          background: radial-gradient(circle at 30% 30%, rgba(245,197,24,0.18), rgba(245,197,24,0.08));
        }

        /* ── gallery ── */
        .photo-slot {
          background: #0f1114;
          border: 1px dashed rgba(245,197,24,0.18);
          display: flex; align-items: center; justify-content: center;
          color: rgba(245,197,24,0.75);
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          transition: border-color 0.3s ease;
          position: relative; overflow: hidden;
          border-radius: 20px;
        }
        .photo-slot:hover { border-color: rgba(245,197,24,0.35); }

        .divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2) 30%, rgba(201,168,76,0.2) 70%, transparent);
          position: relative;
        }
        .divider::after {
          content: '◈'; position: absolute;
          left: 50%; top: 50%; transform: translate(-50%, -50%);
          color: rgba(201,168,76,0.85); font-size: 0.6rem;
          background: #0a0c0e; padding: 0 0.4rem;
        }

        .cyber-tag {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.4rem 0.95rem;
          border: 1px solid rgba(245,197,24,0.7);
          background: rgba(245,197,24,0.06);
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.78rem; letter-spacing: 0.22em;
          color: #f5c518; text-transform: uppercase;
          border-radius: 22px;
        }

        @media (max-width: 1024px) {
          .hero-layout { flex-direction: column !important; }
          .hero-left   { width: 100% !important; max-width: 100% !important; padding-left: 0 !important; text-align: center !important; align-items: center !important; }
          .hero-right  { width: 100% !important; justify-content: center !important; transform: none !important; }
          .hero-btns   { justify-content: center !important; }
        }
        @media (max-width: 768px) {
          .rounds-grid  { flex-direction: column !important; }
          .rounds-arrow { display: none !important; }
          .domains-grid { grid-template-columns: 1fr 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .domains-grid { grid-template-columns: 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
        /* ── TiltedCard Styles ── */
        .tilted-card-figure {
          position: relative;
          width: 100%; height: 100%;
          perspective: 800px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .tilted-card-mobile-alert {
          position: absolute; top: 1rem;
          text-align: center; font-size: 0.875rem;
          display: none;
        }
        @media (max-width: 640px) {
          .tilted-card-mobile-alert { display: block; }
          .tilted-card-caption { display: none; }
        }
        .tilted-card-inner {
          position: relative;
          transform-style: preserve-3d;
        }
        .tilted-card-img {
          position: absolute; top: 0; left: 0;
          object-fit: cover; border-radius: 15px;
          will-change: transform; transform: translateZ(0);
        }
        .tilted-card-overlay {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%; z-index: 2;
          will-change: transform; transform: translateZ(30px);
        }
        .tilted-card-caption {
          pointer-events: none;
          position: absolute; left: 0; top: 0;
          border-radius: 8px;
          border: 1px solid rgba(0, 0, 0, 0.25);
          background-color: #f5c518;
          padding: 12px 20px;
          font-size: 13px;
          color: #0a0c0e;
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-weight: bold;
          letter-spacing: 0.15em;
          opacity: 0; z-index: 3;
        }

        /* ── Global Text Readability Boost ── */
        .ideathon-page p,
        .ideathon-page span,
        .ideathon-page li {
          color: rgba(245,230,192,0.95);
        }
        .ideathon-page h1, .ideathon-page h2,
        .ideathon-page h3, .ideathon-page h4 {
          color: #f5e6c0;
          text-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }
        .round-card p,
        .domain-card p {
          font-size: 1rem !important;
          line-height: 1.8 !important;
          color: rgba(245,230,192,0.95) !important;
          font-weight: 500 !important;
        }
        .round-card h3,
        .domain-card h4 {
          color: #f5e6c0 !important;
          text-shadow: 0 0 20px rgba(201,168,76,0.2) !important;
        }

        /* ── Golden Footer Overrides (Ideathon only) ── */
        body.ideathon-page-active footer > div:first-child {
          background: linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 30%, rgba(232,201,106,0.5) 70%, transparent 100%) !important;
        }
        body.ideathon-page-active footer h2 {
          color: #c9a84c !important;
          text-shadow: 0 0 30px rgba(201,168,76,0.4), 0 0 60px rgba(201,168,76,0.15) !important;
        }
        body.ideathon-page-active footer p {
          color: rgba(245,230,192,0.85) !important;
        }

        .ideathon-page .cta-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateY(0);
        }
        .ideathon-page .cta-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: -40px 0 90px -20px rgba(201,168,76,0.16),
                      40px 0 90px -20px rgba(201,168,76,0.16),
                      0 0 80px rgba(201,168,76,0.12),
                      inset 0 0 70px rgba(201,168,76,0.08);
        }
      `}</style>

      <div style={{ position: "relative", background: "#09090b", minHeight: "100vh" }}>
        <CursorTrail colorRgb={[245, 197, 24]} />
        {loading && (
          <UniversalLoader
            titleStart="IDEA"
            titleEnd="THON"
            colorHex="#f5c518"
            colorRgb="245,197,24"
          />
        )}

        {/* ── BACKGROUND LAYERS (fixed, behind everything) ── */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>

          {/* Layer 2: Live Golden Particles */}
          <GoldenParticles />

          {/* Layer 5: cyber grid — very subtle, just the top 40% of page */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "40%",
            backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
          }} />

          {/* Layer 6: scanline texture — barely visible film grain */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
            pointerEvents: "none",
          }} />

        </div>

        <div className="ideathon-page" style={{ position: "relative", zIndex: 1 }}>

        {/* ════════════════════════════════════════
            SECTION 1 — HERO  (mirrors HeroSection layout)
        ════════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden" }}>

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
            .hero-tagline-portal { order: 1; }
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

        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div
          className="hero-layout"
          style={{
            position: "relative", zIndex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.05rem 1.25rem 3rem",
            width: "100%",
            maxWidth: 1400,
            margin: "0 auto",
            minHeight: "calc(100dvh - 80px)",
          }}
        >
          {/* LEFT COLUMN */}
          <div
            className="hero-left"
            style={{
              display: "flex", flexDirection: "column",
              alignItems: "flex-start",
              width: "40%", maxWidth: 560,
              paddingLeft: "3rem",
              transform: "translateY(-30px)",
            }}
          >


            <FadeSection delay={80}>
              <h1 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                fontWeight: 900,
                color: "#f5e6c0",
                letterSpacing: "0.08em",
                lineHeight: 1,
                marginBottom: "0.5rem",
                textShadow: "0 0 48px rgba(245,197,24,0.45), 0 0 100px rgba(245,197,24,0.18)",
              }}>
                IDEA<span style={{ color: "#f5c518" }}>THON</span>
              </h1>
            </FadeSection>

            <FadeSection delay={140}>
              <p style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "clamp(0.95rem, 1.4vw, 1.2rem)",
                letterSpacing: "0.25em",
                color: "#f5c518",
                textTransform: "uppercase",
                marginBottom: "1.4rem",
                fontWeight: 700,
                textShadow: "0 0 18px rgba(245,197,24,0.35)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}><strong>Think</strong></span>
                <span style={{ color: "rgba(245,230,192,0.9)", letterSpacing: "0.14em" }}>·</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}><strong>Ideate</strong></span>
                <span style={{ color: "rgba(245,230,192,0.9)", letterSpacing: "0.14em" }}>·</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}><strong>Pitch</strong></span>
              </p>
            </FadeSection>

            {/* ── MOBILE ONLY: portal sits here, between tagline and description ── */}
            <div className="hero-portal-mobile-slot" style={{
              width: "100%",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}>
              <div style={{ width: "70%", aspectRatio: "1 / 1", position: "relative" }}>
                <TiltedCard
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={0}
                  scaleOnHover={1}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={true}
                  overlayContent={<PortalVideo className="w-full h-full" />}
                />
              </div>
            </div>

            <FadeSection delay={180}>
              <p style={{
                color: "rgba(245,230,192,0.85)",
                fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                lineHeight: 1.75, maxWidth: 460,
                marginBottom: "2.4rem",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 400, letterSpacing: "0.02em",
              }}>
                Brainstorm, innovate, and present groundbreaking ideas that address real-world problems and create lasting change.
              </p>
            </FadeSection>

            <FadeSection delay={260}>
              <div className="hero-btns" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link to="/ideathon/register" className="no-underline">
                  <button className="btn-gold">Register Now →</button>
                </Link>
                <Link to="/ideathon/submit" className="no-underline">
                  <button className="btn-outline">Submit Your Idea</button>
                </Link>
              </div>
            </FadeSection>
          </div>

          {/* RIGHT COLUMN — desktop only */}
          <div
            className="hero-right"
            style={{
              width: "55%",
              display: "flex",
              justifyContent: "flex-end",
              transform: "translateX(3rem) translateY(-2rem)",
              position: "relative",
            }}
          >
            <div className="w-[115%] lg:w-[130%] aspect-square relative">
              <TiltedCard
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={0}
                scaleOnHover={1}
                showMobileWarning={false}
                showTooltip={true}
                captionText="IDEATHON"
                displayOverlayContent={true}
                overlayContent={<PortalVideo className="w-full h-full" />}
              />
            </div>
          </div>

        </div>

        {/* Seamless blend gradient for the bottom edge */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "220px",
          background: "linear-gradient(to bottom, transparent, #09090b)",
          pointerEvents: "none",
          zIndex: 10,
        }} />
      </section>

      {/* ════════════════════════
    MANIFESTO STRIP
════════════════════════ */}
<section style={{ padding: "0 1.5rem 4rem" }}>
  <FadeSection>
    <div style={{
      maxWidth: 1000, margin: "0 auto",
      position: "relative",
      background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(245,197,24,0.16) 0%, rgba(20,16,6,0.95) 55%, rgba(10,8,4,0.98) 100%)",
      border: "1px solid rgba(245,197,24,0.35)",
      borderRadius: "24px",
      padding: "5rem 3.5rem",
      minHeight: "320px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      overflow: "hidden",
      boxShadow: "0 0 100px rgba(245,197,24,0.25), 0 0 200px rgba(245,197,24,0.1), inset 0 0 80px rgba(245,197,24,0.06)",
    }}>

      {/* opening quote mark */}
      <span style={{
        position: "absolute", top: "1.5rem", left: "2.5rem",
        fontFamily: "Georgia, serif",
        fontSize: "8rem", fontWeight: 900,
        color: "rgba(245,197,24,0.18)",
        lineHeight: 1, userSelect: "none",
      }}>&ldquo;</span>

      <p style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "0.75rem",
        letterSpacing: "0.35em",
        color: "rgba(245,230,192,0.55)",
        textTransform: "uppercase",
        marginBottom: "1.75rem",
        fontWeight: 700,
      }}>
        IdeaThon Manifesto
      </p>

      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "clamp(1.4rem, 3.2vw, 2.2rem)",
        fontWeight: 800,
        color: "#f5e6c0",
        lineHeight: 1.55,
        margin: 0,
        letterSpacing: "0.01em",
        maxWidth: 720,
      }}>
        Innovation isn't about having every answer.<br />
        It's about{" "}
        <span style={{ color: "#f5c518", textShadow: "0 0 20px rgba(245,197,24,0.6)" }}>
          asking the right questions.
        </span>
      </h3>

      {/* closing quote mark + divider */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "1rem", marginTop: "2.25rem",
      }}>
        <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,197,24,0.4))" }} />
        <span style={{
          fontFamily: "Georgia, serif",
          fontSize: "1.8rem", fontWeight: 900,
          color: "#f5c518", lineHeight: 1,
          textShadow: "0 0 14px rgba(245,197,24,0.6)",
        }}>&rdquo;</span>
        <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, rgba(245,197,24,0.4), transparent)" }} />
      </div>
    </div>
  </FadeSection>
</section>

        {/* ════════════════════════
            SECTION 2 — ROUNDS
        ════════════════════════ */}
        <section style={{ padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>

            <FadeSection>
              <SectionHeading label="The Journey" title="TWO ROUNDS TO THE STAGE" />
            </FadeSection>

            <div className="rounds-grid" style={{ display: "flex", gap: "1.5rem", alignItems: "stretch" }}>

              <FadeSection style={{ flex: 1 }}>
                <div className="round-card">
                  <div style={{
                    fontFamily: "'Orbitron', sans-serif", fontSize: "5rem", fontWeight: 900,
                    color: "rgba(245,197,24,0.18)", position: "absolute",
                    top: "0.8rem", right: "1.2rem", lineHeight: 1, userSelect: "none",
                  }}>01</div>
                  <div style={{ color: "#f5c518", marginBottom: "1rem" }}>
                    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: "'Rajdhani'", fontSize: "0.78rem", letterSpacing: "0.25em", color: "#f5c518", textTransform: "uppercase", marginBottom: "0.4rem", fontWeight: 600 }}>Round One</p>
                  <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#f5e6c0", marginBottom: "0.9rem", letterSpacing: "0.06em" }}>PPT SUBMISSION</h3>
                  <p style={{ color: "rgba(245,230,192,0.85)", fontSize: "0.98rem", lineHeight: 1.75, fontFamily: "'Rajdhani'", fontWeight: 400 }}>
                    Present your idea as a structured deck. Cover the problem, your solution, market scope, and a rough implementation plan. Selected teams advance to Round 2.
                  </p>
                  <div style={{ marginTop: "1.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: 24, height: 1, background: "#f5c518" }} />
                    <span style={{ fontFamily: "'Rajdhani'", fontSize: "0.85rem", letterSpacing: "0.2em", color: "#f5c518", textTransform: "uppercase", fontWeight: 700 }}>Online Submission</span>
                  </div>
                </div>
              </FadeSection>

              <div className="rounds-arrow" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 1, height: 28, background: "linear-gradient(transparent, rgba(245,197,24,0.4))" }} />
                  <span style={{ color: "#f5c518", fontSize: "1rem", lineHeight: 1 }}>▶</span>
                  <div style={{ width: 1, height: 28, background: "linear-gradient(rgba(245,197,24,0.4), transparent)" }} />
                </div>
              </div>

              <FadeSection delay={150} style={{ flex: 1 }}>
                <div className="round-card">
                  <div style={{
                    fontFamily: "'Orbitron', sans-serif", fontSize: "5rem", fontWeight: 900,
                    color: "rgba(245,197,24,0.18)", position: "absolute",
                    top: "0.8rem", right: "1.2rem", lineHeight: 1, userSelect: "none",
                  }}>02</div>
                  <div style={{ color: "#f5c518", marginBottom: "1rem" }}>
                    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: "'Rajdhani'", fontSize: "0.78rem", letterSpacing: "0.25em", color: "#f5c518", textTransform: "uppercase", marginBottom: "0.4rem", fontWeight: 600 }}>Round Two</p>
                  <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#f5e6c0", marginBottom: "0.9rem", letterSpacing: "0.06em" }}>IDEA PRESENTATION</h3>
                  <p style={{ color: "rgba(245,230,192,0.85)", fontSize: "0.98rem", lineHeight: 1.75, fontFamily: "'Rajdhani'", fontWeight: 400 }}>
                    Take the stage. Present your solution live to a panel of judges. Defend your idea, answer questions, and demonstrate its real-world potential.
                  </p>
                  <div style={{ marginTop: "1.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: 24, height: 1, background: "#f5c518" }} />
                    <span style={{ fontFamily: "'Rajdhani'", fontSize: "0.8rem", letterSpacing: "0.2em", color: "#f5c518", textTransform: "uppercase", fontWeight: 600 }}>Live Judging</span>
                  </div>
                </div>
              </FadeSection>

            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════════════
            SECTION 3 — DOMAINS
        ════════════════════════ */}
        <section style={{ padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <FadeSection>
          <SectionHeading label="What You Can Build" title="EXPLORE DOMAINS" />
        </FadeSection>

            <style>{`
              .domain-card-v2 {
                position: relative;
                background: linear-gradient(145deg, rgba(245,197,24,0.04) 0%, rgba(10,10,12,0.95) 100%);
                border: 1px solid rgba(245,197,24,0.14);
                padding: 2rem 1.8rem 1.8rem;
                cursor: default;
                transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
                overflow: hidden;
                border-radius: 24px;
                box-shadow: inset 0 0 12px rgba(255,255,255,0.02), 0 0 18px rgba(245,197,24,0.08);
              }
              .domain-card-v2::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(245,197,24,0.42), transparent);
                opacity: 0;
                transition: opacity 0.3s ease;
              }
              .domain-card-v2:hover {
                border-color: rgba(245,197,24,0.28);
                background: linear-gradient(145deg, rgba(245,197,24,0.06) 0%, rgba(12,12,14,0.98) 100%);
                transform: translateY(-3px);
                box-shadow: inset 0 0 16px rgba(255,255,255,0.02), 0 0 22px rgba(245,197,24,0.12);
              }
              .domain-card-v2:hover::before {
                opacity: 1;
              }
              .domain-card-v2:hover .domain-num {
                opacity: 0.1;
              }
              .domain-card-v2:hover .domain-icon-v2 {
                border-color: rgba(245,197,24,0.45);
                background: rgba(245,197,24,0.08);
              }
              .domain-card-v2:hover .domain-name {
                color: #f5c518;
                text-shadow: none;
              }
              .domain-icon-v2 {
                width: 56px; height: 56px;
                border: 1px solid rgba(245,197,24,0.28);
                border-radius: 16px;
                display: flex; align-items: center; justify-content: center;
                font-size: 1.2rem;
                margin-bottom: 1rem;
                background: rgba(255,255,255,0.02);
                transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
              }
              .domain-num {
                position: absolute;
                bottom: 14px; right: 18px;
                font-family: 'Orbitron', sans-serif;
                font-size: 3.5rem;
                font-weight: 900;
                color: rgba(245,197,24,1);
                opacity: 0.08;
                line-height: 1;
                letter-spacing: -0.02em;
                transition: opacity 0.3s ease;
                pointer-events: none;
                user-select: none;
              }
              .domain-name {
                font-family: 'Orbitron', sans-serif;
                font-size: 1rem;
                font-weight: 800;
                color: #fff8de;
                margin-bottom: 0.85rem;
                letter-spacing: 0.16em;
                text-transform: uppercase;
                transition: color 0.3s ease;
                line-height: 1.2;
              }
              @media (max-width: 700px) {
                .domains-grid-v2 { grid-template-columns: 1fr !important; }
              }
              
              .domain-icon-v2 {
                width: 58px; height: 58px;
                margin-bottom: 1.4rem;
                position: relative;
                display: flex; align-items: center; justify-content: center;
                transition: filter 0.3s ease, transform 0.3s ease;
              }
              .domain-icon-v2 svg {
                width: 100%;
                height: 100%;
              }
              .domain-icon-v2 svg circle,
              .domain-icon-v2 svg ellipse {
                transition: stroke 0.3s ease, fill 0.3s ease;
                fill: rgba(245,197,24,0.04);
                stroke: rgba(245,197,24,0.48);
              }
              .domain-icon-v2 .icon-glyph {
                color: #f5c518;
                font-size: 1.3rem;
                position: absolute;
                display: flex; align-items: center; justify-content: center;
                filter: none;
                transition: color 0.3s ease, transform 0.3s ease;
              }
              .domain-card-v2:hover .domain-icon-v2 svg circle,
              .domain-card-v2:hover .domain-icon-v2 svg ellipse {
                stroke: rgba(245,197,24,0.72);
                fill: rgba(245,197,24,0.08);
              }
              .domain-card-v2:hover .domain-icon-v2 .icon-glyph {
                color: #f5c518;
                filter: drop-shadow(0 0 6px rgba(245,197,24,0.95)) drop-shadow(0 0 16px rgba(245,197,24,0.55));
              }
            `}</style>

            <div className="domains-grid-v2" style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              background: "transparent",
              border: "none",
            }}>
              {DOMAINS.map((domain, i) => (
                <FadeSection key={i} delay={i * 70}>
                  <div className="domain-card-v2" style={{ height: "100%" }}>

                    {/* ghost number */}
                    <div className="domain-num">0{i + 1}</div>

                    {/* icon */}
                    <div className="domain-icon-v2">
                      <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="36" cy="36" r="22" strokeWidth="1.5" />
                        <ellipse cx="36" cy="36" rx="24" ry="22" transform="rotate(-18 36 36)" strokeWidth="1.2" fill="none" opacity="0.45" />
                      </svg>
                      <span className="icon-glyph">{DOMAIN_ICONS[i]}</span>
                    </div>

                    {/* name — highlighted */}
                    <div className="domain-name">{domain.name}</div>

                    {/* divider line */}
                    <div style={{
                      width: 36, height: 1,
                      background: "linear-gradient(90deg, #f5c518, rgba(245,197,24,0.2))",
                      marginBottom: "0.75rem",
                    }} />

                    {/* description */}
                    <p style={{
                      color: "rgba(245,230,192,0.95)",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      letterSpacing: "0.01em",
                      margin: 0,
                    }}>
                      {domain.desc}
                    </p>

                  </div>
                </FadeSection>
              ))}
            </div>

          </div>
        </section>

        <div className="divider" />

        {/* ════════════════════════
            SECTION 4 — GALLERY
        ════════════════════════ */}
        <section style={{ padding: "5rem 0 7rem" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
            <FadeSection>
              <SectionHeading label="Flashback" title="MOMENTS FROM LAST YEAR" />
            </FadeSection>
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
            .gallery-item {
              transition: transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease;
              cursor: pointer;
            }
            .gallery-item:hover {
              transform: scale(1.04);
              filter: brightness(1.1) saturate(1.15);
            }
          `}</style>

          {/* Full-bleed slider*/}
          <FadeSection>
            <div className="gallery-mask" style={{ width: "100%", overflow: "hidden", marginTop: "2.5rem" }}>
              <div className="gallery-track" style={{ display: "flex", gap: "0.75rem", width: "max-content" }}>
                {[
                  ideathon1, ideathon2, ideathon3, ideathon4, ideathon5,
                  ideathon1, ideathon2, ideathon3, ideathon4, ideathon5,
                ].map((src, i) => (
                  <div
                    key={i}
                    className="gallery-item"
                    style={{
                      flexShrink: 0,
                      width: "clamp(280px, 36vw, 380px)",
                      height: "clamp(180px, 26vw, 260px)",
                      borderRadius: "2px",
                      clipPath: "none",
                      overflow: "hidden",
                      border: "1px dashed rgba(201,168,76,0.25)",
                      background: "rgba(8,10,12,0.95)",
                      position: "relative",
                    }}
                  >
                    {src ? (
                      <img
                        src={src}
                        alt={`IdeaThon moment ${(i % 5) + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        loading="lazy"
                      />
                    ) : (
                      <div style={{
                        width: "100%", height: "100%",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: "0.4rem",
                        background: "rgba(8,10,12,0.95)",
                      }}>
                        <span style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: "0.7rem", letterSpacing: "0.25em",
                          color: "rgba(201,168,76,0.35)", textTransform: "uppercase",
                        }}>Photo 0{(i % 6) + 1}</span>
                      </div>
                    )}

                    {/* corner accents */}
                    <div style={{ position:"absolute", top:8, left:8, width:12, height:12, borderTop:"1.5px solid rgba(201,168,76,0.4)", borderLeft:"1.5px solid rgba(201,168,76,0.4)" }} />
                    <div style={{ position:"absolute", top:8, right:8, width:12, height:12, borderTop:"1.5px solid rgba(201,168,76,0.4)", borderRight:"1.5px solid rgba(201,168,76,0.4)" }} />
                    <div style={{ position:"absolute", bottom:8, left:8, width:12, height:12, borderBottom:"1.5px solid rgba(201,168,76,0.4)", borderLeft:"1.5px solid rgba(201,168,76,0.4)" }} />
                    <div style={{ position:"absolute", bottom:8, right:8, width:12, height:12, borderBottom:"1.5px solid rgba(201,168,76,0.4)", borderRight:"1.5px solid rgba(201,168,76,0.4)" }} />
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>
        </section>

        <div className="divider" />

        {/* ════════════════════════
            CTA SECTION — BOTTOM
        ════════════════════════ */}
        <section style={{ padding: "6rem 1.5rem 4rem" }}>
          <FadeSection>
            <div style={{ maxWidth: 860, margin: "0 auto" }}>
              <div style={{
                background: "linear-gradient(160deg, rgba(245,197,24,0.18) 0%, rgba(10,12,14,0.96) 45%, rgba(245,197,24,0.10) 100%)",
                border: "1px solid rgba(245,197,24,0.32)",
                borderRadius: "4px",
                clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
                padding: "3rem 3rem 3rem",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: "-40px 0 120px -30px rgba(245,197,24,0.28), 40px 0 120px -30px rgba(245,197,24,0.18), 0 0 80px rgba(245,197,24,0.1)",
              }}>

                {/* Ambient blobs */}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "radial-gradient(ellipse 55% 35% at 15% 85%, rgba(201,168,76,0.07) 0%, transparent 70%), radial-gradient(ellipse 45% 30% at 85% 15%, rgba(245,166,35,0.05) 0%, transparent 70%)",
                }} />

                {/* Orb */}
                <div style={{
                  width: 72, height: 72,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 35%, rgba(245,166,35,0.22) 0%, rgba(10,12,14,0.9) 60%, rgba(201,168,76,0.06) 100%)",
                  border: "1px solid rgba(245,166,35,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.9rem",
                  margin: "0 auto 1.75rem",
                  position: "relative", zIndex: 2,
                  boxShadow: "0 0 28px rgba(245,166,35,0.28), 0 0 8px rgba(201,168,76,0.12), inset 0 0 16px rgba(245,166,35,0.10)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 50px rgba(245,197,24,0.8), 0 0 15px rgba(201,168,76,0.4), inset 0 0 25px rgba(245,197,24,0.3)";
                  e.currentTarget.style.transform = "scale(1.1) translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(245,197,24,0.9)";
                  e.currentTarget.style.background = "radial-gradient(circle at 40% 35%, rgba(245,197,24,0.4) 0%, rgba(10,12,14,0.9) 60%, rgba(201,168,76,0.15) 100%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 28px rgba(245,166,35,0.28), 0 0 8px rgba(201,168,76,0.12), inset 0 0 16px rgba(245,166,35,0.10)";
                  e.currentTarget.style.transform = "scale(1) translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(245,166,35,0.35)";
                  e.currentTarget.style.background = "radial-gradient(circle at 40% 35%, rgba(245,166,35,0.22) 0%, rgba(10,12,14,0.9) 60%, rgba(201,168,76,0.06) 100%)";
                }}
                >
                  <Lightbulb size={36} color="#f5c518" strokeWidth={1.5} />
                </div>

                <h2 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 900,
                  color: "#f5e6c0",
                  letterSpacing: "0.06em",
                  lineHeight: 1.15,
                  marginBottom: "1rem",
                  textShadow: "0 0 40px rgba(201,168,76,0.3)",
                  position: "relative", zIndex: 1,
                }}>
                  Ready to <span style={{ color: "#f5c518" }}>Ideate?</span>
                </h2>

                <p style={{
                  color: "rgba(245,230,192,0.75)",
                  fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
                  lineHeight: 1.75,
                  maxWidth: 520,
                  margin: "0 auto 2.5rem",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  position: "relative", zIndex: 1,
                }}>
                  Seats are limited. The stage is live on{" "}
                  <strong style={{ color: "#edd067" }}>FlashForte 2K26</strong>.
                  {" "}Lock in your idea and let the best innovator win.
                </p>

                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
                  <button className="btn-gold" style={{ fontSize: "1rem", padding: "0.85rem 2rem" }}>
                    ✦ Register Now →
                  </button>
                  <button className="btn-outline" style={{ fontSize: "1rem", padding: "0.85rem 2rem" }}>
                    Submit Your Idea
                  </button>
                </div>
              </div>
            </div>
          </FadeSection>
        </section>

        {/* Floating Scroll Indicator */}
        <style>{`
          .scroll-indicator {
            width: 3.5rem;
            height: 3.5rem;
          }
          @media (max-width: 768px) {
            .scroll-indicator {
              width: 2.5rem !important;
              height: 2.5rem !important;
              bottom: 1.5rem !important;
              right: 1.5rem !important;
            }
            .scroll-indicator svg {
              width: 20px;
              height: 20px;
            }
          }
        `}</style>
        <button
          className="scroll-indicator"
          onClick={scrollToNextOrTop}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            borderRadius: "50%",
            background: "#000000",
            border: "1px solid rgba(201,168,76,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f5c518",
            cursor: "pointer",
            zIndex: 50,
            boxShadow: "0 4px 16px rgba(0,0,0,0.6), inset 0 0 10px rgba(201,168,76,0.1)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: scrollY > 0 ? "scale(1)" : "scale(0.95)",
            opacity: 0.9,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1) translateY(-4px)";
            e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.8), inset 0 0 15px rgba(201,168,76,0.2)";
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = scrollY > 0 ? "scale(1)" : "scale(0.95)";
            e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.6), inset 0 0 10px rgba(201,168,76,0.1)";
            e.currentTarget.style.opacity = "0.9";
          }}
          title={scrollY > 300 ? "Scroll to Top" : "Scroll Down"}
        >
          {scrollY > 300 ? <ChevronUp size={28} strokeWidth={3} /> : <ChevronDown size={28} strokeWidth={3} />}
        </button>


      </div>
    </div>
    </>
  );
}