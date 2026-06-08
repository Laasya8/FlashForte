import { RegistrationFormEmbed } from "../components/RegistrationFormEmbed.jsx";

export function RegistrationTestPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-space-radial font-inter">
      <main className="flex flex-col items-center w-full px-0 md:px-8 pt-8 pb-16 mx-auto max-w-[1200px]">
        <h1 className="font-orbitron text-[clamp(32px,6vw,48px)] font-black text-[#F8FAFC] text-center tracking-[0.04em] mb-3 drop-shadow-[0_0_20px_rgba(66,183,255,0.4)]">
          Registration Test
        </h1>
        
        <p className="text-[#C8D3F5] text-[clamp(14px,2.5vw,16px)] text-center mb-8 leading-relaxed max-w-[600px]">
          This page is being used to test the registration experience.
        </p>

        <RegistrationFormEmbed />
      </main>
    </div>
  );
}
