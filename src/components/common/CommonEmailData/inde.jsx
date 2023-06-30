import { Stack, TextField } from "@mui/material";
import { RegText } from "../../styles/fonts";
import { styles } from "../../styles/commonStyles";

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

  export default CommonEmailData