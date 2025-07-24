import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
 
const semesters = ["1", "2", "3", "4", "5", "6"];
const years = ["1", "2", "3"];
const religions = ["Hindu", "Muslim", "Christian", "Other"];
const categories = ["Gen", "SC", "ST", "Cat-1", "2A", "2B", "3A", "3B"];
const admissionYears = ["2023", "2024", "2025"];
const admissionTypes = [
  "Regular",
  "Repeater",
  "Lateral Entry-PUC",
  "Lateral Entry-ITI",
];
const eduBoards = ["SSLC", "CBSE", "ICSE", "OPEN"];

const AcademicSection = ({ formData, handleChange, fieldErrors }) => (
  <>
    <div className="section-title"> Academic Details:</div>
    <TextField
      label="Department"
      name="department"
      value={formData.department}
      select
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
    >
      <MenuItem value="Computer Science & Engineering">
        Computer Science & Engineering
      </MenuItem>
    </TextField>
    <div className="form-row">
      <TextField
        label="Year"
        name="year"
        value={formData.year}
        select
        onChange={handleChange}
        required
        margin="normal"
        className="half-width"
      >
        {years.map((y) => (
          <MenuItem key={y} value={y}>
            {y}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Semester"
        name="semester"
        value={formData.semester}
        select
        onChange={handleChange}
        required
        margin="normal"
        className="half-width"
      >
        {semesters.map((s) => {
          let disabled = false;
          if (formData.year === "1" && !["1", "2"].includes(s)) disabled = true;
          if (formData.year === "2" && !["3", "4"].includes(s)) disabled = true;
          if (formData.year === "3" && !["5", "6"].includes(s)) disabled = true;
          return (
            <MenuItem key={s} value={s} disabled={disabled}>
              {s}
            </MenuItem>
          );
        })}
      </TextField>
    </div>
    <div className="form-row">
      <TextField
        label="Religion"
        name="religion"
        value={formData.religion}
        select
        onChange={handleChange}
        required
        margin="normal"
        className="half-width"
      >
        {religions.map((r) => (
          <MenuItem key={r} value={r}>
            {r}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Category"
        name="category"
        value={formData.category}
        select
        onChange={handleChange}
        required
        margin="normal"
        className="half-width"
      >
        {categories.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </TextField>
    </div>
    <div className="form-row">
      <TextField
        label="Caste"
        name="caste"
        value={formData.caste}
        onChange={handleChange}
        required
        margin="normal"
        error={!!fieldErrors.caste}
        helperText={fieldErrors.caste}
        className="half-width"
      />
      <TextField
        label="SSLC Marks"
        name="sslcMarks"
        value={formData.sslcMarks}
        onChange={handleChange}
        required
        margin="normal"
        error={!!fieldErrors.sslcMarks}
        helperText={fieldErrors.sslcMarks}
        className="half-width"
      />
    </div>
    <div className="form-row">
      <TextField
        label="Registration Number"
        name="regNumber"
        value={formData.regNumber}
        onChange={handleChange}
        margin="normal"
        error={!!fieldErrors.regNumber}
        helperText={fieldErrors.regNumber}
        className="half-width"
      />
      <TextField
        label="Admission Year"
        name="admissionYear"
        value={formData.admissionYear}
        select
        onChange={handleChange}
        required
        margin="normal"
        className="half-width"
      >
        {admissionYears.map((a) => (
          <MenuItem key={a} value={a}>
            {a}
          </MenuItem>
        ))}
      </TextField>
    </div>
    <div className="form-row">
      <TextField
        label="Admission Type"
        name="admissionType"
        value={formData.admissionType}
        select
        onChange={handleChange}
        required
        margin="normal"
        className="half-width"
      >
        {admissionTypes.map((t) => (
          <MenuItem key={t} value={t}>
            {t}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Education Board"
        name="eduBoard"
        value={formData.eduBoard}
        select
        onChange={handleChange}
        required
        margin="normal"
        className="half-width"
      >
        {eduBoards.map((b) => (
          <MenuItem key={b} value={b}>
            {b}
          </MenuItem>
        ))}
      </TextField>
    </div>
    {/* Keep other fields (SSP ID, NSP ID, APAAR ID) as full width below */}
    <TextField
      label="SSP ID"
      name="sspId"
      value={formData.sspId}
      onChange={handleChange}
      fullWidth
      margin="normal"
      error={!!fieldErrors.sspId}
      helperText={fieldErrors.sspId}
    />
    <TextField
      label="NSP ID"
      name="nspId"
      value={formData.nspId}
      onChange={handleChange}
      fullWidth
      margin="normal"
      error={!!fieldErrors.nspId}
      helperText={fieldErrors.nspId}
    />
    <TextField
      label="APAAR ID"
      name="apaarId"
      value={formData.apaarId}
      onChange={handleChange}
      fullWidth
      margin="normal"
      error={!!fieldErrors.apaarId}
      helperText={fieldErrors.apaarId}
    />
  </>
);

export default AcademicSection;
