import React from "react";

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  ...props
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontWeight: 600, marginBottom: 4 }}>
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        style={{
          padding: 8,
          borderRadius: 4,
          border: "1px solid #ccc",
          width: "100%",
        }}
        {...props}
      />
    </div>
  );
}
