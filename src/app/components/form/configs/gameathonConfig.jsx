import { REGISTRATION_FIELDS, SUBMISSION_FIELDS } from "./commonFields.js";

const APP_SCRIPT_REGISTER = "https://script.google.com/macros/s/AKfycbx6SLXjKgKhziuRafm_mC8RNoDRCwFjUy50yQSiT-hsMY34HAUqdId9RbPBLxJY10PI/exec";
const APP_SCRIPT_FEEDBACK = "https://script.google.com/macros/s/AKfycbxI13Xjro7hA2nhYstCUohIrPF8pE5By8kFAvNly3a1LypEpTdVSiGBdtTZOVkXEiUELQ/exec";

const checkDeadline = (deadlineStr) => {
  if (!deadlineStr) return true;
  return new Date() < new Date(deadlineStr);
};

// Set your deadlines here (ISO format, e.g., "2026-06-25T23:59:59+05:30"). 
// Leave empty to accept indefinitely.
const DEADLINES = {
  register: "2026-06-28T21:30:00+05:30",
  feedback: ""
};

const titleNode = () => (
  <span style={{ whiteSpace: "nowrap" }}>
    GAME<span style={{ color: "#A855F7" }}>-A-THON</span>
  </span>
);

const GAMEATHON_FEEDBACK_FIELDS = [
  {
    label: "How would you rate your overall GAME-A-THON experience?",
    name: "overallExperience",
    type: "select",
    required: true,
    placeholder: "Select a rating",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    label: "How would you rate the organisation and communication during the event?",
    name: "organisationRating",
    type: "select",
    required: true,
    placeholder: "Select an option",
    options: ["Excellent", "Good", "Average", "Poor"],
  },
  {
    label: "How engaging and enjoyable did you find the games?",
    name: "gamesEnjoyment",
    type: "select",
    required: true,
    placeholder: "Select an option",
    options: ["Very enjoyable", "Moderately enjoyable", "Not very enjoyable"],
  },
  {
    label: "How did you find the difficulty level of the games you played?",
    name: "difficultyLevel",
    type: "select",
    required: true,
    placeholder: "Select an option",
    options: ["Too easy", "Just Right", "Too difficult", "Extremely difficult"],
  },
  {
    label: "Which game in the event did you enjoy the most?",
    name: "favouriteGame",
    type: "text",
    required: true,
    placeholder: "Enter the game name",
  },
  {
    label: "What type of events would you like to see us organise in the future?",
    name: "futureEventSuggestions",
    type: "textarea",
    required: true,
    placeholder: "Share ideas for future events, themes, or game formats",
  },
  {
    label: "Any additional feedback, suggestions, or comments?",
    name: "additionalFeedback",
    type: "textarea",
    required: true,
    placeholder: "Share any other thoughts, suggestions, or feedback",
  },
];

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
    fields: GAMEATHON_FEEDBACK_FIELDS,
    get isAccepting() { return checkDeadline(DEADLINES.feedback); },
  }
};