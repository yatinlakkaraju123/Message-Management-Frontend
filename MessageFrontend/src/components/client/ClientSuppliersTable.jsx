import React from 'react'
import { useState,useRef, useEffect } from 'react';
import "./Content.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Table from '@mui/material/Table';
import { Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { modules } from '../utils/ClientModules';
import { retrieveAllCategories, submitMessage } from '../../apis/messageClients';
function ClientSuppliersTable() {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectAll = () => {
        if (selectAll) {
          setSelectedRows([]); // Uncheck all
        } else {
          setSelectedRows(dummyData.map((row) => row.id)); // Check all
        }
        setSelectAll(!selectAll);
      };
       // Dummy Data
  const dummyData = [
    { id: 1, company: 'ABC Corp', name: 'John Doe', email: 'john.doe@abc.com', contact: '123-456-7890' },
    { id: 2, company: 'XYZ Ltd', name: 'Jane Smith', email: 'jane.smith@xyz.com', contact: '987-654-3210' },
    { id: 3, company: 'Tech Solutions', name: 'Mark Wilson', email: 'mark.wilson@tech.com', contact: '555-123-4567' },
    { id: 4, company: 'Global Supplies', name: 'Emily Johnson', email: 'emily.johnson@global.com', contact: '111-222-3333' },
  ];
   // Toggle individual rows
   const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };
    const selectFieldStyle = {
        width: '900px',
        height: '40px',
        fontSize: '14px',
        boxSizing: 'border-box',
        // Override MUI's outlined style:
        '& .MuiOutlinedInput-notchedOutline': {
          border: '1.2px solid #BDC1CA',
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: '4px',
          backgroundColor: '#FFFFFF',
        },
      };
      const submit = async(e)=>{
        e.preventDefault();
        console.log("file:",file);
        try {
          const response = await submitMessage(file)
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
    const card2 = (
        <CardContent sx={{ fontFamily: 'Poppins, sans-serif' }}>
         <Typography
      variant="h6"
      sx={{
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '36px',
        letterSpacing: '0', // or '0px'
      }}
    >
      Selected Suppliers
    </Typography>
    
          <TableContainer
            component={Paper}
            className="TableContainer"
            sx={{ borderRadius: '12px', overflow: 'hidden' }}
          >
            <Table sx={{ minWidth: 350 }} aria-label="supplier table">
              <TableHead>
                <TableRow 
                  sx={{ borderTop: '1px solid #BFE7FE', backgroundColor: '#BFE7FE' }}
                >
                  <TableCell align="left" className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Checkbox sx={{
        color: '#012954',
        '&.Mui-checked': {
          color: '#012954',
        },
      }} checked={selectAll} onChange={handleSelectAll} />
                    Select All
                  </TableCell >
                  <TableCell align="left" className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Supplier Company</TableCell>
                  <TableCell align="left"className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Supplier Name</TableCell>
                  <TableCell align="left" className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Email Id</TableCell>
                  <TableCell align="left" className='small-title' sx={{ fontFamily: 'Poppins, sans-serif' }}>Contact</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyData.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      <Checkbox sx={{
        color: '#012954',
        '&.Mui-checked': {
          color: '#012954',
        },
      }}
                        checked={selectedRows.includes(supplier.id)}
                        onChange={() => handleRowSelect(supplier.id)}
                      />
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>{supplier.company}</TableCell>
                    <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>{supplier.name}</TableCell>
                    <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>{supplier.email}</TableCell>
                    <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>{supplier.contact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      
          <br />
          <div className='Card2ButtonGroup'>
            <Button 
              variant="contained"
              sx={{ fontFamily: 'Poppins, sans-serif' }}
              onClick={submit}
            >
              Submit
            </Button>
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
            >
              Back
            </Button>
          </div>
        </CardContent>
      );
  return (
    <div>
        <Box sx={{ minWidth: 275 }} className="card2">
        <Card variant="outlined">{card2}</Card>
      </Box>
    </div>
  )
}

export default ClientSuppliersTable
