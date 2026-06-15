import React, { memo } from "react";
import {
  User,
  Mail,
  Phone,
  Hash,
  Building2,
  Users,
  Megaphone,
  LayoutGrid,
  Star,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

const ICON_MAP = {
  name: User,
  email: Mail,
  phone: Phone,
  rollNo: Hash,
  branch: Building2,
  section: Users,
  heardAboutUs: Megaphone,
  domain: LayoutGrid,
  rating: Star,
  feedback: MessageSquare,
};

export const FieldRenderer = memo(function FieldRenderer({ field, value, onChange, disabled }) {
  const IconComponent = ICON_MAP[field.name] || null;

  const commonProps = {
    id: `reg-${field.name}`,
    name: field.name,
    className: "neon-input",
    placeholder: field.placeholder || "",
    value: value || "",
    onChange: (e) => onChange(field.name, e.target.value),
    disabled: disabled,
  };

  const renderInput = () => {
    if (field.type === "textarea") {
      return <textarea {...commonProps} rows={4} />;
    }

    if (field.type === "select") {
      return (
        <div className="neon-select-container">
          <select {...commonProps} className="neon-input neon-input--select">
            <option value="" disabled>
              {field.placeholder || "Select an option"}
            </option>
            {field.options?.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="neon-select-caret"
            aria-hidden="true"
          />
        </div>
      );
    }

    return <input type={field.type || "text"} {...commonProps} />;
  };

  return (
    <div className="neon-field">
      <label htmlFor={commonProps.id} className="neon-label">
        {field.label}
      </label>
      <div className={`neon-field-wrapper ${field.type === "textarea" ? "neon-field-wrapper--textarea" : ""}`}>
        {IconComponent && (
          <IconComponent
            size={18}
            className="neon-field-icon"
            aria-hidden="true"
          />
        )}
        {renderInput()}
      </div>
    </div>
  );
});
