import React, { useState } from 'react';
import "./Content.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
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
import { modules } from '../utils/ModuleList';

function Content() {

  const navigate = useNavigate();
  
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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

  // Select All functionality
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]); // Uncheck all
    } else {
      setSelectedRows(dummyData.map((row) => row.id)); // Check all
    }
    setSelectAll(!selectAll);
  };

  const card = (
    <CardContent>
      <div className='AllMessageButton'>
        <Button variant="contained" onClick={() => navigate('/view')}>
          All Messages
        </Button>
      </div>

      <h3>Message</h3>
      <textarea id="message" name="message" rows="3.5" cols="215" placeholder="Type your message here..."></textarea>
      <h3>Document Uploads</h3>
      <input type='file' accept='application/pdf,application/vnd.ms-excel'/>

      <h2 className='title'>Choose Suppliers</h2>
      <h3>Category</h3>
      <Select
        variant="outlined"
        displayEmpty
        sx={{ width: '900px', height: '40px', fontSize: '14px' }}
        renderValue={(selected) => selected || <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Category</span>}
      >
        <MenuItem value="" disabled>Category</MenuItem>
        <MenuItem value="Supplier1">Supplier1</MenuItem>
        <MenuItem value="Supplier2">Supplier2</MenuItem>
      </Select>
      <h3>Module</h3>
      <Select
        variant="outlined"
        displayEmpty
        sx={{ width: '900px', height: '40px', fontSize: '14px' }}
        renderValue={(selected) => selected || <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Modules</span>}
      >
        <MenuItem value="" disabled>Modules</MenuItem>
        {modules && modules.map((item,index)=>(
                  <MenuItem value={item} key={index}>{item}</MenuItem>

        ))}
        
      </Select>
      <h3>Transaction ID</h3>
      <Select
        variant="outlined"
        displayEmpty
        sx={{ width: '900px', height: '40px', fontSize: '14px' }}
        renderValue={(selected) => selected || <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Transaction ID</span>}
      >
        <MenuItem value="" disabled>Transaction ID</MenuItem>
        <MenuItem value="Supplier1">Supplier1</MenuItem>
        <MenuItem value="Supplier2">Supplier2</MenuItem>
      </Select>
      <div className='AllMessageButton'>
        <Button variant="contained">Search</Button>
      </div>
    </CardContent>
  );

  const card2 = (
    <CardContent>
      <h2 className='title'>Selected Suppliers</h2>
      <TableContainer component={Paper} className='TableContainer'>
        <Table sx={{ minWidth: 350 }} aria-label="supplier table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
                Select All
              </TableCell>
              <TableCell align="left">Supplier Company</TableCell>
              <TableCell align="left">Supplier Name</TableCell>
              <TableCell align="left">Email Id</TableCell>
              <TableCell align="left">Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell align="left">
                  <Checkbox
                    checked={selectedRows.includes(supplier.id)}
                    onChange={() => handleRowSelect(supplier.id)}
                  />
                </TableCell>
                <TableCell align="left">{supplier.company}</TableCell>
                <TableCell align="left">{supplier.name}</TableCell>
                <TableCell align="left">{supplier.email}</TableCell>
                <TableCell align="left">{supplier.contact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  );

  return (
    <>
    <div className='content'>
      <h1 className='title'>Send Message</h1>

      <Box sx={{ minWidth: 275 }} className="card1">
        <Card variant="outlined">{card}</Card>
      </Box>

      <br/>

      <Box sx={{ minWidth: 275 }} className="card2">
        <Card variant="outlined">{card2}</Card>
      </Box>
      
      <div className='Card2ButtonGroup'>
  <Button variant="contained" className='Card2Buttons'>Send</Button>
  <Button variant="contained" className='Card2Buttons'>Close</Button>
</div>


    
    </div>
    </>
  );
}

export default Content;
