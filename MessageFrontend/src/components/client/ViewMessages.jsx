import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import {  Snackbar, Alert } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
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
  Typography,
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
import { createReply, downloadFile, retrieveMessageInboxViews, retrieveMessagesViews, updateFile } from '../../apis/messageClients';
import { useRef } from 'react';
import ClientNavbar from './ClientNavbar';
function ViewMessages() {
  const location = useLocation()
  const navigate = useNavigate();
  const [openPopup, setOpenPopUp] = useState(false);
    const fileInputRef = useRef(null);
    const handleUploadClick = () => {
      console.log("clicked upload")
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
      else{
        console.log("fileinput not clicked")
      }
    };
    const isFileSizeValid = (file) => {
      const MAX_SIZE_MB = 50; // Maximum allowed size in MB
      const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // Convert MB to Bytes
  
      return file.size < MAX_SIZE_BYTES;
  };
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (file.type !== 'application/pdf') {
          alert('Please select a PDF file');
          return;
        }
        if(!isFileSizeValid(file)){
          alert("please select a file with size less than 50 MB")
          return
        }
        console.log('PDF file uploaded:', file.name);
        setFile(file)
        // TODO: Add your file processing/upload logic here
        event.target.value = ''; // Reset file input for future uploads
      }
    };
    const [file,setFile] = useState(null)
  const [open,setOpen] = useState(false)
    const handleOpen = () => {
        setOpenPopUp(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpenPopUp(false);
    };
  const [replyText, setReplyText] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages,setMessages] = useState([])
  const [isInbox,setIsInbox] = useState(true)
  const handleCellClick = (message) => {
    navigate('/status',{
      state:{
        msg:message
      }
    });
  };
  const fetchViewMessages = async()=>{
    const userId = "USR-a427e4-05-07-2021-01"

    const response = await retrieveMessagesViews(userId)
    setMessages(response.data)
  }
  const fetchViewInboxMessages = async()=>{
    const userId = "USR-a427e4-05-07-2021-01"
    const response = await retrieveMessageInboxViews(userId)
    setMessages(response.data)
    console.log("MESSAGES:",response.data)

  }
  useEffect(() => {
    if (location && location.state?.showToast) {
      console.log(String(location.state.showToast))
        toast.success("Form submitted successfully!", {
            position: "top-center",
            autoClose: 3000 // 3 seconds
        });
    }
    else{
      console.log("no show")
    }
    fetchViewInboxMessages()
  }, []);
  // Open the modal with selected message
  const handleOpenDialog = (message) => {
    setSelectedMessage(message);
    setOpen(true);
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    // Extract day, month, year, hours, and minutes
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Adjust for 0 hour in 12-hour format

    // Combine everything in the desired format
    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  }
  // Close the modal
  const handleCloseDialog = () => {
    setOpen(false);
    setReplyText('');
  };
  const handleDownload = async()=>{
    const fileName = selectedMessage.documentURL.split('/').pop()
  
    const response = await downloadFile(fileName)
    const fileURL = (response.data)
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", fileName);
    link.setAttribute("target","_blank") // Optional: Set a custom filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  // Handle sending the reply (for now, just logging it)
  const handleSendReply = async() => {
    console.log('Reply sent:', replyText);
    console.log("file:",file)
    try {
      const fileName = selectedMessage.documentURL.split('/').pop()
      const msgId = selectedMessage.messageId;
      const userId = selectedMessage.userId;
      const messageObject = {
        message:replyText,
        status:1,
        createdBy: "USR-a427e4-05-07-2021-01",
        transactionId:selectedMessage.transactionID
    }
      const response = await createReply(msgId,messageObject,file,fileName,userId)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    setOpen(false);
    setReplyText('');
  };

  return (
    <>
    <ClientNavbar/>
    <div className='content'>
  
      
      
       
      <Box sx={{ minWidth: 275 }} className="card1">
        <Card variant="outlined">
          <CardContent>
            <h2 className='title'>My Messages</h2>
            <br/>
          
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div className='AllMessageButton'>
            <Button variant="contained" id="inboxButton" onClick={()=>
              {
                fetchViewInboxMessages()
                setIsInbox(true)
              }
              }>Inbox</Button>
            <Button variant="contained" id="sentButton" onClick={()=>
              {fetchViewMessages()
                setIsInbox(false)
              }
              }>Sent</Button>
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
    <SearchIcon sx={{ color: '#A0A4A8', cursor: 'pointer' }} /></div>
    </div>
            <TableContainer component={Paper} className='TableContainer'  
            sx={{ borderRadius: '12px', overflow: 'hidden' }}>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead
                
                >
                  <TableRow
                  sx={{ borderTop: '1px solid #BFE7FE', backgroundColor: '#BFE7FE' }}
                  >
                    <TableCell align="left" className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>From</TableCell>
                    <TableCell align="left"className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Date</TableCell>
                    <TableCell align="left"className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Message</TableCell>
                    <TableCell align="left"className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Sent To</TableCell>
                    <TableCell align="left"className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Replies</TableCell>
                    {isInbox && <TableCell align="left"className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Actions</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {messages.length>0 && messages.map((msg, index) => (
                    <TableRow key={index}>
                      <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>{msg.user}</TableCell>
                      <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>{formatDate(msg.dateTime)}</TableCell>
                      <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>{msg.message}</TableCell>
                      <TableCell
                        align="left"
                        style={{ color: 'blue', cursor: 'pointer' }}
                        onClick={()=>handleCellClick(msg)}
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {msg.sentTo}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: 'blue', cursor: 'pointer' }}
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                        onClick={()=>handleCellClick(msg)}
                      >
                        {msg.replies}
                      </TableCell>
                     {isInbox &&  <TableCell align="left">
                        <ViewHeadlineIcon 
                          style={{ cursor: 'pointer' }} 
                          onClick={() => handleOpenDialog(msg)}
                        />
                      </TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
          </CardContent>
        </Card>
      </Box>
      <br />
      <div>
        
        <Link to="/ClientHome"> <Button
                  variant="outlined"
                  style={{
                    marginLeft:'90%',
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
                >
                  Close
                </Button></Link>

      </div>

      {/* Reply Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} className='dialog' maxWidth="md">
        <DialogTitle>
          <Typography variant="h4" className='title' sx={{ fontFamily: 'Poppins, sans-serif' }}>
            Send Message
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ minWidth: '600px', fontFamily: 'Poppins, sans-serif' }}>
          <p><strong>From:</strong> {selectedMessage?.user}</p>
          <p><strong>Message:</strong> {selectedMessage?.message}</p>
         <p><strong>Upload:</strong> 
         
         <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}

            sx={{
              margin:'5px',
              backgroundColor: '#D2E2FA',
              color: '#2C3970',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#B4C2F0',
                boxShadow: 'none',
              },
            }}
            // onChange={(e)=>setFile(e.target.files[0])}
            onClick={handleUploadClick}

          >
          
            Upload
          </Button>
          <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
          </p>
          <p><strong>Download:</strong> <Button
            variant="contained"
            startIcon={<CloudDownloadIcon />}
            // onClick={handleUploadClick}
            sx={{
              margin:'2px',
              backgroundColor: '#D2E2FA',
              color: '#2C3970',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#B4C2F0',
                boxShadow: 'none',
              },
            }}
            // onChange={(e)=>setFile(e.target.files[0])}
            onClick={handleDownload}
          >
            Download
          </Button></p>
         
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
    </>
  );
}

export default ViewMessages;

