const DUMMY_URL = "https://script.google.com/macros/s/AKfycbwu9N5SOCpvznloU3KsRzlVmpR6B7TuIy5D5_7BHGRI6fN9cn5G39rVgRnA8V5BqfY/exec";

/* ── Common Field Schemas ────────────────────────────────────────────── */
const REGISTRATION_FIELDS = [
  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Enter your full name" },
  { name: "email", label: "Email Address", type: "email", required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone Number", type: "text", required: true, placeholder: "Enter your phone number", pattern: "^[0-9]{10}$" },
  { name: "rollNo", label: "Roll Number", type: "text", required: true, placeholder: "Enter your roll number", pattern: "^2[0-9]071[aA][0-9]{2}[a-zA-Z0-9][0-9]$" },
  { name: "branch", label: "Branch", type: "select", required: true, options: ["CSE", "AIML", "DS", "CSBS", "CyS", "AIDS", "IT", "IoT", "ECE", "EEE", "Mechanical", "Civil"] },
  { name: "section", label: "Section", type: "select", required: true, options: ["A", "B", "C", "D"] },
  { name: "discordId", label: "Discord ID", type: "text", required: true, placeholder: "username#1234 or username" },
  { name: "heardAboutUs", label: "How did you hear about us?", type: "select", required: false, options: ["Social Media", "Friend", "Senior", "Other"] },
];

const SUBMISSION_FIELDS = [
  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Enter your full name" },
  { name: "email", label: "Email Address", type: "email", required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone Number", type: "text", required: true, placeholder: "Enter your phone number", pattern: "^[0-9]{10}$" },
];

const FEEDBACK_FIELDS = [
  { name: "rating", label: "Rating (1-5)", type: "select", required: true, options: ["1 - Poor", "2 - Fair", "3 - Good", "4 - Very Good", "5 - Excellent"] },
  { name: "feedback", label: "Feedback", type: "textarea", required: true, placeholder: "Tell us about your experience..." },
];

/* ── 1. Speak-a-thon Configurations ──────────────────────────────────── */
export const speakathonRegistrationConfig = {
  appScriptUrl: DUMMY_URL,
  title: "Speak-a-thon Registration",
  subtitle: "Find your voice. Shape your story.",
  submitText: "Register Now",
  successTitle: "Registration Confirmed.",
  successSubtitle: "Your voice will be heard.",
  allowFileUpload: false,
  fields: REGISTRATION_FIELDS,
};

export const speakathonSubmissionConfig = {
  appScriptUrl: DUMMY_URL,
  title: "Speak-a-thon Submission",
  subtitle: "Submit your speech script or presentation",
  submitText: "Submit Project",
  successTitle: "Submission Received.",
  successSubtitle: "Your script has been recorded.",
  allowFileUpload: true,
  acceptedTypes: ".pdf,.ppt,.pptx",
  acceptedMimeTypes: ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
  fields: SUBMISSION_FIELDS,
};

export const speakathonFeedbackConfig = {
  appScriptUrl: DUMMY_URL,
  title: "Speak-a-thon Feedback",
  subtitle: "Share your speaking experience",
  submitText: "Submit Feedback",
  successTitle: "Feedback Received.",
  successSubtitle: "Thank you for sharing your thoughts.",
  allowFileUpload: false,
  fields: FEEDBACK_FIELDS,
};

/* ── 2. Design-a-thon Configurations ─────────────────────────────────── */
export const designathonRegistrationConfig = {
  appScriptUrl: DUMMY_URL,
  title: "Design-a-thon Registration",
  subtitle: "Where creativity meets impact.",
  submitText: "Register Now",
  successTitle: "Registration Confirmed.",
  successSubtitle: "Your creative journey begins.",
  allowFileUpload: false,
  fields: REGISTRATION_FIELDS,
};

export const designathonSubmissionConfig = {
  appScriptUrl: DUMMY_URL,
  title: "Design-a-thon Submission",
  subtitle: "Upload your final design assets",
  submitText: "Submit Design",
  successTitle: "Submission Received.",
  successSubtitle: "Your masterpiece has been recorded.",
  allowFileUpload: true,
  acceptedTypes: ".jpeg,.jpg,.png,.pdf,.fig", // Added .fig conceptually
  acceptedMimeTypes: ["image/jpeg", "image/png", "application/pdf"],
  fields: SUBMISSION_FIELDS,
};

export const designathonFeedbackConfig = {
  appScriptUrl: DUMMY_URL,
  title: "Design-a-thon Feedback",
  subtitle: "Share your creative experience",
  submitText: "Submit Feedback",
  successTitle: "Feedback Received.",
  successSubtitle: "Thank you for sharing your thoughts.",
  allowFileUpload: false,
  fields: FEEDBACK_FIELDS,
};

/* ── 3. Ideathon Configurations ──────────────────────────────────────── */
export const ideathonRegistrationConfig = {
  appScriptUrl: DUMMY_URL,
  title: "Ideathon Registration",
  subtitle: "Ignite ideas. Inspire change.",
  submitText: "Register Now",
  successTitle: "Registration Confirmed.",
  successSubtitle: "Your innovation journey begins.",
  allowFileUpload: false,
  fields: REGISTRATION_FIELDS,
};

export const ideathonSubmissionConfig = {
  appScriptUrl: DUMMY_URL,
  title: "Ideathon Submission",
  subtitle: "Upload your idea pitch deck",
  submitText: "Submit Pitch",
  successTitle: "Submission Received.",
  successSubtitle: "Your pitch deck has been recorded.",
  allowFileUpload: true,
  acceptedTypes: ".pdf,.ppt,.pptx",
  acceptedMimeTypes: ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
  fields: SUBMISSION_FIELDS,
};

export const ideathonFeedbackConfig = {
  appScriptUrl: DUMMY_URL,
  title: "Ideathon Feedback",
  subtitle: "Share your innovation experience",
  submitText: "Submit Feedback",
  successTitle: "Feedback Received.",
  successSubtitle: "Thank you for sharing your thoughts.",
  allowFileUpload: false,
  fields: FEEDBACK_FIELDS,
};

/* ── 4. Game-a-thon Configurations ───────────────────────────────────── */
export const gameathonRegistrationConfig = {
  appScriptUrl: DUMMY_URL,
  title: "Game-a-thon Registration",
  subtitle: "Think fast. Adapt faster.",
  submitText: "Register Now",
  successTitle: "Registration Confirmed.",
  successSubtitle: "Player one ready.",
  allowFileUpload: false,
  fields: REGISTRATION_FIELDS,
};

export const gameathonSubmissionConfig = {
  appScriptUrl: DUMMY_URL,
  title: "Game-a-thon Submission",
  subtitle: "Upload your game build or assets",
  submitText: "Submit Game",
  successTitle: "Submission Received.",
  successSubtitle: "Your game has been recorded.",
  allowFileUpload: true,
  acceptedTypes: ".zip,.rar,.pdf", // Usually zip files for games, keeping pdf as fallback
  acceptedMimeTypes: ["application/zip", "application/x-rar-compressed", "application/pdf"],
  fields: SUBMISSION_FIELDS,
};

export const gameathonFeedbackConfig = {
  appScriptUrl: DUMMY_URL,
  title: "Game-a-thon Feedback",
  subtitle: "Share your gaming experience",
  submitText: "Submit Feedback",
  successTitle: "Feedback Received.",
  successSubtitle: "Thank you for sharing your thoughts.",
  allowFileUpload: false,
  fields: FEEDBACK_FIELDS,
};

/* ── Backward Compatibility (Testing Configuration) ───────────────────────── */
export const registrationConfig = {
  appScriptUrl: DUMMY_URL,
  title: "Initialize Protocol",
  subtitle: "Register your entry into the multiverse",
  submitText: "Initialize Protocol",
  successTitle: "Registration Confirmed.",
  successSubtitle: "Transmission Complete.",
  allowFileUpload: true,
  acceptedTypes: ".jpeg,.jpg,.png,.pdf,.ppt,.pptx",
  acceptedMimeTypes: [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
  fields: REGISTRATION_FIELDS,
};
