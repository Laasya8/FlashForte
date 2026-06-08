import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle2, Loader2 } from "lucide-react";

export function RegistrationFormEmbed() {
  const [loadCount, setLoadCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleIframeLoad = () => {
    // The first load (loadCount === 0) is the initial form rendering.
    // The second load (loadCount === 1) is the redirect to the Thank You page after submission.
    if (loadCount === 1) {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setLoadCount((prev) => prev + 1);
  };

  if (isSubmitted) {
    return (
      <div className="w-full mx-auto flex flex-col items-center justify-center p-8 md:p-16 text-center max-w-[800px] glass-card mt-10">
        <CheckCircle2 size={64} color="#42B7FF" className="mb-6" />
        <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4 font-orbitron">
          Registration Complete!
        </h2>
        <p className="text-[#C8D3F5] mb-8 max-w-md">
          Thank you for registering for FlashForte 2K26. Your response has been successfully recorded.
        </p>
        <Link
          to="/"
          className="bg-gradient-to-r from-[#8F6BFF] via-[#42B7FF] to-[#3FE0FF] text-[#F8FAFC] border-none rounded-[50px] px-8 py-3 font-bold no-underline inline-block shadow-[0_4px_24px_rgba(66,183,255,0.4)] transition-transform duration-200 hover:scale-105"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto max-w-[800px] glass-card">
      <div className="w-full rounded-lg bg-transparent relative">
        {loadCount === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 min-h-screen">
            <Loader2 className="w-12 h-12 text-[#42B7FF] animate-spin mb-4" />
            <p className="text-[#C8D3F5] font-medium animate-pulse font-orbitron">
              Loading Form...
            </p>
          </div>
        )}
        {/* Replace the src with your actual Google Form Embed URL */}
        <iframe
          onLoad={handleIframeLoad}
          src="https://docs.google.com/forms/d/e/1FAIpQLSc1XjIFlHs-UnHzQ4pf_Gt98oJmY_hg3mdTZAYGPaVnOJ2_CQ/viewform?embedded=true"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Registration Form"
          scrolling="auto"
          className="border-none block min-h-screen"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
