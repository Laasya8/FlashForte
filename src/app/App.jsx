import { Routes, Route } from "react-router";
import { ScrollToTop } from "./components/ScrollToTop.jsx";
import { LandingPage } from "./components/LandingPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { IdeaThonPage } from "./pages/IdeaThonPage.jsx";
import { GameAThonPage } from "./pages/GameAThonPage.jsx";
import { SpeakAThonPage } from "./pages/SpeakAThonPage.jsx";
import { DesignAThonPage } from "./pages/DesignAThonPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { Navbar } from "./components/Navbar.jsx";

export default function App() {
  return (
    <>
      <div className="fixed inset-0 bg-[#050816] -z-50 pointer-events-none" />
      <ScrollToTop />
      <div className="min-h-[100dvh] w-full max-w-[100vw] flex flex-col relative">
        <Navbar />
        <div className="flex-1 w-full max-w-[100vw] overflow-x-clip relative">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/ideathon" element={<IdeaThonPage />} />
          <Route path="/game-a-thon" element={<GameAThonPage />} />
          <Route path="/speak-a-thon" element={<SpeakAThonPage />} />
          <Route path="/design-a-thon" element={<DesignAThonPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
    </>
  );
}
