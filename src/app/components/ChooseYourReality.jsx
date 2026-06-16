import { Lightbulb, Mic, Palette, Gamepad2, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const events = [
  {
    id: "ideathon",
    title: "IdeaThon",
    desc: "THINK . IDEATE . PITCH",
    color: "#EAB308", // Gold
    icon: Lightbulb,
    link: "/ideathon",
  },
  {
    id: "speakathon",
    title: "Speak-A-Thon",
    desc: "WHERE CONFIDENCE FINDS ITS VOICE",
    color: "#F97316", // Orange
    icon: Mic,
    link: "/speak-a-thon",
  },
  {
    id: "designathon",
    title: "Design-A-Thon",
    desc: "Design. Create. Elevate.",
    color: "#22C55E", // Green
    icon: Palette,
    link: "/design-a-thon",
  },
  {
    id: "gameathon",
    title: "Game-A-Thon",
    desc: "Compete. Collaborate. Conquer.",
    color: "#A855F7", // Purple
    icon: Gamepad2,
    link: "/game-a-thon",
  },
];

export function ChooseYourReality() {
  return (
    <section id="choose-your-reality" className="relative z-10 w-full max-w-[1400px] mx-auto px-4 py-12 sm:py-16 lg:py-24 flex flex-col items-center scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-8 sm:mb-12 lg:mb-16"
      >
        <h2 className="font-orbitron text-[clamp(24px,5vw,42px)] font-black text-[#F8FAFC] tracking-[0.05em] uppercase mb-2 sm:mb-4 text-glow">
          Choose Your Reality
        </h2>
        <p className="text-[#C8D3F5] text-[clamp(13px,2vw,17px)]">
          Each portal leads to a unique dimension of innovation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full max-w-[1000px]">
        {events.map((event, index) => {
          const Icon = event.icon;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={event.link}
                className="group relative flex flex-row items-center gap-5 sm:gap-6 p-5 sm:p-6 lg:p-8 rounded-[20px] sm:rounded-[24px] transition-all duration-500 hover:-translate-y-1 no-underline overflow-hidden border border-white/5 bg-[#050816]/40"
                style={{
                  "--event-color": event.color,
                }}
              >
                {/* Hover Glow Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 0% 50%, ${event.color}15 0%, transparent 60%)`
                  }}
                />
                
                {/* Border Hover Effect overlay */}
                <div 
                  className="absolute inset-0 rounded-[20px] sm:rounded-[24px] border-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ borderColor: `${event.color}40`, boxShadow: `inset 0 0 20px ${event.color}05` }}
                />

                {/* Hexagon Icon Container */}
                <div className="relative shrink-0 flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24">
                  {/* Hexagon SVG Background */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_var(--event-color)] opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    <polygon points="50 3 93 25 93 75 50 97 7 75 7 25" fill="none" stroke={event.color} strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" />
                    <polygon points="50 8 88 28 88 72 50 92 12 72 12 28" fill={`${event.color}10`} stroke={event.color} strokeWidth="1.5" />
                  </svg>
                  <Icon color={event.color} className="relative z-10 drop-shadow-[0_0_8px_var(--event-color)] group-hover:scale-110 transition-transform duration-500 w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <div className="flex flex-col text-left z-10 flex-1 justify-center">
                  <h3 className="font-orbitron font-black uppercase tracking-[0.05em] text-[16px] sm:text-[26px] text-[#F8FAFC] text-glow mb-1 sm:mb-2 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-[#94A3B8] text-[13px] sm:text-[15px] mb-2 sm:mb-4 leading-tight sm:leading-[1.6]">
                    {event.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[13px] sm:text-[14px] font-bold transition-colors duration-300 group-hover:text-white" style={{ color: event.color }}>
                    Explore Reality <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
