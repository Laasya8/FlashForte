import { Routes, Route } from "react-router";
import { HeroPage } from "./components/HeroPage.jsx";
import { RegistrationTestPage } from "./pages/RegistrationTestPage.jsx";
import { IdeaThonPage } from "./pages/IdeaThonPage.jsx";
import { GameAThonPage } from "./pages/GameAThonPage.jsx";
import { SpeakAThonPage } from "./pages/SpeakAThonPage.jsx";
import { DesignAThonPage } from "./pages/DesignAThonPage.jsx";
import { Navbar } from "./components/Navbar.jsx";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#050816] flex flex-col">
      <Navbar />
      <div className="flex-1 w-full relative">
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/registration-test" element={<RegistrationTestPage />} />
          <Route path="/ideathon" element={<IdeaThonPage />} />
          <Route path="/game-a-thon" element={<GameAThonPage />} />
          <Route path="/speak-a-thon" element={<SpeakAThonPage />} />
          <Route path="/design-a-thon" element={<DesignAThonPage />} />
        </Routes>
      </div>
    </div>
  );
}
