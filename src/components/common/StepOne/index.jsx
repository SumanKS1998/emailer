import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { MedText, RegText } from "../../styles/fonts";
import { styles } from "../../styles/commonStyles";
import {validateInput} from "../../../helper/inputValidation";
const StepOne = ({ stepOneHandler }) => {
  const [basePrompt, setBasePrompt] = useState("");
  const [basePromptError, setBasePromptError] = useState("");
  const [productPlaceholder, setProductPlaceholder] = useState("");
  const [productPlaceholderError, setProductPlaceholderError] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [ctaUrlError, setCtaUrlError] = useState("");

  const handleNext = (emailType) => {
    if (
      basePrompt.trim() === "" ||
      productPlaceholder.trim() === "" ||
      ctaUrl.trim() === ""
    ) {
      return;
    }
    stepOneHandler({
      emailType,
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNext("single")}
        >
          <MedText>Single Email</MedText>
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => handleNext("bulk")}
        >
          <MedText> Bulk Email</MedText>
        </Button>
      </Stack>
    </Stack>
  );
};
export default StepOne;
