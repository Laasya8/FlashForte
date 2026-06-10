import { useState, useRef, useCallback } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   Custom Registration Form — Headless Custom Form
   Sends JSON payload (with Base64 file) to Google Apps Script.
   Uses text/plain to bypass CORS preflight.
   ═══════════════════════════════════════════════════════════ */

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby8HRjsKEY1qdn6EdXVKrc3gVKuLfE0PL0HpMDdQ7Ilx7nLhMbYKmVPjAfeNpxCjXQ7kg/exec";

const ACCEPTED_TYPES = ".jpeg,.jpg,.png,.pdf,.ppt,.pptx";
const ACCEPTED_MIME = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

/* ── SVG Icons ─────────────────────────────────────────── */
function UploadIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="reg-dropzone-icon">
      <path d="M24 32V16M24 16L18 22M24 16L30 22" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 32C8 36.4183 11.5817 40 16 40H32C36.4183 40 40 36.4183 40 32V28" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 24C8.68629 24 6 21.3137 6 18C6 15.0699 8.09301 12.6425 10.868 12.1004C11.5649 8.62459 14.6974 6 18.456 6C20.618 6 22.56 6.93001 23.928 8.41001" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M36 24C39.3137 24 42 21.3137 42 18C42 15.0699 39.907 12.6425 37.132 12.1004C36.4351 8.62459 33.3026 6 29.544 6C27.382 6 25.44 6.93001 24.072 8.41001" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function FileSuccessIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="reg-dropzone-icon reg-dropzone-icon--success">
      <rect x="10" y="4" width="28" height="40" rx="4" stroke="rgba(0,210,200,0.6)" strokeWidth="2" fill="none"/>
      <path d="M18 24L22 28L30 20" stroke="rgba(0,210,200,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckmarkAnimation() {
  return (
    <motion.svg
      width="80" height="80" viewBox="0 0 80 80" fill="none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <motion.circle
        cx="40" cy="40" r="36"
        stroke="rgba(0,210,200,0.4)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.path
        d="M24 40L34 50L56 28"
        stroke="rgba(0,210,200,0.9)"
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

/* ── Spinner ───────────────────────────────────────────── */
function Spinner() {
  return <span className="reg-spinner" aria-hidden="true" />;
}

/* ══════════════════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════════════════ */
export function CustomRegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef(null);

  /* ── File Handling ─────────────────────────────────── */
  const handleFileSelect = useCallback((selectedFile) => {
    if (!selectedFile) return;
    if (!ACCEPTED_MIME.includes(selectedFile.type)) {
      setErrorMsg("Invalid file type. Please upload JPEG, PNG, PDF, PPT, or PPTX.");
      return;
    }
    setFile(selectedFile);
    setErrorMsg("");
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer?.files?.[0];
    handleFileSelect(droppedFile);
  }, [handleFileSelect]);

  const onFileInputChange = useCallback((e) => {
    handleFileSelect(e.target.files?.[0]);
  }, [handleFileSelect]);

  /* ── File → Base64 ─────────────────────────────────── */
  const fileToBase64 = (f) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // CRITICAL: Strip MIME prefix → raw Base64 only
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(f);
    });

  /* ── Submit Handler ────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validation
    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!file) {
      setErrorMsg("Please upload a project file.");
      return;
    }

    setStatus("loading");

    try {
      const fileBase64 = await fileToBase64(file);

      const payload = {
        name: name.trim(),
        email: email.trim(),
        fileName: file.name,
        mimeType: file.type,
        fileBase64,
      };

      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message || "Transmission failed. Please try again.");
      setStatus("error");
    }
  };

  /* ── Framer Motion Variants ────────────────────────── */
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const successVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const formContentVariants = {
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.4 } },
  };

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */
  return (
    <div className="w-full flex justify-center px-4 md:px-0">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="reg-ambient reg-ambient--top-left" aria-hidden="true" />
        <div className="reg-ambient reg-ambient--bottom-right" aria-hidden="true" />
      </div>

      <motion.div
        className="reg-card w-full"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="reg-card__header">
          <h2 className="reg-card__title">Initialize Protocol</h2>
          <p className="reg-card__subtitle">
            Register your entry into the multiverse
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            /* ── Success State ──────────────────────── */
            <motion.div
              key="success"
              className="reg-success"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <CheckmarkAnimation />
              <h2 className="reg-success__title">Registration Confirmed.</h2>
              <p className="reg-success__subtitle">Transmission Complete.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="reg-success__link bg-transparent border-none cursor-pointer p-0"
              >
                Register Another →
              </button>
            </motion.div>
          ) : (
            /* ── Form ───────────────────────────────── */
            <motion.form
              key="form"
              className="reg-form"
              onSubmit={handleSubmit}
              variants={formContentVariants}
              initial="visible"
              exit="exit"
              autoComplete="off"
            >
              {/* Full Name */}
              <div className="reg-field">
                <label htmlFor="reg-name" className="reg-label">Full Name</label>
                <input
                  id="reg-name"
                  type="text"
                  className="reg-input"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === "loading"}
                />
              </div>

              {/* Email */}
              <div className="reg-field">
                <label htmlFor="reg-email" className="reg-label">Email Address</label>
                <input
                  id="reg-email"
                  type="email"
                  className="reg-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                />
              </div>

              {/* Dropzone */}
              <div className="reg-field">
                <label className="reg-label">Project Upload</label>
                <div
                  className={`reg-dropzone ${isDragOver ? "reg-dropzone--active" : ""} ${file ? "reg-dropzone--has-file" : ""}`}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                  }}
                  aria-label="Upload project file"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={ACCEPTED_TYPES}
                    onChange={onFileInputChange}
                    className="reg-dropzone__input"
                    tabIndex={-1}
                  />
                  {file ? <FileSuccessIcon /> : <UploadIcon />}
                  {file ? (
                    <span className="reg-dropzone__filename">{file.name}</span>
                  ) : (
                    <span className="reg-dropzone__text">
                      Drag & Drop Project File or <span className="reg-dropzone__browse">Browse</span>
                    </span>
                  )}
                  <span className="reg-dropzone__hint">
                    {file ? "Click to replace" : "JPEG, PNG, PDF, PPT, PPTX"}
                  </span>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.p
                    className="reg-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                className="reg-submit"
                disabled={status === "loading"}
                id="reg-submit-btn"
              >
                {status === "loading" ? (
                  <>
                    <Spinner /> Processing…
                  </>
                ) : (
                  "Initialize Protocol"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
