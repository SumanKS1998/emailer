import React, { useState } from "react";
import StepperComp from "../../common/Stepper";
import { Button, Container, Stack, TextField } from "@mui/material";
import { MedText, RegText } from "../../styles/fonts";

const StepOne = ({ stepOneHandler }) => {
  return (
    <Stack
      gap="16px"
      component="form"
      my={5}
      width={{ xs: "95%", md: "850px" }}
      mx="auto"
    >
      <TextField
        label={
          <RegText variant="body1" sx={styles.labelText}>
            Base Prompt
          </RegText>
        }
        multiline
        maxRows={6}
        rows={2}
      />

      <TextField
        label={
          <RegText variant="body1" sx={styles.labelText}>
            Product Placeholder
          </RegText>
        }
      />

      <TextField
        label={
          <RegText variant="body1" sx={styles.labelText}>
            CTA url
          </RegText>
        }
      />
      <Stack direction="row" gap="16px">
        <Button
          variant="contained"
          color="primary"
          onClick={() => stepOneHandler({ type: "single" })}
        >
          <MedText>Single Email</MedText>
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => stepOneHandler({ type: "bulk" })}
        >
          <MedText> Bulk Email</MedText>
        </Button>
      </Stack>
    </Stack>
  );
};
const StepTwo = ({ stepTwoHandler }) => {
  return <RegText>Steptwo</RegText>;
};
const Pages = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Enter basic details", "Enter Emails", "Submit"];
  const stepOneHandler = () => {
    setActiveStep(1);
  };
  const stepTwoHandler = () => {
    setActiveStep(2);
  };
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#111111"
    >
      <Container sx={{bgcolor:'#fff',py:10,borderRadius:5}}>
        <StepperComp
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
        />
        {activeStep === 0 && <StepOne stepOneHandler={stepOneHandler} />}
        {activeStep === 1 && <StepTwo stepOneHandler={stepTwoHandler} />}
      </Container>
    </Stack>
  );
};

export default Pages;
const styles = {
  labelText: {
    color: "#9e9e9e",
  },
};
