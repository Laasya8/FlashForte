import { Menu, ChevronRight, X } from "lucide-react";
import { useLocation, Link } from "react-router";
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
      duration: 1.0,
      ease: BUTTERY_EASE,
      delay: 1.0,
    },
  },
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActiveRoute = (path) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath === path || (path === "/speak-a-thon" && currentPath === "/speakathon");
  };

  const getLinkClass = (path) => {
    const isActive = isActiveRoute(path);
    return `relative transition-colors no-underline ${isActive ? 'text-[#FFFFFF]' : 'text-[#7E89A8] hover:text-[#FFFFFF]'}`;
  };

  const ActiveUnderline = ({ isMobile = false, path = "" }) => {
    const isSpeakathon = path === "/speak-a-thon" || path === "/speakathon";
    const bgClass = isSpeakathon ? "bg-[#F97316]" : "bg-[#4EBBFF]";
    const shadowClass = isSpeakathon ? "shadow-[0_0_8px_rgba(249,115,22,0.6)]" : "shadow-[0_0_8px_rgba(78,187,255,0.5)]";
    return (
      <div className={`absolute left-0 w-full h-[2px] ${bgClass} rounded-[2px] ${shadowClass} ${isMobile ? '-bottom-[4px]' : '-bottom-[6px]'}`} />
    );
  };

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
        <div className="hidden lg:flex flex-1 justify-center items-center gap-10 text-[13px] font-semibold tracking-[0.02em]">
          <Link to="/" className={getLinkClass("/")}>
            Home
            {isActiveRoute("/") && <ActiveUnderline path="/" />}
          </Link>
          <Link to="/ideathon" className={getLinkClass("/ideathon")}>
            IdeaThon
            {isActiveRoute("/ideathon") && <ActiveUnderline path="/ideathon" />}
          </Link>
          <Link to="/game-a-thon" className={getLinkClass("/game-a-thon")}>
            Game-A-Thon
            {isActiveRoute("/game-a-thon") && <ActiveUnderline path="/game-a-thon" />}
          </Link>
          <Link to="/speak-a-thon" className={getLinkClass("/speak-a-thon")}>
            Speak-A-Thon
            {isActiveRoute("/speak-a-thon") && <ActiveUnderline path="/speak-a-thon" />}
          </Link>
          <Link to="/design-a-thon" className={getLinkClass("/design-a-thon")}>
            Design-A-Thon
            {isActiveRoute("/design-a-thon") && <ActiveUnderline path="/design-a-thon" />}
          </Link>
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
        <div className="flex flex-col items-center py-6 gap-5 text-[15px] font-semibold tracking-[0.02em]">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass("/")}>
            Home
            {isActiveRoute("/") && <ActiveUnderline isMobile={true} path="/" />}
          </Link>
          <Link to="/ideathon" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass("/ideathon")}>
            IdeaThon
            {isActiveRoute("/ideathon") && <ActiveUnderline isMobile={true} path="/ideathon" />}
          </Link>
          <Link to="/game-a-thon" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass("/game-a-thon")}>
            Game-A-Thon
            {isActiveRoute("/game-a-thon") && <ActiveUnderline isMobile={true} path="/game-a-thon" />}
          </Link>
          <Link to="/speak-a-thon" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass("/speak-a-thon")}>
            Speak-A-Thon
            {isActiveRoute("/speak-a-thon") && <ActiveUnderline isMobile={true} path="/speak-a-thon" />}
          </Link>
          <Link to="/design-a-thon" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass("/design-a-thon")}>
            Design-A-Thon
            {isActiveRoute("/design-a-thon") && <ActiveUnderline isMobile={true} path="/design-a-thon" />}
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
