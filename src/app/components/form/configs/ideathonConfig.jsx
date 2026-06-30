import { REGISTRATION_FIELDS, SUBMISSION_FIELDS, FEEDBACK_FIELDS } from "./commonFields.js";

const APP_SCRIPT_REGISTER = "https://script.google.com/macros/s/AKfycbzfbIYA1v9AqX72wakbggFXr_h7CdsmBy2CP86AkQgorBfwP6BWQ7QkJgoAvn1X2rtM/exec";
const APP_SCRIPT_SUBMIT = "https://script.google.com/macros/s/AKfycby92JV7yHOHVy3BG1OFC23MMNtSrCyFB4x9tHLIUFo_F2EOodJrND3FX7xUl1qV-kbqiQ/exec";
const APP_SCRIPT_FEEDBACK = "https://script.google.com/macros/s/AKfycbyCoTqy0tPeQbKETQNtEUFAjg5dsr-nNIXtCr_oW1TvZcJLky_zL1TisXhTmZEyEaxf/exec";

const checkDeadline = (deadlineStr) => {
  if (!deadlineStr) return true;
  return new Date() < new Date(deadlineStr);
};

// Set your deadlines here (ISO format, e.g., "2026-06-25T23:59:59+05:30"). 
// Leave empty to accept indefinitely.
const DEADLINES = {
  register: "2026-06-27T23:59:59+05:30",
  submit: "2026-06-27T23:59:59+05:30",
  feedback: "2026-06-30T21:00:00+05:30",
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
    fields: [
      {
        name: "timeAllotted",
        label: "1. How would you rate the time allotted for presenting your idea to the judges?",
        type: "select",
        required: true,
        options: [
          "⭐⭐⭐⭐⭐ Excellent",
          "⭐⭐⭐⭐ Good",
          "⭐⭐⭐ Average",
          "⭐⭐ Needs Improvement",
          "⭐ Poor"
        ]
      },
      {
        name: "durationAppropriate",
        label: "2. Was the duration of the ideathon appropriate?",
        type: "select",
        required: true,
        options: [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree"
        ]
      },
      {
        name: "usefulness",
        label: "3. How useful was this ideathon for your learning and overall experience?",
        type: "select",
        required: true,
        options: [
          "Extremely Useful",
          "Very Useful",
          "Moderately Useful",
          "Slightly Useful",
          "Not Useful"
        ]
      },
      {
        name: "feedbackSatisfaction",
        label: "4. How satisfied are you with the feedback provided by the judges?",
        type: "select",
        required: true,
        options: [
          "Very Satisfied",
          "Satisfied",
          "Neutral",
          "Dissatisfied",
          "Very Dissatisfied"
        ]
      },
      {
        name: "overallExperience",
        label: "5. How would you rate your overall experience at FlashForte 2k26 – Ideathon?",
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
        name: "futureEvents",
        label: "6. Which types of events would you like CSI to organize in the future?",
        type: "text",
        required: true,
        placeholder: "e.g., Hackathons, Workshops, etc."
      },
      {
        name: "improvements",
        label: "7. What improvements would you suggest for future ideathons?",
        type: "textarea",
        required: true,
        placeholder: "Share any suggestions regarding event structure, judging, timelines, communication, platform, etc."
      },
      {
        name: "favoritePart",
        label: "8. What was your favorite part of the event?",
        type: "text",
        required: false,
        placeholder: "Tell us what you enjoyed the most."
      },
      {
        name: "recommendFriends",
        label: "9. Would you recommend this event to your friends?",
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
        name: "futureCsiEvents",
        label: "10. Are you interested in participating in future CSI events?",
        type: "select",
        required: true,
        options: [
          "Yes",
          "No"
        ]
      },
      {
        name: "csiMembership",
        label: "11. CSI Membership Interest",
        type: "select",
        required: true,
        description: "CSI members get exclusive access to: Industry exposure, Technical workshops, Hackathons, Mentorship and guidance, Leadership and volunteering opportunities, Event organizing experience, Networking with peers and professionals.\n\nWould you be interested in joining CSI?",
        options: [
          "Yes",
          "No"
        ]
      },
      {
        name: "csiFullName",
        label: "Full Name",
        type: "text",
        required: false,
        condition: { field: "csiMembership", value: "Yes" },
        placeholder: "Enter your full name"
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
        placeholder: "Enter your contact number",
        pattern: "^[0-9]{10}$"
      }
    ],
    get isAccepting() { return checkDeadline(DEADLINES.feedback); },
  }
};