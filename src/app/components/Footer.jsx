import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative z-10 w-full">
      {/* Top decorative border */}
      <div
        className="w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(143, 107, 255, 0.4) 30%, rgba(63, 224, 255, 0.4) 70%, transparent 100%)",
        }}
      />

      <motion.div
        className="w-full max-w-[1400px] mx-auto px-5 flex flex-col items-center justify-center"
        style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Branding */}
        <h2
          className="font-orbitron text-[clamp(24px,5vw,40px)] font-black tracking-[0.08em] m-0 leading-none text-center"
          style={{ color: "#FFFFFF" }}
        >
          FLASHFORTE 2K26
        </h2>

        {/* Subtext */}
        <p className="text-[clamp(11px,1.8vw,14px)] mt-4 text-center leading-[1.6] tracking-[0.02em]" style={{ color: "#FFFFFF" }}>
          © FlashForte 2k26. All rights reserved. | One Event. Many Realities.
        </p>
      </motion.div>
    </footer>
  );
}
