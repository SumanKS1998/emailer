import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RegText } from "../../styles/fonts";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function MailTable({ setEditMail, requestResponse }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <Table aria-label="email table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <RegText>Name</RegText>
            </StyledTableCell>
            <StyledTableCell align="right">
              <RegText>LinkedIn URL</RegText>
            </StyledTableCell>
            <StyledTableCell align="right">
              <RegText>Twitter Handle</RegText>
            </StyledTableCell>
            <StyledTableCell align="right">
              <RegText>Edit</RegText>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requestResponse?.map((row) => (
            <StyledTableRow key={row?.Name}>
              <StyledTableCell component="th" scope="row">
                <RegText> {row?.Name}</RegText>
              </StyledTableCell>
              <StyledTableCell align="right">
                <RegText>{row?.LinkedinUrl}</RegText>
              </StyledTableCell>
              <StyledTableCell align="right">
                <RegText>{row?.TwitterHandle}</RegText>
              </StyledTableCell>
              <StyledTableCell align="right">
                <RegText
                  onClick={() =>
                    setEditMail({ show: true, twitterHandle:row?.TwitterHandle })
                  }
                  sx={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Edit
                </RegText>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
