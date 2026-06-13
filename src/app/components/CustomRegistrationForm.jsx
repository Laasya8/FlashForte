import React from "react";
import { CustomForm } from "./form/CustomForm";
import { ideathonConfig } from "./form/configs/ideathonConfig.jsx";

export function CustomRegistrationForm() {
  return <CustomForm {...ideathonConfig.register} />;
}
