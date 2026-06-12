import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Mic, Trophy, Sparkles, Calendar, MapPin, 
  BookOpen, MessageSquare, ChevronRight, 
  Volume2, ShieldAlert, ExternalLink
} from "lucide-react";
import { CursorTrail } from "../components/CursorTrail.jsx";
import { UniversalLoader } from "../components/UniversalLoader.jsx";

const BUTTERY_EASE = [0.16, 1, 0.3, 1];

// Dynamic Particles Generator
function ParticleField() {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 260 - 130,
      y: Math.random() * 260 - 130,
      size: Math.random() * 4 + 1.5,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-orange-500/80 shadow-[0_0_8px_#F97316]"
          initial={{ x: p.x, y: p.y + 40, opacity: 0, scale: 0.5 }}
          animate={{ y: p.y - 120, opacity: [0, 0.9, 0.9, 0], scale: [0.5, 1.3, 0.8] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
          style={{ width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
}

// PortalEmissionCanvas — concentric ripple waves & escaping sparks emitted from portal center/edge
function PortalEmissionCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      width = rect.width;
      height = rect.height;
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas);

    const sparks = [];
    const ripples = [
      { radius: 0.15, maxRadius: 0.95, speed: 0.0035, opacity: 0.75 },
      { radius: 0.55, maxRadius: 0.95, speed: 0.0035, opacity: 0.4 }
    ];

    const maxSparks = 25;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const targetWidth = Math.floor(rect.width);
      const targetHeight = Math.floor(rect.height);

      if (canvas.width !== targetWidth * dpr || canvas.height !== targetHeight * dpr) {
        canvas.width = targetWidth * dpr;
        canvas.height = targetHeight * dpr;
        ctx.scale(dpr, dpr);
        width = targetWidth;
        height = targetHeight;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      // Portal radius based on bounding box
      const baseRadius = Math.min(width, height) * 0.36;

      // 1. Concentric Ripple Waves
      for (const r of ripples) {
        r.radius += r.speed;
        if (r.radius > r.maxRadius) {
          r.radius = 0.15;
        }

        const progress = (r.radius - 0.15) / (r.maxRadius - 0.15);
        const opacity = (1.0 - progress) * 0.45;
        
        ctx.strokeStyle = `rgba(249, 115, 22, ${opacity})`;
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(249, 115, 22, 0.7)";

        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius * r.radius * 2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.shadowBlur = 0;
      }

      // 2. Escaping Sparks & Energy Particles
      if (sparks.length < maxSparks && Math.random() < 0.22) {
        const angle = Math.random() * Math.PI * 2;
        const isFromEdge = Math.random() > 0.45;
        const dist = isFromEdge ? baseRadius * (0.95 + Math.random() * 0.15) : 0;

        sparks.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          vx: Math.cos(angle) * (0.5 + Math.random() * 1.0) + (Math.random() - 0.5) * 0.2,
          vy: Math.sin(angle) * (0.5 + Math.random() * 1.0) + (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2.2 + 0.8,
          opacity: 1.0,
          decay: 0.007 + Math.random() * 0.012,
          color: Math.random() > 0.45 ? "rgba(249, 115, 22, 0.95)" : "rgba(253, 186, 116, 0.98)"
        });
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= s.decay;

        if (s.opacity <= 0 || s.x < 0 || s.x > width || s.y < 0 || s.y > height) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = s.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(249, 115, 22, 0.8)";

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (0.5 + s.opacity * 0.5), 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-[-20%] w-[140%] h-[140%] pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// CosmicAtmosphere — High performance, site-wide canvas particle loop
function CosmicAtmosphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    // Mouse Tracking
    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      width = window.innerWidth;
      height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 1. Starfield Layer (twinkling & slowly drifting stardust)
    const stars = Array.from({ length: 130 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
      size: Math.random() * 1.2 + 0.3,
      baseOpacity: Math.random() * 0.32 + 0.05,
      twinkleSpeed: 0.003 + Math.random() * 0.012,
      phase: Math.random() * Math.PI * 2,
    }));

    // 2. Cosmic Dust Layer (warm amber, microscopic, drifting)
    const dust = Array.from({ length: 110 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      size: Math.random() * 1.3 + 0.4,
      baseOpacity: Math.random() * 0.14 + 0.03,
      twinkleSpeed: 0.008 + Math.random() * 0.018,
      phase: Math.random() * Math.PI * 2,
    }));

    // 3. Global Floating Sparks Layer (drifting sparks)
    const sparks = Array.from({ length: 55 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.24,
      vy: -0.16 - Math.random() * 0.24, // continuous upward float
      size: Math.random() * 2.4 + 0.8,
      baseOpacity: Math.random() * 0.38 + 0.15,
      phase: Math.random() * Math.PI * 2,
      amplitude: Math.random() * 18 + 4,
      frequency: 0.002 + Math.random() * 0.004,
    }));

    // 4. Floating Orbs (blurred miniature planet nodes)
    const orbs = Array.from({ length: 15 }).map((_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      radius: Math.random() * 24 + 14,
      color: i % 3 === 0 ? "rgba(249, 115, 22, 0.08)" : i % 3 === 1 ? "rgba(251, 146, 60, 0.06)" : "rgba(253, 186, 116, 0.07)",
      pulseSpeed: 0.0015 + Math.random() * 0.0025,
      phase: Math.random() * Math.PI * 2,
    }));

    // 5. Rare Energy Streams (thin flowing paths)
    const streams = Array.from({ length: 3 }).map(() => ({
      x: -250 - Math.random() * 250,
      y: Math.random() * window.innerHeight,
      vx: 0.28 + Math.random() * 0.32,
      vy: (Math.random() - 0.5) * 0.15,
      length: 180 + Math.random() * 120,
      opacity: 0,
      targetOpacity: 0.16 + Math.random() * 0.08,
      state: 'fade-in',
      width: 1.0 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      freq: 0.006 + Math.random() * 0.006,
      amplitude: 22 + Math.random() * 18
    }));

    let time = 0;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      if (canvas.width !== currentWidth * dpr || canvas.height !== currentHeight * dpr) {
        canvas.width = currentWidth * dpr;
        canvas.height = currentHeight * dpr;
        ctx.scale(dpr, dpr);
        width = currentWidth;
        height = currentHeight;
      }

      time += 0.5;
      ctx.clearRect(0, 0, width, height);

      // Current scroll value
      const scrollY = window.scrollY;

      // Parallax Offsets
      const starParallax = scrollY * 0.04;
      const dustParallax = scrollY * 0.14;
      const sparkParallax = scrollY * 0.24;
      const orbParallax = scrollY * 0.36;
      const streamParallax = scrollY * 0.28;

      // 1. Draw Starfield (with slow drift movement)
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x += width;
        else if (s.x > width) s.x -= width;
        if (s.y < 0) s.y += height;
        else if (s.y > height) s.y -= height;

        s.phase += s.twinkleSpeed;
        const opacity = s.baseOpacity + Math.sin(s.phase) * 0.08;
        const y = (s.y + starParallax) % height;
        const finalY = y < 0 ? y + height : y;

        ctx.fillStyle = `rgba(254, 215, 170, ${Math.max(0.01, Math.min(1, opacity))})`;
        ctx.beginPath();
        ctx.arc(s.x, finalY, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Cosmic Dust
      for (const d of dust) {
        d.phase += d.twinkleSpeed;
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0) d.x += width;
        else if (d.x > width) d.x -= width;
        if (d.y < 0) d.y += height;
        else if (d.y > height) d.y -= height;

        const opacity = d.baseOpacity + Math.sin(d.phase) * 0.04;
        const y = (d.y + dustParallax) % height;
        const finalY = y < 0 ? y + height : y;

        ctx.fillStyle = `rgba(249, 115, 22, ${Math.max(0.01, Math.min(1, opacity))})`;
        ctx.beginPath();
        ctx.arc(d.x, finalY, d.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw Sparks Layer & Mouse Interactions
      for (const p of sparks) {
        p.x += p.vx + Math.sin(time * p.frequency + p.phase) * 0.04;
        p.y += p.vy;

        if (p.x < 0) p.x += width;
        else if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        else if (p.y > height) p.y -= height;

        const y = (p.y + sparkParallax) % height;
        const finalY = y < 0 ? y + height : y;

        let scale = 1.0;
        let opacityBoost = 0;
        let pushX = 0;
        let pushY = 0;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = finalY - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 140) {
            const force = (140 - dist) / 140;
            // Displacement away from cursor
            pushX = (dx / dist) * force * 12;
            pushY = (dy / dist) * force * 12;
            scale = 1.0 + force * 0.5;
            opacityBoost = force * 0.25;
          }
        }

        const opacity = Math.max(0.01, Math.min(1, p.baseOpacity + opacityBoost));
        ctx.fillStyle = `rgba(249, 115, 22, ${opacity})`;
        ctx.shadowBlur = 3.5 * scale;
        ctx.shadowColor = "rgba(249, 115, 22, 0.75)";

        ctx.beginPath();
        ctx.arc(p.x + pushX, finalY + pushY, p.size * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      }

      // 4. Draw Floating Cosmic Orbs
      for (const o of orbs) {
        o.x += o.vx;
        o.y += o.vy;

        if (o.x < -o.radius) o.x += width + o.radius * 2;
        else if (o.x > width + o.radius) o.x -= width + o.radius * 2;
        if (o.y < -o.radius) o.y += height + o.radius * 2;
        else if (o.y > height + o.radius) o.y -= height + o.radius * 2;

        o.phase += o.pulseSpeed;
        const pulse = 1.0 + Math.sin(o.phase) * 0.12;
        const y = (o.y + orbParallax) % height;
        const finalY = y < -o.radius ? y + height + o.radius * 2 : y;

        const r = o.radius * pulse;
        const grad = ctx.createRadialGradient(o.x, finalY, 0, o.x, finalY, r);
        grad.addColorStop(0, o.color);
        grad.addColorStop(0.35, o.color.replace(/[\d.]+\)$/, '0.02)'));
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, finalY, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Draw Energy Streams
      for (const s of streams) {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x > width + 300) {
          s.x = -250 - Math.random() * 250;
          s.y = Math.random() * height;
          s.state = 'fade-in';
          s.opacity = 0;
        }

        if (s.state === 'fade-in') {
          s.opacity += 0.006;
          if (s.opacity >= s.targetOpacity) {
            s.opacity = s.targetOpacity;
            s.state = 'active';
          }
        } else if (s.state === 'active') {
          if (s.x > width * 0.68 && Math.random() < 0.012) {
            s.state = 'fade-out';
          }
        } else if (s.state === 'fade-out') {
          s.opacity -= 0.006;
          if (s.opacity <= 0) {
            s.opacity = 0;
            s.x = width + 500;
          }
        }

        const y = (s.y + streamParallax) % height;
        const finalY = y < 0 ? y + height : y;

        if (s.opacity > 0) {
          ctx.beginPath();
          ctx.lineWidth = s.width;

          const grad = ctx.createLinearGradient(s.x, finalY, s.x + s.length, finalY);
          grad.addColorStop(0, "rgba(249, 115, 22, 0)");
          grad.addColorStop(0.3, `rgba(249, 115, 22, ${s.opacity})`);
          grad.addColorStop(0.7, `rgba(253, 186, 116, ${s.opacity * 0.85})`);
          grad.addColorStop(1, "rgba(249, 115, 22, 0)");

          ctx.strokeStyle = grad;
          ctx.moveTo(s.x, finalY);

          for (let step = 0; step < s.length; step += 12) {
            const px = s.x + step;
            const py = finalY + Math.sin(step * s.freq + s.phase) * s.amplitude;
            ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

// Orange mic portal — same orange theme as before, mic is the central visual
function MicPortal({ size = "md" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  const sizeClass = size === "lg"
    ? "w-[340px] h-[340px] md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px]"
    : "w-72 h-72 md:w-[360px] md:h-[360px]";

  return (
    <div className={`relative ${sizeClass} flex items-center justify-center select-none pointer-events-none`}>
      
      {/* Glow Backing */}
      <div className="absolute rounded-full blur-[40px] mix-blend-screen z-0 inset-[-15%] bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.18)_0%,_rgba(249,115,22,0.08)_40%,_transparent_70%)] animate-pulse" />
      <div className="absolute inset-0 rounded-full blur-[20px] mix-blend-screen z-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.22)_0%,_transparent_60%)]" />
      
      {/* Video Element (Color shifted to Orange) */}
      <video
        ref={videoRef}
        src="/Portal Animation.webm"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover portal-mask"
        style={{
          filter: "sepia(1) saturate(380%) hue-rotate(-20deg) brightness(1.15) drop-shadow(0 0 30px rgba(249,115,22,0.45))",
        }}
      />

      {/* Portal localized expanding ripples & escaping sparks */}
      <PortalEmissionCanvas />

      {/* Floating Sparks particles */}
      <ParticleField />
      
      {/* MICROPHONE & FLOOR REFLECTIONS OVERLAY */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <svg viewBox="0 0 400 400" className="w-full h-full text-orange-500">
          <defs>
            <linearGradient id="glowOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDBA74" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1E1E" />
              <stop offset="25%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#FFE5D9" />
              <stop offset="75%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#1E1E1E" />
            </linearGradient>

            <linearGradient id="grilleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0A0A0A" />
              <stop offset="100%" stopColor="#2D1910" />
            </linearGradient>
          </defs>

          {/* DETAILED PREMIUM RETRO CONDENSER MICROPHONE (Floating inside circle) */}
          <g>
            {/* Swivel cradle fork/bracket */}
            <path 
              d="M 174,188 C 174,252 226,252 226,188" 
              fill="none" 
              stroke="url(#metalGrad)" 
              strokeWidth="4" 
              strokeLinecap="round" 
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
            />
            <circle cx="174" cy="188" r="3.5" fill="#FB923C" stroke="#EA580C" strokeWidth="1" />
            <circle cx="226" cy="188" r="3.5" fill="#FB923C" stroke="#EA580C" strokeWidth="1" />

            {/* Mic head capsule */}
            <path 
              d="M 181,168 C 181,155 219,155 219,168 L 217,212 C 217,222 209,228 200,228 C 191,228 183,222 183,212 Z" 
              fill="url(#grilleGrad)" 
              stroke="#EA580C" 
              strokeWidth="1.5" 
            />

            {/* Mesh pattern */}
            <path 
              d="M 182,176 L 218,176 M 181.5,184 L 218.5,184 M 182.5,198 L 217.5,198 M 183.5,206 L 216.5,206 M 184,214 L 216,214" 
              stroke="#EA580C" 
              strokeWidth="0.8" 
              opacity="0.5" 
            />

            {/* Center metal band */}
            <rect x="180.5" y="190" width="39" height="5" rx="1" fill="url(#metalGrad)" stroke="#F97316" strokeWidth="1" />

            {/* Vertical grille ribs */}
            <path d="M 187.5,165 L 188.5,222" stroke="url(#metalGrad)" strokeWidth="2.2" />
            <path d="M 193.5,161 L 194.5,226" stroke="url(#metalGrad)" strokeWidth="2.2" />
            <path d="M 200,159 L 200,228" stroke="url(#metalGrad)" strokeWidth="2.8" />
            <path d="M 206.5,161 L 205.5,226" stroke="url(#metalGrad)" strokeWidth="2.2" />
            <path d="M 212.5,165 L 211.5,222" stroke="url(#metalGrad)" strokeWidth="2.2" />

            {/* Outer shell highlight */}
            <path 
              d="M 181,168 C 181,155 219,155 219,168 L 217,212 C 217,222 209,228 200,228 C 191,228 183,222 183,212 Z" 
              fill="none" 
              stroke="url(#metalGrad)" 
              strokeWidth="2.5" 
            />

            {/* Mount neck */}
            <rect x="194.5" y="228" width="11" height="12" rx="2" fill="url(#metalGrad)" stroke="#F97316" strokeWidth="1.5" />
            <circle cx="200" cy="242" r="4.5" fill="url(#metalGrad)" stroke="#F97316" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export function SpeakAThonPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Compact inline audio bars flanking the CTA button
  const ButtonAudioBars = ({ side, count = 10 }) => {
    const basHeights = side === "left"
      ? [8, 18, 28, 14, 38, 22, 48, 30, 20, 12]
      : [12, 20, 30, 48, 22, 38, 14, 28, 18, 8];
    return (
      <div className={`flex items-center gap-[3px] h-10 ${side === "left" ? "flex-row-reverse" : "flex-row"}`}>
        {basHeights.slice(0, count).map((h, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full"
            style={{
              height: h,
              background: "linear-gradient(to top, #EA580C, #F97316, #FCD34D)",
              boxShadow: "0 0 5px #F97316, 0 0 10px rgba(249,115,22,0.5)",
            }}
            animate={{ height: [h, h * 0.15 + 2, h * 0.7, h] }}
            transition={{ duration: 0.9 + i * 0.08, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center font-inter overflow-x-hidden text-[#FFFFFF]">
      <CursorTrail colorRgb={[249, 115, 22]} />
      {loading && (
        <UniversalLoader
          titleStart="SPEAK"
          titleEnd="ATHON"
          colorHex="#F97316"
          colorRgb="249,115,22"
        />
      )}
      
      {/* Dynamic Font & Animation Styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600;700;800&display=swap');
          
          .font-playfair {
            font-family: 'Playfair Display', Georgia, serif;
          }
          .orange-glow-text {
            text-shadow: 0 0 20px rgba(249,115,22,0.4), 0 0 45px rgba(251,146,60,0.2);
          }
          .glass-panel {
            background: rgba(11, 11, 11, 0.75);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
          }
          .orange-border-glow:hover {
            border-color: rgba(249, 115, 22, 0.4);
            box-shadow: 0 0 25px rgba(249, 115, 22, 0.15);
          }
          
          @keyframes spinClockwise {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spinCounter {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          @keyframes portalPulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.025); opacity: 1; }
          }
          .animate-spin-slow {
            animation: spinClockwise 25s linear infinite;
            transform-origin: 200px 200px;
          }
          .animate-spin-reverse-slow {
            animation: spinCounter 16s linear infinite;
            transform-origin: 200px 200px;
          }
          .animate-portal-pulse {
            animation: portalPulse 4s ease-in-out infinite;
          }
          @keyframes floatOrb {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
            50% { transform: translateY(-20px) scale(1.1); opacity: 0.55; }
          }
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200vh); }
          }
          @keyframes btnPulseRing {
            0% { transform: scale(1); opacity: 0.7; }
            70% { transform: scale(1.35); opacity: 0; }
            100% { transform: scale(1.35); opacity: 0; }
          }
          .btn-pulse-ring {
            animation: btnPulseRing 2s ease-out infinite;
          }
          .btn-pulse-ring-2 {
            animation: btnPulseRing 2s ease-out infinite 0.6s;
          }
          @keyframes micBadgePing {
            0% { transform: scale(1); opacity: 0.5; }
            70% { transform: scale(1.6); opacity: 0; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          .mic-badge-ping {
            animation: micBadgePing 2.5s ease-out infinite;
          }
          .hero-scanline {
            animation: scanline 7s linear infinite;
          }

          /* Cosmos Meteor animations */
          @keyframes meteor {
            0% {
              transform: rotate(-45deg) translateX(0) scale(0);
              opacity: 0;
            }
            1% {
              opacity: 0.8;
              transform: rotate(-45deg) translateX(0) scale(1);
            }
            8% {
              transform: rotate(-45deg) translateX(-250px) scale(0);
              opacity: 0;
            }
            100% {
              transform: rotate(-45deg) translateX(-250px) scale(0);
              opacity: 0;
            }
          }
          .shooting-star-1 {
            position: absolute;
            top: 15%;
            right: 15%;
            width: 80px;
            height: 1.5px;
            background: linear-gradient(90deg, #F97316, transparent);
            animation: meteor 14s linear infinite;
            z-index: -3;
          }
          .shooting-star-2 {
            position: absolute;
            top: 45%;
            left: 8%;
            width: 100px;
            height: 1.5px;
            background: linear-gradient(90deg, #FB923C, transparent);
            animation: meteor 20s linear infinite 5s;
            z-index: -3;
          }
          .shooting-star-3 {
            position: absolute;
            top: 80%;
            right: 20%;
            width: 70px;
            height: 1.5px;
            background: linear-gradient(90deg, #FDBA74, transparent);
            animation: meteor 16s linear infinite 10s;
            z-index: -3;
          }
        `}
      </style>
      
      {/* Ambient background with starfield and cosmos animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#050505] -z-10" />
        <CosmicAtmosphere />
        <div className="shooting-star-1" />
        <div className="shooting-star-2" />
        <div className="shooting-star-3" />
        <div className="absolute top-[-20%] left-[25%] w-[50vw] h-[50vh] bg-gradient-to-b from-[#F97316]/5 to-transparent blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[20%] w-[60vw] h-[60vh] bg-gradient-to-t from-[#FB923C]/5 to-transparent blur-[120px]" />
        <div className="absolute top-[15%] left-[8%] w-64 h-64 rounded-full bg-orange-500/8 blur-[90px]" style={{ animation: "floatOrb 8s ease-in-out infinite" }} />
        <div className="absolute top-[55%] right-[6%] w-48 h-48 rounded-full bg-amber-400/6 blur-[70px]" style={{ animation: "floatOrb 11s ease-in-out infinite 3s" }} />
        <div className="absolute bottom-[10%] left-[35%] w-80 h-80 rounded-full bg-orange-600/5 blur-[100px]" style={{ animation: "floatOrb 13s ease-in-out infinite 5s" }} />
        {/* Glowing planetary/nebula backings */}
        <div className="absolute top-[8%] right-[-10%] w-[320px] h-[320px] rounded-full bg-gradient-to-br from-[#F97316]/6 to-[#EA580C]/2 blur-[80px]" style={{ animation: "floatOrb 15s ease-in-out infinite" }} />
        <div className="absolute bottom-[25%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#F97316]/5 to-transparent blur-[100px]" style={{ animation: "floatOrb 20s ease-in-out infinite 5s" }} />
        <div className="hero-scanline absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/8 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-40 h-40 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #F97316 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
        <div className="absolute bottom-0 right-0 w-40 h-40 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #F97316 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      </div>

      {/* Main Column */}
      <div className="relative z-10 w-full max-w-[1200px] px-4 md:px-8 py-8 flex flex-col items-center">
        <section className="w-full flex flex-col items-center pt-6 pb-8 relative">

          {/* Two-col wrapper */}
          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 lg:gap-0 min-h-[calc(100dvh-80px)] lg:min-h-0">

            {/* ━━━━━━━━ LEFT COLUMN ━━━━━━━━ */}
            <motion.div
              className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-[48%] lg:pl-4 xl:pl-8 order-1"
              initial="hidden"
              animate="visible"
            >
              {/* Top Brand Tag */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: BUTTERY_EASE }}
                className="flex flex-col items-center lg:items-start mb-4"
              >
                <span className="font-orbitron text-[13px] font-semibold tracking-[0.25em] text-orange-500 uppercase">
                  FLASHFORTE
                </span>
                <span className="font-orbitron text-[10px] font-bold tracking-[0.4em] text-[#BDBDBD] uppercase mt-1">
                  • 2K26 •
                </span>
              </motion.div>

              {/* Mic badge with pulse rings */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.1 }}
                className="w-16 h-16 flex items-center justify-center mb-5 relative"
              >
                <span className="mic-badge-ping absolute inset-0 rounded-full border border-orange-500/50" />
                <span className="mic-badge-ping absolute inset-0 rounded-full border border-orange-400/30" style={{ animationDelay: "1.2s" }} />
                <svg width="64" height="64" viewBox="0 0 80 80" className="w-full h-full select-none relative z-10">
                  <circle cx="40" cy="40" r="38" fill="rgba(249,115,22,0.06)" stroke="#F97316" strokeWidth="2" className="drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]" />
                  <rect x="33" y="22" width="14" height="20" rx="7" fill="none" stroke="#F97316" strokeWidth="2" />
                  <line x1="37" y1="26" x2="37" y2="34" stroke="#F97316" strokeWidth="1.5" />
                  <line x1="40" y1="24" x2="40" y2="36" stroke="#F97316" strokeWidth="1.5" />
                  <line x1="43" y1="26" x2="43" y2="34" stroke="#F97316" strokeWidth="1.5" />
                  <path d="M28,32 C28,42 52,42 52,32" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
                  <line x1="40" y1="41" x2="40" y2="52" stroke="#F97316" strokeWidth="2" />
                  <ellipse cx="40" cy="52" rx="9" ry="2.5" fill="none" stroke="#F97316" strokeWidth="2" />
                </svg>
              </motion.div>

              {/* Event Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.2 }}
                className="font-playfair text-[clamp(38px,6vw,68px)] font-black tracking-[0.02em] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-300 orange-glow-text leading-[1.05] mb-2 whitespace-nowrap"
              >
                Speak-A-Thon
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="font-orbitron text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-orange-400/90 mb-5"
              >
                WHERE CONFIDENCE FINDS ITS VOICE
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.5 }}
                className="text-[#C8D3F5] text-sm sm:text-[15px] leading-[1.7] max-w-[440px] font-medium mb-8"
              >
                Step into the arena of oratory — where ideas are born loud, stories shake the stage, and every voice finds its power.
              </motion.p>

              {/* CTA Button with audio bars */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.65 }}
                className="mb-8 flex gap-3 flex-wrap justify-center lg:justify-start"
              >
                <div className="flex items-center gap-3">
                  <ButtonAudioBars side="left" count={8} />
                  <div className="relative">
                    <span className="btn-pulse-ring absolute inset-0 rounded-full bg-orange-500/25 pointer-events-none" />
                    <span className="btn-pulse-ring-2 absolute inset-0 rounded-full bg-orange-400/15 pointer-events-none" />
                    <button
                      onClick={() => scrollToSection("openmic")}
                      className="relative flex items-center gap-2 font-orbitron font-bold rounded-full px-8 py-3.5 text-xs sm:text-sm bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white border border-white/10 shadow-[0_0_32px_rgba(249,115,22,0.5),0_0_60px_rgba(249,115,22,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(249,115,22,0.7)] cursor-pointer will-change-transform z-10"
                    >
                      Enter Speak-A-Thon <ChevronRight size={16} />
                    </button>
                  </div>
                  <ButtonAudioBars side="right" count={8} />
                </div>
              </motion.div>

            </motion.div>

            {/* ━━━━━━━━ RIGHT COLUMN — Mic Portal ━━━━━━━━ */}
            <motion.div
              className="order-2 lg:w-[55%] flex justify-center lg:justify-end relative -mt-4 lg:-mt-16 lg:translate-x-8 xl:translate-x-12 will-change-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: BUTTERY_EASE, delay: 0 }}
            >
              {/* Extra outer ambient glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-[-15%] rounded-full blur-[60px] bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.12)_0%,_transparent_70%)]" />
              </div>
              <MicPortal size="lg" />
            </motion.div>

          </div>

          {/* Category nav cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-[850px] mt-2 lg:-mt-6"
          >
            {[
              { id: "openmic", label: "Open Mic", icon: Mic },
              { id: "debates", label: "Debates", icon: MessageSquare },
              { id: "storytelling", label: "Storytelling", icon: BookOpen },
              { id: "highlights", label: "Highlights", icon: Sparkles },
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <div
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className="group p-5 rounded-xl glass-panel orange-border-glow transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-950/30 border border-orange-500/20 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 mb-2 transition-colors duration-300">
                    <TabIcon size={16} className="text-orange-500 drop-shadow-[0_0_4px_rgba(249,115,22,0.4)]" />
                  </div>
                  <h3 className="font-orbitron font-semibold text-[11px] sm:text-xs text-[#BDBDBD] group-hover:text-white tracking-wide transition-colors">
                    {tab.label}
                  </h3>
                </div>
              );
            })}
          </motion.div>

        </section>

        {/* BOTTOM METADATA FLOATING BAR */}
        <motion.section 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: BUTTERY_EASE }}
          className="w-full py-4 px-6 flex flex-row items-center justify-between text-xs sm:text-sm font-semibold tracking-wider font-orbitron text-[#BDBDBD] mb-16 max-w-[850px] mx-auto glass-panel rounded-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/3 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          <div className="flex items-center gap-2 relative z-10">
            <Calendar size={14} className="text-orange-500" />
            <span>JUNE 2026</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50 shadow-[0_0_4px_#F97316] relative z-10" />
          <div className="flex items-center gap-2 relative z-10">
            <MapPin size={14} className="text-orange-500" />
            <span>VNR VJIET, HYDERABAD</span>
          </div>
        </motion.section>

        {/* CATEGORIES SECTION */}
        <section className="w-full flex flex-col items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: BUTTERY_EASE }}
            className="text-center mb-8"
          >
            <span className="font-orbitron text-xs font-bold text-orange-500 uppercase tracking-widest">
              Explore the Categories
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-black text-white mt-1">
              The Dimensions of Speech
            </h2>
          </motion.div>

          <div className="w-full max-w-[850px] flex flex-col gap-10">
            
            {/* OPEN MIC CATEGORY */}
            <motion.div 
              id="openmic" 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: BUTTERY_EASE }}
              className="glass-panel p-6 md:p-8 rounded-[20px] orange-border-glow transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(249,115,22,0.035),_transparent_75%)] pointer-events-none" />
              <div className="flex flex-col md:flex-row gap-6 relative z-10">
                <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-[14px] bg-orange-950/30 border border-orange-500/20">
                  <Mic size={24} className="text-orange-500" />
                </div>
                <div className="flex-1">
                  <span className="font-orbitron text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
                    Category 01
                  </span>
                  <h3 className="font-playfair text-lg sm:text-xl font-bold text-white mb-3">
                    Open Mic & Extempore
                  </h3>
                  <p className="text-[#BDBDBD] text-xs sm:text-sm leading-relaxed mb-6">
                    A multi-stage platform built for absolute spontaneity and prepared expression. Test your limits by either stepping up with pre-structured ideas or conquering the challenge of delivering an impromptu speech on cutting-edge topics.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                      <h4 className="text-white text-xs font-bold font-orbitron mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Prepared Speech
                      </h4>
                      <p className="text-[11px] text-[#BDBDBD]/70 leading-relaxed">
                        Pick a futuristic theme, craft a powerful story, and present within 3 minutes. Focuses on structure, logic, and delivery.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                      <h4 className="text-white text-xs font-bold font-orbitron mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Extempore Clash
                      </h4>
                      <p className="text-[11px] text-[#BDBDBD]/70 leading-relaxed">
                        Pick a slip, get 1 minute to prepare, and speak for 2 minutes on the spot. Evaluates quick logic, confidence, and posture.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* DEBATES CATEGORY */}
            <motion.div 
              id="debates" 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: BUTTERY_EASE }}
              className="glass-panel p-6 md:p-8 rounded-[20px] orange-border-glow transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(249,115,22,0.035),_transparent_75%)] pointer-events-none" />
              <div className="flex flex-col md:flex-row gap-6 relative z-10">
                <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-[14px] bg-orange-950/30 border border-orange-500/20">
                  <MessageSquare size={24} className="text-orange-500" />
                </div>
                <div className="flex-1">
                  <span className="font-orbitron text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
                    Category 02
                  </span>
                  <h3 className="font-playfair text-lg sm:text-xl font-bold text-white mb-3">
                    Head-to-Head Debates
                  </h3>
                  <p className="text-[#BDBDBD] text-xs sm:text-sm leading-relaxed mb-6">
                    Enter the crucible of logic where ideas go to battle. Debaters face off in structured rounds, arguing for or against controversial topics on futuristic ethics, AI hegemony, space rights, and societal evolution.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                      <h4 className="text-white text-xs font-bold font-orbitron mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Constructive Argument
                      </h4>
                      <p className="text-[11px] text-[#BDBDBD]/70 leading-relaxed">
                        State your stance with hard-hitting statistics, structural insights, and deep logic. Propose solutions to complex systems.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                      <h4 className="text-white text-xs font-bold font-orbitron mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Rebuttal Duels
                      </h4>
                      <p className="text-[11px] text-[#BDBDBD]/70 leading-relaxed">
                        Tear down opposing logic in the immediate rebuttal rounds. High-speed articulation meets rhetorical excellence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* STORYTELLING CATEGORY */}
            <motion.div 
              id="storytelling" 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: BUTTERY_EASE }}
              className="glass-panel p-6 md:p-8 rounded-[20px] orange-border-glow transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(249,115,22,0.035),_transparent_75%)] pointer-events-none" />
              <div className="flex flex-col md:flex-row gap-6 relative z-10">
                <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-[14px] bg-orange-950/30 border border-orange-500/20">
                  <BookOpen size={24} className="text-orange-500" />
                </div>
                <div className="flex-1">
                  <span className="font-orbitron text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
                    Category 03
                  </span>
                  <h3 className="font-playfair text-lg sm:text-xl font-bold text-white mb-3">
                    Sci-Fi Storytelling
                  </h3>
                  <p className="text-[#BDBDBD] text-xs sm:text-sm leading-relaxed mb-6">
                    Unlock the doors of imagination. Storytellers weave detailed narratives set in cyberpunk landscapes, distant galactical civilizations, or alternate space realities, leveraging vocal tone and theatrics to build immersive worlds.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                      <h4 className="text-white text-xs font-bold font-orbitron mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> World-Building
                      </h4>
                      <p className="text-[11px] text-[#BDBDBD]/70 leading-relaxed">
                        Construct highly detailed sci-fi environments, characters, and plotlines. Draw listeners into your creative multiverse.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                      <h4 className="text-white text-xs font-bold font-orbitron mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Vocal Theatrics
                      </h4>
                      <p className="text-[11px] text-[#BDBDBD]/70 leading-relaxed">
                        Use pace shifts, pauses, sound effects (via voice), and emotional modulation to make stories come alive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* GUIDELINES & DIRECTIVES SECTION */}
        <section className="w-full flex flex-col items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: BUTTERY_EASE }}
            className="text-center mb-10"
          >
            <span className="font-orbitron text-xs font-bold text-orange-500 uppercase tracking-widest">
              Directives
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-black text-white mt-1">
              Rules & Judging Metrics
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[850px]">
            {/* Rules panel */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: BUTTERY_EASE }}
              className="p-6 rounded-[20px] glass-panel flex flex-col orange-border-glow transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,_rgba(249,115,22,0.025),_transparent_60%)] pointer-events-none" />
              <h3 className="font-orbitron text-base font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                <ShieldAlert size={18} className="text-orange-500" /> General Rules
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#BDBDBD] flex-1 relative z-10">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                  <span>Participation is strictly individual.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                  <span>All presentations and arguments must be delivered in English.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                  <span>Topic allocation for prepared speech happens 2 days prior to the main event.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                  <span>Decisions made by the judging panel (Toastmasters experts) are final and binding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                  <span>Offensive, derogatory, or political slurs will result in immediate disqualification.</span>
                </li>
              </ul>
            </motion.div>

            {/* Scoring Breakdown */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: BUTTERY_EASE }}
              className="p-6 rounded-[20px] glass-panel flex flex-col orange-border-glow transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(249,115,22,0.025),_transparent_60%)] pointer-events-none" />
              <h3 className="font-orbitron text-base font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                <Volume2 size={18} className="text-orange-500" /> Scoring Breakdown
              </h3>
              <div className="space-y-4 flex-1 justify-center flex flex-col relative z-10">
                {[
                  { label: "Content & Substance", percentage: 40, desc: "Structure, research depth, and relevance of statements." },
                  { label: "Vocal Modulation", percentage: 30, desc: "Pitch control, speed, clarity, and articulation." },
                  { label: "Poise & Body Language", percentage: 20, desc: "Confidence, hand gestures, eye contact, and presence." },
                  { label: "Time Management", percentage: 10, desc: "Adherence to warning signals and designated limit." },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-semibold text-white">{item.label}</span>
                      <span className="font-orbitron font-bold text-orange-500">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <span className="text-[10px] text-[#BDBDBD]/65 mt-1">{item.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* LAST YEAR RETROSPECTIVE */}
        <section id="highlights" className="w-full flex flex-col items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: BUTTERY_EASE }}
            className="text-center mb-10"
          >
            <span className="font-orbitron text-xs font-bold text-orange-500 uppercase tracking-widest">
              2025 Retrospective
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-black text-white mt-1">
              Last Year Highlights
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: BUTTERY_EASE }}
            className="w-full max-w-[850px] grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 items-stretch mb-8"
          >
            
            {/* Stats card */}
            <div className="p-6 rounded-[20px] bg-gradient-to-b from-[#1C100B]/10 to-transparent border border-white/5 flex flex-col justify-between">
              <div>
                <h3 className="font-orbitron text-sm sm:text-base font-bold text-white mb-2">Speak-A-Thon '25</h3>
                <p className="text-xs text-[#BDBDBD] leading-relaxed mb-6">
                  Relive the magic of our previous edition, where speakers pushed boundaries in futuristic storytelling and tech debates.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-[#BDBDBD]/70">Total Speakers</span>
                  <span className="font-orbitron font-bold text-xs sm:text-sm text-white">40+ Orators</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-[#BDBDBD]/70">Judging Board</span>
                  <span className="font-orbitron font-bold text-xs sm:text-sm text-white">Toastmasters Experts</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-xs text-[#BDBDBD]/70">Themes Addressed</span>
                  <span className="font-orbitron font-bold text-xs sm:text-sm text-white">AI Ethics to Mars Colonialization</span>
                </div>
              </div>
            </div>

            {/* Winners podium card */}
            <div className="p-6 rounded-[20px] glass-panel flex flex-col justify-between">
              <div>
                <h3 className="font-orbitron text-sm sm:text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Trophy size={16} className="text-orange-500" /> 2025 Podium
                </h3>
                
                <div className="space-y-3">
                  {[
                    { rank: "1st Place", name: "Sarah Jenkins", details: "Linguistics & AI Debate champ", trophyColor: "text-amber-500" },
                    { rank: "2nd Place", name: "Rahul Sharma", details: "Cyberpunk narrative specialist", trophyColor: "text-slate-400" },
                    { rank: "3rd Place", name: "Emily Chen", details: "Extempore adaptability expert", trophyColor: "text-amber-800" },
                  ].map((winner, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-white/5 bg-white/[0.01] flex items-center gap-3">
                      <Trophy size={14} className={`${winner.trophyColor} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white">{winner.name}</span>
                          <span className="font-orbitron text-[10px] text-orange-400 font-semibold">{winner.rank}</span>
                        </div>
                        <p className="text-[10px] text-[#BDBDBD]/70 mt-0.5">{winner.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-center sm:justify-start">
                <a
                  href="https://www.vnrvjietcsi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-orange-400 font-semibold hover:text-orange-300 transition-colors duration-200"
                >
                  View full retrospective archive <ExternalLink size={12} />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Gallery */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.0, ease: BUTTERY_EASE }}
            className="w-full max-w-[850px]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { src: "/highlight-1.jpg", alt: "Speak-A-Thon '25 Gallery Image 1", label: "Inspirational Speeches" },
                { src: "/highlight-2.jpg", alt: "Speak-A-Thon '25 Gallery Image 2", label: "Intense Debates" },
                { src: "/highlight-3.jpg", alt: "Speak-A-Thon '25 Gallery Image 3", label: "Storytelling Multiverse" }
              ].map((img, index) => (
                <div 
                  key={index} 
                  className="relative group rounded-2xl overflow-hidden glass-panel border border-white/5 orange-border-glow aspect-video transition-all duration-300 hover:-translate-y-1"
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#1C100B]/40 to-transparent p-4 text-center">
                    <Mic className="w-8 h-8 text-orange-500/40 mb-2 group-hover:text-orange-500 transition-colors" />
                    <span className="text-[10px] font-orbitron font-semibold tracking-wider text-[#BDBDBD] uppercase">
                      {img.label}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                    <span className="text-[10px] font-orbitron font-semibold tracking-wider text-orange-400">
                      SPEAKER IMAGE {index + 1}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* REGISTRATION STATUS CARD */}
        <section id="registration" className="w-full flex flex-col items-center pb-8">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: BUTTERY_EASE }}
            className="text-center mb-10"
          >
            <span className="font-orbitron text-xs font-bold text-orange-500 uppercase tracking-widest">
              Join the Cosmos
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-black text-white mt-1">
              Registration Station
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: BUTTERY_EASE }}
            className="w-full max-w-[850px] relative"
          >
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-r from-orange-500/10 to-amber-500/10 blur-xl pointer-events-none -z-10" />
            <div className="absolute inset-0 rounded-[24px] border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.15)] pointer-events-none -z-10" />
            
            <div className="w-full p-8 md:p-12 rounded-[24px] glass-panel flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.03)_0%,_transparent_60%)] pointer-events-none" />
              <Sparkles className="w-12 h-12 text-orange-500 mb-4 animate-pulse" />
              <h3 className="font-orbitron text-base sm:text-lg font-bold text-white mb-2 tracking-wide">
                REGISTRATION GATES OPENING SOON
              </h3>
              <p className="text-[#BDBDBD] text-xs sm:text-sm max-w-md leading-relaxed mb-6">
                Preparation is key in the multiverse. Stay tuned as registration timelines, speaker criteria, and portal keys are finalized.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-950/20">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <span className="font-orbitron font-bold text-[10px] text-orange-400 tracking-wider">TRANSMISSION ACTIVE</span>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}