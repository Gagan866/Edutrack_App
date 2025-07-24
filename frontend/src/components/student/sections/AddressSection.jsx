import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MenuItem from "@mui/material/MenuItem";

const districts = [
  "Bagalkote",
  "Ballari (Bellary)",
  "Belagavi (Belgaum)",
  "Bengaluru Rural",
  "Bengaluru Urban",
  "Bidar",
  "Chamarajanagar",
  "Chikkaballapur",
  "Chikkamagaluru (Chikmagalur)",
  "Chitradurga",
  "Dakshina Kannada (Mangaluru)",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi (Gulbarga)",
  "Kodagu (Coorg)",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru (Mysore)",
  "Raichur",
  "Ramanagara",
  "Shivamogga (Shimoga)",
  "Tumakuru (Tumkur)",
  "Udupi",
  "Uttara Kannada (Karwar)",
  "Vijayapura (Bijapur)",
  "Yadgir",
  "Vijayanagara (recently carved out from Ballari)",
];

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const AddressSection = ({ formData, handleChange, fieldErrors }) => (
  <>
    <div className="section-title"> Address:</div>
    <TextField
      label="Address Line"
      name="address"
      value={formData.address}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <HomeIcon />
          </InputAdornment>
        ),
      }}
      error={!!fieldErrors.address}
      helperText={fieldErrors.address}
    />
    <div className="form-row">
      <TextField
        label="Pincode"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        required
        margin="normal"
        error={!!fieldErrors.pincode}
        helperText={fieldErrors.pincode}
        className="half-width"
      />
      <TextField
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationCityIcon />
            </InputAdornment>
          ),
        }}
        error={!!fieldErrors.city}
        helperText={fieldErrors.city}
        className="half-width"
      />
    </div>
    <div className="form-row">
      <TextField
        label="District"
        name="district"
        value={formData.district}
        onChange={handleChange}
        required
        margin="normal"
        select
        error={!!fieldErrors.district}
        helperText={fieldErrors.district}
        className="half-width"
      >
        <MenuItem value="">Select</MenuItem>
        {districts.map((d) => (
          <MenuItem key={d} value={d}>
            {d}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        required
        margin="normal"
        select
        error={!!fieldErrors.state}
        helperText={fieldErrors.state}
        className="half-width"
      >
        <MenuItem value="">Select</MenuItem>
        {states.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>
    </div>
  </>
);

export default AddressSection;
