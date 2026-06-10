import React, { useRef, useCallback, useState } from "react";

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

export function FileUpload({ file, setFile, acceptedTypes, acceptedMimeTypes, setErrorMsg }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = useCallback((selectedFile) => {
    if (!selectedFile) return;
    if (acceptedMimeTypes && !acceptedMimeTypes.includes(selectedFile.type)) {
      setErrorMsg(`Invalid file type. Please upload ${acceptedTypes}.`);
      return;
    }
    setFile(selectedFile);
    setErrorMsg("");
  }, [acceptedMimeTypes, acceptedTypes, setErrorMsg, setFile]);

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

  return (
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
          accept={acceptedTypes}
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
          {file ? "Click to replace" : (acceptedTypes ? acceptedTypes.replace(/\./g, '').replace(/,/g, ', ').toUpperCase() : "Any file type")}
        </span>
      </div>
    </div>
  );
}
