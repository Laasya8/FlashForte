import { Menu, ChevronRight, X } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   Phase 3: Navbar Dropdown — T=1.8s
   As the left-side components settle, the nav frames the
   page. Drops from translateY: -100% over 1.2s with the
   custom cubic-bezier(0.16, 1, 0.3, 1) "buttery" curve.
   ═══════════════════════════════════════════════════════════ */
const BUTTERY_EASE = [0.16, 1, 0.3, 1];

const navbarVariants = {
  hidden: { opacity: 0, y: "-100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: BUTTERY_EASE,
      delay: 1.8, // Phase 3 starts at T=1.8s
    },
  },
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
      <motion.nav
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 md:py-4 w-full glass-nav will-change-[transform,opacity]"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left logos */}
        <div className="flex items-center gap-4">
          <a href="https://vnrvjiet.ac.in" target="_blank" rel="noopener noreferrer">
            <img
              src="/vnrlogo.png"
              alt="VNRVJIET"
              className="h-10 md:h-12 object-contain rounded-sm transition duration-300 hover:scale-105"
            />
          </a>

          <a href="https://www.vnrvjietcsi.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/csilogo.png"
              alt="CSI-VNRVJIET"
              className="h-12 md:h-14 object-contain rounded-sm transition duration-300 hover:scale-105"
            />
          </a>
        </div>

        {/* Center Links (Desktop Only) */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-10 text-[#7E89A8] text-[13px] font-semibold tracking-[0.02em]">
          <Link to="/" className="relative text-[#FFFFFF] transition-colors no-underline">
            Home
            <div className="absolute -bottom-[6px] left-0 w-full h-[2px] bg-[#4EBBFF] rounded-[2px] shadow-[0_0_8px_rgba(78,187,255,0.5)]" />
          </Link>
          <Link to="/ideathon" className="hover:text-[#FFFFFF] transition-colors no-underline">IdeaThon</Link>
          <Link to="/game-a-thon" className="hover:text-[#FFFFFF] transition-colors no-underline">Game-A-Thon</Link>
          <Link to="/speak-a-thon" className="hover:text-[#FFFFFF] transition-colors no-underline">Speak-A-Thon</Link>
          <Link to="/design-a-thon" className="hover:text-[#FFFFFF] transition-colors no-underline">Design-A-Thon</Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            to="/registration-test"
            className="flex items-center gap-1 font-semibold rounded-full px-4 py-2 text-sm btn-outline-glow no-underline cursor-pointer"
          >
            Register <ChevronRight size={12} />
          </Link>
          
          {/* Hamburger Menu Toggle */}
          <div 
            className="lg:hidden flex items-center p-1 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={22} color="#FFFFFF" />
            ) : (
              <Menu size={22} color="#FFFFFF" />
            )}
          </div>
        </div>
      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden absolute left-0 top-full w-full transition-all duration-300 ease-in-out overflow-hidden glass-menu ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        style={{
          maxHeight: isMobileMenuOpen ? "400px" : "0px",
        }}
      >
        <div className="flex flex-col items-center py-6 gap-5 text-[#7E89A8] text-[15px] font-semibold tracking-[0.02em]">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="relative text-[#FFFFFF] transition-colors no-underline">
            Home
            <div className="absolute -bottom-[4px] left-0 w-full h-[2px] bg-[#4EBBFF] rounded-[2px] shadow-[0_0_8px_rgba(78,187,255,0.5)]" />
          </Link>
          <Link to="/ideathon" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFFFFF] transition-colors no-underline">IdeaThon</Link>
          <Link to="/game-a-thon" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFFFFF] transition-colors no-underline">Game-A-Thon</Link>
          <Link to="/speak-a-thon" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFFFFF] transition-colors no-underline">Speak-A-Thon</Link>
          <Link to="/design-a-thon" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFFFFF] transition-colors no-underline">Design-A-Thon</Link>
        </div>
      </div>
    </motion.nav>
  );
}
