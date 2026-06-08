import { StarField } from "./HeroSection.jsx"; // We will export StarField from HeroSection or move it
import { HeroSection } from "./HeroSection.jsx";
import { ChooseYourReality } from "./ChooseYourReality.jsx";
import { RealitiesArchive } from "./RealitiesArchive.jsx";
import { PreviousYearHighlights } from "./PreviousYearHighlights.jsx";

export function LandingPage() {
  return (
    <div className="relative w-full max-w-[100vw] overflow-x-hidden flex flex-col font-inter bg-[#050816]">
      {/* 
        Fixed backgrounds for continuous journey 
        Moving the radial gradient and starfield here to cover the whole page.
      */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-space-radial" />
      
      {/* Background decorations - migrated to CSS classes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="bg-planet-top-right" />
        <div className="bg-planet-left" />
        <div className="bg-ambient-depth" />
      </div>

      <StarField />

      <HeroSection />
      
      <ChooseYourReality />
      <RealitiesArchive />
      <PreviousYearHighlights />
    </div>
  );
}
