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
      <div 
        className="w-full mx-auto flex flex-col items-center justify-center p-8 md:p-16 text-center"
        style={{
          maxWidth: "800px",
          background: "rgba(5, 8, 22, 0.6)",
          border: "1px solid rgba(143, 107, 255, 0.3)",
          borderRadius: "16px",
          boxShadow: "0 0 30px rgba(143, 107, 255, 0.05)",
          backdropFilter: "blur(12px)",
          marginTop: "40px",
        }}
      >
        <CheckCircle2 size={64} color="#42B7FF" className="mb-6" />
        <h2 
          className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4" 
          style={{ fontFamily: "'Orbitron', 'Inter', sans-serif" }}
        >
          Registration Complete!
        </h2>
        <p className="text-[#C8D3F5] mb-8 max-w-md">
          Thank you for registering for FlashForte 2K26. Your response has been successfully recorded.
        </p>
        <Link
          to="/"
          style={{
            background: "linear-gradient(90deg, #8F6BFF 0%, #42B7FF 50%, #3FE0FF 100%)",
            color: "#F8FAFC",
            border: "none",
            borderRadius: "50px",
            padding: "12px 32px",
            fontWeight: 700,
            textDecoration: "none",
            display: "inline-block",
            boxShadow: "0 4px 24px rgba(66,183,255,0.4)",
            transition: "transform 0.2s ease",
          }}
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div 
      className="w-full mx-auto"
      style={{
        maxWidth: "800px",
        background: "rgba(5, 8, 22, 0.6)",
        border: "1px solid rgba(143, 107, 255, 0.3)",
        borderRadius: "16px",
        boxShadow: "0 0 30px rgba(143, 107, 255, 0.05)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div 
        style={{
          width: "100%",
          borderRadius: "8px",
          background: "transparent",
          position: "relative",
        }}
      >
        {loadCount === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10" style={{ minHeight: "100vh" }}>
            <Loader2 className="w-12 h-12 text-[#42B7FF] animate-spin mb-4" />
            <p className="text-[#C8D3F5] font-medium animate-pulse" style={{ fontFamily: "'Orbitron', 'Inter', sans-serif" }}>
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
          style={{ border: "none", display: "block", minHeight: "100vh" }}
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
