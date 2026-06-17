import { MapPin, Wifi, Calendar } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer.jsx";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";


/* ═══════════════════════════════════════════════════════════
   PortalVideo — right-column portal
   ═══════════════════════════════════════════════════════════ */
function PortalVideo({ children, className = "" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center aspect-square mx-auto my-0 md:my-4 w-full max-w-[clamp(340px,85vw,600px)] lg:max-w-none lg:w-full ${className}`}
    >
      <div className="absolute rounded-full blur-[20px] md:blur-[40px] mix-blend-screen z-0 inset-[-15%] bg-portal-glow-outer" />
      <div className="absolute inset-0 rounded-full blur-[10px] md:blur-[20px] mix-blend-screen z-0 bg-portal-glow-inner" />
      <video
        ref={videoRef}
        src="/Portal Animation.webm"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover drop-shadow-[0_0_30px_rgba(181,141,255,0.4)] portal-mask"
      />
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
const PHASE3_DURATION = 1.2;

const portalVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: BUTTERY_EASE,
      delay: 0,
    },
  },
};

const animCSI = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, delay: 0.2, ease: BUTTERY_EASE } },
};
const animTitle = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, delay: 0.4, ease: BUTTERY_EASE } },
};
const animYear = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.0, delay: 0.6, ease: BUTTERY_EASE } },
};
const animLine = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 1.0, delay: 0.6, ease: BUTTERY_EASE } },
};
const animBlock = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, delay: 1.0, ease: BUTTERY_EASE } },
};
const animBtn = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 1.2
    } 
  },
};

/* ═══════════════════════════════════════════════════════════
   HeroSection Component
   ═══════════════════════════════════════════════════════════ */
export function HeroSection() {
  const [entranceComplete, setEntranceComplete] = useState(false);

  return (
    <div className="relative z-10 flex flex-col w-full max-w-[1400px] mx-auto px-5 pt-4 md:pt-8 lg:pt-6 pb-8 lg:pb-6 min-h-[calc(100dvh-80px)] lg:min-h-0">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
      

      <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start w-full">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LEFT COLUMN — Phase 2: Staggered Content Reveal
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="contents lg:relative lg:flex lg:flex-col lg:items-center lg:w-[40%] lg:max-w-[560px] text-center lg:pl-12"
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setEntranceComplete(true)}
      >
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            Ambient Particle System (Responsive Outer Edge bounds)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="order-0 absolute inset-0 pointer-events-none z-[0] lg:z-[-1] opacity-100" style={{ contain: 'layout' }}>
          {/* Purple Orb - Upper Left on Mobile / Mid Left (Close) on Desktop */}
          <motion.div
            className="absolute top-[20%] left-[10%] lg:top-[70%] lg:left-[10%] rounded-full bg-[#FFFFFF]"
            style={{ width: "4px", height: "4px", boxShadow: "0 0 15px 4px #A855F7, 0 0 30px 8px #A855F7", willChange: "transform" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, 20, 0, -20, 0], y: [0, -15, 0, 15, 0] }}
            transition={{ opacity: { duration: 2, delay: 0.2 }, default: { duration: 25, repeat: Infinity, ease: "linear" } }}
          />
          {/* Gold Orb - Upper Right on Mobile / Top Right on Desktop */}
          <motion.div
            className="absolute top-[18%] right-[10%] lg:top-[35%] lg:right-[10%] rounded-full bg-[#FFFFFF]"
            style={{ width: "4px", height: "4px", boxShadow: "0 0 15px 4px #EAB308, 0 0 30px 8px #EAB308", willChange: "transform" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, -25, 0, 25, 0], y: [0, 20, 0, -20, 0] }}
            transition={{ opacity: { duration: 2, delay: 0.4 }, default: { duration: 28, repeat: Infinity, ease: "linear" } }}
          />
          {/* Green Orb - Lower Left on Mobile / Bottom Right on Desktop */}
          <motion.div
            className="absolute bottom-[42%] left-[10%] lg:bottom-[20%] lg:left-auto lg:right-[15%] rounded-full bg-[#FFFFFF]"
            style={{ width: "4px", height: "4px", boxShadow: "0 0 15px 4px #22C55E, 0 0 30px 8px #22C55E", willChange: "transform" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, 15, 0, -15, 0], y: [0, 25, 0, -25, 0] }}
            transition={{ opacity: { duration: 2, delay: 0.6 }, default: { duration: 30, repeat: Infinity, ease: "linear" } }}
          />
          {/* Orange Orb - Lower Right on Mobile / Mid Left (Far) on Desktop */}
          <motion.div
            className="absolute bottom-[40%] right-[10%] lg:bottom-auto lg:top-[40%] lg:right-auto lg:left-[5%] rounded-full bg-[#FFFFFF]"
            style={{ width: "4px", height: "4px", boxShadow: "0 0 15px 4px #F97316, 0 0 30px 8px #F97316", willChange: "transform" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, -20, 0, 20, 0], y: [0, -20, 0, 20, 0] }}
            transition={{ opacity: { duration: 2, delay: 0.8 }, default: { duration: 26, repeat: Infinity, ease: "linear" } }}
          />
        </div>
        <motion.div
          className="order-1 flex justify-center items-center gap-1 mb-3 lg:mt-4 w-full text-[10px] text-[#C8D3F5]"
          variants={animCSI}
        >
          <span className="whitespace-nowrap font-semibold tracking-[0.02em] text-[clamp(10px,2vw,12px)]">
            Computer Society of India, VNRVJIET
          </span>
        </motion.div>

        <motion.h1
          className="order-2 font-orbitron text-[clamp(38px,7vw,65px)] font-black text-[#F8FAFC] tracking-[0.06em] text-glow m-0 leading-[1.05] animate-title-glow"
          style={{ animationPlayState: entranceComplete ? 'running' : 'paused' }}
          variants={animTitle}
        >
          FLASHFORTE
        </motion.h1>

        <motion.div
          className="order-3 flex justify-center items-center gap-[clamp(8px,2vw,16px)] w-full font-orbitron text-[clamp(26px,5vw,48px)] font-black tracking-[0.12em] mt-0 mb-2 lg:mb-0"
        >
          <div className="flex items-center gap-[6px]">
            <motion.div className="divider-line-left" variants={animLine} />
            <motion.div className="divider-circle-left" variants={animYear} />
          </div>

          <motion.span 
            variants={animYear} 
            className="text-transparent bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] animate-text-gradient"
            style={{ animationPlayState: entranceComplete ? 'running' : 'paused' }}
          >
            2k26
          </motion.span>

          <div className="flex items-center gap-[6px]">
            <motion.div className="divider-circle-right" variants={animYear} />
            <motion.div className="divider-line-right" variants={animLine} />
          </div>
        </motion.div>

        <div className="order-5 relative w-full flex flex-col items-center">

          <motion.p
            className="w-full mt-4 mb-2 lg:mt-16 lg:mb-8 font-orbitron font-black text-[#F8FAFC] text-[clamp(20px,4vw,32px)] tracking-[0.05em] text-glow leading-[1.3] relative z-10"
            variants={animBlock}
          >
            One Event.{" "}
            <span 
              className="text-transparent bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] animate-text-gradient"
              style={{ animationPlayState: entranceComplete ? 'running' : 'paused' }}
            >
              Many Realities.
            </span>
          </motion.p>

          <motion.p
            className="w-full mx-auto mb-8 lg:mb-16 text-[#C8D3F5] text-[clamp(14px,2vw,17px)] leading-[1.6] max-w-[480px] relative z-10"
            variants={animBlock}
          >
            Step into a universe of ideas, innovation,
            <br />
            games, voices, and designs.
            <br />
            Where imagination meets impact.
          </motion.p>
        </div>

        <div className="order-7 relative w-full flex justify-center mb-8 lg:mb-8">
          <motion.div variants={animBtn} className="w-full max-w-[320px] relative z-10">
            <button
              onClick={() => document.getElementById('choose-your-reality')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 w-full px-10 py-4 rounded-[50px] border-none text-[#FFFFFF] text-[clamp(15px,2vw,17px)] font-bold tracking-[0.02em] cursor-pointer no-underline shadow-[0_4px_30px_rgba(0,119,182,0.3),inset_0_0_15px_rgba(143,107,255,0.5)] [text-shadow:0_1px_2px_rgba(0,0,0,0.8)] animate-cta-gradient"
              style={{ animationPlayState: entranceComplete ? 'running' : 'paused' }}
            >
              <span className="text-[12px]">✦</span> Enter the Multiverse <span className="text-[12px]">✦</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          RIGHT COLUMN — Phase 1: Portal Fade-In
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="order-4 lg:order-none lg:w-[55%] flex justify-center lg:justify-end -mt-2 -mb-2 lg:-mt-16 lg:mb-0 w-full relative lg:translate-x-12 lg:-translate-y-8 will-change-opacity"
        variants={portalVariants}
        initial="hidden"
        animate="visible"
      >
        <PortalVideo className="w-[110%] lg:w-[120%]" />
      </motion.div>
      </div>

      <motion.div
        className="flex w-full mx-auto justify-center mt-6 lg:mt-6 z-20"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Unified Date/Venue + Timer Container */}
        <div
          className="glass-timer-card flex flex-col items-center gap-4 lg:gap-8 px-8 py-5 lg:px-16 lg:py-8 animate-card-levitate"
          style={{ animationPlayState: entranceComplete ? 'running' : 'paused' }}
        >
          {/* Date & Venue Ribbon */}
          <div className="flex items-center gap-2 sm:gap-5 lg:gap-10">
            {/* Left: Date */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="flex flex-col text-right">
                <span className="font-orbitron text-glow text-[#F8FAFC] text-[12px] sm:text-[14px] lg:text-[18px] font-black uppercase whitespace-nowrap tracking-[0.05em] leading-tight">
                  June 29 – 30, 2026
                </span>
                <span className="text-2k26-gradient text-[9px] sm:text-[11px] lg:text-[13px] font-semibold uppercase whitespace-nowrap tracking-[0.06em] leading-tight mt-[4px]">
                  Monday & Tuesday
                </span>
              </div>
              <div className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-[#60A5FA]/20 to-[#22D3EE]/20 border border-[#22D3EE]/40 shrink-0">
                <Calendar size={12} className="sm:w-[14px] sm:h-[14px] lg:w-[18px] lg:h-[18px]" color="#ffffffff" />
              </div>
            </div>

            {/* Center Divider */}
            <div className="w-[1px] h-[32px] lg:h-[48px] shrink-0 bg-white/15" />

            {/* Right: Venue */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-[#60A5FA]/20 to-[#22D3EE]/20 border border-[#22D3EE]/40 shrink-0">
                <Wifi size={12} className="sm:w-[14px] sm:h-[14px] lg:w-[18px] lg:h-[18px]" color="#ffffffff" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-orbitron text-glow text-[#F8FAFC] text-[12px] sm:text-[14px] lg:text-[18px] font-black uppercase whitespace-nowrap tracking-[0.05em] leading-tight">
                  Online
                </span>
                <span className="text-2k26-gradient text-[9px] sm:text-[11px] lg:text-[13px] font-semibold uppercase whitespace-nowrap tracking-[0.06em] leading-tight mt-[4px]">
                  Virtual Event
                </span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mt-1 lg:mt-3 lg:scale-125 lg:mb-2 transform origin-top">
            <CountdownTimer />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
