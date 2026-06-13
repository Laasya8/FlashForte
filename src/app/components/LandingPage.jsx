import { StarField } from "./StarField.jsx";
import { HeroSection } from "./HeroSection.jsx";
import { CursorTrail } from "./CursorTrail.jsx";
import { ChooseYourReality } from "./ChooseYourReality.jsx";
import { RealitiesArchive } from "./RealitiesArchive.jsx";
import { PreviousYearHighlights } from "./PreviousYearHighlights.jsx";
import { ScheduleCards } from "./ScheduleCards.jsx";
import { Footer } from "./Footer.jsx";

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
