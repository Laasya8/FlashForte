import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Shield } from "lucide-react";
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
  return <span className="neon-spinner" aria-hidden="true" />;
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
  closedTitle = "Submission closed",
}) {
  const [formData, setFormData] = useState({});

  const ALL_EVENTS = [
    { id: "ideathon", title: "Ideathon", link: "/ideathon", color: "#EAB308", desc: "Think. Ideate. Pitch." },
    { id: "designathon", title: "Design\u2011A\u2011Thon", link: "/design-a-thon", color: "#22C55E", desc: "Design. Create. Elevate." },
    { id: "speakathon", title: "Speak\u2011A\u2011Thon", link: "/speak-a-thon", color: "#F97316", desc: "Where confidence finds its voice." },
    { id: "gameathon", title: "Game\u2011A\u2011Thon", link: "/game-a-thon", color: "#A855F7", desc: "Where Screens Turn Into Arenas." },
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
    <motion.div className="neon-card" variants={cardVariants} initial="hidden" animate="visible">
      {/* ── Card Header ────────────────────────── */}
      <div className="neon-card__header">
        <h2 className="neon-card__event-title flex flex-row justify-center items-center flex-wrap md:flex-nowrap gap-2 text-xl sm:text-2xl md:text-3xl tracking-tight md:tracking-normal md:whitespace-nowrap">
          {titleNode ? titleNode() : title}
        </h2>
        {subtitle && <p className="neon-card__subtitle mt-1 md:mt-2">{subtitle}</p>}
      </div>

      {/* ── Card Body ──────────────────────────── */}
      <AnimatePresence mode="wait">
        {!isAccepting ? (
          <motion.div
            key="closed"
            className="neon-closed"
            variants={formContentVariants}
            initial="visible"
            exit="exit"
          >
            <div
              className="neon-closed__icon-ring"
              style={{ background: `rgba(var(--theme-color-rgb), 0.08)`, border: `1px solid rgba(var(--theme-color-rgb), 0.2)` }}
            >
              <span style={{ fontSize: '24px' }}>✨</span>
            </div>
            <h3 className="neon-closed__title">
              {closedTitle}
            </h3>
            <p className="neon-closed__text">
              We are currently not accepting responses for this form. <br />
              Stay tuned and look forward to the next amazing events from CSI!
            </p>
          </motion.div>
        ) : status === "success" ? (
          <motion.div key="success" className="neon-success" variants={successVariants} initial="hidden" animate="visible" exit="exit">
            <CheckmarkAnimation themeColor={themeColor} />
            <h2 className="neon-success__title">{successTitle}</h2>
            <p className="neon-success__subtitle">{successSubtitle}</p>
            <button
              onClick={() => {
                setStatus('idle');
                setFormData({});
                setFile(null);
              }}
              className="neon-success__link"
            >
              Submit Another →
            </button>

            {showOtherEventsOnSuccess && forteId && (
              <div className="w-full mt-4 pt-4 border-t border-white/10 flex flex-col items-center">
                <h3 className="neon-success__explore-title">
                  Explore Other Fortes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-[105%] -mx-2">
                  {ALL_EVENTS.filter(e => e.id !== forteId).map(event => (
                    <Link
                      key={event.id}
                      to={event.link}
                      className="neon-success__event-card"
                      style={{
                        '--event-color': event.color,
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
          <motion.form key="form" className="neon-form" onSubmit={handleSubmit} variants={formContentVariants} initial="visible" exit="exit" autoComplete="off">
            {fields.map((field) => {
              if (field.condition && formData[field.condition.field] !== field.condition.value) {
                return null;
              }
              return (
                <FieldRenderer
                  key={field.name}
                  field={field}
                  value={formData[field.name]}
                  onChange={handleFieldChange}
                  disabled={status === "loading"}
                />
              );
            })}

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
                <motion.p className="neon-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>

            {infoText && (
              <p className="neon-info-text">
                {infoText}
              </p>
            )}

            <button
              type="submit"
              className="neon-submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Spinner /> Processing…
                </>
              ) : (
                <>
                  {submitText} <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Security note */}
            <div className="neon-security">
              <Shield size={14} className="neon-security__icon" />
              <span>Your information is secure with us.</span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
