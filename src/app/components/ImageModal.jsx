import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function ImageModal({ isOpen, onClose, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#050816]/95 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <div className="absolute top-8 left-0 w-full text-center text-[#94A3B8] text-[10px] sm:text-xs tracking-[0.2em] uppercase font-orbitron pointer-events-none z-[1001]">
            Click anywhere outside to close
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center pointer-events-none w-[600px] aspect-video sm:aspect-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* The children will be the zoomed content */}
            <div className="pointer-events-auto w-full h-full flex items-center justify-center">
                {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
