import { REGISTRATION_FIELDS, SUBMISSION_FIELDS, FEEDBACK_FIELDS } from "./commonFields.js";

const APP_SCRIPT_REGISTER = "URL_PLACEHOLDER_GAMEATHON_REGISTER";
const APP_SCRIPT_SUBMIT = "URL_PLACEHOLDER_GAMEATHON_SUBMIT";
const APP_SCRIPT_FEEDBACK = "URL_PLACEHOLDER_GAMEATHON_FEEDBACK";

const IS_ACCEPTING = true;

const titleNode = () => (
  <span style={{ whiteSpace: "nowrap" }}>
    GAME<span style={{ color: "#A855F7" }}>-A-THON</span>
  </span>
);

export const gameathonConfig = {
  themeColor: "#A855F7",
  register: {
    appScriptUrl: APP_SCRIPT_REGISTER,
    titleNode: () => <>{titleNode()} Registration</>,
    subtitle: "Think fast. Adapt faster.",
    submitText: "Register Now",
    successTitle: "Registration Confirmed.",
    successSubtitle: "Player one ready.",
    allowFileUpload: false,
    fields: REGISTRATION_FIELDS,
    isAccepting: IS_ACCEPTING,
    showOtherEventsOnSuccess: true,
    forteId: "gameathon",
  },
  submit: {
    appScriptUrl: APP_SCRIPT_SUBMIT,
    titleNode: () => <>{titleNode()} Submission</>,
    subtitle: "Upload your game build or assets",
    submitText: "Submit Game",
    successTitle: "Submission Received.",
    successSubtitle: "Your game has been recorded.",
    infoText: "If you'd like to resubmit, please fill the form again with the new file.",
    allowFileUpload: true,
    acceptedTypes: ".zip,.rar,.pdf",
    acceptedMimeTypes: ["application/zip", "application/x-rar-compressed", "application/pdf"],
    fields: SUBMISSION_FIELDS,
    isAccepting: IS_ACCEPTING,
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
    isAccepting: IS_ACCEPTING,
  }
};
