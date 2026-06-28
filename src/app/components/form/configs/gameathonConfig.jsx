import { REGISTRATION_FIELDS, SUBMISSION_FIELDS, FEEDBACK_FIELDS } from "./commonFields.js";

const APP_SCRIPT_REGISTER = "https://script.google.com/macros/s/AKfycbx6SLXjKgKhziuRafm_mC8RNoDRCwFjUy50yQSiT-hsMY34HAUqdId9RbPBLxJY10PI/exec";
const APP_SCRIPT_FEEDBACK = "URL_PLACEHOLDER_GAMEATHON_FEEDBACK";

const checkDeadline = (deadlineStr) => {
  if (!deadlineStr) return true;
  return new Date() < new Date(deadlineStr);
};

// Set your deadlines here (ISO format, e.g., "2026-06-25T23:59:59+05:30"). 
// Leave empty to accept indefinitely.
const DEADLINES = {
  register: "2026-06-28T23:59:59+05:30",
  feedback: ""
};

const titleNode = () => (
  <span style={{ whiteSpace: "nowrap" }}>
    GAME<span style={{ color: "#A855F7" }}>-A-THON</span>
  </span>
);

export const gameathonConfig = {
  themeColor: "#A855F7",
  register: {
    appScriptUrl: APP_SCRIPT_REGISTER,
    closedTitle: "Registration Closed",
    titleNode: () => <>{titleNode()} Registration</>,
    subtitle: "Where Screens Turn Into Arenas.",
    submitText: "Register Now",
    successTitle: "Registration Confirmed.",
    successSubtitle: "Player one ready.",
    allowFileUpload: false,
    fields: REGISTRATION_FIELDS,
    get isAccepting() { return checkDeadline(DEADLINES.register); },
    showOtherEventsOnSuccess: true,
    forteId: "gameathon",
  },
  feedback: {
    appScriptUrl: APP_SCRIPT_FEEDBACK,
    titleNode: () => <>{titleNode()} Feedback</>,
    subtitle: "Share your gaming experience",
    submitText: "Submit Feedback",
    successTitle: "Feedback Received.",
    successSubtitle: "Thank you for sharing your thoughts.",
    allowFileUpload: false,
    fields: FEEDBACK_FIELDS,
    get isAccepting() { return checkDeadline(DEADLINES.feedback); },
  }
};
