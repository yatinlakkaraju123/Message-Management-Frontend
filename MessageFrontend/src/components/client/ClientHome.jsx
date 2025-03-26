import { useState,useRef, useEffect } from 'react';
import "./Content.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClientNavbar from './ClientNavbar';
import TablePagination from '@mui/material/TablePagination';

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
import { retrieveAllCategories, retrieveAllSuppliersByPagination, retrieveBusinessUnits, retrieveProjects, retrieveSuppliers, retrieveSuppliersByTransactionIdWithPagination, retrieveTransactionIds, submitMessage } from '../../apis/messageClients';
import { ClipLoader } from 'react-spinners';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ClientHome() {
    // Reusable sx style for the MUI Select fields
    const navigate = useNavigate()
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
    
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [text, setText] = useState('');
  const [transactionIds,setTransactionIds] = useState([])
  const [selectedModule,setModule] =useState("")
  const [suppliers,setSuppliers] = useState([])
  const [transactionId,setTransactionId] = useState("")
  const [businessUnits,setBusinessUnits] = useState([])
  const [projects,setProjects] = useState([])
  const [file,setFile] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const [page,setPage] = useState(0)
  const [rowsPerPage,setRowsPerPage] = useState(10)
  const [totalCount,setTotalCount] = useState(0)
  const [totalPages,setTotalPages] = useState(0)
  const [sortField, setSortField] = useState("mu.user_name"); // Example field
  const [sortAsc, setSortAsc] = useState("asc");
  const [searchClicked,setSearchClicked] = useState(false)
  const [allSuppliers,setAllSuppliers] = useState(false)
  useEffect(() => {
    if(selectedModule=='Suppliers' && searchClicked && allSuppliers ){
      fetchAllSuppliersByPagination();
    }
    else{
      fetchSuppliersWithTransactionIdByPagination()
    }

  }, [rowsPerPage, page,selectedModule,searchClicked]);
  const handleChangePage = (event, newPage) => {
    
    setPage(newPage);

  };

  const handleChangeRowsPerPage = (event) => {
    console.log("changing number of rows:",event.target.value)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

  };
  const fetchCategories = async ()=>{
      try {
        const response = await retrieveAllCategories()
      setCategories(response.data)
      } catch (error) {
        console.log(error)
      }
      
  }
  const fetchBusinessUnits = async()=>{
    try {
      const response = await retrieveBusinessUnits()
      setBusinessUnits(response.data)

    } catch (error) {
      
    }
  }
  const fetchTransactionIds = async()=>{
    try {
      const response = await retrieveTransactionIds()
      const idObjectArray = response.data 
      const idArray = idObjectArray.map((item,index)=>{
        return item.lot_id
      })
      // console.log(idArray)
      setTransactionIds(idArray)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchProjects = async()=>{
    try {
      const response = await retrieveProjects()
      console.log(response.data)
      setProjects(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchBusinessUnits()
    if(selectedModule=='Suppliers'){
      fetchAllSuppliersByPagination();

    }
  },[])
  useEffect(()=>{
    console.log("suppliers:",suppliers)
  },[suppliers])
  const fetchSuppliersWithTransactionIdByPagination = async()=>{
    const response = await retrieveSuppliersByTransactionIdWithPagination(transactionId,page,rowsPerPage,sortField,sortAsc)
    setSuppliers(response.data.content)

  setTotalCount(response.data.totalElements)
  setTotalPages(response.data.totalPages)
  setSelectedRows([])
  setSelectAll(false)
  }
const fetchAllSuppliersByPagination = async()=>{
  const response = await retrieveAllSuppliersByPagination(page,rowsPerPage,sortField,sortAsc)
  setSuppliers(response.data.content)

  setTotalCount(response.data.totalElements)
  setTotalPages(response.data.totalPages)
  setSelectedRows([])
  setSelectAll(false)
}
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
      setSelectedRows(suppliers.map((row) => row.user_id)); // Check all
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
  const handleModuleChange = (event)=>{
    const selectedModule = event.target.value;
    console.log(selectedModule)
    if(selectedModule=='Suppliers'){

    }
    if(selectedModule!=""){
      fetchTransactionIds()
      setModule(selectedModule)
    }
  }
  const isFileSizeValid = (file) => {
    const MAX_SIZE_MB = 50; // Maximum allowed size in MB
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // Convert MB to Bytes

    return file.size < MAX_SIZE_BYTES;
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
  const search = async(e)=>{

    e.preventDefault();
    setSearchClicked(true)

    if(selectedModule=='Suppliers'){
      setAllSuppliers(true)
      fetchAllSuppliersByPagination()
    }
    else{
      setAllSuppliers(false)
      try {
        fetchSuppliersWithTransactionIdByPagination()
      } catch (error) {
        console.log(error)
      }
    }
    
  }
  const submit = async(e)=>{
    e.preventDefault();
    try {
      // const response = await submitMessage(file)
      // console.log(response)
      //console.log("file:",file);
      const messageObject = {
          message:text,
          status:1,
          createdBy: "USR-a427e4-05-07-2021-01",
          transactionId:transactionId
      }
     
      // console.log(messageObject)
      // setSelectedRows(['USR-a427e4-05-07-2021-01'])
      // console.log("suppliers:",selectedRows)
      setIsLoading(true)
    // console.log(file)
      const response = await submitMessage(file,messageObject,selectedRows)
      setIsLoading(false)
      setSelectedRows([])
    setSelectAll(false)
    setText('')
    setModule("")
    setFile(null)
      navigate('/view',{
        state: { showToast: true }
        // Pass a flag to trigger toast      }})
    } 
    )
     }catch (error) {
      console.log(error)
    }
  }
  const isFormValid = () => {
    // Check if all fields are filled
    // return true;
    return file !== null && text.trim() !== '' && selectedRows.length>0 && transactionId.trim()!== '';
  };


  const card = (
    <CardContent sx={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className='AllMessageButton'>
        {/* <Link to="/view">        <AccountCircleIcon/>        </Link> */}

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
            // onChange={(e)=>setFile(e.target.files[0])}

          >
            Upload
          </Button>
        </Box>
      </Box>

      {/* Choose Suppliers */}
      <Typography variant="h6" className='title' >
        Choose Suppliers
      </Typography>
      

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
        onChange={handleModuleChange}
      >
        <MenuItem value="" disabled>
          Modules
        </MenuItem>
        {modules &&
          modules.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
      </Select>
      {/* <Typography variant="subtitle2" className='small-title' sx={{ marginTop: 2 }}>
          Business Units
      </Typography>
      <Select
        variant="outlined"
        displayEmpty
        sx={selectFieldStyle}
        renderValue={(selected) =>
          selected || <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Business Units</span>
        }
        onChange={handleModuleChange}
      >
        <MenuItem value="" disabled>
          BusinessUnits
        </MenuItem>
        {businessUnits.length!=0 && businessUnits.map((item,index)=>(
          <MenuItem value={item.business_uni} key={item.business_uni}>
            {item.business_unit_name}
          </MenuItem>
        ))}
        
      </Select>
      <Typography variant="subtitle2" className='small-title' sx={{ marginTop: 2 }}>
        Projects
      </Typography>
      <Select
        variant="outlined"
        displayEmpty
        sx={selectFieldStyle}
        renderValue={(selected) =>
          selected || <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Projects</span>
        }
        onChange={handleModuleChange}
      >
        <MenuItem value="" disabled>
          Projects
        </MenuItem>
        {/* {projects.length>0 && projects.map((item,index)=>(
          <MenuItem value={item.project_id} key={index}>
            {item.project_name!=' ' && item.project_name}
            {item.project_name==' ' && item.project_id} 
          </MenuItem>
        ))} */}
     {/* </Select> */}
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
        onChange={(e)=>setTransactionId(e.target.value)}
      >
        <MenuItem value="" disabled>
          Transaction ID
        </MenuItem>
        {transactionIds.length>0 && transactionIds.map(
          (item,index)=>(
            <MenuItem value={item} key={index}>{item}</MenuItem>

          )
        )}
        
      </Select>

      <div className='AllMessageButton' style={{ marginTop: '16px' }}>
        <Button variant="contained" onClick={search} disabled={transactionId==="" && selectedModule!="Suppliers"}>Search</Button>
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
      
            {suppliers.map((supplier,index) => (
              <TableRow key={`${supplier.user_id}-${supplier.lot_id}-${index}`}>
                <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Checkbox sx={{
    color: '#012954',
    '&.Mui-checked': {
      color: '#012954',
    },
  }}
                    checked={selectedRows.includes(supplier.user_id)}
                    onChange={() => handleRowSelect(supplier.user_id)}
                  />
                </TableCell>

              <TableCell align="left"  sx={{ fontFamily: 'Poppins, sans-serif' }}>{supplier.company_name}</TableCell>
                <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>{supplier.first_name}</TableCell>
                <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>{supplier.user_name}</TableCell>
                <TableCell align="left" sx={{ fontFamily: 'Poppins, sans-serif' }}>XXX</TableCell>
              </TableRow>
            ))
            
            }
                      <TablePagination
      count={totalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
          </TableBody>
        </Table>
      </TableContainer>
  
      <br />
      <div className='Card2ButtonGroup'>
        <Button 
          variant="contained"
          sx={{ fontFamily: 'Poppins, sans-serif' }}
          onClick={submit}
          disabled={!isFormValid()}
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
    <div className='content' style={{ fontFamily: 'Poppins, sans-serif' }}>
      <ClientNavbar/>
 <div className="">
          
          {isLoading &&          <div className="loading-overlay"> <ClipLoader size={150} color="#123abc" />

          </div>
        }
        </div>     <Typography variant="h4"  className='title'>
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

export default ClientHome;
