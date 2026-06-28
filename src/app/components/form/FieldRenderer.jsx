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

    if (field.type === "checkbox-group") {
      const selectedValues = Array.isArray(value) ? value : [];
      return (
        <div className="flex flex-col gap-3 py-2 px-1">
          {field.options?.map((opt, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name={field.name}
                value={opt}
                checked={selectedValues.includes(opt)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange(field.name, [...selectedValues, opt]);
                  } else {
                    onChange(field.name, selectedValues.filter((v) => v !== opt));
                  }
                }}
                disabled={disabled}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-black/40 text-current focus:ring-1 focus:ring-current focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
              />
              <span className="text-sm text-white/80 group-hover:text-white transition-colors leading-snug">{opt}</span>
            </label>
          ))}
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
      {field.description && (
        <p className="text-white/60 text-[13px] mt-1 mb-2 whitespace-pre-line leading-relaxed">
          {field.description}
        </p>
      )}
      <div className={`neon-field-wrapper ${field.type === "textarea" ? "neon-field-wrapper--textarea" : ""} ${field.type === "checkbox-group" ? "!bg-transparent !border-none !p-0" : ""}`}>
        {IconComponent && field.type !== "checkbox-group" && (
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
