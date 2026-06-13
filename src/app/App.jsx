import { Routes, Route } from "react-router";
import { ScrollToTop } from "./components/ScrollToTop.jsx";
import { LandingPage } from "./components/LandingPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { IdeaThonPage } from "./pages/IdeaThonPage.jsx";
import { GameAThonPage } from "./pages/GameAThonPage.jsx";
import { SpeakAThonPage } from "./pages/SpeakAThonPage.jsx";
import { DesignAThonPage } from "./pages/DesignAThonPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { TestPage } from "./pages/TestPage.jsx";
import { ForteFormPage } from "./components/form/ForteFormPage.jsx";
import { ideathonConfig } from "./components/form/configs/ideathonConfig.jsx";
import { designathonConfig } from "./components/form/configs/designathonConfig.jsx";
import { gameathonConfig } from "./components/form/configs/gameathonConfig.jsx";
import { speakathonConfig } from "./components/form/configs/speakathonConfig.jsx";
import { Navbar } from "./components/Navbar.jsx";

export default function App() {
  return (
    <>
      <div className="fixed inset-0 bg-[#050816] -z-50 pointer-events-none" />
      <ScrollToTop />
      <div className="min-h-[100dvh] w-full max-w-[100vw] flex flex-col relative">
        <Navbar />
        <div className="flex-1 w-full max-w-[100vw] overflow-x-clip relative flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/ideathon" element={<IdeaThonPage />} />
          <Route path="/game-a-thon" element={<GameAThonPage />} />
          <Route path="/speak-a-thon" element={<SpeakAThonPage />} />
          <Route path="/design-a-thon" element={<DesignAThonPage />} />

          {/* Ideathon Routes */}
          <Route path="/ideathon/register" element={<ForteFormPage config={ideathonConfig.register} themeColor={ideathonConfig.themeColor} />} />
          <Route path="/ideathon/submit" element={<ForteFormPage config={ideathonConfig.submit} themeColor={ideathonConfig.themeColor} />} />
          <Route path="/ideathon/feedback" element={<ForteFormPage config={ideathonConfig.feedback} themeColor={ideathonConfig.themeColor} />} />

          {/* Designathon Routes */}
          <Route path="/design-a-thon/register" element={<ForteFormPage config={designathonConfig.register} themeColor={designathonConfig.themeColor} />} />
          <Route path="/design-a-thon/submit" element={<ForteFormPage config={designathonConfig.submit} themeColor={designathonConfig.themeColor} />} />
          <Route path="/design-a-thon/feedback" element={<ForteFormPage config={designathonConfig.feedback} themeColor={designathonConfig.themeColor} />} />

          {/* Gameathon Routes */}
          <Route path="/game-a-thon/register" element={<ForteFormPage config={gameathonConfig.register} themeColor={gameathonConfig.themeColor} />} />
          <Route path="/game-a-thon/submit" element={<ForteFormPage config={gameathonConfig.submit} themeColor={gameathonConfig.themeColor} />} />
          <Route path="/game-a-thon/feedback" element={<ForteFormPage config={gameathonConfig.feedback} themeColor={gameathonConfig.themeColor} />} />

          {/* Speakathon Routes */}
          <Route path="/speak-a-thon/register" element={<ForteFormPage config={speakathonConfig.register} themeColor={speakathonConfig.themeColor} />} />
          <Route path="/speak-a-thon/submit" element={<ForteFormPage config={speakathonConfig.submit} themeColor={speakathonConfig.themeColor} />} />
          <Route path="/speak-a-thon/feedback" element={<ForteFormPage config={speakathonConfig.feedback} themeColor={speakathonConfig.themeColor} />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
    </>
  );
}
