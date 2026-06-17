import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ImageModal } from "./ImageModal.jsx";

const archivePosters = [
  {
    id: "speakathon",
    color: "#22C55E", // Green
  },
  {
    id: "gameathon",
    color: "#A855F7", // Purple
  },
  {
    id: "designathon",
    color: "#F97316", // Orange
  },
  {
    id: "ideathon",
    color: "#EAB308", // Gold
  },
];

export function RealitiesArchive() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScroll = () => {
    if (!carouselRef.current || !isMobile) return;
    const container = carouselRef.current;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    const items = container.querySelectorAll('.archive-carousel-item');
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
    }
  };

  return (
    <section className="relative z-10 w-full py-16 lg:py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12 px-5"
      >
        <h2 className="font-orbitron text-[clamp(24px,4vw,36px)] font-black text-[#F8FAFC] tracking-[0.08em] uppercase mb-3 text-glow">
          Realities Archive
        </h2>
        <p className="text-[#C8D3F5] text-[clamp(14px,2vw,16px)]">
          A glimpse into the realms we've explored
        </p>
      </motion.div>

      <div className="relative max-w-[1400px] mx-auto">
        {/* Swipe Left Text */}
        {isMobile && (
          <div className="text-center text-[#94A3B8]/70 text-[11px] font-orbitron uppercase tracking-widest mb-2 mt-4">
            <ArrowLeft size={12} className="inline mb-0.5 opacity-50" /> <span className="mx-1">SWIPE</span> <ArrowRight size={12} className="inline mb-0.5 opacity-50" />
          </div>
        )}

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className={`flex gap-4 lg:gap-8 overflow-x-auto hide-scrollbar py-10 w-full perspective-1000 ${isMobile ? "snap-x snap-mandatory" : "justify-center px-4"}`}
          style={{ 
            paddingLeft: isMobile ? "calc(50vw - 120px)" : undefined,
            paddingRight: isMobile ? "calc(50vw - 120px)" : undefined,
          }}
        >
          {archivePosters.map((poster, index) => {
            const distance = index - activeIndex;
            const rotateY = isMobile ? (distance === 0 ? 0 : distance > 0 ? -25 : 25) : 0;
            const scale = isMobile ? (distance === 0 ? 1 : 0.85) : 1;
            const opacity = isMobile ? (distance === 0 ? 1 : 0.7) : 1;
            const zIndex = isMobile ? (distance === 0 ? 10 : 0) : 1;

            return (
              <motion.div
                key={poster.id}
                initial={!isMobile ? { opacity: 0, scale: 0.9 } : false}
                whileInView={!isMobile ? { opacity: 1, scale: 1 } : undefined}
                viewport={{ once: true, amount: 0.2 }}
                animate={isMobile ? { rotateY, scale, opacity, zIndex } : { zIndex: 1, rotateY: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => setZoomedImage(poster)}
                className={`archive-carousel-item shrink-0 lg:w-[320px] aspect-[297/420] rounded-[20px] relative group cursor-pointer preserve-3d ${isMobile ? "snap-center w-[240px]" : "w-[280px]"}`}
              >
                {/* Holographic Panel Background / Image Placeholder */}
                <div 
                  className="absolute inset-0 rounded-[20px] glass-card overflow-hidden transition-all duration-500 lg:group-hover:scale-[1.02] lg:group-hover:-translate-y-2 flex items-center justify-center"
                  style={{
                    borderColor: `${poster.color}40`,
                    boxShadow: `0 10px 40px -10px ${poster.color}30, inset 0 0 20px ${poster.color}10`,
                  }}
                >
                  <span className="text-[#94A3B8]/40 font-orbitron text-sm tracking-widest uppercase">Poster Image</span>
                  {/* Glowing Overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, transparent 0%, ${poster.color}20 100%)`
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ImageModal isOpen={!!zoomedImage} onClose={() => setZoomedImage(null)}>
        {zoomedImage && (
          <div 
            className="w-full max-w-[400px] aspect-[297/420] rounded-[20px] glass-card overflow-hidden flex items-center justify-center relative"
            style={{
              borderColor: `${zoomedImage.color}40`,
              boxShadow: `0 10px 40px -10px ${zoomedImage.color}30, inset 0 0 20px ${zoomedImage.color}10`,
            }}
          >
            <span className="text-[#94A3B8]/40 font-orbitron text-lg tracking-widest uppercase">Poster Image</span>
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, transparent 0%, ${zoomedImage.color}20 100%)`
              }}
            />
          </div>
        )}
      </ImageModal>
    </section>
  );
}
