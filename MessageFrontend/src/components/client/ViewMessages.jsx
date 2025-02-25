import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import './ViewMessages.css';

function ViewMessages() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleCellClick = () => {
    navigate('/status');
  };

  // Open the modal with selected message
  const handleOpenDialog = (message) => {
    setSelectedMessage(message);
    setOpen(true);
  };

  // Close the modal
  const handleCloseDialog = () => {
    setOpen(false);
    setReplyText('');
  };

  // Handle sending the reply (for now, just logging it)
  const handleSendReply = () => {
    console.log('Reply sent:', replyText);
    setOpen(false);
    setReplyText('');
  };

  return (
    <div className='content'>
      <Box sx={{ minWidth: 275 }} className="card1">
        <Card variant="outlined">
          <CardContent>
            <h2 className='title'>My Messages</h2>
            <br />
            <input type='text' className='search' placeholder='Search' />
            <Button variant="contained" id="inboxButton">Inbox</Button>
            <Button variant="contained" id="sentButton">Sent</Button>
            <TableContainer component={Paper} className='TableContainer'>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">From</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Message</TableCell>
                    <TableCell align="left">Sent To</TableCell>
                    <TableCell align="left">Replies</TableCell>
                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[{
                    from: "amin s",
                    date: "18/02/2025 18:36",
                    message: "Hi",
                    sentTo: 4,
                    replies: 0
                  }, {
                    from: "amin s",
                    date: "19/11/2024 11:36",
                    message: "Hi",
                    sentTo: 1,
                    replies: 1
                  }].map((msg, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{msg.from}</TableCell>
                      <TableCell align="left">{msg.date}</TableCell>
                      <TableCell align="left">{msg.message}</TableCell>
                      <TableCell
                        align="left"
                        style={{ color: 'blue', cursor: 'pointer' }}
                        onClick={handleCellClick}
                      >
                        {msg.sentTo}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: 'blue', cursor: 'pointer' }}
                        onClick={handleCellClick}
                      >
                        {msg.replies}
                      </TableCell>
                      <TableCell align="left">
                        <ViewHeadlineIcon 
                          style={{ cursor: 'pointer' }} 
                          onClick={() => handleOpenDialog(msg)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            Showing 1 to 2 of 2 rows
          </CardContent>
        </Card>
      </Box>
      <br />
      <div>
        <Button variant="contained" className='Card2Buttons' id='submitButton2'>Submit</Button>
        
        <Button variant="contained" className='Card2Buttons' onClick={()=>navigate("/ClientHome")}>Close</Button>

      </div>

      {/* Reply Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} className='dialog' maxWidth="md">
        <DialogTitle>Reply to Message</DialogTitle>
        <DialogContent sx={{ minWidth: '600px' }}>
          <p><strong>From:</strong> {selectedMessage?.from}</p>
          <p><strong>Message:</strong> {selectedMessage?.message}</p>
          <TextField
  autoFocus
  margin="dense"
  label="Your Reply"
  multiline
  rows={10}
  value={replyText}
  onChange={(e) => setReplyText(e.target.value)}
  style={{ width: '800px' }} // Adjust the width value as needed
/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSendReply} variant="contained">Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewMessages;

