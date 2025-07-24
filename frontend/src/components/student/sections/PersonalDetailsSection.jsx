import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import WcIcon from "@mui/icons-material/Wc";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const PersonalDetailsSection = ({ formData, handleChange, fieldErrors }) => (
  <>
    <div className="section-title"> Personal Details:</div>
    <TextField
      label="Full Name"
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
      error={!!fieldErrors.fullName}
      helperText={fieldErrors.fullName}
    />
    <div className="form-row">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date of Birth"
          value={formData.dob || null}
          onChange={(date) =>
            handleChange({ target: { name: "dob", value: date } })
          }
          slotProps={{
            textField: {
              name: "dob",
              required: true,
              margin: "normal",
              error: !!fieldErrors.dob,
              helperText: fieldErrors.dob,
              className: "half-width dob-picker",
            },
          }}
        />
      </LocalizationProvider>
      <TextField
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
        select
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <WcIcon />
            </InputAdornment>
          ),
        }}
        error={!!fieldErrors.gender}
        helperText={fieldErrors.gender}
        className="half-width"
      >
        <MenuItem value="">Select</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
    </div>
    <TextField
      label="Phone Number"
      name="phoneNumber"
      value={formData.phoneNumber}
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
      error={!!fieldErrors.phoneNumber}
      helperText={fieldErrors.phoneNumber}
    />
    <TextField
      label="Secondary Email"
      name="secondaryEmail"
      value={formData.secondaryEmail}
      onChange={handleChange}
      fullWidth
      margin="normal"
      error={!!fieldErrors.secondaryEmail}
      helperText={fieldErrors.secondaryEmail}
    />
    <TextField
      label="Aadhaar Number"
      name="aadhaar"
      value={formData.aadhaar}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      error={!!fieldErrors.aadhaar}
      helperText={fieldErrors.aadhaar}
    />
  </>
);

export default PersonalDetailsSection;
