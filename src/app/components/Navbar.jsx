import { Menu, ChevronDown, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import vnrLogo from "../../images/vnrlogo.webp";
import csiLogo from "../../images/csilogo.webp";

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
      type: "spring",
      stiffness: 80,
      damping: 20,
      delay: 0.8,
    },
  },
};

const NAV_LINKS = [
  { path: "/", label: "Home", color: "#4EBBFF" },
  { path: "/ideathon", label: "IdeaThon", color: "#EAB308" },
  { path: "/game-a-thon", label: "Game-A-Thon", color: "#A855F7" },
  { path: "/speak-a-thon", label: "Speak-A-Thon", color: "#F97316" },
  { path: "/design-a-thon", label: "Design-A-Thon", color: "#22C55E" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsRegisterOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsRegisterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      <motion.nav
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 md:py-4 w-full glass-nav will-change-[transform,opacity]"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left logos */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          <a href="https://vnrvjiet.ac.in" target="_blank" rel="noopener noreferrer" className="flex items-center shrink-0">
            <img
              src={vnrLogo}
              alt="VNRVJIET"
              className="w-auto h-auto max-w-[140px] sm:max-w-[200px] md:max-w-none max-h-9 sm:max-h-10 md:max-h-12 object-contain rounded-sm transition duration-300 hover:scale-105"
            />
          </a>

          <a href="https://www.vnrvjietcsi.com" target="_blank" rel="noopener noreferrer" className="flex items-center shrink-0">
            <img
              src={csiLogo}
              alt="CSI-VNRVJIET"
              className="w-auto h-auto max-w-[40px] sm:max-w-[56px] md:max-w-none max-h-10 sm:max-h-12 md:max-h-14 object-contain rounded-sm transition duration-300 hover:scale-105"
            />
          </a>
        </div>

        {/* Center Links (Desktop Only) */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-10 text-[#7E89A8] text-[13px] font-semibold tracking-[0.02em]">
          {NAV_LINKS.map((link) => {
            const isActive = path === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`relative transition-colors no-underline ${isActive ? 'text-[#FFFFFF]' : 'hover:text-[#FFFFFF]'}`}
              >
                {link.label}
                {isActive && (
                  <div 
                    className="absolute -bottom-[6px] left-0 w-full h-[2px] rounded-[2px]"
                    style={{ backgroundColor: link.color, boxShadow: `0 0 8px ${link.color}80` }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setIsRegisterOpen(!isRegisterOpen);
                if (!isRegisterOpen) setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-1 font-semibold rounded-full px-4 py-2 text-sm btn-outline-glow cursor-pointer border-none bg-transparent"
              style={{ border: "1px solid rgba(255, 255, 255, 0.15)" }}
            >
              Register <ChevronDown size={14} className={`transition-transform duration-300 ${isRegisterOpen ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {isRegisterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
                  style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.95), rgba(10,10,15,0.98))", backdropFilter: "blur(16px)" }}
                >
                  <Link to="/ideathon/register" className="px-4 py-2.5 text-[13px] font-semibold text-white/70 hover:text-[#EAB308] hover:bg-white/5 transition-colors no-underline">Ideathon</Link>
                  <Link to="/design-a-thon/register" className="px-4 py-2.5 text-[13px] font-semibold text-white/70 hover:text-[#22C55E] hover:bg-white/5 transition-colors no-underline">Design-A-Thon</Link>
                  <Link to="/speak-a-thon/register" className="px-4 py-2.5 text-[13px] font-semibold text-white/70 hover:text-[#F97316] hover:bg-white/5 transition-colors no-underline">Speak-A-Thon</Link>
                  <Link to="/game-a-thon/register" className="px-4 py-2.5 text-[13px] font-semibold text-white/70 hover:text-[#A855F7] hover:bg-white/5 transition-colors no-underline">Game-A-Thon</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Hamburger Menu Toggle */}
          <div 
            className="lg:hidden flex items-center p-1 cursor-pointer"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (!isMobileMenuOpen) setIsRegisterOpen(false);
            }}
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
          {NAV_LINKS.map((link) => {
            const isActive = path === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`relative transition-colors no-underline ${isActive ? 'text-[#FFFFFF]' : 'hover:text-[#FFFFFF]'}`}
              >
                {link.label}
                {isActive && (
                  <div 
                    className="absolute -bottom-[4px] left-0 w-full h-[2px] rounded-[2px]"
                    style={{ backgroundColor: link.color, boxShadow: `0 0 8px ${link.color}80` }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
