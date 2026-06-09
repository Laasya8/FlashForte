import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const SCHEDULE_DATA = [
  {
    day: "Day 1",
    date: "June 26",
    events: [
      { name: "Speak-A-Thon", time: "9:00 AM - 1:00 PM", icon: "🎤" },
      { name: "Game-A-Thon", time: "2:00 PM - 5:00 PM", icon: "🎮" },
    ],
  },
  {
    day: "Day 2",
    date: "June 27",
    events: [
      { name: "Design-A-Thon", time: "9:00 AM - 1:00 PM", icon: "🎨" },
      { name: "IdeaThon", time: "2:00 PM - 5:00 PM", icon: "💡" },
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
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-orbitron text-[clamp(24px,4vw,36px)] font-bold text-[#F8FAFC] text-glow">
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
        viewport={{ once: true, margin: "-80px" }}
      >
        {SCHEDULE_DATA.map((day) => (
          <motion.div
            key={day.day}
            className="schedule-card flex-1 glass-card rounded-[20px] p-0 overflow-hidden cursor-default"
            variants={cardVariants}
            whileHover={{
              y: -6,
              boxShadow: "0 8px 40px rgba(143, 107, 255, 0.2), 0 0 60px rgba(143, 107, 255, 0.08)",
              borderColor: "rgba(143, 107, 255, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Card header */}
            <div
              className="px-6 py-5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(143, 107, 255, 0.15) 0%, rgba(63, 224, 255, 0.08) 100%)",
                borderBottom: "1px solid rgba(143, 107, 255, 0.15)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-orbitron text-[clamp(16px,3vw,20px)] font-bold text-[#F8FAFC] m-0 leading-tight">
                    {day.day}
                  </h3>
                  <span className="text-[#C8D3F5] text-[13px] mt-1 block">{day.date}</span>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(143, 107, 255, 0.15)",
                    border: "1px solid rgba(143, 107, 255, 0.3)",
                  }}
                >
                  <Clock size={18} color="#8F6BFF" />
                </div>
              </div>
            </div>

            {/* Events list */}
            <div className="px-6 py-5 flex flex-col gap-4">
              {day.events.map((event, idx) => (
                <div
                  key={event.name}
                  className="flex items-start gap-3 group"
                >
                  <div
                    className="text-[20px] w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
                    style={{
                      background:
                        idx === 0
                          ? "rgba(143, 107, 255, 0.1)"
                          : "rgba(63, 224, 255, 0.1)",
                      border: `1px solid ${idx === 0 ? "rgba(143, 107, 255, 0.2)" : "rgba(63, 224, 255, 0.2)"}`,
                    }}
                  >
                    {event.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#F8FAFC] text-[15px] font-semibold leading-tight">
                      {event.name}
                    </div>
                    <div
                      className="text-[13px] mt-[3px] font-medium"
                      style={{
                        color: idx === 0 ? "#A678FF" : "#3FE0FF",
                      }}
                    >
                      {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
