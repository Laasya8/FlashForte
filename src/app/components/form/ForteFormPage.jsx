import { CustomForm } from "./CustomForm.jsx";
import { Footer } from "../Footer.jsx";

export function ForteFormPage({ config, themeColor }) {
  if (!config) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-space-radial">
        <h2 className="text-white text-2xl">Form Not Found</h2>
      </div>
    );
  }

  return (
    <div className="relative flex-1 w-full flex flex-col items-center bg-space-radial font-inter pt-20">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="bg-planet-top-right" />
        <div className="bg-planet-left" />
        <div className="bg-ambient-depth" />
      </div>

      <div className="relative z-10 w-full max-w-[600px] mx-auto px-4 flex-1 mb-8">
        <CustomForm {...config} themeColor={themeColor} />
      </div>

      <Footer />
    </div>
  );
}
