import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import './Content.css';

function MessageStatus() {
    const rows = [
        { companyName: 'DONGGUAN WEICHENG AUTOMATION', date: 'NA', status: 'Not Replied', message: 'NA' },
        { companyName: '9301 plant', date: 'NA', status: 'Not Replied', message: 'NA' },
        { companyName: 'BACTIVE DIGITAL SOLUTIONS', date: 'NA', status: 'Not Replied', message: 'NA' },
        { companyName: 'AUTOCOMP', date: 'NA', status: 'Not Replied', message: 'NA' },
    ];

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
                    </div>
                    <TableContainer component={Paper} className='TableContainer'>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
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
            <br/>

            <div className='Card2ButtonGroup'>
                <div className='Card2Buttons'><Button variant="contained" color="primary">Back</Button></div>
            </div>
        </div>
    );
}

export default MessageStatus;
