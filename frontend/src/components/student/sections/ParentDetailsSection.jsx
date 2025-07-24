import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneIcon from "@mui/icons-material/Phone";

const ParentDetailsSection = ({ formData, handleChange, fieldErrors }) => (
  <>
    <div className="section-title"> Parent Details:</div>
    <TextField
      label="Father's Name"
      name="fatherName"
      value={formData.fatherName}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      error={!!fieldErrors.fatherName}
      helperText={fieldErrors.fatherName}
    />
    <TextField
      label="Mother's Name"
      name="motherName"
      value={formData.motherName}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      error={!!fieldErrors.motherName}
      helperText={fieldErrors.motherName}
    />
    <TextField
      label="Parent's Mobile Number"
      name="parentMobile"
      value={formData.parentMobile}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PhoneIcon />
          </InputAdornment>
        ),
      }}
      error={!!fieldErrors.parentMobile}
      helperText={fieldErrors.parentMobile}
    />
    <div style={{ marginTop: 24 }}>
      <label
        htmlFor="profileImage"
        className="section-title"
        style={{ marginBottom: 0 }}
      >
        Profile Image (JPEG/PNG, max 50 KB):
      </label>
      <input
        type="file"
        id="profileImage"
        name="profileImage"
        accept="image/jpeg, image/png"
        onChange={handleChange}
        style={{ marginLeft: 12 }}
      />
      {fieldErrors.profileImage && (
        <span style={{ color: "red", fontSize: "0.9em", marginLeft: 8 }}>
          {fieldErrors.profileImage}
        </span>
      )}
    </div>
  </>
);

export default ParentDetailsSection;
