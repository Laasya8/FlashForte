import { REGISTRATION_FIELDS, SUBMISSION_FIELDS, FEEDBACK_FIELDS } from "./commonFields.js";

const APP_SCRIPT_REGISTER = "URL_PLACEHOLDER_DESIGNATHON_REGISTER";
const APP_SCRIPT_SUBMIT = "URL_PLACEHOLDER_DESIGNATHON_SUBMIT";
const APP_SCRIPT_FEEDBACK = "URL_PLACEHOLDER_DESIGNATHON_FEEDBACK";

const IS_ACCEPTING = true;

const titleNode = () => (
  <span style={{ whiteSpace: "nowrap" }}>
    DESIGN<span
      style={{
        background: "linear-gradient(90deg, #22C55E 0%, #4ADE80 50%, #86EFAC 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >-A-THON</span>
  </span>
);

export const designathonConfig = {
  themeColor: "#22C55E",
  register: {
    appScriptUrl: APP_SCRIPT_REGISTER,
    titleNode: () => <>{titleNode()} Registration</>,
    subtitle: "Where creativity meets impact.",
    submitText: "Register Now",
    successTitle: "Registration Confirmed.",
    successSubtitle: "Your creative journey begins.",
    allowFileUpload: false,
    fields: [
      ...REGISTRATION_FIELDS,
      {
        name: "domain",
        label: "Select Domain",
        type: "select",
        required: true,
        options: ["Domain 1", "Domain 2", "Domain 3", "Domain 4", "Domain 5"]
      }
    ],
    isAccepting: IS_ACCEPTING,
    showOtherEventsOnSuccess: true,
    forteId: "designathon",
  },
  submit: {
    appScriptUrl: APP_SCRIPT_SUBMIT,
    titleNode: () => <>{titleNode()} Submission</>,
    subtitle: "Upload your final design assets",
    submitText: "Submit Design",
    successTitle: "Submission Received.",
    successSubtitle: "Your masterpiece has been recorded.",
    infoText: "If you'd like to resubmit, please fill the form again with the new file.",
    allowFileUpload: true,
    acceptedTypes: ".jpeg,.jpg,.png,.pdf,.fig",
    acceptedMimeTypes: ["image/jpeg", "image/png", "application/pdf"],
    fields: [
      ...SUBMISSION_FIELDS,
      {
        name: "domain",
        label: "Select Domain",
        type: "select",
        required: true,
        options: ["Domain 1", "Domain 2", "Domain 3", "Domain 4", "Domain 5"]
      }
    ],
    isAccepting: IS_ACCEPTING,
  },
  feedback: {
    appScriptUrl: APP_SCRIPT_FEEDBACK,
    titleNode: () => <>{titleNode()} Feedback</>,
    subtitle: "Share your creative experience",
    submitText: "Submit Feedback",
    successTitle: "Feedback Received.",
    successSubtitle: "Thank you for sharing your thoughts.",
    allowFileUpload: false,
    fields: FEEDBACK_FIELDS,
    isAccepting: IS_ACCEPTING,
  }
};
