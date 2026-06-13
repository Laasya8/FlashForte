import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { FieldRenderer } from "./FieldRenderer";
import { FileUpload } from "./FileUpload";

function CheckmarkAnimation({ themeColor = "#00D2C8" }) {
  return (
    <motion.svg
      width="80" height="80" viewBox="0 0 80 80" fill="none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <motion.circle
        cx="40" cy="40" r="36"
        stroke={themeColor}
        strokeOpacity="0.4"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.path
        d="M24 40L34 50L56 28"
        stroke={themeColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.8 }}
      />
    </motion.svg>
  );
}

function Spinner() {
  return <span className="reg-spinner" aria-hidden="true" />;
}

export function CustomForm({
  appScriptUrl,
  title,
  titleNode,
  subtitle,
  submitText = "Submit",
  successTitle = "Success",
  successSubtitle = "Your request has been processed.",
  fields = [],
  allowFileUpload = false,
  isAccepting = true,
  acceptedTypes = ".jpeg,.jpg,.png,.pdf,.ppt,.pptx",
  acceptedMimeTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
  themeColor = "#00D2C8",
  showOtherEventsOnSuccess = false,
  forteId = "",
  infoText = "",
}) {
  const [formData, setFormData] = useState({});

  const ALL_EVENTS = [
    { id: "ideathon", title: "Ideathon", link: "/ideathon", color: "#EAB308", desc: "Ignite ideas. Inspire change." },
    { id: "designathon", title: "Design\u2011A\u2011Thon", link: "/design-a-thon", color: "#22C55E", desc: "Where creativity meets impact." },
    { id: "speakathon", title: "Speak\u2011A\u2011Thon", link: "/speak-a-thon", color: "#F97316", desc: "Find your voice. Shape your story." },
    { id: "gameathon", title: "Game\u2011A\u2011Thon", link: "/game-a-thon", color: "#A855F7", desc: "Think fast. Adapt faster." },
  ];
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState("");



  const handleFieldChange = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const fileToBase64 = (f) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(f);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Dynamic Validation
    for (const field of fields) {
      const value = formData[field.name];
      if (field.required && (!value || !value.trim())) {
        setErrorMsg(`Please fill out the required field: ${field.label}`);
        return;
      }
      if (field.type === "email" && value) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setErrorMsg(`Please enter a valid email address for ${field.label}.`);
          return;
        }
      }
      if (field.pattern && value) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(value)) {
          setErrorMsg(field.patternMessage || `Please enter a valid value for ${field.label}.`);
          return;
        }
      }
    }

    // File upload is now optional, so we remove the strict requirement check.

    setStatus("loading");

    try {
      const payload = { ...formData };

      if (allowFileUpload && file) {
        payload.fileBase64 = await fileToBase64(file);
        payload.mimeType = file.type;
        payload.fileName = file.name;
      }

      const response = await fetch(appScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const responseData = await response.json().catch(() => ({}));
      if (responseData.result === "error") {
        throw new Error(responseData.message || "Server rejected submission");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message || "Transmission failed. Please try again.");
      setStatus("error");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const successVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const formContentVariants = {
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.4 } },
  };

  return (
    <div className="w-full flex justify-center px-4 md:px-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="reg-ambient reg-ambient--top-left" aria-hidden="true" />
        <div className="reg-ambient reg-ambient--bottom-right" aria-hidden="true" />
      </div>

      <motion.div className="reg-card w-full" variants={cardVariants} initial="hidden" animate="visible">
        <div className="reg-card__header">
          <h2 className="reg-card__title" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {titleNode ? titleNode() : title}
          </h2>
          {subtitle && <p className="reg-card__subtitle">{subtitle}</p>}
        </div>

        <AnimatePresence mode="wait">
          {!isAccepting ? (
            <motion.div 
              key="closed" 
              className="flex flex-col items-center justify-center py-10 text-center"
              variants={formContentVariants} 
              initial="visible" 
              exit="exit"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ background: `${themeColor}15`, border: `1px solid ${themeColor}30` }}
              >
                <span style={{ fontSize: '24px' }}>✨</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ textShadow: `0 0 15px ${themeColor}40` }}>
                Submissions Closed
              </h3>
              <p className="text-[#C8D3F5] text-[15px] leading-relaxed max-w-[400px]">
                We are currently not accepting responses for this form. <br />
                Stay tuned and look forward to the next amazing events from CSI!
              </p>
            </motion.div>
          ) : status === "success" ? (
            <motion.div key="success" className="reg-success" variants={successVariants} initial="hidden" animate="visible" exit="exit">
              <CheckmarkAnimation themeColor={themeColor} />
              <h2 className="reg-success__title" style={{ textShadow: `0 0 20px ${themeColor}40` }}>{successTitle}</h2>
              <p className="reg-success__subtitle">{successSubtitle}</p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({});
                  setFile(null);
                }}
                className="reg-success__link bg-transparent border-none cursor-pointer p-0"
                style={{ color: themeColor }}
              >
                Submit Another →
              </button>

              {showOtherEventsOnSuccess && forteId && (
                <div className="w-full mt-4 pt-4 border-t border-white/10 flex flex-col items-center">
                  <h3 className="text-white text-base md:text-lg font-bold mb-4 font-orbitron tracking-wide uppercase" style={{ textShadow: `0 0 10px ${themeColor}50` }}>
                    Explore Other Fortes
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-[105%] -mx-2">
                    {ALL_EVENTS.filter(e => e.id !== forteId).map(event => (
                      <Link 
                        key={event.id} 
                        to={event.link}
                        className="group flex flex-col items-center justify-center py-4 px-2 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] bg-black/40"
                        style={{ 
                          border: `1px solid ${event.color}40`,
                          boxShadow: `0 0 10px ${event.color}10`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = event.color;
                          e.currentTarget.style.boxShadow = `0 0 25px ${event.color}50`;
                          e.currentTarget.style.backgroundColor = `rgba(10,10,15,0.8)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = `${event.color}40`;
                          e.currentTarget.style.boxShadow = `0 0 10px ${event.color}10`;
                          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)';
                        }}
                      >
                        <span className="font-bold text-[14px] sm:text-[15px] mb-1.5 text-center transition-all drop-shadow-md" style={{ color: event.color }}>
                          {event.title}
                        </span>
                        <span className="text-white/70 text-[11px] sm:text-[12px] text-center leading-snug px-1">
                          {event.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.form key="form" className="reg-form" onSubmit={handleSubmit} variants={formContentVariants} initial="visible" exit="exit" autoComplete="off">
              {fields.map((field) => (
                <FieldRenderer
                  key={field.name}
                  field={field}
                  value={formData[field.name]}
                  onChange={handleFieldChange}
                  disabled={status === "loading"}
                />
              ))}

              {allowFileUpload && (
                <FileUpload
                  file={file}
                  setFile={setFile}
                  acceptedTypes={acceptedTypes}
                  acceptedMimeTypes={acceptedMimeTypes}
                  setErrorMsg={setErrorMsg}
                  isSubmitting={status === "loading"}
                />
              )}

              <AnimatePresence>
                {errorMsg && (
                  <motion.p className="reg-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              {infoText && (
                <p className="text-[#8F9BB3] text-xs sm:text-sm text-center mb-6 italic" style={{ marginTop: '0.5rem' }}>
                  {infoText}
                </p>
              )}

              <button 
                type="submit" 
                className="reg-submit" 
                disabled={status === "loading"}
                style={{ background: themeColor, color: "white" }}
              >
                {status === "loading" ? "Processing…" : submitText}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
