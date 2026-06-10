import { useState } from "react";
import { motion } from "framer-motion";
import { RegistrationFormEmbed } from "../components/RegistrationFormEmbed.jsx";
import { CustomRegistrationForm } from "../components/CustomRegistrationForm.jsx";

/**
 * Primary Registration Page
 * Allows switching between Google Forms Iframe Embed and Custom Form.
 */
export function RegisterPage() {
  const [method, setMethod] = useState("google");

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-space-radial font-inter">
      <main className="flex flex-col items-center w-full px-4 md:px-8 pt-8 pb-16 mx-auto max-w-[1200px]">
        <h1 className="font-orbitron text-[clamp(32px,6vw,48px)] font-black text-[#F8FAFC] text-center tracking-[0.04em] mb-3 drop-shadow-[0_0_20px_rgba(0, 119, 182,0.4)]">
          Registration
        </h1>
        
        <p className="text-[#C8D3F5] text-[clamp(14px,2.5vw,16px)] text-center mb-8 leading-relaxed max-w-[600px]">
          Register for FlashForte 2K26 using the form below.
        </p>

        {/* Switcher */}
        <div className="flex bg-[#0A1128]/60 backdrop-blur-md rounded-full p-1 mb-8 border border-white/10 relative z-10">
          <button
            onClick={() => setMethod("google")}
            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              method === "google" ? "text-white" : "text-[#C8D3F5] hover:text-white"
            }`}
          >
            {method === "google" && (
              <motion.div
                layoutId="activeFormTab"
                className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8] to-[#06B6D4] rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">Google Form</span>
          </button>
          
          <button
            onClick={() => setMethod("custom")}
            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              method === "custom" ? "text-white" : "text-[#C8D3F5] hover:text-white"
            }`}
          >
            {method === "custom" && (
              <motion.div
                layoutId="activeFormTab"
                className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8] to-[#06B6D4] rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">Custom Form</span>
          </button>
        </div>

        <div className="w-full flex justify-center">
          {method === "google" ? <RegistrationFormEmbed /> : <CustomRegistrationForm />}
        </div>
      </main>
    </div>
  );
}
