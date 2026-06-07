import { Menu, ChevronRight, X } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 md:py-4 w-full transition-all duration-300"
        style={{ 
          background: "rgba(5, 8, 22, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(166, 120, 255, 0.15)",
        }}
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
        <div className="hidden lg:flex flex-1 justify-center items-center gap-10" style={{ color: "#7E89A8", fontSize: "13px", fontWeight: 600, letterSpacing: "0.02em" }}>
          <Link to="/" className="relative text-[#FFFFFF] transition-colors" style={{ textDecoration: "none" }}>
            Home
            <div style={{ position: "absolute", bottom: "-6px", left: "0", width: "100%", height: "2px", background: "#4EBBFF", borderRadius: "2px", boxShadow: "0 0 8px rgba(78,187,255,0.5)" }} />
          </Link>
          <Link to="/ideathon" className="hover:text-[#FFFFFF] transition-colors" style={{ textDecoration: "none" }}>IdeaThon</Link>
          <Link to="/game-a-thon" className="hover:text-[#FFFFFF] transition-colors" style={{ textDecoration: "none" }}>Game-A-Thon</Link>
          <Link to="/speak-a-thon" className="hover:text-[#FFFFFF] transition-colors" style={{ textDecoration: "none" }}>Speak-A-Thon</Link>
          <Link to="/design-a-thon" className="hover:text-[#FFFFFF] transition-colors" style={{ textDecoration: "none" }}>Design-A-Thon</Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            to="/registration-test"
            className="flex items-center gap-1 font-semibold rounded-full px-4 py-2 text-sm"
            style={{
              background: "transparent",
              color: "#ffffffff",
              border: "1px solid rgba(63,224,255,0.6)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textDecoration: "none",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(66,183,255,0.1)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(66,183,255,0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
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
        className={`lg:hidden absolute left-0 w-full transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        style={{
          top: "100%", // Starts exactly below the navbar
          background: "rgba(5, 8, 22, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(166, 120, 255, 0.15)",
          maxHeight: isMobileMenuOpen ? "400px" : "0px",
        }}
      >
        <div className="flex flex-col items-center py-6 gap-5" style={{ color: "#7E89A8", fontSize: "15px", fontWeight: 600, letterSpacing: "0.02em" }}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="relative text-[#FFFFFF] transition-colors" style={{ textDecoration: "none" }}>
            Home
            <div style={{ position: "absolute", bottom: "-4px", left: "0", width: "100%", height: "2px", background: "#4EBBFF", borderRadius: "2px", boxShadow: "0 0 8px rgba(78,187,255,0.5)" }} />
          </Link>
          <Link to="/ideathon" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFFFFF] transition-colors" style={{ textDecoration: "none" }}>IdeaThon</Link>
          <Link to="/game-a-thon" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFFFFF] transition-colors" style={{ textDecoration: "none" }}>Game-A-Thon</Link>
          <Link to="/speak-a-thon" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFFFFF] transition-colors" style={{ textDecoration: "none" }}>Speak-A-Thon</Link>
          <Link to="/design-a-thon" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFFFFF] transition-colors" style={{ textDecoration: "none" }}>Design-A-Thon</Link>
        </div>
      </div>
    </nav>
  );
}
