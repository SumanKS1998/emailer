import React, { useState } from "react";
import StepperComp from "../../common/Stepper";
import { Container, Stack } from "@mui/material";
import StepTwo from "../../common/StepTwo";
import StepOne from "../../common/StepOne";
import StepThree from "../../common/StepThree";
import { styles } from "../../styles/commonStyles";

const Pages = () => {
  const [requestResponse, setRequestResponse] = useState({});
  const [basePrompt, setBasePrompt] = useState("");
  const [productPlaceholder, setProductPlaceholder] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [emailType, setEmailType] = useState("");
  const steps = ["Step 1", "Step 2", "Step 3"];
  const stepOneHandler = (data) => {
    const { emailType } = data;

    setActiveStep(1);
    setEmailType(emailType);
  };
  const stepTwoHandler = () => {
    setActiveStep(2);
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
        {activeStep === 0 && (
          <StepOne
            stepOneHandler={stepOneHandler}
            basePrompt={basePrompt}
            setBasePrompt={setBasePrompt}
            productPlaceholder={productPlaceholder}
            setProductPlaceholder={setProductPlaceholder}
            ctaUrl={ctaUrl}
            setCtaUrl={setCtaUrl}
          />
        )}
        {activeStep === 1 && (
          <StepTwo
            stepTwoHandler={stepTwoHandler}
            emailType={emailType}
            stepTwoPrevStepHandler={stepTwoPrevStepHandler}
            basePrompt={basePrompt}
            productPlaceholder={productPlaceholder}
            ctaUrl={ctaUrl}
            setRequestResponse={setRequestResponse}
          />
        )}
        {activeStep === 2 && (
          <StepThree
            emailType={emailType}
            stepThreePrevHandler={stepThreePrevHandler}
            requestResponse={requestResponse}
          />
        )}
      </Container>
    </Stack>
  );
};

export default Pages;
