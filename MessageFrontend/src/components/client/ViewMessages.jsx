import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import './ViewMessages.css';

function ViewMessages() {
  const navigate = useNavigate();

  const handleCellClick = () => {
    navigate('/status');
  };

  const card2 = (
    <React.Fragment>
      <CardContent>
        <h2 className='title'>My Messages</h2>
        <br />
        <input type='text' className='search' placeholder='Search' />
        <TableContainer component={Paper} className='TableContainer'>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">From</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Message</TableCell>
                <TableCell align="left">Sent To</TableCell>
                <TableCell align="left">Replies</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">amin s</TableCell>
                <TableCell align="left">18/02/2025 18:36</TableCell>
                <TableCell align="left">Hi</TableCell>
                <TableCell 
                  align="left" 
                  style={{ color: 'blue', cursor: 'pointer' }} 
                  onClick={handleCellClick}
                >
                  4
                </TableCell>
                <TableCell 
                  align="left" 
                  style={{ color: 'blue', cursor: 'pointer' }} 
                  onClick={handleCellClick}
                >
                  0
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">amin s</TableCell>
                <TableCell align="left">19/11/2024 11:36</TableCell>
                <TableCell align="left">Hi</TableCell>
                <TableCell 
                  align="left" 
                  style={{ color: 'blue', cursor: 'pointer' }} 
                  onClick={handleCellClick}
                >
                  1
                </TableCell>
                <TableCell 
                  align="left" 
                  style={{ color: 'blue', cursor: 'pointer' }} 
                  onClick={handleCellClick}
                >
                  1
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        Showing 1 to 2 of 2 rows
      </CardContent>
    </React.Fragment>
  );

  return (
    <div className='content'>
      <Box sx={{ minWidth: 275 }} className="card1">
        <Card variant="outlined">{card2}</Card>
      </Box>
      <br />
      <div>
        <Button variant="contained" className='Card2Buttons'>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ViewMessages;
