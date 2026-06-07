import { RegistrationFormEmbed } from "../components/RegistrationFormEmbed.jsx";

export function RegistrationTestPage() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center"
      style={{
        background: "radial-gradient(ellipse 120% 60% at 50% 0%, #0B1120 0%, #050816 45%, #030712 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <main 
        className="flex flex-col items-center w-full px-0 md:px-8 pt-8 pb-16 mx-auto"
        style={{
          maxWidth: "1200px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Orbitron', 'Inter', sans-serif",
            fontSize: "clamp(32px, 6vw, 48px)",
            fontWeight: 900,
            color: "#F8FAFC",
            textAlign: "center",
            letterSpacing: "0.04em",
            marginBottom: "12px",
            textShadow: "0 0 20px rgba(66,183,255,0.4)",
          }}
        >
          Registration Test
        </h1>
        
        <p
          style={{
            color: "#C8D3F5",
            fontSize: "clamp(14px, 2.5vw, 16px)",
            textAlign: "center",
            marginBottom: "32px",
            lineHeight: 1.6,
            maxWidth: "600px",
          }}
        >
          This page is being used to test the registration experience.
        </p>

        <RegistrationFormEmbed />
      </main>
    </div>
  );
}
