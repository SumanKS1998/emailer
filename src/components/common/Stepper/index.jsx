import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { RegText } from "../../styles/fonts";

export default function StepperComp({ activeStep, setActiveStep, steps }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <RegText variant="body2">{label}</RegText>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
