import { Button, Stack } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { BoldText, MedText, RegText } from "../../styles/fonts";

let firstRender = true;
function DragAndDrop({ setSelectedCSV, selectedCSV }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }
    if (!selectedCSV) {
      setErrorMessage("Select CSV file.");
    }
  }, [selectedCSV]);

  const onDrop = useCallback((acceptedFiles) => {
    setErrorMessage(""); // Reset error message
    acceptedFiles.forEach((file) => {
      if (file.type !== "text/csv") {
        setErrorMessage("Please select a CSV file.");
        return;
      }

      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading has failed");
      reader.onload = () => {
        const fileData = new File([reader.result], file.name);
        setSelectedCSV(fileData);
      };
      reader.readAsArrayBuffer(file);
      setFileName(file.name);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  return (
    <Stack
      {...getRootProps()}
      height="50%"
      alignItems="center"
      mt={5}
      gap="16px"
    >
      <input {...getInputProps()} />
      <Button
        variant="contained"
        sx={{ py: 2, px: 5, textTransform: "inherit" }}
      >
        <MedText variant="h5">Select a CSV file</MedText>
      </Button>
      <RegText>Or</RegText>
      <MedText variant="h6">Drag 'n' drop only CSV files here</MedText>
      {fileName && (
        <BoldText>
          Selected CSV file:{" "}
          <RegText component="span" ml={2}>
            {fileName}
          </RegText>
        </BoldText>
      )}
      {errorMessage && (
        <RegText style={{ color: "red" }}>{errorMessage}</RegText>
      )}
    </Stack>
  );
}

export default DragAndDrop;
