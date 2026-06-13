import { REGISTRATION_FIELDS, SUBMISSION_FIELDS, FEEDBACK_FIELDS } from "./commonFields.js";

const APP_SCRIPT_REGISTER = "URL_PLACEHOLDER_SPEAKATHON_REGISTER";
const APP_SCRIPT_SUBMIT = "URL_PLACEHOLDER_SPEAKATHON_SUBMIT";
const APP_SCRIPT_FEEDBACK = "URL_PLACEHOLDER_SPEAKATHON_FEEDBACK";

const IS_ACCEPTING = true;

const titleNode = () => (
  <span style={{ whiteSpace: "nowrap" }}>
    SPEAK<span
      className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 bg-clip-text text-transparent"
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >-A-THON</span>
  </span>
);

export const speakathonConfig = {
  themeColor: "#F97316",
  register: {
    appScriptUrl: APP_SCRIPT_REGISTER,
    titleNode: () => <>{titleNode()} Registration</>,
    subtitle: "Find your voice. Shape your story.",
    submitText: "Register Now",
    successTitle: "Registration Confirmed.",
    successSubtitle: "Your voice will be heard.",
    allowFileUpload: false,
    fields: REGISTRATION_FIELDS,
    isAccepting: IS_ACCEPTING,
    showOtherEventsOnSuccess: true,
    forteId: "speakathon",
  },
  submit: {
    appScriptUrl: APP_SCRIPT_SUBMIT,
    titleNode: () => <>{titleNode()} Submission</>,
    subtitle: "Submit your speech script or presentation",
    submitText: "Submit Project",
    successTitle: "Submission Received.",
    successSubtitle: "Your script has been recorded.",
    infoText: "If you'd like to resubmit, please fill the form again with the new file.",
    allowFileUpload: true,
    acceptedTypes: ".pdf,.ppt,.pptx",
    acceptedMimeTypes: ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    fields: SUBMISSION_FIELDS,
    isAccepting: IS_ACCEPTING,
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
    isAccepting: IS_ACCEPTING,
  }
};
