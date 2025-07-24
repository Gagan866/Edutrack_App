import React from "react";
import Button from "@mui/material/Button";
import PersonalDetailsSection from "./sections/PersonalDetailsSection";
import AddressSection from "./sections/AddressSection";
import AcademicSection from "./sections/AcademicSection";
import ParentDetailsSection from "./sections/ParentDetailsSection";

const steps = [
  "Personal Details",
  "Address Details",
  "Academic Details",
  "Parent Details",
];

const SectionForm = ({
  activeStep,
  formData,
  handleChange,
  fieldErrors,
  handleNext,
  handleBack,
  handleSubmit,
  loading,
  animating,
}) => {
  switch (activeStep) {
    case 0:
      return (
        <div className={`step-content fade${animating ? " animating" : ""}`}>
          <PersonalDetailsSection
            formData={formData}
            handleChange={handleChange}
            fieldErrors={fieldErrors}
          />
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        </div>
      );
    case 1:
      return (
        <div className={`step-content fade${animating ? " animating" : ""}`}>
          <AddressSection
            formData={formData}
            handleChange={handleChange}
            fieldErrors={fieldErrors}
          />
          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        </div>
      );
    case 2:
      return (
        <div className={`step-content fade${animating ? " animating" : ""}`}>
          <AcademicSection
            formData={formData}
            handleChange={handleChange}
            fieldErrors={fieldErrors}
          />
          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        </div>
      );
    case 3:
      return (
        <div className={`step-content fade${animating ? " animating" : ""}`}>
          <ParentDetailsSection
            formData={formData}
            handleChange={handleChange}
            fieldErrors={fieldErrors}
          />
          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Submit"}
          </Button>
        </div>
      );
    default:
      return null;
  }
};

export default SectionForm;
