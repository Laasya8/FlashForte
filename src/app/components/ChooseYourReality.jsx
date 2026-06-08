import { Lightbulb, Mic, Palette, Gamepad2, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const events = [
  {
    id: "ideathon",
    title: "IdeaThon",
    desc: "Dive into AI holograms and transparent circuits",
    color: "#EAB308", // Gold
    icon: Lightbulb,
    link: "/ideathon",
  },
  {
    id: "speakathon",
    title: "Speak-A-Thon",
    desc: "Command the glowing stage with your voice",
    color: "#F97316", // Orange
    icon: Mic,
    link: "/speak-a-thon",
  },
  {
    id: "designathon",
    title: "Design-A-Thon",
    desc: "Float through UI/UX wireframes and digital art",
    color: "#22C55E", // Green
    icon: Palette,
    link: "/design-a-thon",
  },
  {
    id: "gameathon",
    title: "Game-A-Thon",
    desc: "Enter retro neon gaming paradise, more text here",
    color: "#A855F7", // Purple
    icon: Gamepad2,
    link: "/game-a-thon",
  },
];

export function ChooseYourReality() {
  return (
    <section className="relative z-10 w-full max-w-[1400px] mx-auto px-5 py-16 lg:py-24 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12 lg:mb-16"
      >
        <h2 className="font-orbitron text-[clamp(28px,5vw,42px)] font-black text-[#F8FAFC] tracking-[0.05em] uppercase mb-4 text-glow">
          Choose Your Reality
        </h2>
        <p className="text-[#C8D3F5] text-[clamp(14px,2vw,17px)]">
          Each portal leads to a unique dimension of innovation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full max-w-[1000px]">
        {events.map((event, index) => {
          const Icon = event.icon;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={event.link}
                className="group relative flex flex-row items-center gap-6 p-6 lg:p-8 rounded-[24px] transition-all duration-500 hover:-translate-y-1 no-underline overflow-hidden border border-white/5 bg-[#050816]/40"
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
                  className="absolute inset-0 rounded-[24px] border-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ borderColor: `${event.color}40`, boxShadow: `inset 0 0 20px ${event.color}05` }}
                />

                {/* Hexagon Icon Container */}
                <div className="relative shrink-0 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
                  {/* Hexagon SVG Background */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_var(--event-color)] opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    <polygon points="50 3 93 25 93 75 50 97 7 75 7 25" fill="none" stroke={event.color} strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" />
                    <polygon points="50 8 88 28 88 72 50 92 12 72 12 28" fill={`${event.color}10`} stroke={event.color} strokeWidth="1.5" />
                  </svg>
                  <Icon size={32} color={event.color} className="relative z-10 drop-shadow-[0_0_8px_var(--event-color)] group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="flex flex-col text-left z-10 flex-1 justify-center">
                  <h3 className="font-orbitron text-[22px] sm:text-[26px] font-bold text-white mb-2 tracking-[0.02em]">
                    {event.title}
                  </h3>
                  <p className="text-[#94A3B8] text-[14px] sm:text-[15px] mb-4 leading-[1.6]">
                    {event.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[14px] font-bold transition-colors duration-300 group-hover:text-white" style={{ color: event.color }}>
                    Explore Reality <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
