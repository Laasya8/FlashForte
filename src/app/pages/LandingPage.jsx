import { StarField } from "../components/StarField.jsx";
import { HeroSection } from "../components/HeroSection.jsx";
import { CursorTrail } from "../components/CursorTrail.jsx";
import { ChooseYourReality } from "../components/ChooseYourReality.jsx";
import { RealitiesArchive } from "../components/RealitiesArchive.jsx";
import { PreviousYearHighlights } from "../components/PreviousYearHighlights.jsx";
import { ScheduleCards } from "../components/ScheduleCards.jsx";
import { Footer } from "../components/Footer.jsx";

export function LandingPage() {
  return (
    <div className="relative w-full overflow-x-hidden flex flex-col font-inter">
      <CursorTrail trailLength={8} colorRgb={[78, 187, 255]} />
      {/* 
        Fixed backgrounds for continuous journey 
        Moving the radial gradient and starfield here to cover the whole page.
      */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-space-radial" />
      
      {/* Background decorations - migrated to CSS classes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="bg-planet-left" />
        <div className="bg-ambient-depth" />
      </div>

      <StarField />

      <HeroSection />
      
      <ChooseYourReality />
      <RealitiesArchive />
      <PreviousYearHighlights />
      <ScheduleCards />
      <Footer />
    </div>
  );
}
