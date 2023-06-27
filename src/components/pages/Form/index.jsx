import React, { useState } from "react";
import StepperComp from "../../common/Stepper";
import { Button, Container, Stack, TextField } from "@mui/material";
import { MedText, RegText } from "../../styles/fonts";
import { validateInput } from "../../../helper/inputValidation";

const StepOne = ({ stepOneHandler }) => {
  const [basePrompt, setBasePrompt] = useState("");
  const [basePromptError, setBasePromptError] = useState("");
  const [productPlaceholder, setProductPlaceholder] = useState("");
  const [productPlaceholderError, setProductPlaceholderError] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [ctaUrlError, setCtaUrlError] = useState("");

  const handleNext = () => {
    if (
      basePrompt.trim() === "" ||
      productPlaceholder.trim() === "" ||
      ctaUrl.trim() === ""
    ) {
      return;
    }
    stepOneHandler({
      type: "single",
      basePrompt,
      productPlaceholder,
      ctaUrl,
    });
  };

  const handleBasePrompt = (e) => {
    const inputValue = e.target.value;
    validateInput(inputValue, setBasePromptError, "Base Prompt");
    setBasePrompt(inputValue);
  };

  const handleProductPlaceholder = (e) => {
    const inputValue = e.target.value;
    validateInput(
      inputValue,
      setProductPlaceholderError,
      "Product Placeholder"
    );
    setProductPlaceholder(inputValue);
  };

  const handleCtaUrl = (e) => {
    const inputValue = e.target.value;
    validateInput(inputValue, setCtaUrlError, "CTA Url");
    setCtaUrl(inputValue);
  };

  return (
    <Stack gap="16px" component="form" my={5} mx="auto">
      <TextField
        label={
          <RegText variant="body1" sx={styles.labelText}>
            Base Prompt
          </RegText>
        }
        multiline
        maxRows={6}
        rows={2}
        value={basePrompt}
        onChange={handleBasePrompt}
      />
      {basePromptError && (
        <RegText
          sx={{
            color: "red",
            fontSize: "14px",
          }}
        >
          {basePromptError}
        </RegText>
      )}
      <TextField
        label={
          <RegText variant="body1" sx={styles.labelText}>
            Product Placeholder
          </RegText>
        }
        value={productPlaceholder}
        onChange={handleProductPlaceholder}
      />
      {productPlaceholderError && (
        <RegText
          sx={{
            color: "red",
            fontSize: "14px",
          }}
        >
          {productPlaceholderError}
        </RegText>
      )}
      <TextField
        label={
          <RegText variant="body1" sx={styles.labelText}>
            CTA url
          </RegText>
        }
        value={ctaUrl}
        onChange={handleCtaUrl}
      />
      {ctaUrlError && (
        <RegText
          sx={{
            color: "red",
            fontSize: "14px",
          }}
        >
          {ctaUrlError}
        </RegText>
      )}
      <Stack direction="row" gap="16px">
        <Button variant="contained" color="primary" onClick={handleNext}>
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
  const stepOneHandler = (data) => {
    const { type, basePrompt, productPlaceholder, ctaUrl } = data;
    console.log("Step One Completed - Type: ", type);
    console.log("Base Prompt: ", basePrompt);
    console.log("Product Placeholder: ", productPlaceholder);
    console.log("CTA URL: ", ctaUrl);
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
      <Container sx={{ bgcolor: "#fff", p: 5, borderRadius: 5 }}>
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
