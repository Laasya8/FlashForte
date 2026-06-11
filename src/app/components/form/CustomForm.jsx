import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FieldRenderer } from "./FieldRenderer";
import { FileUpload } from "./FileUpload";

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

function Spinner() {
  return <span className="reg-spinner" aria-hidden="true" />;
}

export function CustomForm({
  appScriptUrl,
  title,
  subtitle,
  submitText = "Submit",
  successTitle = "Success",
  successSubtitle = "Your request has been processed.",
  fields = [],
  allowFileUpload = false,
  acceptedTypes = ".jpeg,.jpg,.png,.pdf,.ppt,.pptx",
  acceptedMimeTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
}) {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
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
    }

    // File upload is now optional, so we remove the strict requirement check.

    setStatus("loading");

    try {
      const payload = { ...formData };

      if (allowFileUpload && file) {
        payload.fileName = file.name;
        payload.mimeType = file.type;
        payload.fileBase64 = await fileToBase64(file);
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
          <h2 className="reg-card__title">{title}</h2>
          {subtitle && <p className="reg-card__subtitle">{subtitle}</p>}
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div key="success" className="reg-success" variants={successVariants} initial="hidden" animate="visible" exit="exit">
              <CheckmarkAnimation />
              <h2 className="reg-success__title">{successTitle}</h2>
              <p className="reg-success__subtitle">{successSubtitle}</p>
              <button 
                onClick={() => {
                  setStatus('idle');
                  setFormData({});
                  setFile(null);
                }}
                className="reg-success__link bg-transparent border-none cursor-pointer p-0"
              >
                Submit Another →
              </button>
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

              <button type="submit" className="reg-submit" disabled={status === "loading"}>
                {status === "loading" ? "Processing…" : submitText}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
