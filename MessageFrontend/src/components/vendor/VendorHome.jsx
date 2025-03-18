import { useState, useRef, useEffect } from 'react';
import './VendorHome.css';
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
import { useNavigate } from 'react-router-dom';
import VendorNavbar from './VendorNavbar';
import { retrieveVendorTransactionId, retriveVendors, submitMessage } from '../../apis/vendorApiImpl';
import { vendormodules } from '../utils/VendorModules';

function VendorHome() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [text, setText] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [module, setModule] = useState('');
  const [file, setFile] = useState(null);
  const [transactionIds, setTransactionIds] = useState([]);
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchTransactionIds();
  }, []);

  const fetchTransactionIds = async () => {
    try {
      const response = await retrieveVendorTransactionId();
      if (response.data && Array.isArray(response.data)) {
        setTransactionIds(response.data);
      } else {
        console.error('Invalid data format from API');
      }
    } catch (error) {
      console.error('Error fetching transaction IDs:', error);
    }
  };

  const search = async (e) => {
    e.preventDefault();
    console.log('Transaction ID:', transactionId); // Confirm the correct value
    try {
      const response = await retriveVendors(transactionId);
      setSelectedRows([]);
      setSelectAll(false);
      setVendors(response.data || []);
      console.log('Vendors:', response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const messageObject = {
        message: text,
        status: 1,
        createdBy: 'SUSR-d3af-12-07-2024-11',
        transactionId: transactionId,
      };

      const response = await submitMessage(file, messageObject, selectedRows);
      console.log('Response:', response);
      setSelectedRows([]);
      setSelectAll(false);
      setText('');
      setModule('');
      setFile(null);
      navigate('/vendorview', {
        state: { showToast: true },
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]); // Uncheck all
    } else {
      setSelectedRows(vendors.map((row) => row.user_id)); // Check all
    }
    setSelectAll(!selectAll);
  };

  // PDF Upload functionality
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const isFileSizeValid = (file) => {
    const MAX_SIZE_MB = 50; // Maximum allowed size in MB
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // Convert MB to Bytes

    return file.size < MAX_SIZE_BYTES;
};

const isFormValid = () => {
  // Check if all fields are filled
  // return true;
  return file !== null && text.trim() !== '' && selectedRows.length>0 && transactionId.trim()!== '';
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
    
    // console.log("file:",file)
    // console.log('PDF file uploaded:', file.name);
    setFile(file)
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
      <div className="AllMessageButton">
        <Button variant="contained" onClick={() => navigate('/vendorview')}>
          All Messages
        </Button>
      </div>

      <Typography variant="subtitle1" className="small-title" sx={{ marginBottom: 1 }}>
        Message
      </Typography>

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

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="subtitle1" className="small-title" sx={{ marginBottom: 1 }}>
          Document
        </Typography>
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

      <Typography variant="subtitle2" className="small-title" sx={{ marginTop: 2 }}>
        Module
      </Typography>
      <Select
        value={module}
        onChange={(e) => setModule(e.target.value)}
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

      <Typography variant="subtitle2" className="small-title" sx={{ marginTop: 2 }}>
        Transaction ID
      </Typography>
      <Select
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
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
       {transactionIds.length > 0 &&
  transactionIds.map((item, index) => (
    <MenuItem value={item.lot_id} key={index}>
   {item.lot_id}
    </MenuItem>
  ))}
      </Select>

      <div className="AllMessageButton" style={{ marginTop: '16px' }}>
        <Button variant="contained" onClick={search} disabled={transactionId===""}>
          Search
        </Button>
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
          letterSpacing: '0',
        }}
      >
        Selected Vendors
      </Typography>

      <TableContainer component={Paper} className="TableContainer" sx={{ borderRadius: '12px', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 350 }} aria-label="supplier table">
          <TableHead>
            <TableRow sx={{ borderTop: '1px solid #BFE7FE', backgroundColor: '#BFE7FE' }}>
              <TableCell align="left" className="small-title">
                <Checkbox
                  sx={{
                    color: '#012954',
                    '&.Mui-checked': {
                      color: '#012954',
                    },
                  }}
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                Select All
              </TableCell>
              <TableCell align="left" className="small-title">
                Vendor Name
              </TableCell>
              <TableCell align="left" className="small-title">
                Email ID
              </TableCell>
              <TableCell align="left" className="small-title">
                Contact
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors.map((vendor, index) => (
              <TableRow key={vendor.user_id}>
                <TableCell align="left">
                  <Checkbox
                    sx={{
                      color: '#012954',
                      '&.Mui-checked': {
                        color: '#012954',
                      },
                    }}
                    checked={selectedRows.includes(vendor.user_id)}
                    onChange={() => handleRowSelect(vendor.user_id)}
                  />
                </TableCell>
                <TableCell align="left">{vendor.first_name}</TableCell>
                <TableCell align="left">{vendor.user_name}</TableCell>
                <TableCell align="left">{vendor.mobile}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <div className="Card2ButtonGroup">
        <Button variant="contained" onClick={submit}  disabled={!isFormValid()}>
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
    <div className="content" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <VendorNavbar />
      <Typography variant="h4" className="title">
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
