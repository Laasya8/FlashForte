import { REGISTRATION_FIELDS, SUBMISSION_FIELDS, FEEDBACK_FIELDS } from "./commonFields.js";

const APP_SCRIPT_REGISTER = "https://script.google.com/macros/s/AKfycbyxzRq8MUpd7vjoBFGuSF3t_jcHC6Tqsl0T-RBcKdUzDIKjZFEdKwexe6omGP4C7DT63A/exec"
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
    subtitle: "Where Confidence Finds its Voice",
    submitText: "Register Now",
    successTitle: "Registration Confirmed.",
    successSubtitle: "Your voice will be heard.",
    allowFileUpload: false,
    fields: REGISTRATION_FIELDS,
    isAccepting: IS_ACCEPTING,
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
    isAccepting: IS_ACCEPTING,
  }
};
