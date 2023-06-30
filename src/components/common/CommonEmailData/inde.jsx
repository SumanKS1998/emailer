import { Stack, TextField } from "@mui/material";
import { RegText } from "../../styles/fonts";
import { styles } from "../../styles/commonStyles";
import { useEffect, useState } from "react";

const CommonEmailData = ({ editMail, requestResponse }) => {
  const [selectedAccount, setSelectedAcount] = useState({});
  useEffect(() => {
    setSelectedAcount(
      requestResponse.find(
        (item) => item.TwitterHandle === editMail.twitterHandle
      )
    );
  }, [editMail]);
  return (
    <Stack gap="16px">
      <TextField
        value={selectedAccount?.subject}
        label={
          <RegText variant="body1" sx={styles.labelText}>
            Subject
          </RegText>
        }
      />
      <TextField
        value={selectedAccount?.body}
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

export default CommonEmailData;
