import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { MedText, RegText } from "../../styles/fonts";
import DragAndDrop from "../DragAndDrop";
import { styles } from "../../styles/commonStyles";
import { validateInput } from "../../../helper/inputValidation";

const StepTwo = ({ stepTwoHandler, emailType, stepTwoPrevStepHandler }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [socialMediaError, setSocialMediaError] = useState("");
  const [selectedCSV, setSelectedCSV] = useState();

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

  const handleSubmit = () => {
    if (emailType === "single") {
      if (name.trim() === "") return;
      if (twitter.trim() === "" && linkedin.trim() === "") {
        setSocialMediaError("Twitter or LinkedIn url can not be empty.");
        return;
      }
    }
    stepTwoHandler({
      emailType,
      name,
      twitter,
      linkedin,
    });
    setSocialMediaError("");
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
