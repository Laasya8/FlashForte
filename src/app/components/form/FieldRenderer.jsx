import React, { memo } from "react";

export const FieldRenderer = memo(function FieldRenderer({ field, value, onChange, disabled }) {
  const commonProps = {
    id: `reg-${field.name}`,
    name: field.name,
    className: "reg-input",
    placeholder: field.placeholder || "",
    value: value || "",
    onChange: (e) => onChange(field.name, e.target.value),
    disabled: disabled,
  };

  return (
    <div className="reg-field">
      <label htmlFor={commonProps.id} className="reg-label">
        {field.label}
      </label>
      
      {field.type === "textarea" ? (
        <textarea {...commonProps} rows={4} />
      ) : field.type === "select" ? (
        <select {...commonProps}>
          <option value="" disabled>
            {field.placeholder || "Select an option"}
          </option>
          {field.options?.map((opt, i) => (
             <option key={i} value={opt}>
               {opt}
             </option>
          ))}
        </select>
      ) : (
        <input type={field.type || "text"} {...commonProps} />
      )}
    </div>
  );
});
