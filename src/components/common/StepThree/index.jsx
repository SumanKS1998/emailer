import { Button, Stack } from "@mui/material";
import { useState } from "react";
import MailTable from "../Table";
import CommonEmailData from "../CommonEmailData/inde";
import { MedText } from "../../styles/fonts";

const StepThree = ({   stepThreePrevHandler, requestResponse }) => {
  const [editMail, setEditMail] = useState({ show: false, twitterHandle: "" });
  return (
    <Stack mt={3}>
      <Stack direction="row" gap="16px">
        <MailTable
          setEditMail={setEditMail}
          requestResponse={requestResponse}
        />
        {editMail.show && (
          <Stack width="50%" bgcolor="#fcfcfc" p={2} borderRadius={3}>
            <CommonEmailData  editMail={editMail} requestResponse={requestResponse}/>
            <Stack direction="row" gap="16px">
              <Button color="primary" variant="contained" sx={{ mt: 2 }}>
                <MedText>Save</MedText>
              </Button>
              <Button
                color="warning"
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => setEditMail({ show: false, twitterHandle: "" })}
              >
                <MedText>close</MedText>
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
      <Stack direction="row" gap="16px" mt={4}>
        <Button variant="contained" color="primary" onClick={stepThreePrevHandler}>
          <MedText>Previous</MedText>
        </Button>
        <Button variant="contained" color="warning">
          <MedText>Save All</MedText>
        </Button>
      </Stack>
    </Stack>
  );
};
export default StepThree;
