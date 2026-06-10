import { RegistrationFormEmbed } from "../components/RegistrationFormEmbed.jsx";

/**
 * Primary Registration Page — Google Forms Iframe Embed
 * This is the production registration flow. No custom JS intercepts.
 * The headless Apps Script engine lives exclusively on RegistrationTestPage.
 */
export function RegisterPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-space-radial font-inter">
      <main className="flex flex-col items-center w-full px-0 md:px-8 pt-8 pb-16 mx-auto max-w-[1200px]">
        <h1 className="font-orbitron text-[clamp(32px,6vw,48px)] font-black text-[#F8FAFC] text-center tracking-[0.04em] mb-3 drop-shadow-[0_0_20px_rgba(0, 119, 182,0.4)]">
          Registration
        </h1>
        
        <p className="text-[#C8D3F5] text-[clamp(14px,2.5vw,16px)] text-center mb-8 leading-relaxed max-w-[600px]">
          Register for FlashForte 2K26 using the form below.
        </p>

        <RegistrationFormEmbed />
      </main>
    </div>
  );
}
