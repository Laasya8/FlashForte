import { motion } from "framer-motion";
import { Clock, Mic, Gamepad2, Palette, Lightbulb } from "lucide-react";

const SCHEDULE_DATA = [
  {
    day: "Day 1",
    date: "June 26",
    events: [
      { name: "Speak-A-Thon", time: "9:00 AM - 1:00 PM", icon: Mic, color: "#F97316" },
      { name: "Game-A-Thon", time: "2:00 PM - 5:00 PM", icon: Gamepad2, color: "#A855F7" },
    ],
  },
  {
    day: "Day 2",
    date: "June 27",
    events: [
      { name: "Design-A-Thon", time: "9:00 AM - 1:00 PM", icon: Palette, color: "#22C55E" },
      { name: "IdeaThon", time: "2:00 PM - 5:00 PM", icon: Lightbulb, color: "#EAB308" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ScheduleCards() {
  return (
    <section className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pt-10 pb-16 lg:pt-14 lg:pb-24">
      {/* Section header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-orbitron text-[clamp(24px,4vw,36px)] font-black uppercase tracking-[0.05em] text-[#F8FAFC] text-glow">
          The Multiverse Awaits
        </h2>
        <p className="text-[#C8D3F5] text-[clamp(13px,2vw,15px)] mt-2 max-w-md mx-auto">
          Two days. Four dimensions. One unforgettable journey.
        </p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        className="flex flex-col md:flex-row gap-6 lg:gap-8 justify-center items-stretch max-w-[900px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SCHEDULE_DATA.map((day) => (
          <motion.div
            key={day.day}
            className="bg-[#050816]/40 border border-white/5 flex-1 w-full shrink-0 flex flex-col overflow-hidden rounded-[24px]"
            variants={cardVariants}
            whileHover={{
              y: -6,
              boxShadow: "0 8px 40px rgba(6, 182, 212, 0.15), 0 0 60px rgba(6, 182, 212, 0.05)",
              borderColor: "rgba(255, 255, 255, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Card header */}
            <div
              className="px-6 py-5 border-b border-white/5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, transparent 100%)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-orbitron text-[clamp(16px,3vw,20px)] font-black uppercase tracking-[0.05em] text-[#F8FAFC] text-glow m-0 leading-tight">
                    {day.day}
                  </h3>
                  <span className="text-[#C8D3F5] text-[13px] mt-1 block">{day.date}</span>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#06B6D4]/15 border border-[#06B6D4]/30"
                >
                  <Clock size={18} color="#06B6D4" />
                </div>
              </div>
            </div>

            {/* Events list */}
            <div className="px-6 py-5 flex flex-col gap-4">
              {day.events.map((event, idx) => {
                const Icon = event.icon;
                return (
                <div
                  key={event.name}
                  className="flex items-start gap-3 group"
                >
                  <div
                    className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
                    style={{
                      background: `${event.color}15`,
                      border: `1px solid ${event.color}40`,
                    }}
                  >
                    <Icon size={20} color={event.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#F8FAFC] text-[15px] font-semibold leading-tight">
                      {event.name}
                    </div>
                    <div
                      className="text-[13px] mt-[3px] font-medium"
                      style={{
                        color: event.color,
                      }}
                    >
                      {event.time}
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
