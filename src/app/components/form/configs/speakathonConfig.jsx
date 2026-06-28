import { REGISTRATION_FIELDS } from "./commonFields.js";

const APP_SCRIPT_REGISTER = "https://script.google.com/macros/s/AKfycbyxzRq8MUpd7vjoBFGuSF3t_jcHC6Tqsl0T-RBcKdUzDIKjZFEdKwexe6omGP4C7DT63A/exec"
const APP_SCRIPT_FEEDBACK = "https://script.google.com/macros/s/AKfycbw5UAvau86THf7T_kOS-iNw0LOv6ZYsuPiyrYX8nmizUyZoljp3IdQW7lXmL8aTN24/exec";

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
    closedTitle: "Registration Closed",
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
    subtitle: "Share your Speakathon experience",
    submitText: "Submit Feedback",
    successTitle: "Feedback Received.",
    successSubtitle: "Thank you for sharing your thoughts.",
    allowFileUpload: false,

    fields: [
      {
        name: "name",
        label: "Name (Optional)",
        type: "text",
        required: false,
        placeholder: "Enter your name"
      },
      {
        name: "email",
        label: "Email (Optional)",
        type: "email",
        required: false,
        placeholder: "Enter your email"
      },
      {
        name: "overallRating",
        label: "1. How would you rate your overall Speakathon experience?",
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
        name: "organizationRating",
        label: "2. How would you rate the overall organization of the event?",
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
        name: "roundsRating",
        label: "3. How engaging were the competition rounds?",
        type: "select",
        required: true,
        options: [
          "⭐⭐⭐⭐⭐ Very Engaging",
          "⭐⭐⭐⭐ Engaging",
          "⭐⭐⭐ Neutral",
          "⭐⭐ Slightly Engaging",
          "⭐ Not Engaging"
        ]
      },
      {
        name: "instructionsClear",
        label: "4. Were the round instructions clear and easy to understand?",
        type: "select",
        required: true,
        options: [
          "Yes",
          "Somewhat",
          "No"
        ]
      },
      {
        name: "favoriteRound",
        label: "5. Which round did you enjoy the most?",
        type: "text",
        required: true,
        placeholder: "Enter your favorite round"
      },
      {
        name: "roundToImprove",
        label: "6. Which round do you think could be improved, and why?",
        type: "textarea",
        required: false,
        placeholder: "Share your suggestions"
      },
      {
        name: "sufficientTime",
        label: "7. Did you feel you had sufficient time to prepare and speak?",
        type: "select",
        required: true,
        options: [
          "Yes",
          "Somewhat",
          "No"
        ]
      },
      {
        name: "difficultyLevel",
        label: "8. How would you rate the difficulty level of the rounds?",
        type: "select",
        required: true,
        options: [
          "Too Easy",
          "Just Right",
          "Too Difficult"
        ]
      },
      {
        name: "likedMost",
        label: "9. What did you like the most about Speakathon?",
        type: "textarea",
        required: false,
        placeholder: "Tell us what you enjoyed the most."
      },
      {
        name: "improvements",
        label: "10. What improvements would you suggest for future editions?",
        type: "textarea",
        required: false,
        placeholder: "Share your suggestions."
      },
      {
        name: "participateAgain",
        label: "11. Would you participate in Speakathon again?",
        type: "select",
        required: true,
        options: [
          "Definitely",
          "Maybe",
          "No"
        ]
      },
      {
        name: "recommendFriends",
        label: "12. Would you recommend Speakathon to your friends?",
        type: "select",
        required: true,
        options: [
          "Definitely",
          "Probably",
          "Not Sure",
          "Probably Not",
          "Definitely Not"
        ]
      },
      {
        name: "csiMembership",
        label: "13. CSI Membership Interest",
        type: "select",
        required: true,
        description:
          "CSI members get exclusive access to technical workshops, hackathons, mentorship, networking opportunities, volunteering experience, and much more.\n\nWould you be interested in joining CSI?",
        options: [
          "Yes",
          "Maybe",
          "No"
        ]
      },
      {
        name: "csiBranchYear",
        label: "Branch & Year",
        type: "text",
        required: false,
        condition: { field: "csiMembership", value: "Yes" },
        placeholder: "e.g. CSE 2nd Year"
      },
      {
        name: "csiContactNumber",
        label: "Contact Number",
        type: "text",
        required: false,
        condition: { field: "csiMembership", value: "Yes" },
        placeholder: "Enter your contact number"
      },
      {
        name: "additionalComments",
        label: "14. Any additional comments or suggestions?",
        type: "textarea",
        required: false,
        placeholder: "Anything else you'd like to share?"
      }
    ],

    get isAccepting() { return checkDeadline(DEADLINES.feedback); },
  }
};
