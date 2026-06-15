import { CustomForm } from "./CustomForm.jsx";
import { Footer } from "../Footer.jsx";

/**
 * Converts a hex color string (e.g. "#EAB308") to an "r, g, b" string
 * for use in CSS rgba() via var(--theme-color-rgb).
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0, 0, 0";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

export function ForteFormPage({ config, themeColor }) {
  if (!config) {
    return (
      <div className="neon-form-page">
        <h2 className="text-white text-2xl">Form Not Found</h2>
      </div>
    );
  }

  const themeRgb = hexToRgb(themeColor);

  return (
    <div
      className="neon-form-page"
      style={{
        "--theme-color": themeColor,
        "--theme-color-rgb": themeRgb,
      }}
    >
      {/* ── Atmospheric Energy Swirls (page background) ──── */}
      <div className="neon-swirl-wrapper" aria-hidden="true">
        <div className="neon-swirl" />
        <div className="neon-swirl neon-swirl--inner" />
      </div>

      {/* ── Content Column ──────────────────────── */}
      <div className="neon-form-page__content">
        {/* Branding Header */}
        <header className="neon-branding">
          <h1 className="neon-branding__logo">
            FLASH<span className="neon-branding__accent">FORTE</span> 2K26
          </h1>
        </header>

        {/* Form Card */}
        <CustomForm {...config} themeColor={themeColor} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
