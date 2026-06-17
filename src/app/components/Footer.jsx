import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative z-10 w-full">
      {/* Top decorative border */}
      <div
        className="w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(143, 107, 255, 0.4) 30%, rgba(0, 168, 232, 0.4) 70%, transparent 100%)",
        }}
      />

      <div
        className="w-full max-w-[1400px] mx-auto px-5 flex flex-col items-center justify-center pt-12 pb-8"
      >
        {/* Branding */}
        <h2
          className="font-orbitron text-[clamp(20px,3vw,32px)] font-black text-[#F8FAFC] tracking-[0.08em] text-glow m-0 leading-none text-center"
        >
          FLASHFORTE 2k26
        </h2>

        {/* Subtext */}
        <p className="text-[#C8D3F5] text-[clamp(11px,1.8vw,14px)] mt-4 text-center leading-[1.6] tracking-[0.02em]">
          © FlashForte 2k26. All rights reserved. <br/> One Event. Many Realities.
        </p>
      </div>
    </footer>
  );
}
