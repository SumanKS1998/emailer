import React, { useState } from "react";
import StepperComp from "../../common/Stepper";
import { Button, Container, Stack, TextField } from "@mui/material";
import { MedText, RegText } from "../../styles/fonts";
import { validateInput } from "../../../helper/inputValidation";
import DragAndDrop from "../../common/DragAndDrop";
import MailTable from "../../common/Table";

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
const StepTwo = ({ stepTwoHandler, emailType, stepTwoPrevStepHandler }) => {
  const [selectedCSV, setSelectedCSV] = useState();
  const renderBtns = () => {
    return (
      <Stack direction="row" gap="16px" mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={stepTwoPrevStepHandler}
        >
          <MedText>Previous Step</MedText>
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => stepTwoHandler()}
        >
          <MedText>Submit</MedText>
        </Button>
      </Stack>
    );
  };
  if (emailType === "single") {
    return (
      <Stack>
        <Stack gap="16px" mt={5}>
          <TextField
            label={
              <RegText variant="body1" sx={styles.labelText}>
                Name
              </RegText>
            }
          />
          <TextField
            label={
              <RegText variant="body1" sx={styles.labelText}>
                Twitter Handle
              </RegText>
            }
          />
          <TextField
            label={
              <RegText variant="body1" sx={styles.labelText}>
                LinkedIn URL
              </RegText>
            }
          />
        </Stack>
        {renderBtns()}
      </Stack>
    );
  }
  if (emailType === "bulk") {
    return (
      <>
        <DragAndDrop setSelectedCSV={setSelectedCSV} />
        {renderBtns()}
      </>
    );
  }
};
const CommonEmailData = () => {
  return (
    <Stack gap="16px">
      <TextField
        label={
          <RegText variant="body1" sx={styles.labelText}>
            Subject
          </RegText>
        }
      />
      <TextField
        multiline
        rows={4}
        label={
          <RegText variant="body1" sx={styles.labelText}>
            Body
          </RegText>
        }
      />
      <TextField
        label={
          <RegText variant="body1" sx={styles.labelText}>
            Enter Email
          </RegText>
        }
      />
    </Stack>
  );
};
const StepThree = ({ emailType, stepThreePrevHandler }) => {
  const [editMail, setEditMail] = useState({ show: false, email: "" });
  if (emailType === "single") {
    return (
      <>
        <CommonEmailData stepThreePrevHandler={stepThreePrevHandler} />{" "}
        <Stack direction="row" gap="16px" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={stepThreePrevHandler}
          >
            <MedText>Previous Step</MedText>
          </Button>
          <Button variant="contained" color="warning">
            <MedText>Save and Send Email</MedText>
          </Button>
          <Button variant="outlined" color="warning">
            <MedText>Save</MedText>
          </Button>
        </Stack>
      </>
    );
  }
  if (emailType === "bulk") {
    return (
      <Stack mt={3}>
        <Stack direction="row" gap="16px">
          <MailTable setEditMail={setEditMail} />
          {editMail.show && (
            <Stack width="50%" bgcolor="#fcfcfc" p={2} borderRadius={3}>
              <CommonEmailData />
              <Stack direction="row" gap="16px">
                <Button color="primary" variant="contained" sx={{ mt: 2 }}>
                  <MedText>Save</MedText>
                </Button>
                <Button
                  color="warning"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => setEditMail({ show: false, email: "" })}
                >
                  <MedText>close</MedText>
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
        <Stack direction="row" gap="16px" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={stepThreePrevHandler}
          >
            <MedText>Previous Step</MedText>
          </Button>
          <Button variant="contained" color="warning">
            <MedText>Save All</MedText>
          </Button>
        </Stack>
      </Stack>
    );
  }
};
const Pages = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [emailType, setEmailType] = useState("");
  const steps = ["Enter basic details", "Enter Emails", "Submit"];
  const stepOneHandler = (data) => {
    const { type, basePrompt, productPlaceholder, ctaUrl } = data;
    console.log("Step One Completed - Type: ", type);
    console.log("Base Prompt: ", basePrompt);
    console.log("Product Placeholder: ", productPlaceholder);
    console.log("CTA URL: ", ctaUrl);
    setActiveStep(1);
    setEmailType(type);
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
const styles = {
  parentContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    bgcolor: "#111111",
  },
  container: { bgcolor: "#fff", p: 5, borderRadius: 5 },
  labelText: {
    color: "#9e9e9e",
  },
};
