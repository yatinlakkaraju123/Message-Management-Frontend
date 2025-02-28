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
import './VendorView.css';
import './VendorHome.css';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';

function VendorView() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleCellClick = () => {
    navigate('/vendorstatus');
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>

              <div className='AllMessageButton'>
                <Button variant="contained" id="inboxButton">Inbox</Button>
                <Button variant="contained" id="sentButton">Sent</Button>
              </div>



              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '250px',
                  height: '25px',
                  borderRadius: '8px',
                  border: '1px solid #D2E0E6',
                  padding: '8px 12px',
                  backgroundColor: '#FFFFFF',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                <TextField
                  size="small"
                  variant="standard"
                  placeholder="Search"
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                  sx={{ fontFamily: 'Poppins, sans-serif' }}
                />
                <SearchIcon sx={{ color: '#A0A4A8', cursor: 'pointer' }} />
              </div>
            </div>


            <TableContainer
              component={Paper}
              className="TableContainer"
              sx={{ borderRadius: '12px', overflow: 'hidden' }}
            >
              <Table sx={{ minWidth: 350 }} aria-label="messages table">
                <TableHead>
                  <TableRow
                    sx={{ borderTop: '1px solid #BFE7FE', backgroundColor: '#BFE7FE' }}
                  >
                    <TableCell
                      align="left"
                      className="small-title"
                      sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      From
                    </TableCell>
                    <TableCell
                      align="left"
                      className="small-title"
                      sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      align="left"
                      className="small-title"
                      sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Message
                    </TableCell>
                    <TableCell
                      align="left"
                      className="small-title"
                      sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Sent To
                    </TableCell>
                    <TableCell
                      align="left"
                      className="small-title"
                      sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Replies
                    </TableCell>
                    <TableCell
                      align="left"
                      className="small-title"
                      sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      from: 'amin s',
                      date: '18/02/2025 18:36',
                      message: 'Hi',
                      sentTo: 4,
                      replies: 0,
                    },
                    {
                      from: 'amin s',
                      date: '19/11/2024 11:36',
                      message: 'Hi',
                      sentTo: 1,
                      replies: 1,
                    },
                  ].map((msg, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="left"
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {msg.from}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {msg.date}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {msg.message}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          color: 'blue',
                          cursor: 'pointer',
                        }}
                        onClick={handleCellClick}
                      >
                        {msg.sentTo}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          color: 'blue',
                          cursor: 'pointer',
                        }}
                        onClick={handleCellClick}
                      >
                        {msg.replies}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                      >
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
      <div className='Card2ButtonGroup'>
        <Button
          variant="outlined"
          style={{
            width: '120px',
            height: '48px',
            borderRadius: '12px',
            padding: '12px 32px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0',
            textAlign: 'center',
            textTransform: 'none',
            color: '#012954',
            borderColor: '#012954',
            borderWidth: '2px',
            borderStyle: 'solid',
            backgroundColor: '#ffffff',
          }}
          onClick={() => navigate('/vendorhome')}
        > 
          Close 
        </Button>
      </div>


      {/* Reply Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} className='dialog' maxWidth="md">
        <DialogTitle>
          <Typography variant="h4" className='title' sx={{ fontFamily: 'Poppins, sans-serif' }}>
            Send Message
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ minWidth: '600px', fontFamily: 'Poppins, sans-serif' }}>
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
            sx={{
              width: '800px',
              fontFamily: 'Poppins, sans-serif',
              borderRadius: '8px',
            }}
            InputProps={{
              style: {
                fontFamily: 'Poppins, sans-serif',
              },
            }}
          />
        </DialogContent>
        <DialogActions className='Card2ButtonGroup'>
          <Button
            variant="outlined"
            style={{
              width: '120px',
              height: '48px',
              borderRadius: '12px',
              padding: '12px 32px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '0',
              textAlign: 'center',
              textTransform: 'none',
              color: '#012954',
              borderColor: '#012954',
              borderWidth: '2px',
              borderStyle: 'solid',
              backgroundColor: '#ffffff',
            }}
            onClick={handleCloseDialog}
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              backgroundColor: '#012954',
              color: '#FFFFFF',
              padding: '12px 32px',
              borderRadius: '12px',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '24px',
              textTransform: 'none',
            }}
            onClick={handleSendReply}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default VendorView;

