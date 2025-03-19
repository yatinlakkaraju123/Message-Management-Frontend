import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import './VendorStatus.css';
import SearchIcon from '@mui/icons-material/Search';
import { NotificationContext } from '../contexts/NotificationsContext';
import { retrieveAllRepliesForMessage, readMessage } from '../../apis/messageClients';
import { vendorUserId } from '../utils/auth';
function VendorStatus() {
    const navigate = useNavigate();
    const [rows,setRows] = useState([])
    const handleBack = () => {
        navigate('/vendorview');
        
    };
    const location = useLocation()
    const {messageCount,fetchMessageCount,messages,fetchUnReadMessages} = React.useContext(NotificationContext)
 
 const {msg} = location.state || "" // Hook for navigation

   const fetchRepliesForMessage = async()=>{
         try {
             const response = await retrieveAllRepliesForMessage(msg.messageId)
             setRows(response.data)
             console.log(response.data)
         } catch (error) {
             console.log(error)
         }
     }
     const Read = async()=>{
         const response = await readMessage(msg.messageId,vendorUserId)
         fetchMessageCount()
         fetchUnReadMessages()
     }
     useEffect(()=>{
         fetchRepliesForMessage()
         Read()
         // fetchMessageCount()
         // fetchUnReadMessages()
 
     },[])

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
    return (
        <div className='content' style={{ fontFamily: 'Poppins, sans-serif' }}>
            <Box sx={{ minWidth: 275, marginBottom: 2 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Message</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            variant="outlined"
                            defaultValue={msg.message}
                            sx={{ fontFamily: 'Poppins, sans-serif' }}
                        />
                    </CardContent>
                </Card>
            </Box>

            <Card variant="outlined">
                <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Typography variant="h6">Replies</Typography>
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
                    <TableContainer component={Paper} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#BFE7FE' }}>
                                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>Company Name</TableCell>
                                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>Date</TableCell>
                                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>Status</TableCell>
                                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>Message</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.createdBy}</TableCell>
                                        <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{formatDate(row.createdDate)}</TableCell>
                                        <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.status}</TableCell>
                                        <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.message}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

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
            marginTop: '2rem',
          }}
          onClick={() => navigate('/vendorview')}
        >
          Back
        </Button>
      </div>
        </div>
    );
}

export default VendorStatus;