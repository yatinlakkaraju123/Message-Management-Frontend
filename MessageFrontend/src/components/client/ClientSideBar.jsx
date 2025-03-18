import React from "react";
import {
  Drawer,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

const NotificationSidebar = ({ openSidebar, toggleDrawer, messages, read, formatDate }) => {
  return (
    <Drawer
      anchor="right"
      open={openSidebar}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: { width: 500 },
      }}
    >
      <TableContainer
        component={Paper}
        className="TableContainer"
        sx={{ borderRadius: "12px", overflow: "hidden" }}
      >
        <Table sx={{ minWidth: 350 }} aria-label="notification table">
          <TableHead>
            <TableRow sx={{ borderTop: "1px solid #BFE7FE", backgroundColor: "#BFE7FE" }}>
              <TableCell align="left" sx={{ fontFamily: "Poppins, sans-serif" }}>From</TableCell>
              <TableCell align="left" sx={{ fontFamily: "Poppins, sans-serif" }}>Date</TableCell>
              <TableCell align="left" sx={{ fontFamily: "Poppins, sans-serif" }}>Message</TableCell>
              <TableCell align="left" sx={{ fontFamily: "Poppins, sans-serif" }}>Read</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <TableRow key={index}>
                  <TableCell align="left" sx={{ fontFamily: "Poppins, sans-serif" }}>{msg.createdBy}</TableCell>
                  <TableCell align="left" sx={{ fontFamily: "Poppins, sans-serif" }}>{formatDate(msg.createdDate)}</TableCell>
                  <TableCell align="left" sx={{ fontFamily: "Poppins, sans-serif" }}>{msg.message}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => read(msg)}>
                      <OpenInFullIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ fontFamily: "Poppins, sans-serif" }}>
                  No new notifications
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Drawer>
  );
};

export default NotificationSidebar;
