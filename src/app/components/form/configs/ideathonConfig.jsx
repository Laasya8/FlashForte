import { REGISTRATION_FIELDS, SUBMISSION_FIELDS, FEEDBACK_FIELDS } from "./commonFields.js";

const APP_SCRIPT_REGISTER = "https://script.google.com/macros/s/AKfycbzfbIYA1v9AqX72wakbggFXr_h7CdsmBy2CP86AkQgorBfwP6BWQ7QkJgoAvn1X2rtM/exec";
const APP_SCRIPT_SUBMIT = "https://script.google.com/macros/s/AKfycby92JV7yHOHVy3BG1OFC23MMNtSrCyFB4x9tHLIUFo_F2EOodJrND3FX7xUl1qV-kbqiQ/exec";
const APP_SCRIPT_FEEDBACK = "URL_PLACEHOLDER_IDEATHON_FEEDBACK";

const checkDeadline = (deadlineStr) => {
  if (!deadlineStr) return true;
  return new Date() < new Date(deadlineStr);
};

// Set your deadlines here (ISO format, e.g., "2026-06-25T23:59:59+05:30"). 
// Leave empty to accept indefinitely.
const DEADLINES = {
  register: "2026-06-27T23:59:59+05:30",
  submit: "2026-06-27T23:59:59+05:30",
  feedback: ""
};

const titleNode = () => (
  <span style={{ whiteSpace: "nowrap" }}>
    IDEA<span style={{ color: "#f5c518" }}>THON</span>
  </span>
);

export const ideathonConfig = {
  themeColor: "#EAB308",
  register: {
    appScriptUrl: APP_SCRIPT_REGISTER,
    closedTitle: "Registration Closed",
    titleNode: () => <>{titleNode()} Registration</>,
    subtitle: "Think. Ideate. Pitch.",
    submitText: "Register Now",
    successTitle: "Registration Confirmed.",
    successSubtitle: "Your innovation journey begins.",
    allowFileUpload: false,
    fields: [
      ...REGISTRATION_FIELDS,
    ],
    get isAccepting() { return checkDeadline(DEADLINES.register); },
    showOtherEventsOnSuccess: true,
    forteId: "ideathon",
  },
  submit: {
    appScriptUrl: APP_SCRIPT_SUBMIT,
    titleNode: () => <>{titleNode()} Submission</>,
    subtitle: "Upload your idea pitch deck",
    submitText: "Submit Pitch",
    successTitle: "Submission Received.",
    successSubtitle: "Your pitch deck has been recorded.",
    infoText: "If you'd like to resubmit, please fill the form again with the new file.",
    allowFileUpload: true,
    acceptedTypes: ".pdf,.ppt,.pptx",
    acceptedMimeTypes: ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    fields: [
      ...SUBMISSION_FIELDS.filter(
        field => field.name !== "email" && field.name !== "phone"
      ),

      {
        name: "domain",
        label: "Select Domain",
        type: "select",
        required: true,
        options: [
          "Sustainability & Environment",
          "Smart Logistics Solutions",
          "Digital Governance",
          "Disaster Management",
          "Gaming for Impact",
          "Digital Trust & Integrity"
        ]
      },
    ],
    get isAccepting() { return checkDeadline(DEADLINES.submit); },
  },
  feedback: {
    appScriptUrl: APP_SCRIPT_FEEDBACK,
    titleNode: () => <>{titleNode()} Feedback</>,
    subtitle: "Share your innovation experience",
    submitText: "Submit Feedback",
    successTitle: "Feedback Received.",
    successSubtitle: "Thank you for sharing your thoughts.",
    allowFileUpload: false,
    fields: FEEDBACK_FIELDS,
    get isAccepting() { return checkDeadline(DEADLINES.feedback); },
  }
};