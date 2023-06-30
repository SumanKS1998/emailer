import React, { useState } from "react";
import StepperComp from "../../common/Stepper";
import { Container, Stack } from "@mui/material";
import StepTwo from "../../common/StepTwo";
import StepOne from "../../common/StepOne";
import StepThree from "../../common/StepThree";
import { styles } from "../../styles/commonStyles";

const Pages = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [emailType, setEmailType] = useState("");
  const steps = ["Enter basic details", "Enter Emails", "Submit"];
  const stepOneHandler = (data) => {
    const { emailType, basePrompt, productPlaceholder, ctaUrl } = data;
    console.log("Step One Completed - Type: ", emailType);
    console.log("Base Prompt: ", basePrompt);
    console.log("Product Placeholder: ", productPlaceholder);
    console.log("CTA URL: ", ctaUrl);
    setActiveStep(1);
    setEmailType(emailType);
  };
  const stepTwoHandler = (data) => {
    const { name, twitter, linkedin, emailType } = data;
    console.log("Step Two Completed - Type: ", emailType);
    console.log("Name: ", name);
    console.log("Twitter: ", twitter);
    console.log("LinkedIn: ", linkedin);
    setActiveStep(2);
    setEmailType(emailType);
  };
  const stepTwoPrevStepHandler = () => {
    setActiveStep(0);
  };
  const stepThreePrevHandler = () => {
    setActiveStep(1);
  };
  return (
    <Stack sx={styles.parentContainer}>
      <Container sx={styles.container}>
        <StepperComp
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
        />
        {activeStep === 0 && <StepOne stepOneHandler={stepOneHandler} />}
        {activeStep === 1 && (
          <StepTwo
            stepTwoHandler={stepTwoHandler}
            emailType={emailType}
            stepTwoPrevStepHandler={stepTwoPrevStepHandler}
          />
        )}
        {activeStep === 2 && (
          <StepThree
            emailType={emailType}
            stepThreePrevHandler={stepThreePrevHandler}
          />
        )}
      </Container>
    </Stack>
  );
};

export default Pages;
