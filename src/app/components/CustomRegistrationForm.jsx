import React from "react";
import { CustomForm } from "./form/CustomForm";
import { registrationConfig } from "./form/formConfig";

export function CustomRegistrationForm() {
  return <CustomForm {...registrationConfig} />;
}
