import React, { useEffect, useState } from 'react'
import Navbar from '../vendor/VendorNavbar'
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
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { getUnReadMessages, readMessage } from '../../apis/messageClients';
import { userId } from '../utils/auth';
import { Link } from 'react-router-dom';
function UnReadMessages() {
    const [messages,setMessages] = useState([])
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
      const fetchUnReadMessages = async()=>{
            try {
                const response = await getUnReadMessages(userId)
                console.log(response.data)
                setMessages(response.data)
            } catch (error) {
                console.log(error)
            }
      }
      useEffect(()=>{
        fetchUnReadMessages()
      },[])
      const read = async(messageId)=>{
            try{
                console.log(messageId)
                    const response = await readMessage(messageId,userId)
                    fetchUnReadMessages()
                    window.location.reload();

            }catch(error){
                console.log(error)
            }
      }
  return (
    <div>
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
                    <TableCell align="left"className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Read</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {messages.length>0 && messages.map((msg, index) => (
                    <TableRow key={index}>
                      <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>{msg.createdBy}</TableCell>
                      <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>{formatDate(msg.createdDate)}</TableCell>
                      <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>{msg.message}</TableCell>
                      
                      <Button onClick={()=>read(msg.messageId)}><TableCell align="left">
                        <OpenInFullIcon/>
                      </TableCell></Button>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
    </div>
  )
}

export default UnReadMessages
