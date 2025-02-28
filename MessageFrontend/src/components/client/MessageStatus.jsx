import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import "./MessageStatus.css"
function MessageStatus() {
    const navigate = useNavigate(); // Hook for navigation

    const rows = [
        { companyName: 'DONGGUAN WEICHENG AUTOMATION', date: 'NA', status: 'Not Replied', message: 'NA' },
        { companyName: '9301 plant', date: 'NA', status: 'Not Replied', message: 'NA' },
        { companyName: 'BACTIVE DIGITAL SOLUTIONS', date: 'NA', status: 'Not Replied', message: 'NA' },
        { companyName: 'AUTOCOMP', date: 'NA', status: 'Not Replied', message: 'NA' },
    ];

    const handleBack = () => {
        navigate('/view'); // Navigates to the home route
    };

    return (
        <div className='content'>

            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Message</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            defaultValue="Hi"
                        />
                    </CardContent>
                </Card>
            </Box>

            <br/>

            <Card variant="outlined">
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Replies</Typography>
                        <TextField
                            size="small"
                            variant="outlined"
                            placeholder="Search"
                        />
                            <SearchIcon sx={{ color: '#A0A4A8', cursor: 'pointer' }} />

                    </div>
                    <TableContainer component={Paper} className='TableContainer'
                            sx={{ borderRadius: '12px', overflow: 'hidden' }}

                    >
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow
                                              sx={{ borderTop: '1px solid #BFE7FE', backgroundColor: '#BFE7FE' }}

                                >
                                    <TableCell className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Company Name</TableCell>
                                    <TableCell className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Date</TableCell>
                                    <TableCell className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Status</TableCell>
                                    <TableCell className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Message</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.companyName}</TableCell>
                                        <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.date}</TableCell>
                                        <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.status}</TableCell>
                                        <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.message}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            <br/>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <Button variant="container"  onClick={handleBack} id='BackButton'>Back</Button>
            </div>
        </div>
    );
}

export default MessageStatus;
