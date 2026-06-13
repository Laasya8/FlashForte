export const REGISTRATION_FIELDS = [
  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Enter your full name" },
  { name: "email", label: "Email Address", type: "email", required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone Number", type: "text", required: true, placeholder: "Enter your phone number", pattern: "^[0-9]{10}$" },
  { name: "rollNo", label: "Roll Number", type: "text", required: true, placeholder: "Enter your roll number", pattern: "^25071[aA][0-9]{2}[a-zA-Z0-9][0-9]$" },
  { name: "branch", label: "Branch", type: "select", required: true, options: ["CSE", "AIML", "DS", "CSBS", "CyS", "AIDS", "IT", "IoT", "ECE", "EEE", "Mechanical", "Civil"] },
  { name: "section", label: "Section", type: "select", required: true, options: ["A", "B", "C", "D"] },
  { name: "discordId", label: "Discord ID", type: "text", required: true, placeholder: "username#1234 or username" },
  { name: "heardAboutUs", label: "How did you hear about us?", type: "select", required: false, options: ["Social Media", "Friend", "Senior", "Other"] },
];

export const SUBMISSION_FIELDS = [
  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Enter your full name" },
  { name: "email", label: "Email Address", type: "email", required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone Number", type: "text", required: true, placeholder: "Enter your phone number", pattern: "^[0-9]{10}$" },
];

export const FEEDBACK_FIELDS = [
  { name: "rating", label: "Rating (1-5)", type: "select", required: true, options: ["1 - Poor", "2 - Fair", "3 - Good", "4 - Very Good", "5 - Excellent"] },
  { name: "feedback", label: "Feedback", type: "textarea", required: true, placeholder: "Tell us about your experience..." },
];
