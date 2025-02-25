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
import './VendorStatus.css';

function VendorStatus() {
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

            {/* Message Card */}
            <Box sx={{ minWidth: 275, marginBottom: 2 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Message</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={6} // Increased height
                            variant="outlined"
                            defaultValue="Hi"
                        />
                    </CardContent>
                </Card>
            </Box>

            {/* Replies Card */}
            <Card variant="outlined">
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <Typography variant="h6">Replies</Typography>
                        <TextField
                            size="small"
                            variant="outlined"
                            placeholder="Search"
                        />
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Company Name</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Message</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.companyName}</TableCell>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>{row.message}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Buttons aligned to the right */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', gap: '1rem' }}>
            <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>
                <Button variant="contained" color="secondary">Submit</Button>
            </div>
        </div>
    );
}

export default VendorStatus;
