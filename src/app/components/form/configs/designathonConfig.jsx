import { REGISTRATION_FIELDS, SUBMISSION_FIELDS, FEEDBACK_FIELDS } from "./commonFields.js";

const APP_SCRIPT_REGISTER = "https://script.google.com/macros/s/AKfycbyQzqL2dVc5IrtM7UCFzrVy2gMOBVX68e1lpQVk_5QW53yERAvhObQetGYDiHTmhRAU/exec";
const APP_SCRIPT_SUBMIT = "https://script.google.com/macros/s/AKfycbxVb2MJMOpjQ-Cc_y7h2CK1dE0U39bCQk9El7xgKap_Eoo9T2y0LUPdrJmmWTvtN6A/exec";
const APP_SCRIPT_FEEDBACK = "https://script.google.com/macros/s/AKfycbwp7Tu-yASF5cp3h4tIQC6d-eOdA3KDX8vvTdNw2ZRw70hjAALpcWpCQt51Fq-qDndbYw/exec";

const checkDeadline = (deadlineStr) => {
  if (!deadlineStr) return true;
  return new Date() < new Date(deadlineStr);
};

// Set your deadlines here (ISO format, e.g., "2026-06-25T23:59:59+05:30"). 
// Leave empty to accept indefinitely.
const DEADLINES = {
  register: "2026-06-27T23:59:59+05:30",
  submit: "2026-06-28T18:00:00+05:30",
  feedback: ""
};

const titleNode = () => (
  <span style={{ whiteSpace: "nowrap" }}>
    DESIGN<span
      style={{
        background: "linear-gradient(90deg, #F97316 0%, #FB923C 50%, #FDBA74 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >-A-THON</span>
  </span>
);

export const designathonConfig = {
  themeColor: "#F97316",
  register: {
    appScriptUrl: APP_SCRIPT_REGISTER,
    closedTitle: "Registration Closed",
    titleNode: () => <>{titleNode()} Registration</>,
    subtitle: "Design. Create. Elevate.",
    submitText: "Register Now",
    successTitle: "Registration Confirmed.",
    successSubtitle: "Your creative journey begins.",
    allowFileUpload: false,
    fields: [
      ...REGISTRATION_FIELDS,
      
    ],
    get isAccepting() { return checkDeadline(DEADLINES.register); },
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
        options: ["A World Through Different Eyes", "Mind Over Machine", "Borrowed Earth", "Digital Detox", "Gaming Beyond Entertainment"]
      }
    ],
    get isAccepting() { return checkDeadline(DEADLINES.submit); },
  },
  feedback: {
    appScriptUrl: APP_SCRIPT_FEEDBACK,
    titleNode: () => <>{titleNode()} Feedback</>,
    subtitle: "Share your creative experience",
    submitText: "Submit Feedback",
    successTitle: "Feedback Received.",
    successSubtitle: "Thank you for sharing your thoughts.",
    allowFileUpload: false,
    fields: [
  {
    name: "overallExperience",
    label: "1. How would you rate your overall experience at Design-A-Thon?",
    type: "select",
    required: true,
    options: [
      "⭐⭐⭐⭐⭐ Excellent",
      "⭐⭐⭐⭐ Good",
      "⭐⭐⭐ Average",
      "⭐⭐ Fair",
      "⭐ Poor"
    ]
  },
  {
    name: "posterThemes",
    label: "2. How inspiring and relevant were the poster themes?",
    type: "select",
    required: true,
    options: [
      "⭐⭐⭐⭐⭐ Excellent",
      "⭐⭐⭐⭐ Good",
      "⭐⭐⭐ Average",
      "⭐⭐ Fair",
      "⭐ Poor"
    ]
  },
  {
    name: "anyDifficulties",
    label: "3. Did you encounter any difficulties during the event or submission process?",
    type: "select",
    required: true,
    options: [
      "Yes",
      "No"
    ]
  },
  {
    name: "issue",
    label: "4. If yes, please describe the issue you faced.",
    type: "text",
    required: false,
    placeholder: "Describe the issue (leave blank if not applicable)"
  },
  {
    name: "managementSupport",
    label: "5. How satisfied were you with the event management and support provided by the organizers?",
    type: "select",
    required: true,
    options: [
      "⭐⭐⭐⭐⭐ Excellent",
      "⭐⭐⭐⭐ Good",
      "⭐⭐⭐ Average",
      "⭐⭐ Fair",
      "⭐ Poor"
    ]
  },
  {
    name: "highlight",
    label: "6. What was the highlight of Design-A-Thon for you?",
    type: "text",
    required: true,
    placeholder: "Share your favorite part of the event"
  },
  {
    name: "suggestions",
    label: "7. What suggestions do you have for improving future editions of Design-A-Thon?",
    type: "textarea",
    required: true,
    placeholder: "Your suggestions are valuable to us"
  },
  {
    name: "otherEvents",
    label: "8. What other creative, technical, or fun events would you like CSI to organize?",
    type: "textarea",
    required: true,
    placeholder: "Hackathons, UI/UX Workshops, Coding Contests, Gaming Events, etc."
  }
],
    get isAccepting() { return checkDeadline(DEADLINES.feedback); },
  }
};
