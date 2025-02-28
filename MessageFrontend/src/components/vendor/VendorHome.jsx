import { useState, useRef } from 'react';
import "./VendorHome.css";
import { Box, Typography, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import { vendormodules } from '../utils/VendorModules';

function VendorHome() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [text, setText] = useState('');

  // Dummy Data
  const dummyData = [
    { id: 1, company: 'ABC Corp', name: 'John Doe', email: 'john.doe@abc.com', contact: '123-456-7890' },
    { id: 2, company: 'XYZ Ltd', name: 'Jane Smith', email: 'jane.smith@xyz.com', contact: '987-654-3210' },
    { id: 3, company: 'Tech Solutions', name: 'Mark Wilson', email: 'mark.wilson@tech.com', contact: '555-123-4567' },
    { id: 4, company: 'Global Supplies', name: 'Emily Johnson', email: 'emily.johnson@global.com', contact: '111-222-3333' },
  ];

  // Enforce 200-char limit for message
  const handleChange = (e) => {
    if (e.target.value.length <= 200) {
      setText(e.target.value);
    }
  };

  // Toggle individual rows
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };
  
  // Select All functionality
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]); // Uncheck all
    } else {
      setSelectedRows(dummyData.map((row) => row.id)); // Check all
    }
    setSelectAll(!selectAll);
  };

  // PDF Upload functionality
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file');
        return;
      }
      console.log('PDF file uploaded:', file.name);
      // TODO: Add your file processing/upload logic here
      event.target.value = ''; // Reset file input for future uploads
    }
  };

  // Reusable sx style for the MUI Select fields
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

  const card = (
    <CardContent sx={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className='AllMessageButton'>
        <Button variant="contained">All Messages</Button>
      </div>

      {/* Message Title */}
      <Typography variant="subtitle1"  className='small-title' sx={{ marginBottom: 1}}>
        Message
      </Typography>

      {/* Full-width Message Text Area */}
      <div style={{ position: 'relative', width: '100%' }}>
        <textarea
          id="message"
          name="message"
          placeholder="Type your Message"
          value={text}
          onChange={handleChange}
          style={{
            width: '100%',
            height: '80px',
            boxSizing: 'border-box',
            border: '1.2px solid #BDC1CA',
            borderRadius: '4px',
            background: '#FFFFFF',
            resize: 'none',
            padding: '8px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: 0,
            color: '#000000',
            outline: 'none',
          }}
        />
        {/* Character Count */}
        <span
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '12px',
            fontSize: '14px',
            color: '#BDC1CA',
          }}
        >
          {text.length}/200
        </span>
      </div>

      {/* Document Section */}
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="subtitle1"  className='small-title' sx={{ marginBottom: 1 }}>
          Document
        </Typography>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <Box
          sx={{
            border: '2px dashed #CBD5E1',
            backgroundColor: '#F8FBFF',
            borderRadius: 2,
            padding: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: 500,
            marginBottom: 2,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Drag & Drop Files here to Upload
          </Typography>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={handleUploadClick}
            sx={{
              backgroundColor: '#D2E2FA',
              color: '#2C3970',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#B4C2F0',
                boxShadow: 'none',
              },
            }}
          >
            Upload
          </Button>
        </Box>
      </Box>

      {/* Choose Suppliers */}
      <Typography variant="h6" className='title' >
        Choose Suppliers
      </Typography>
      <Typography variant="subtitle2" className='small-title' sx={{ marginTop: 1 }}>Category</Typography>
      <Select
        variant="outlined"
        displayEmpty
        sx={selectFieldStyle}
        renderValue={(selected) =>
          selected || <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Category</span>
        }
      >
        <MenuItem value="" disabled>
          Category
        </MenuItem>
        <MenuItem value="Supplier1">Supplier1</MenuItem>
        <MenuItem value="Supplier2">Supplier2</MenuItem>
      </Select>

      <Typography variant="subtitle2" className='small-title' sx={{ marginTop: 2 }}>
        Module
      </Typography>
      <Select
        variant="outlined"
        displayEmpty
        sx={selectFieldStyle}
        renderValue={(selected) =>
          selected || <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Modules</span>
        }
      >
        <MenuItem value="" disabled>
          Modules
        </MenuItem>
        {vendormodules &&
          vendormodules.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
      </Select>

      <Typography variant="subtitle2" className='small-title' sx={{ marginTop: 2 }}>
        Transaction ID
      </Typography>
      <Select
        variant="outlined"
        displayEmpty
        sx={selectFieldStyle}
        renderValue={(selected) =>
          selected || <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Transaction ID</span>
        }
      >
        <MenuItem value="" disabled>
          Transaction ID
        </MenuItem>
        <MenuItem value="Supplier1">Supplier1</MenuItem>
        <MenuItem value="Supplier2">Supplier2</MenuItem>
      </Select>

      <div className='AllMessageButton' style={{ marginTop: '16px' }}>
        <Button variant="contained">Search</Button>
      </div>
    </CardContent>
    
  );

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
          Close
        </Button>
      </div>
    </CardContent>
  );

  return (
    <div className='content' style={{ fontFamily: 'Poppins, sans-serif' }}>
     <Typography variant="h4"  className='title'>
        Send Message 
      </Typography>
      <Box sx={{ minWidth: 275 }} className="card1">
        <Card variant="outlined">{card}</Card>
      </Box>
      <br />
      <Box sx={{ minWidth: 275 }} className="card2">
        <Card variant="outlined">{card2}</Card>
      </Box>
    </div>
  );
}

export default VendorHome;
