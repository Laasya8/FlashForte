import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Trophy, Lightbulb, Gamepad2, Palette, Mic, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";

const highlightData = [
  {
    id: "ideathon",
    title: "IdeaThon",
    year: "2025",
    navDesc: "Innovate groundbreaking solutions to real challenges.",
    color: "#EAB308", // Gold
    icon: Lightbulb,
    participants: "90+",
    images: [
      "/ideathon-1.jpg", // We will use placeholders or empty divs if these don't exist
      "/ideathon-2.jpg",
      "/ideathon-3.jpg",
    ],
    highlights: [
      "50+ innovative ideas pitched",
      "Across multiple tech domains",
      "Top 3 teams won exciting prizes",
      "Internship opportunities for winners",
    ],
    winners: [
      "1st Place - Code Crafters",
      "2nd Place - Innovators Hub",
      "3rd Place - Future Founders",
    ]
  },
  {
    id: "gameathon",
    title: "Game-A-Thon",
    year: "2025",
    navDesc: "Showcase gaming skills in electrifying battles.",
    color: "#A855F7", // Purple
    icon: Gamepad2,
    participants: "120+",
    images: [],
    highlights: [
      "120+ gamers registered",
      "Valorant & BGMI tournaments",
      "Live streamed finals",
      "Exclusive gaming gear prizes",
    ],
    winners: [
      "1st Place - Team Phoenix",
      "2nd Place - AimBots",
      "3rd Place - Ghost Riders",
    ]
  },
  {
    id: "designathon",
    title: "Design-A-Thon",
    year: "2025",
    navDesc: "Craft stunning visuals and intuitive experiences.",
    color: "#22C55E", // Green
    icon: Palette,
    participants: "70+",
    images: [],
    highlights: [
      "24-hour UI/UX challenge",
      "Real-world problem statements",
      "Mentorship from industry experts",
      "Prototyping tools sponsored",
    ],
    winners: [
      "1st Place - Pixel Perfect",
      "2nd Place - Creative Minds",
      "3rd Place - Vector Valley",
    ]
  },
  {
    id: "speakathon",
    title: "Speak-A-Thon",
    year: "2025",
    navDesc: "Command the stage with persuasive power.",
    color: "#F97316", // Orange
    icon: Mic,
    participants: "40+",
    images: [],
    highlights: [
      "Extempore & prepared speeches",
      "Judged by Toastmasters experts",
      "Topics ranging from AI to ethics",
      "Confidence building workshops",
    ],
    winners: [
      "1st Place - Sarah Jenkins",
      "2nd Place - Rahul Sharma",
      "3rd Place - Emily Chen",
    ]
  }
];

function MobileImageGallery({ activeEvent }) {
  const carouselRef = useRef(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;
    const items = container.querySelectorAll('.gallery-carousel-item');
    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.clientWidth / 2;
      const distance = Math.abs(scrollCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    if (closestIndex !== activeImgIndex) setActiveImgIndex(closestIndex);
  };

  return (
    <div className="mb-10 -mx-6 perspective-1000">
      <div 
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory py-4"
        style={{
          paddingLeft: "calc(50vw - 120px)",
          paddingRight: "calc(50vw - 120px)"
        }}
      >
        {[1, 2, 3].map((_, index) => {
          const distance = index - activeImgIndex;
          const rotateY = distance === 0 ? 0 : distance > 0 ? -25 : 25;
          const scale = distance === 0 ? 1 : 0.85;
          const opacity = distance === 0 ? 1 : 0.7;
          const zIndex = distance === 0 ? 10 : 0;

          return (
            <motion.div
              key={index}
              animate={{ rotateY, scale, opacity, zIndex }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="gallery-carousel-item snap-center shrink-0 w-[240px] aspect-video rounded-xl overflow-hidden relative bg-white/5 border border-white/10 group preserve-3d"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-20 transition-opacity">
                <activeEvent.icon size={48} color={activeEvent.color} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function PreviousYearHighlights() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navCarouselRef = useRef(null);
  const programmaticScroll = useRef(false);
  
  const activeEvent = highlightData[activeIndex];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && navCarouselRef.current) {
      const container = navCarouselRef.current;
      const items = container.querySelectorAll('.nav-carousel-item');
      if (items[activeIndex]) {
        programmaticScroll.current = true;
        const scrollLeft = items[activeIndex].offsetLeft - container.clientWidth / 2 + items[activeIndex].clientWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        setTimeout(() => {
          programmaticScroll.current = false;
        }, 500);
      }
    }
  }, [activeIndex, isMobile]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % highlightData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNavScroll = () => {
    if (!navCarouselRef.current || !isMobile || programmaticScroll.current) return;
    const container = navCarouselRef.current;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;
    const items = container.querySelectorAll('.nav-carousel-item');
    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.clientWidth / 2;
      const distance = Math.abs(scrollCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
      setIsAutoPlaying(false);
    }
  };

  const handleTabClick = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative z-10 w-full px-5 pt-16 pb-12 lg:pt-24 lg:pb-16 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12 lg:mb-16"
      >
        <h2 className="font-orbitron text-[clamp(24px,4vw,36px)] font-black text-[#F8FAFC] tracking-[0.08em] uppercase mb-3 text-glow">
          Previous Year Highlights
        </h2>
        <p className="text-[#C8D3F5] text-[clamp(14px,2vw,16px)]">
          Relive the magic of FlashForte's legendary moments
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Navigation */}
        <div className="w-full lg:w-[320px] shrink-0">
          <div className="text-[#C8D3F5] font-orbitron font-bold text-xl mb-6 hidden lg:block">2025</div>
          
          {/* Swipe Text */}
          {isMobile && (
            <div className="text-center text-[#94A3B8]/70 text-[11px] font-orbitron uppercase tracking-widest mb-4 lg:hidden">
              <ArrowLeft size={12} className="inline mb-0.5 opacity-50" /> <span className="mx-1">SWIPE</span> <ArrowRight size={12} className="inline mb-0.5 opacity-50" />
            </div>
          )}

          {/* Mobile horizontal scroll / Desktop vertical list */}
          <div 
            ref={navCarouselRef}
            onScroll={handleNavScroll}
            className={`flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar perspective-1000 ${isMobile ? "snap-x snap-mandatory" : ""}`}
            style={{
               paddingLeft: isMobile ? "calc(50vw - 120px)" : undefined,
               paddingRight: isMobile ? "calc(50vw - 120px)" : undefined,
            }}
          >
            {highlightData.map((event, index) => {
              const isActive = index === activeIndex;
              const distance = index - activeIndex;
              const rotateY = isMobile ? (distance === 0 ? 0 : distance > 0 ? -25 : 25) : 0;
              const scale = isMobile ? (distance === 0 ? 1 : 0.85) : 1;
              const opacity = isMobile ? (distance === 0 ? 1 : 0.7) : 1;
              const zIndex = isMobile ? (distance === 0 ? 10 : 0) : 1;
              const Icon = event.icon;

              return (
                <motion.div 
                  key={event.id}
                  onClick={() => handleTabClick(index)}
                  className={`nav-carousel-item relative shrink-0 lg:w-full cursor-pointer group preserve-3d ${isMobile ? "snap-center w-[240px]" : "w-[260px]"}`}
                  animate={isMobile ? { rotateY, scale, opacity, zIndex } : { rotateY: 0, scale: 1, opacity: 1, zIndex: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Desktop Timeline Line */}
                  <div className="hidden lg:block absolute left-[-24px] top-0 bottom-[-16px] w-[2px] bg-white/10 z-0" />
                  
                  {/* Desktop Timeline Dot */}
                  <div 
                    className="hidden lg:block absolute left-[-28px] top-6 w-[10px] h-[10px] rounded-full z-10 transition-all duration-300"
                    style={{ 
                      backgroundColor: isActive ? event.color : '#334155',
                      boxShadow: isActive ? `0 0 10px ${event.color}` : 'none'
                    }} 
                  />

                  <div 
                    className={`p-5 rounded-[16px] transition-all duration-300 border ${isActive ? 'glass-card' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                    style={{ borderColor: isActive ? `${event.color}40` : 'transparent' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? '' : 'bg-white/5'}`}
                        style={{ backgroundColor: isActive ? `${event.color}20` : undefined }}
                      >
                        <Icon size={16} color={isActive ? event.color : '#94A3B8'} />
                      </div>
                      <h4 className="font-orbitron font-bold text-[14px] lg:text-[16px]" style={{ color: isActive ? 'white' : '#94A3B8' }}>
                        {event.title}
                      </h4>
                    </div>
                    <p className={`text-[12px] lg:text-[13px] leading-[1.5] ${isActive ? 'text-[#C8D3F5]' : 'text-[#64748B]'}`}>
                      {event.navDesc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="flex-1 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEvent.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-[24px] p-6 lg:p-10 h-full border-t border-white/10"
              style={{
                boxShadow: `inset 0 0 40px ${activeEvent.color}05, 0 10px 40px -10px rgba(0,0,0,0.5)`,
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6 lg:mb-8 border-b border-white/10 pb-4 lg:pb-6">
                <div className="flex items-center gap-3 lg:gap-4">
                  <activeEvent.icon size={isMobile ? 24 : 32} color={activeEvent.color} style={{ filter: `drop-shadow(0 0 10px ${activeEvent.color}80)` }} />
                  <h3 className="font-orbitron font-black uppercase tracking-[0.05em] text-[20px] sm:text-[24px] lg:text-[28px] text-[#F8FAFC] text-glow">
                    {activeEvent.title} {activeEvent.year}
                  </h3>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-white font-bold text-[18px] sm:text-[20px] lg:text-[24px]">{activeEvent.participants}</div>
                  <div className="text-[#94A3B8] text-[10px] sm:text-[12px] uppercase tracking-wider">Participants</div>
                </div>
              </div>

              {/* Image Gallery Placeholders */}
              {isMobile ? (
                <MobileImageGallery activeEvent={activeEvent} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {[1, 2, 3].map((_, i) => (
                    <div 
                      key={i} 
                      className="aspect-video rounded-xl overflow-hidden relative bg-white/5 border border-white/10 group"
                    >
                      {/* Placeholder content since we don't have images */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                        <activeEvent.icon size={48} color={activeEvent.color} />
                      </div>
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  ))}
                </div>
              )}

              {/* Info Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16">
                {/* Highlights */}
                <div>
                  <h4 className="text-white text-[16px] lg:text-[18px] font-bold mb-3 lg:mb-4">Highlights</h4>
                  <ul className="space-y-2 lg:space-y-3">
                    {activeEvent.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 lg:gap-3 text-[#C8D3F5] text-[12px] lg:text-[14px]">
                        <CheckCircle2 size={16} color={activeEvent.color} className="shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Winners */}
                <div>
                  <h4 className="text-white text-[16px] lg:text-[18px] font-bold mb-3 lg:mb-4">Winners</h4>
                  <ul className="space-y-3 lg:space-y-4">
                    {activeEvent.winners.map((winner, i) => {
                      const isFirst = i === 0;
                      const isSecond = i === 1;
                      const isThird = i === 2;
                      const trophyColor = isFirst ? "#FBBF24" : isSecond ? "#94A3B8" : "#B45309";
                      
                      return (
                        <li key={i} className="flex items-center gap-3 p-2 lg:p-3 rounded-lg bg-white/5 border border-white/5">
                          <Trophy size={isMobile ? 16 : 20} color={trophyColor} />
                          <span className="text-white text-[12px] lg:text-[14px] font-medium">{winner}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* View All CTA */}
              <div className="mt-8 lg:mt-10 flex justify-center">
                <button className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 rounded-full btn-outline-glow text-xs lg:text-sm font-semibold">
                  View All Highlights <ChevronRight size={16} />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
    </section>
  );
}
