import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { 
  Mic, Trophy, Sparkles, Calendar, MapPin, 
  BookOpen, MessageSquare, ChevronRight, 
  ExternalLink
} from "lucide-react";
import { CursorTrail } from "../components/CursorTrail.jsx";
import { UniversalLoader } from "../components/UniversalLoader.jsx";

import speakathon1 from "../../images/Speakathon/speakathon1.webp";
import speakathon2 from "../../images/Speakathon/speakathon2.webp";
import speakathon3 from "../../images/Speakathon/speakathon3.webp";
import speakathon4 from "../../images/Speakathon/speakthon4.webp";
import speakathon5 from "../../images/Speakathon/speakathon5.webp";

const BUTTERY_EASE = [0.16, 1, 0.3, 1];

// Dynamic Particles Generator
function ParticleField() {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 10 : 25;
    const generated = Array.from({ length: count }).map((_, i) => ({
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

    const isMobile = window.innerWidth < 768;
    const maxSparks = isMobile ? 10 : 25;

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
    let scrollYVal = window.scrollY;
    const handleScroll = () => {
      scrollYVal = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    const isMobile = window.innerWidth < 768;

    const stars = Array.from({ length: isMobile ? 40 : 130 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
      size: Math.random() * 1.2 + 0.3,
      baseOpacity: Math.random() * 0.32 + 0.05,
      twinkleSpeed: 0.003 + Math.random() * 0.012,
      phase: Math.random() * Math.PI * 2,
    }));

    const dust = Array.from({ length: isMobile ? 20 : 110 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      size: Math.random() * 1.3 + 0.4,
      baseOpacity: Math.random() * 0.14 + 0.03,
      twinkleSpeed: 0.008 + Math.random() * 0.018,
      phase: Math.random() * Math.PI * 2,
    }));

    const sparks = Array.from({ length: isMobile ? 15 : 55 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.24,
      vy: -0.16 - Math.random() * 0.24,
      size: Math.random() * 2.4 + 0.8,
      baseOpacity: Math.random() * 0.38 + 0.15,
      phase: Math.random() * Math.PI * 2,
      amplitude: Math.random() * 18 + 4,
      frequency: 0.002 + Math.random() * 0.004,
    }));

    const orbs = Array.from({ length: isMobile ? 2 : 15 }).map((_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      radius: isMobile ? Math.random() * 12 + 8 : Math.random() * 24 + 14,
      color: i % 3 === 0 ? "rgba(249, 115, 22, 0.08)" : i % 3 === 1 ? "rgba(251, 146, 60, 0.06)" : "rgba(253, 186, 116, 0.07)",
      pulseSpeed: 0.0015 + Math.random() * 0.0025,
      phase: Math.random() * Math.PI * 2,
    }));

    const streams = Array.from({ length: isMobile ? 0 : 3 }).map(() => ({
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

      const scrollY = scrollYVal;

      const starParallax = scrollY * 0.04;
      const dustParallax = scrollY * 0.14;
      const sparkParallax = scrollY * 0.24;
      const orbParallax = scrollY * 0.36;
      const streamParallax = scrollY * 0.28;

      // 1. Draw Starfield
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

      // 3. Draw Sparks & Mouse Interactions
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

      // 4. Draw Floating Orbs
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
      window.removeEventListener("scroll", handleScroll);
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
function MicPortal({ className = "" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  const hasCustomWidth = className.includes("w-") || className.includes("max-w-");
  const defaultClasses = hasCustomWidth
    ? ""
    : "w-full max-w-[clamp(312px,90vw,576px)] lg:max-w-none lg:w-full";

  return (
    <div
      className={`relative flex items-center justify-center aspect-square mx-auto select-none pointer-events-none ${defaultClasses} ${className}`}
    >
      {/* Glow Backing */}
      <div className="absolute rounded-full blur-[40px] mix-blend-screen z-0 inset-[-15%] bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.18)_0%,_rgba(249,115,22,0.08)_40%,_transparent_70%)] animate-pulse" />
      <div className="absolute inset-0 rounded-full blur-[20px] mix-blend-screen z-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.22)_0%,_transparent_60%)]" />
      
      {/* Video Element */}
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
    </div>
  );
}

// Custom Cosmic & Sound Themed Loader
function CosmicSpeakLoader() {
  const [dots, setDots] = useState("");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: BUTTERY_EASE }}
      className="fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center select-none"
    >
      {/* Background Starry Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.06)_0%,_transparent_65%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-orange-600/5 blur-[80px] rounded-full pointer-events-none animate-pulse" />

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-orange-400"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 20, 
              opacity: 0,
              scale: 0.4
            }}
            animate={{ 
              y: [window.innerHeight + 10, -10],
              opacity: [0, 0.8, 0.8, 0],
              scale: [0.4, 1.2, 0.4]
            }}
            transition={{ 
              duration: 3 + Math.random() * 3, 
              repeat: Infinity, 
              delay: Math.random() * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Concentric Sound Portal & Mic */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Rippling rings */}
        <motion.div
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-28 h-28 rounded-full border border-orange-500/30"
        />
        <motion.div
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.67 }}
          className="absolute w-28 h-28 rounded-full border border-orange-400/20"
        />
        <motion.div
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1.33 }}
          className="absolute w-28 h-28 rounded-full border border-amber-300/10"
        />

        {/* Inner Mic container */}
        <motion.div 
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-24 h-24 rounded-full flex items-center justify-center bg-black/60 border border-orange-500/30 shadow-[0_0_35px_rgba(249,115,22,0.2)] z-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.08)_0%,_transparent_65%)] rounded-full" />
          <Mic className="w-10 h-10 text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Active Audio Waveform Equalizer */}
      <div className="flex items-center gap-[4px] h-8 mb-6 z-10">
        {Array.from({ length: 12 }).map((_, i) => {
          const heights = [10, 24, 14, 32, 18, 28, 16, 26, 12, 22, 10, 15];
          const h = heights[i % heights.length];
          return (
            <motion.div
              key={i}
              className="w-[3px] rounded-full"
              style={{
                height: h,
                background: "linear-gradient(to top, #EA580C, #F97316, #FDBA74)",
                boxShadow: "0 0 8px rgba(249,115,22,0.6)",
              }}
              animate={{ height: [h, h * 0.15 + 3, h * 0.75, h] }}
              transition={{ 
                duration: 0.8 + i * 0.05, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.04
              }}
            />
          );
        })}
      </div>

      {/* Loading Text */}
      <div className="flex flex-col items-center gap-1 z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-orbitron text-sm font-bold tracking-[0.3em] text-[#F8FAFC] flex items-center gap-1"
        >
          SPEAK
          <span className="bg-gradient-to-r from-orange-600 to-amber-400 bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            -A-THON
          </span>
        </motion.h2>
        <span className="font-orbitron text-[10px] font-bold tracking-[0.2em] text-[#BDBDBD]/50 mt-1 uppercase">
          Tuning Frequency{dots}
        </span>
      </div>
    </motion.div>
  );
}

export function SpeakAThonPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar ? navbar.offsetHeight : 72;
    const BREATHING = 20;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - BREATHING;
    window.scrollTo({ top, behavior: "smooth" });
  };


  // Compact inline audio bars flanking the CTA button
  const ButtonAudioBars = ({ side, count = 10 }) => {
    const basHeights = side === "left"
      ? [8, 18, 28, 14, 38, 22, 48, 30, 20, 12]
      : [12, 20, 30, 48, 22, 38, 14, 28, 18, 8];
    return (
      <div className={`hidden sm:flex items-center gap-[3px] h-10 ${side === "left" ? "flex-row-reverse" : "flex-row"}`}>
        {basHeights.slice(0, count).map((h, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full"
            style={{
              height: h,
              transformOrigin: "bottom",
              background: "linear-gradient(to top, #EA580C, #F97316, #FCD34D)",
              boxShadow: "0 0 5px #F97316, 0 0 10px rgba(249,115,22,0.5)",
            }}
            animate={{ scaleY: [1, 0.15, 0.7, 1] }}
            transition={{ duration: 0.9 + i * 0.08, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col font-inter overflow-x-hidden text-[#FFFFFF] bg-[#050505]">
      <CursorTrail colorRgb={[249, 115, 22]} />
      <AnimatePresence>
        {loading && <CosmicSpeakLoader />}
      </AnimatePresence>
      
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

          @media (max-width: 1024px) {
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
            .hero-portal-mobile-slot { display: flex !important; }
          }

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

      {/* HERO SECTION */}
      <section
        id="hero"
        className="hero-layout relative z-10 flex flex-col lg:flex-row lg:justify-between items-center lg:items-center px-5 pt-4 md:pt-6 lg:pt-6 pb-12 lg:pb-20 w-full max-w-[1400px] mx-auto gap-0 lg:gap-0"
        style={{
          minHeight: "calc(100dvh - 72px)",
          scrollMarginTop: "72px",
        }}
      >
        {/* ━━━━━━ LEFT COLUMN ━━━━━━ */}
        <motion.div
          className="hero-left flex flex-col items-center lg:items-start text-center lg:text-left lg:w-[48%] lg:max-w-[580px] lg:pl-8 w-full"
          initial="hidden"
          animate="visible"
        >

          {/* Event Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.2 }}
            className="font-orbitron text-[clamp(28px,7.5vw,60px)] font-black tracking-[0.08em] text-[#F8FAFC] orange-glow-text leading-[1.05] mb-2 text-center lg:text-left whitespace-nowrap"
          >
            SPEAK
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              -A-THON
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-[#FFFFFF] text-[clamp(13px,2.2vw,22px)] font-extrabold leading-[1.35] tracking-[0.18em] mb-4 mt-0 uppercase text-center lg:text-left w-full"
          >
            WHERE CONFIDENCE{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              FINDS ITS VOICE
            </span>
          </motion.h2>

          {/* Portal Animation — mobile only */}
          <motion.div
            className="hero-portal-mobile-slot lg:hidden flex w-full justify-center my-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: BUTTERY_EASE }}
          >
            <div className="w-[70%] max-w-[300px] aspect-square relative">
              <MicPortal className="w-full h-full" />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.5 }}
            className="text-[#C8D3F5] text-[clamp(13px,1.8vw,16px)] leading-[1.8] max-w-[500px] mb-8 font-medium"
          >
            Step into the arena of oratory — where ideas are born loud, stories shake the stage, and every voice finds its power.
          </motion.p>

          {/* CTA Button with audio bars */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.65 }}
            className="hero-btns mb-8 flex gap-3 flex-wrap justify-center lg:justify-start"
          >
            <div className="flex items-center gap-3">
              <ButtonAudioBars side="left" count={8} />
              <div className="relative">
                <span className="btn-pulse-ring absolute inset-0 rounded-full bg-orange-500/25 pointer-events-none" />
                <span className="btn-pulse-ring-2 absolute inset-0 rounded-full bg-orange-400/15 pointer-events-none" />
                <Link
                  to="/speak-a-thon/register"
                  className="relative flex items-center gap-2 font-orbitron font-bold rounded-full px-8 py-4 text-[clamp(13px,1.6vw,15px)] bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white border border-white/10 shadow-[0_0_32px_rgba(249,115,22,0.5),0_0_60px_rgba(249,115,22,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(249,115,22,0.7)] cursor-pointer will-change-transform z-10"
                >
                  Enter Speak-A-Thon <ChevronRight size={16} />
                </Link>
              </div>
              <ButtonAudioBars side="right" count={8} />
            </div>
            <div className="relative">
              <Link
                to="/speak-a-thon/register"
                className="relative flex items-center gap-2 font-orbitron font-bold rounded-full px-8 py-4 text-[clamp(13px,1.6vw,15px)] bg-transparent hover:bg-orange-500/10 text-white border border-orange-500/30 hover:border-orange-500/60 shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-all duration-300 hover:scale-105 cursor-pointer will-change-transform z-10"
              >
                Register Now <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* ━━━━━━ RIGHT COLUMN — Mic Portal ━━━━━━ */}
        <motion.div
          className="hidden lg:flex lg:w-[48%] justify-end w-full relative lg:translate-x-4 will-change-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: BUTTERY_EASE, delay: 0 }}
        >
          <MicPortal className="w-[100%] lg:w-[141%]" />
        </motion.div>
      </section>

      {/* Category nav cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.9 }}
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-[1200px] px-5 mb-16 mx-auto"
      >
        {[
          { id: "openmic", label: "Round 1", icon: Mic },
          { id: "debates", label: "Round 2", icon: MessageSquare },
          { id: "storytelling", label: "Round 3", icon: BookOpen },
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

      {/* BOTTOM METADATA FLOATING BAR */}
      <motion.section 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: BUTTERY_EASE }}
        className="w-full py-4 px-6 flex flex-row items-center justify-between text-xs sm:text-sm font-semibold tracking-wider font-orbitron text-[#BDBDBD] my-12 max-w-[1200px] mx-auto glass-panel rounded-xl relative overflow-hidden group"
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

      {/* Main content wrapper */}
      <div className="relative z-10 w-full max-w-[1200px] px-4 md:px-8 flex flex-col items-center mx-auto">

        {/* CATEGORIES SECTION */}
        <section className="w-full flex flex-col items-center mb-16 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: BUTTERY_EASE }}
            className="text-center mb-8"
          >
            <span className="font-orbitron text-xs font-bold text-orange-500 uppercase tracking-widest">
              Competition Structure
            </span>
            <h2 className="font-orbitron text-[clamp(28px,4.8vw,46px)] font-black text-[#F8FAFC] tracking-[0.04em] mt-1" style={{ textShadow: "0 0 40px rgba(249,115,22,0.35)" }}>
              Three Progressive Rounds
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 xl:gap-6 w-full max-w-[1200px] mt-8 relative items-stretch">
            
            {/* ROUND 1 - WHAT IF CHALLENGE */}
            <motion.div
              id="openmic"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group p-6 sm:p-8 rounded-[24px] glass-panel relative border border-orange-500/10 shadow-[0_4px_30px_rgba(249,115,22,0.03)] hover:border-orange-500/40 hover:shadow-[0_12px_45px_rgba(249,115,22,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Background watermark number - repositioned to avoid overlap */}
              <div className="absolute -bottom-6 -right-4 font-orbitron text-[120px] font-black text-orange-500/[0.03] select-none pointer-events-none group-hover:text-orange-500/[0.08] group-hover:scale-110 transition-all duration-500 z-0">
                01
              </div>

              <div className="relative z-10">
                <div className="flex flex-col gap-4 mb-5">
                  <motion.div
                    className="flex items-center justify-center w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/25 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-all duration-300"
                    whileHover={{ scale: 1.08, rotate: 5 }}
                  >
                    <Mic size={24} className="text-orange-500" />
                  </motion.div>
                  <div>
                    <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-2 py-1 rounded-md">Round 01</span>
                    <h3 className="text-xl font-bold text-white tracking-wide mt-3 mb-2">"What If…?" Challenge</h3>
                    <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full mb-4 group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </div>

                <p className="text-[#C8D3F5] text-sm leading-relaxed mb-6 font-medium">
                  Participants get a random "What if…?" question. 30 seconds prep, 1–2 minutes to speak. Top 8 advance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 mt-auto relative z-10">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-orange-500/15 group-hover:bg-orange-500/[0.02] transition-colors duration-300">
                  <p className="text-white text-[13px] font-bold mb-1 flex items-center gap-1.5"><Calendar size={12} className="text-orange-400"/> Prep: 30s</p>
                  <p className="text-[11px] text-[#BDBDBD]/80 leading-snug">Gather thoughts & structure response</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-orange-500/15 group-hover:bg-orange-500/[0.02] transition-colors duration-300">
                  <p className="text-white text-[13px] font-bold mb-1 flex items-center gap-1.5"><Mic size={12} className="text-orange-400"/> Speak: 1-2m</p>
                  <p className="text-[11px] text-[#BDBDBD]/80 leading-snug">Deliver engaging creative response</p>
                </div>
              </div>
            </motion.div>

            {/* ARROW 1 */}
            <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-8">
               <div className="flex flex-col items-center gap-1 opacity-80">
                 <div className="w-[2px] h-4 bg-gradient-to-b from-transparent to-orange-500/50 rounded-full"></div>
                 <ChevronRight size={28} className="text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                 <div className="w-[2px] h-4 bg-gradient-to-t from-transparent to-orange-500/50 rounded-full"></div>
               </div>
            </div>

            {/* ROUND 2 - BUZZWORD STORYTELLING */}
            <motion.div
              id="debates"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.2 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group p-6 sm:p-8 rounded-[24px] glass-panel relative border border-orange-500/10 shadow-[0_4px_30px_rgba(249,115,22,0.03)] hover:border-orange-500/40 hover:shadow-[0_12px_45px_rgba(249,115,22,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute -bottom-6 -right-4 font-orbitron text-[120px] font-black text-orange-500/[0.03] select-none pointer-events-none group-hover:text-orange-500/[0.08] group-hover:scale-110 transition-all duration-500 z-0">
                02
              </div>

              <div className="relative z-10">
                <div className="flex flex-col gap-4 mb-5">
                  <motion.div
                    className="flex items-center justify-center w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/25 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-all duration-300"
                    whileHover={{ scale: 1.08, rotate: 5 }}
                  >
                    <MessageSquare size={24} className="text-orange-500" />
                  </motion.div>
                  <div>
                    <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-2 py-1 rounded-md">Round 02</span>
                    <h3 className="text-xl font-bold text-white tracking-wide mt-3 mb-2">Buzzword Storytelling</h3>
                    <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full mb-4 group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </div>

                <p className="text-[#C8D3F5] text-sm leading-relaxed mb-6 font-medium">
                  Draw 5 unrelated buzzwords, weave them into a story. 60 seconds prep, 1–2 minutes to deliver. Top 5 advance to finale.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 mt-auto relative z-10">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-orange-500/15 group-hover:bg-orange-500/[0.02] transition-colors duration-300">
                  <p className="text-white text-[13px] font-bold mb-1 flex items-center gap-1.5"><Calendar size={12} className="text-orange-400"/> Prep: 60s</p>
                  <p className="text-[11px] text-[#BDBDBD]/80 leading-snug">Plan narrative with buzzwords</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-orange-500/15 group-hover:bg-orange-500/[0.02] transition-colors duration-300">
                  <p className="text-white text-[13px] font-bold mb-1 flex items-center gap-1.5"><Mic size={12} className="text-orange-400"/> Speak: 1-2m</p>
                  <p className="text-[11px] text-[#BDBDBD]/80 leading-snug">Deliver coherent creative story</p>
                </div>
              </div>
            </motion.div>

            {/* ARROW 2 */}
            <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-8">
               <div className="flex flex-col items-center gap-1 opacity-80">
                 <div className="w-[2px] h-4 bg-gradient-to-b from-transparent to-orange-500/50 rounded-full"></div>
                 <ChevronRight size={28} className="text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                 <div className="w-[2px] h-4 bg-gradient-to-t from-transparent to-orange-500/50 rounded-full"></div>
               </div>
            </div>

            {/* ROUND 3 - OBJECT MONOLOGUE */}
            <motion.div
              id="storytelling"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.3 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group p-6 sm:p-8 rounded-[24px] glass-panel relative border border-orange-500/10 shadow-[0_4px_30px_rgba(249,115,22,0.03)] hover:border-orange-500/40 hover:shadow-[0_12px_45px_rgba(249,115,22,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute -bottom-6 -right-4 font-orbitron text-[120px] font-black text-orange-500/[0.03] select-none pointer-events-none group-hover:text-orange-500/[0.08] group-hover:scale-110 transition-all duration-500 z-0">
                03
              </div>

              <div className="relative z-10">
                <div className="flex flex-col gap-4 mb-5">
                  <motion.div
                    className="flex items-center justify-center w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/25 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-all duration-300"
                    whileHover={{ scale: 1.08, rotate: 5 }}
                  >
                    <BookOpen size={24} className="text-orange-500" />
                  </motion.div>
                  <div>
                    <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-2 py-1 rounded-md">Round 03 - Finale</span>
                    <h3 className="text-xl font-bold text-white tracking-wide mt-3 mb-2">Object Monologue</h3>
                    <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full mb-4 group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </div>

                <p className="text-[#C8D3F5] text-sm leading-relaxed mb-6 font-medium">
                  Speak as an everyday object. 60 seconds prep, 1–2 minutes to perform. Bring the object to life with emotion and personality.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 mt-auto relative z-10">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-orange-500/15 group-hover:bg-orange-500/[0.02] transition-colors duration-300">
                  <p className="text-white text-[13px] font-bold mb-1 flex items-center gap-1.5"><Calendar size={12} className="text-orange-400"/> Prep: 60s</p>
                  <p className="text-[11px] text-[#BDBDBD]/80 leading-snug">Plan object personification</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-orange-500/15 group-hover:bg-orange-500/[0.02] transition-colors duration-300">
                  <p className="text-white text-[13px] font-bold mb-1 flex items-center gap-1.5"><Mic size={12} className="text-orange-400"/> Speak: 1-2m</p>
                  <p className="text-[11px] text-[#BDBDBD]/80 leading-snug">Deliver emotional monologue</p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* LAST YEAR RETROSPECTIVE */}
        <section id="highlights" className="w-full flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: BUTTERY_EASE }}
            className="text-center mb-10"
          >
            <span className="font-orbitron text-xs font-bold text-orange-500 uppercase tracking-widest">
              2025 Retrospective
            </span>
            <h2 className="font-orbitron text-[clamp(28px,4.8vw,46px)] font-black text-[#F8FAFC] tracking-[0.04em] mt-1" style={{ textShadow: "0 0 40px rgba(249,115,22,0.35)" }}>
              Last Year Highlights
            </h2>
          </motion.div>

          {/* Scrolling Marquee Gallery (Local Images) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.0, ease: BUTTERY_EASE }}
            className="w-full mb-14"
          >
            <div className="gallery-mask" style={{ width: "100%", overflow: "hidden" }}>
              <div className="gallery-track" style={{ display: "flex", gap: "0.75rem", width: "max-content" }}>
                {[
                  speakathon1, speakathon2, speakathon3, speakathon4, speakathon5,
                  speakathon1, speakathon2, speakathon3, speakathon4, speakathon5,
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
                      border: "1px dashed rgba(249, 115, 22, 0.25)",
                      background: "rgba(8,10,12,0.95)",
                      position: "relative",
                    }}
                  >
                    {src ? (
                      <img
                        src={src}
                        alt={`Speak-A-Thon moment ${(i % 5) + 1}`}
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
                          color: "rgba(249, 115, 22, 0.35)", textTransform: "uppercase",
                        }}>Photo 0{(i % 5) + 1}</span>
                      </div>
                    )}

                    {/* corner accents */}
                    <div style={{ position:"absolute", top:8, left:8, width:12, height:12, borderTop:"1.5px solid rgba(249, 115, 22, 0.4)", borderLeft:"1.5px solid rgba(249, 115, 22, 0.4)" }} />
                    <div style={{ position:"absolute", top:8, right:8, width:12, height:12, borderTop:"1.5px solid rgba(249, 115, 22, 0.4)", borderRight:"1.5px solid rgba(249, 115, 22, 0.4)" }} />
                    <div style={{ position:"absolute", bottom:8, left:8, width:12, height:12, borderBottom:"1.5px solid rgba(249, 115, 22, 0.4)", borderLeft:"1.5px solid rgba(249, 115, 22, 0.4)" }} />
                    <div style={{ position:"absolute", bottom:8, right:8, width:12, height:12, borderBottom:"1.5px solid rgba(249, 115, 22, 0.4)", borderRight:"1.5px solid rgba(249, 115, 22, 0.4)" }} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.0, ease: BUTTERY_EASE, delay: 0.1 }}
            className="w-full max-w-[850px] grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 items-stretch mb-8"
          >
            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="p-6 rounded-[20px] bg-gradient-to-b from-[#1C100B]/10 to-transparent border border-white/5 flex flex-col justify-between shadow-[0_0_20px_rgba(249,115,22,0.05)] hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-shadow duration-300"
            >
              <div>
                <h3 className="font-orbitron text-sm sm:text-base font-bold text-white mb-2">Speak-A-Thon '25</h3>
                <p className="text-xs text-[#BDBDBD] leading-relaxed mb-6">
                  A three-round speaking competition that challenged first-year students with spontaneous speaking, creative storytelling, and quick thinking.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-[#BDBDBD]/70">Event Mode</span>
                  <span className="font-orbitron font-bold text-xs sm:text-sm text-white">Online via Zoom</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-xs text-[#BDBDBD]/70">Date & Duration</span>
                  <span className="font-orbitron font-bold text-xs sm:text-sm text-white">June 28 • 9 AM - 1 PM</span>
                </div>
              </div>
            </motion.div>

            {/* Winners podium card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.3 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="p-6 rounded-[20px] glass-panel flex flex-col justify-between shadow-[0_0_20px_rgba(249,115,22,0.05)] hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-shadow duration-300"
            >
              <div>
                <h3 className="font-orbitron text-sm sm:text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Trophy size={16} className="text-orange-500" /> 2025 Podium
                </h3>
                
                <div className="space-y-3">
                  {[
                    { rank: "1st Place", name: "Chakresh Sri Varma", details: "ECE-B • Roll No: 24071A04B8 • ₹2000", trophyColor: "text-amber-500" },
                    { rank: "2nd Place", name: "Patha Sloka", details: "DS-A • Roll No: 24071A6751 • ₹1300", trophyColor: "text-slate-400" },
                    { rank: "3rd Place", name: "M. Saanvika", details: "ECE-B • Roll No: 24071A04B3 • ₹700", trophyColor: "text-amber-800" },
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
            </motion.div>
          </motion.div>

        </section>

        {/* REGISTRATION SECTION */}
        <section id="registration" className="w-full flex flex-col items-center pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: BUTTERY_EASE, delay: 0.1 }}
            className="w-full max-w-[900px] relative"
          >
            {/* Glow effects */}
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-orange-600/15 blur-2xl pointer-events-none" />
            <div className="absolute inset-0 rounded-[28px] shadow-[0_0_60px_rgba(249,115,22,0.25)] pointer-events-none" />

            <div className="relative w-full p-10 md:p-14 rounded-[28px] glass-panel flex flex-col items-center text-center overflow-hidden border border-orange-500/20">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.06)_0%,_transparent_70%)] pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-orange-500/5 blur-[80px] rounded-full pointer-events-none" />

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.3 }}
                className="relative mb-6"
              >
                <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full" />
                <Mic className="w-16 h-16 text-orange-500 relative z-10" strokeWidth={1.5} />
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.4 }}
                className="font-playfair text-3xl sm:text-4xl font-black text-white mb-3 relative z-10"
              >
                Ready to Speak?
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-[#C8D3F5] text-sm sm:text-base max-w-xl leading-relaxed mb-8 relative z-10"
              >
                Lock in your spot and let your voice be heard.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: BUTTERY_EASE, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-3 relative z-10"
              >
                <Link
                  to="/speak-a-thon/register"
                  className="flex items-center justify-center gap-2 px-10 py-4 rounded-full text-white text-sm sm:text-base font-bold tracking-[0.02em] cursor-pointer shadow-[0_4px_30px_rgba(249,115,22,0.45),0_0_60px_rgba(249,115,22,0.2),inset_0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_6px_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3)] transition-all duration-300 hover:scale-105 will-change-transform no-underline"
                  style={{
                    background: "linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FDBA74 100%)",
                  }}
                >
                  <Sparkles size={16} /> Register Now <ChevronRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}