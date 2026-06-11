import { Link } from "react-router";
import { motion } from "framer-motion";

export function NotFoundPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex flex-col justify-center items-center font-inter pt-8 pb-16 px-4 z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center max-w-md w-full bg-[#0A1128]/60 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10"
      >
        <h1 className="font-orbitron text-[clamp(80px,12vw,120px)] font-black text-[#F8FAFC] text-center tracking-[0.04em] mb-2 drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]">
          404
        </h1>
        <h2 className="text-[#C8D3F5] text-[clamp(20px,3vw,28px)] font-bold text-center mb-4">
          Lost in Space
        </h2>
        <p className="text-[#94A3B8] text-center mb-8 leading-relaxed">
          The route you are trying to reach doesn't exist in our current dimension.
        </p>
        
        <Link 
          to="/"
          className="relative px-8 py-3.5 rounded-full text-white font-semibold transition-all duration-300 bg-gradient-to-r from-[#1D4ED8] to-[#06B6D4] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:-translate-y-1"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
}
