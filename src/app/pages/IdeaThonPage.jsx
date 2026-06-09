import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   IDEATHON PAGE — FlashForte 2K26
   Hero mirrors HeroSection.jsx layout exactly:
   left = text stack, right = PortalVideo
   Portal uses same webm + gold CSS color grading
   ───────────────────────────────────────────── */

const DOMAINS = [
  {
    name: "Sustainability & Environment",
    desc: "Innovative solutions for greener living and resource conservation."
  },
  {
    name: "Smart Logistics Solutions",
    desc: "Transform transportation, supply chains, delivery systems, and logistics through innovation."
  },
  {
    name: "Digital Governance",
    desc: "Improve public services, citizen engagement, transparency, and accessibility using technology."
  },
  {
    name: "Disaster Management",
    desc: "Preparedness, response, and recovery through innovation."
  },
  {
    name: "Gaming for Impact",
    desc: "Meaningful games that inspire positive social change."
  },
  {
    name: "Digital Trust & Integrity",
    desc: "Combat misinformation, enhance online safety, and strengthen trust in digital information."
  },
];

const DOMAIN_ICONS = [
  <svg key="ai"     width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="1.4"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/></svg>,
  <svg key="sec"    width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="1.4"><path d="M12 2l8 4v6c0 5-4 9-8 10C8 21 4 17 4 12V6l8-4z"/></svg>,
  <svg key="sus"    width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="1.4"><path d="M2 20s4-8 10-8 10 8 10 8"/><path d="M12 12V4"/><path d="M8 8l4-4 4 4"/></svg>,
  <svg key="health" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="1.4"><path d="M12 21C12 21 4 13.5 4 8a4 4 0 018-1.5A4 4 0 0120 8c0 5.5-8 13-8 13z"/></svg>,
  <svg key="ed"     width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="1.4"><path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M2 8v8l10 5 10-5V8"/></svg>,
  <svg key="fin"    width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="1.4"><rect x="2" y="6" width="20" height="14" rx="1"/><path d="M16 14a2 2 0 100-4 2 2 0 000 4z"/><path d="M6 10h4M6 14h2"/></svg>,
];

/* ── Intersection Observer hook ── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeSection({ children, className = "", delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionHeading({ label, title }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      <p style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "0.7rem",
        letterSpacing: "0.35em",
        color: "#c9a84c",
        textTransform: "uppercase",
        marginBottom: "0.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
      }}>
        <span style={{ display: "inline-block", width: 32, height: 1, background: "linear-gradient(90deg,transparent,#c9a84c)" }} />
        {label}
        <span style={{ display: "inline-block", width: 32, height: 1, background: "linear-gradient(90deg,#c9a84c,transparent)" }} />
      </p>
      <h2 style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
        fontWeight: 700,
        color: "#f5e6c0",
        letterSpacing: "0.05em",
        margin: 0,
        textShadow: "0 0 30px rgba(201,168,76,0.25)",
      }}>
        {title}
      </h2>
    </div>
  );
}

/* ── PortalVideo — mirrors HeroSection.jsx exactly, gold-graded ── */
function PortalVideo({ className = "" }) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.6;
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center aspect-square mx-auto my-0 md:my-4 w-full max-w-[clamp(340px,85vw,600px)] lg:max-w-none lg:w-full ${className}`}
    >
      {/* outer glow — gold hue instead of purple */}
      <div
        className="absolute rounded-full blur-[40px] mix-blend-screen z-0 inset-[-15%]"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.35) 0%, rgba(180,120,20,0.15) 50%, transparent 75%)" }}
      />
      {/* inner glow */}
      <div
        className="absolute inset-0 rounded-full blur-[20px] mix-blend-screen z-0"
        style={{ background: "radial-gradient(circle, rgba(232,201,106,0.25) 0%, rgba(201,168,76,0.1) 60%, transparent 100%)" }}
      />
      {/* portal video — same src & attrs as HeroSection, gold CSS filter */}
      <video
        ref={videoRef}
        src="/Portal Animation.webm"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover portal-mask"
        style={{
          /*
           * Gold color grading:
           *  - sepia(1)          → strips colour, adds warm brown base
           *  - saturate(3)       → punches up the warmth
           *  - hue-rotate(5deg)  → nudges toward amber/gold (not orange)
           *  - brightness(1.05)  → keeps it luminous, not muddy
           *  - contrast(1.1)     → sharpens the glow rings
           *  drop-shadow kept, recoloured gold
           */
          filter: "sepia(1) saturate(3) hue-rotate(5deg) brightness(1.05) contrast(1.1) drop-shadow(0 0 30px rgba(201,168,76,0.5))",
        }}
      />
    </div>
  );
}

export function IdeaThonPage() {
  useEffect(() => {
    document.body.classList.add("ideathon-page-active");
    return () => document.body.classList.remove("ideathon-page-active");
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Navbar tint on this page ── */
        body.ideathon-page-active .glass-nav {
          background: #0a0c0e !important;
          border-bottom: 1px solid rgba(201,168,76,0.14) !important;
          padding: 0.75rem 2rem !important;
          min-height: 4rem !important;
        }
        body.ideathon-page-active .glass-nav > div:last-child {
          margin-right: 0 !important;
        }
        body.ideathon-page-active a[href="/registration-test"] {
          min-width: 140px !important;
          padding: 0.75rem 1.25rem !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        body.ideathon-page-active a[href="/"] > div,
        body.ideathon-page-active a[href="/"]::after {
          opacity: 0 !important;
          width: 0 !important;
          height: 0 !important;
          border: none !important;
          background: transparent !important;
        }
        body.ideathon-page-active a[href="/ideathon"] {
          color: #ffffff !important;
          position: relative !important;
        }
        body.ideathon-page-active a[href="/ideathon"]::after {
          content: "";
          position: absolute;
          left: 0; bottom: -6px;
          width: 100%; height: 2px;
          background: #c9a84c;
          border-radius: 2px;
          box-shadow: 0 0 16px rgba(201,168,76,0.4);
        }

        .ideathon-page {
          background: #0a0c0e;
          color: #f5e6c0;
          min-height: 100vh;
          font-family: 'Rajdhani', sans-serif;
          overflow-x: hidden;
        }

        /* scanlines */
        .ideathon-page::before {
          content: '';
          position: fixed; inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(201,168,76,0.012) 2px, rgba(201,168,76,0.012) 4px
          );
          pointer-events: none; z-index: 0;
        }
        .ideathon-page > * { position: relative; z-index: 1; }

        /* ── buttons ── */
        .btn-gold {
          background: linear-gradient(135deg, #c9a84c, #e8c96a, #c9a84c);
          color: #0a0c0e; border: none;
          padding: 0.8rem 2rem;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.25s ease;
          box-shadow: 0 0 20px rgba(201,168,76,0.3), 0 0 60px rgba(201,168,76,0.1);
        }
        .btn-gold:hover {
          box-shadow: 0 0 30px rgba(201,168,76,0.55), 0 0 80px rgba(201,168,76,0.2);
          transform: translateY(-2px);
        }
        .btn-outline {
          background: transparent; color: #c9a84c;
          border: 1px solid rgba(201,168,76,0.5);
          padding: 0.8rem 2rem;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.25s ease;
        }
        .btn-outline:hover {
          background: rgba(201,168,76,0.08);
          border-color: #c9a84c;
          box-shadow: 0 0 20px rgba(201,168,76,0.2);
          transform: translateY(-2px);
        }

        /* ── round cards ── */
        .round-card {
          background: #0f1114;
          border: 1px solid rgba(201,168,76,0.2);
          border-top: 2px solid #c9a84c;
          padding: 2rem 1.8rem; flex: 1;
          position: relative; overflow: hidden;
          transition: all 0.3s ease;
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
        }
        .round-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 20% 0%, rgba(201,168,76,0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .round-card::after {
          content: ''; position: absolute; top: 0; right: 0;
          width: 16px; height: 16px;
          border-left: 1px solid rgba(201,168,76,0.4);
          border-bottom: 1px solid rgba(201,168,76,0.4);
          pointer-events: none;
        }
        .round-card:hover {
          border-color: rgba(201,168,76,0.5);
          box-shadow: 0 0 30px rgba(201,168,76,0.1), inset 0 0 30px rgba(201,168,76,0.03);
          transform: translateY(-4px);
        }

        /* ── domain cards ── */
        .domain-card {
          background: #0f1114;
          border: 1px solid rgba(201,168,76,0.15);
          padding: 1.6rem 1.4rem;
          position: relative; overflow: hidden;
          transition: all 0.3s ease;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
        }
        .domain-card::after {
          content: ''; position: absolute; top: 0; right: 0;
          width: 12px; height: 12px;
          border-left: 1px solid rgba(201,168,76,0.3);
          border-bottom: 1px solid rgba(201,168,76,0.3);
        }
        .domain-card:hover {
          border-color: rgba(201,168,76,0.4);
          background: #131619;
          box-shadow: 0 0 24px rgba(201,168,76,0.08), inset 0 0 24px rgba(201,168,76,0.03);
          transform: translateY(-3px);
        }
        .domain-card:hover .domain-icon-box {
          box-shadow: 0 0 16px rgba(201,168,76,0.3);
          border-color: rgba(201,168,76,0.6);
        }
        .domain-icon-box {
          width: 44px; height: 44px;
          border: 1px solid rgba(201,168,76,0.3);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem; transition: all 0.3s ease;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
          background: rgba(201,168,76,0.05);
        }

        /* ── gallery ── */
        .photo-slot {
          background: #0f1114;
          border: 1px dashed rgba(201,168,76,0.18);
          display: flex; align-items: center; justify-content: center;
          color: rgba(201,168,76,0.25);
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          transition: border-color 0.3s ease;
          position: relative; overflow: hidden;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }
        .photo-slot:hover { border-color: rgba(201,168,76,0.35); }

        .divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2) 30%, rgba(201,168,76,0.2) 70%, transparent);
          position: relative;
        }
        .divider::after {
          content: '◈'; position: absolute;
          left: 50%; top: 50%; transform: translate(-50%, -50%);
          color: rgba(201,168,76,0.4); font-size: 0.6rem;
          background: #0a0c0e; padding: 0 0.4rem;
        }

        .cyber-tag {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.25rem 0.75rem;
          border: 1px solid rgba(201,168,76,0.3);
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.7rem; letter-spacing: 0.18em;
          color: rgba(201,168,76,0.7); text-transform: uppercase;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }

        @media (max-width: 1024px) {
          .hero-layout { flex-direction: column !important; }
          .hero-left   { width: 100% !important; max-width: 100% !important; padding-left: 0 !important; text-align: center !important; align-items: center !important; }
          .hero-right  { width: 100% !important; justify-content: center !important; transform: none !important; }
          .hero-btns   { justify-content: center !important; }
        }
        @media (max-width: 768px) {
          .rounds-grid  { flex-direction: column !important; }
          .rounds-arrow { display: none !important; }
          .domains-grid { grid-template-columns: 1fr 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .domains-grid { grid-template-columns: 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="ideathon-page">

        {/* ════════════════════════════════════════
            SECTION 1 — HERO  (mirrors HeroSection layout)
        ════════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden" }}>

          {/* subtle grid lines — same as before */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

          {/* ── same wrapper proportions as HeroSection ── */}
          <div
            className="hero-layout"
            style={{
              position: "relative", zIndex: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.05rem 1.25rem 3rem",
              width: "100%",
              maxWidth: 1400,
              margin: "0 auto",
              minHeight: "calc(100dvh - 80px)",
            }}
          >
            {/* ── LEFT COLUMN — text stack ── */}
            <div
              className="hero-left"
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "flex-start",
                width: "40%", maxWidth: 560,
                paddingLeft: "3rem",
              }}
            >
              {/* eyebrow badge */}
              <FadeSection delay={0}>
                <div className="cyber-tag" style={{ marginBottom: "1.6rem" }}>
                  <span style={{ width: 4, height: 4, background: "#c9a84c", display: "inline-block" }} />
                  Computer Society of India · VNRVJIET
                  <span style={{ width: 4, height: 4, background: "#c9a84c", display: "inline-block" }} />
                </div>
              </FadeSection>

              {/* title */}
              <FadeSection delay={80}>
                <h1 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                  fontWeight: 900,
                  color: "#f5e6c0",
                  letterSpacing: "0.08em",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                  textShadow: "0 0 40px rgba(201,168,76,0.35), 0 0 80px rgba(201,168,76,0.12)",
                }}>
                  IDEA<span style={{ color: "#c9a84c" }}>THON</span>
                </h1>
              </FadeSection>

              {/* tagline */}
              <FadeSection delay={140}>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.75rem", letterSpacing: "0.38em",
                  color: "rgba(201,168,76,0.6)",
                  textTransform: "uppercase",
                  marginBottom: "1.4rem", fontWeight: 400,
                }}>
                  Think &nbsp;·&nbsp; Ideate &nbsp;·&nbsp; Pitch
                </p>
              </FadeSection>

              {/* description */}
              <FadeSection delay={180}>
                <p style={{
                  color: "rgba(245,230,192,0.55)",
                  fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                  lineHeight: 1.75, maxWidth: 460,
                  marginBottom: "2.4rem",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 400, letterSpacing: "0.02em",
                }}>
                  Brainstorm, innovate, and present groundbreaking ideas that address real-world problems and create lasting change.
                </p>
              </FadeSection>

              {/* CTA buttons */}
              <FadeSection delay={260}>
                <div
                  className="hero-btns"
                  style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                >
                  <button className="btn-gold">Register Now →</button>
                  <button className="btn-outline">Submit Your Idea</button>
                </div>
              </FadeSection>
            </div>

            {/* ── RIGHT COLUMN — PortalVideo (same structure as HeroSection) ── */}
            <div
              className="hero-right"
              style={{
                width: "55%",
                display: "flex",
                justifyContent: "flex-end",
                /* same offset as HeroSection's lg:translate-x-12 lg:-translate-y-8 */
                transform: "translateX(3rem) translateY(-2rem)",
                position: "relative",
              }}
            >
              {/* TODO: portal video — same component as HeroSection, gold-graded */}
              <PortalVideo className="w-[115%] lg:w-[130%]" />
            </div>

          </div>
        </section>

        <div className="divider" />

        {/* ════════════════════════
            SECTION 2 — ROUNDS
        ════════════════════════ */}
        <section style={{ padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>

            <FadeSection>
              <SectionHeading label="The Journey" title="TWO ROUNDS TO THE STAGE" />
            </FadeSection>

            <div className="rounds-grid" style={{ display: "flex", gap: "1.5rem", alignItems: "stretch" }}>

              <FadeSection style={{ flex: 1 }}>
                <div className="round-card">
                  <div style={{
                    fontFamily: "'Orbitron', sans-serif", fontSize: "5rem", fontWeight: 900,
                    color: "rgba(201,168,76,0.06)", position: "absolute",
                    top: "0.8rem", right: "1.2rem", lineHeight: 1, userSelect: "none",
                  }}>01</div>
                  <div style={{ color: "#c9a84c", marginBottom: "1rem" }}>
                    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: "'Rajdhani'", fontSize: "0.68rem", letterSpacing: "0.25em", color: "rgba(201,168,76,0.5)", textTransform: "uppercase", marginBottom: "0.4rem" }}>Round One</p>
                  <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#f5e6c0", marginBottom: "0.9rem", letterSpacing: "0.06em" }}>PPT SUBMISSION</h3>
                  <p style={{ color: "rgba(245,230,192,0.5)", fontSize: "0.98rem", lineHeight: 1.75, fontFamily: "'Rajdhani'", fontWeight: 400 }}>
                    Present your idea as a structured deck. Cover the problem, your solution, market scope, and a rough implementation plan. Selected teams advance to Round 2.
                  </p>
                  <div style={{ marginTop: "1.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: 24, height: 1, background: "#c9a84c" }} />
                    <span style={{ fontFamily: "'Rajdhani'", fontSize: "0.7rem", letterSpacing: "0.2em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase" }}>Online Submission</span>
                  </div>
                </div>
              </FadeSection>

              <div className="rounds-arrow" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 1, height: 28, background: "linear-gradient(transparent, rgba(201,168,76,0.4))" }} />
                  <span style={{ color: "#c9a84c", fontSize: "1rem", lineHeight: 1 }}>▶</span>
                  <div style={{ width: 1, height: 28, background: "linear-gradient(rgba(201,168,76,0.4), transparent)" }} />
                </div>
              </div>

              <FadeSection delay={150} style={{ flex: 1 }}>
                <div className="round-card">
                  <div style={{
                    fontFamily: "'Orbitron', sans-serif", fontSize: "5rem", fontWeight: 900,
                    color: "rgba(201,168,76,0.06)", position: "absolute",
                    top: "0.8rem", right: "1.2rem", lineHeight: 1, userSelect: "none",
                  }}>02</div>
                  <div style={{ color: "#c9a84c", marginBottom: "1rem" }}>
                    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: "'Rajdhani'", fontSize: "0.68rem", letterSpacing: "0.25em", color: "rgba(201,168,76,0.5)", textTransform: "uppercase", marginBottom: "0.4rem" }}>Round Two</p>
                  <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#f5e6c0", marginBottom: "0.9rem", letterSpacing: "0.06em" }}>IDEA PRESENTATION</h3>
                  <p style={{ color: "rgba(245,230,192,0.5)", fontSize: "0.98rem", lineHeight: 1.75, fontFamily: "'Rajdhani'", fontWeight: 400 }}>
                    Take the stage. Present your solution live to a panel of industry judges. Defend your idea, answer questions, and demonstrate its real-world potential.
                  </p>
                  <div style={{ marginTop: "1.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: 24, height: 1, background: "#c9a84c" }} />
                    <span style={{ fontFamily: "'Rajdhani'", fontSize: "0.7rem", letterSpacing: "0.2em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase" }}>Live Judging</span>
                  </div>
                </div>
              </FadeSection>

            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════════════
            SECTION 3 — DOMAINS
        ════════════════════════ */}
        <section style={{ padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>

            <FadeSection>
              <SectionHeading label="What You Can Build" title="EXPLORE DOMAINS" />
            </FadeSection>

            <div className="domains-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              {DOMAINS.map((domain, i) => (
                <FadeSection key={i} delay={i * 70}>
                  <div className="domain-card">
                    <div className="domain-icon-box">{DOMAIN_ICONS[i]}</div>
                    <h4 style={{
                      fontFamily: "'Orbitron', sans-serif", fontSize: "0.82rem", fontWeight: 700,
                      color: "#f5e6c0", marginBottom: "0.55rem", letterSpacing: "0.06em", textTransform: "uppercase",
                    }}>{domain.name}</h4>
                    <p style={{ color: "rgba(245,230,192,0.45)", fontSize: "0.9rem", lineHeight: 1.65, fontFamily: "'Rajdhani'", fontWeight: 400 }}>
                      {domain.desc}
                    </p>
                  </div>
                </FadeSection>
              ))}
            </div>

          </div>
        </section>

        <div className="divider" />

        {/* ════════════════════════
            SECTION 4 — GALLERY
        ════════════════════════ */}
        <section style={{ padding: "5rem 1.5rem 7rem" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>

            <FadeSection>
              <SectionHeading label="Flashback" title="MOMENTS FROM LAST YEAR" />
            </FadeSection>

            <div className="gallery-grid" style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr",
              gridTemplateRows: "220px 220px",
              gap: "0.75rem",
            }}>
              <FadeSection delay={0} style={{ gridRow: "1 / 3" }}>
                <div className="photo-slot" style={{ height: "100%" }}>
                  {/* TODO: <img src="..." alt="..." style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
                  <span>Photo 01</span>
                </div>
              </FadeSection>
              <FadeSection delay={100}>
                <div className="photo-slot" style={{ height: "100%" }}>
                  <span>Photo 02</span>
                </div>
              </FadeSection>
              <FadeSection delay={150}>
                <div className="photo-slot" style={{ height: "100%" }}>
                  <span>Photo 03</span>
                </div>
              </FadeSection>
              <FadeSection delay={200} style={{ gridColumn: "2 / 4" }}>
                <div className="photo-slot" style={{ height: "100%", gridColumn: "2 / 4" }}>
                  <span>Photo 04</span>
                </div>
              </FadeSection>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}