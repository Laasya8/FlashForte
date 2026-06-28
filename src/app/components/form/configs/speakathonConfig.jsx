import { REGISTRATION_FIELDS, SUBMISSION_FIELDS, FEEDBACK_FIELDS } from "./commonFields.js";

const APP_SCRIPT_REGISTER = "https://script.google.com/macros/s/AKfycbyxzRq8MUpd7vjoBFGuSF3t_jcHC6Tqsl0T-RBcKdUzDIKjZFEdKwexe6omGP4C7DT63A/exec"
const APP_SCRIPT_FEEDBACK = "URL_PLACEHOLDER_SPEAKATHON_FEEDBACK";

const checkDeadline = (deadlineStr) => {
  if (!deadlineStr) return true;
  return new Date() < new Date(deadlineStr);
};

// Set your deadlines here (ISO format, e.g., "2026-06-25T23:59:59+05:30"). 
// Leave empty to accept indefinitely.
const DEADLINES = {
  register: "2026-06-28T20:15:00+05:30",
  feedback: ""
};

const titleNode = () => (
  <span style={{ whiteSpace: "nowrap" }}>
    SPEAK<span
      className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-400 bg-clip-text text-transparent"
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >-A-THON</span>
  </span>
);

export const speakathonConfig = {
  themeColor: "#22C55E",
  register: {
    appScriptUrl: APP_SCRIPT_REGISTER,
    titleNode: () => <>{titleNode()} Registration</>,
    subtitle: "Where confidence finds its voice.",
    submitText: "Register Now",
    successTitle: "Registration Confirmed.",
    successSubtitle: "Your voice will be heard.",
    allowFileUpload: false,
    fields: REGISTRATION_FIELDS,
    get isAccepting() { return checkDeadline(DEADLINES.register); },
    showOtherEventsOnSuccess: true,
    forteId: "speakathon",
  },

  feedback: {
    appScriptUrl: APP_SCRIPT_FEEDBACK,
    titleNode: () => <>{titleNode()} Feedback</>,
    subtitle: "Share your speaking experience",
    submitText: "Submit Feedback",
    successTitle: "Feedback Received.",
    successSubtitle: "Thank you for sharing your thoughts.",
    allowFileUpload: false,
    fields: FEEDBACK_FIELDS,
    get isAccepting() { return checkDeadline(DEADLINES.feedback); },
  }
};
