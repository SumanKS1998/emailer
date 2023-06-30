import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { MedText, RegText } from "../../styles/fonts";
import DragAndDrop from "../DragAndDrop";
import { styles } from "../../styles/commonStyles";
import { validateInput } from "../../../helper/inputValidation";
import axios from "axios";
import LoadingComponent from "../LoadingComponent";

const StepTwo = ({
  stepTwoHandler,
  emailType,
  stepTwoPrevStepHandler,
  basePrompt,
  productPlaceholder,
  ctaUrl,
  setRequestResponse,
}) => {
  const [componentLoading, setComponentLoading] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [socialMediaError, setSocialMediaError] = useState("");
  const [selectedCSV, setSelectedCSV] = useState();
  console.log(selectedCSV);
  const handleName = (e) => {
    const inputValue = e.target.value;
    validateInput(inputValue, setNameError, "Name");
    setName(inputValue);
  };

  const btnStatus = () => {
    if (emailType === "single") {
      return !name || (!twitter && !linkedin);
    }
    if (emailType === "bulk") {
      return !selectedCSV;
    }
    return false;
  };

  const handleSubmit = async () => {
    setComponentLoading(true);

    if (emailType === "single") {
      if (name.trim() === "") return;
      if (twitter.trim() === "" && linkedin.trim() === "") {
        setSocialMediaError("Twitter or LinkedIn URL cannot be empty.");
        return;
      }
    }

    const basePromptUrlElement = encodeURIComponent(basePrompt);
    const productPlaceholderUrlElement = encodeURIComponent(productPlaceholder);
    const ctaUrlUrlElement = encodeURIComponent(ctaUrl);
    const twitterUrlElement = encodeURIComponent(twitter);
    const linkedinUrlElement = encodeURIComponent(linkedin);
    const encodedName = encodeURIComponent(name);

    try {
      let url = "";

      if (emailType === "bulk") {
        url = `${
          import.meta.env.VITE_API_BASE_URL
        }generateBulkEmails?basePrompt=${basePromptUrlElement}&ellenoxPlaceholder=${productPlaceholderUrlElement}&ctaURL=${ctaUrlUrlElement}`;

        const formData = new FormData();
        formData.append("file", selectedCSV);

        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form",
          },
        });

        const dataArray = Object.values(response.data.data).flatMap(
          (innerData) => Object.values(innerData.data)
        );

        setRequestResponse(dataArray);
      }

      if (emailType === "single") {
        url = `${
          import.meta.env.VITE_API_BASE_URL
        }generateEmail?basePrompt=${basePromptUrlElement}&ellenoxPlaceholder=${productPlaceholderUrlElement}&ctaURL=${ctaUrlUrlElement}&twitterHandle=${twitterUrlElement}&linkedinUrl=${linkedinUrlElement}&userName=${encodedName}`;

        const response = await axios.post(url);

        const topLevelData = response.data.data;
        if (topLevelData) {
          const topLevelKey = Object.keys(topLevelData)[0];
          const nestedData = topLevelData[topLevelKey].data;
          if (nestedData) {
            const nestedKey = Object.keys(nestedData)[0];
            const emailData = nestedData[nestedKey];
            setRequestResponse([emailData]);
          }
        }
      }

      stepTwoHandler();
      setSocialMediaError("");
    } catch (error) {
      console.log(error);
    } finally {
      setComponentLoading(false);
    }
  };

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
          disabled={btnStatus()}
          onClick={handleSubmit}
        >
          <MedText>Next</MedText>
        </Button>
      </Stack>
    );
  };
  if (emailType === "single") {
    return (
      <Stack>
        {componentLoading && <LoadingComponent />}
        <Stack gap="16px" mt={5}>
          <TextField
            label={
              <RegText variant="body1" sx={styles.labelText}>
                Name
              </RegText>
            }
            value={name}
            onChange={handleName}
          />
          {nameError && (
            <RegText
              sx={{
                color: "red",
                fontSize: "14px",
              }}
            >
              {nameError}
            </RegText>
          )}
          <TextField
            label={
              <RegText variant="body1" sx={styles.labelText}>
                Twitter Handle
              </RegText>
            }
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
          <TextField
            label={
              <RegText variant="body1" sx={styles.labelText}>
                LinkedIn URL
              </RegText>
            }
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
          {socialMediaError && (
            <RegText
              sx={{
                color: "red",
                fontSize: "14px",
              }}
            >
              {socialMediaError}
            </RegText>
          )}
        </Stack>
        {renderBtns()}
      </Stack>
    );
  }
  if (emailType === "bulk") {
    return (
      <>
        {componentLoading && <LoadingComponent />}
        <DragAndDrop
          setSelectedCSV={setSelectedCSV}
          selectedCSV={selectedCSV}
        />
        {renderBtns()}
      </>
    );
  }
};
export default StepTwo;
