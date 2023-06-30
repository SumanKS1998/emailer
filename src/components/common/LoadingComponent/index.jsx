import { CircularProgress, Stack } from "@mui/material";
import React from "react";
import { MedText } from "../../styles/fonts";

const LoadingComponent = () => {
  return (
    <Stack
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        backdropFilter: "blur(20px)",
      }}
      alignItems="center"
      justifyContent="center"
      gap="16px"
    >
      <CircularProgress sx={{ color: "#ed6c02" }} />
      <MedText>Loading</MedText>
    </Stack>
  );
};

export default LoadingComponent;
