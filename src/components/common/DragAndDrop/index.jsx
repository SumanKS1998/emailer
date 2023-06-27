import { Button, Stack } from "@mui/material";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BoldText, MedText, RegText } from "../../styles/fonts";

function DragAndDrop({ setSelectedCSV }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");

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
        const binaryStr = reader.result;
        console.log("File name:", file.name);
        setSelectedCSV(binaryStr);
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
      {fileName && <BoldText>Selected CSV file: <RegText component='span' ml={2}>{fileName}</RegText></BoldText>}
      {errorMessage && <RegText style={{ color: "red" }}>{errorMessage}</RegText>}
    </Stack>
  );
}

export default DragAndDrop;
