import React, { useRef, useCallback, useState, memo } from "react";

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

const Spinner = () => (
  <svg className="reg-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ width: 48, height: 48, margin: "0 auto", color: "rgba(0,210,200,0.8)" }}>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const FileUpload = memo(function FileUpload({ file, setFile, acceptedTypes, acceptedMimeTypes, setErrorMsg, isSubmitting }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = useCallback((selectedFile) => {
    if (!selectedFile || isSubmitting) return;
    
    // 25MB limit
    const MAX_FILE_SIZE = 25 * 1024 * 1024;
    if (selectedFile.size > MAX_FILE_SIZE) {
      setErrorMsg("File is too large. Maximum allowed file size is 25MB.");
      return;
    }

    if (acceptedMimeTypes && !acceptedMimeTypes.includes(selectedFile.type)) {
      setErrorMsg(`Invalid file type. Please upload ${acceptedTypes}.`);
      return;
    }
    setFile(selectedFile);
    setErrorMsg("");
  }, [acceptedMimeTypes, acceptedTypes, setErrorMsg, setFile, isSubmitting]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSubmitting) setIsDragOver(true);
  }, [isSubmitting]);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (!isSubmitting) {
      const droppedFile = e.dataTransfer?.files?.[0];
      handleFileSelect(droppedFile);
    }
  }, [handleFileSelect, isSubmitting]);

  const onFileInputChange = useCallback((e) => {
    if (!isSubmitting) {
      handleFileSelect(e.target.files?.[0]);
    }
  }, [handleFileSelect, isSubmitting]);

  return (
    <div className="reg-field">
      <label className="reg-label">Project Upload (Optional)</label>
      <div
        className={`reg-dropzone ${isDragOver ? "reg-dropzone--active" : ""} ${file ? "reg-dropzone--has-file" : ""} ${isSubmitting ? "reg-dropzone--disabled" : ""}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !isSubmitting && fileInputRef.current?.click()}
        role="button"
        tabIndex={isSubmitting ? -1 : 0}
        onKeyDown={(e) => {
          if (!isSubmitting && (e.key === "Enter" || e.key === " ")) fileInputRef.current?.click();
        }}
        aria-label="Upload project file"
        style={isSubmitting ? { opacity: 0.7, cursor: "not-allowed" } : {}}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={onFileInputChange}
          className="reg-dropzone__input"
          tabIndex={-1}
          disabled={isSubmitting}
        />
        {isSubmitting ? (
          <Spinner />
        ) : file ? (
          <FileSuccessIcon />
        ) : (
          <UploadIcon />
        )}
        
        {isSubmitting ? (
          <span className="reg-dropzone__text">Uploading...</span>
        ) : file ? (
          <span className="reg-dropzone__filename">{file.name}</span>
        ) : (
          <span className="reg-dropzone__text">
            Drag & Drop Project File or <span className="reg-dropzone__browse">Browse</span>
          </span>
        )}
        
        <span className="reg-dropzone__hint">
          {isSubmitting 
            ? "Please wait while your file is securely transferred." 
            : file 
              ? "Click to replace" 
              : (acceptedTypes 
                  ? `${acceptedTypes.replace(/\./g, '').replace(/,/g, ', ').toUpperCase()} (Max: 25MB)` 
                  : "Any file type (Max: 25MB)")}
        </span>
      </div>
    </div>
  );
});
