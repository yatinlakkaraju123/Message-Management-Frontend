import React from 'react'
import "./Content.css"
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
import Checkbox from '@mui/material/Checkbox';

function Content() {
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        
      ];
    const card = (
        <React.Fragment>
            <CardContent>
                <div className='AllMessageButton'>      <Button variant="contained">
                    All Messages
                </Button>
                </div>


                <h3>Message</h3>
                <textarea id="w3review" name="w3review" rows="3.5" cols="215">
                </textarea>
                <h2 className='title'> Choose Suppliers</h2>
                <h3>Category</h3>
                <Select className='select'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"

                    label="Age"

                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <div className='AllMessageButton'>      <Button variant="contained">
                    Search
                </Button></div>
            </CardContent>

        </React.Fragment>
    );
    const card2 =  (
        <React.Fragment>
            <CardContent>
            <h2 className='title'> Selected Suppliers</h2>
            <TableContainer component={Paper} className='TableContainer'>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"><Checkbox  />Select All</TableCell>
            <TableCell align="left">Supplier Company</TableCell>
            <TableCell align="left">Supplier Name</TableCell>
            <TableCell align="left">Email Id</TableCell>
            <TableCell align="left">Contact</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         
        </TableBody>
      </Table>
    </TableContainer>
              
            
            </CardContent>

        </React.Fragment>
    );
    return (
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

<div className='Card2Buttons'>      <Button variant="contained">
      Submit
  </Button></div>
  <div className='Card2Buttons'>      <Button variant="contained">
      Close
  </Button></div>
  </div> 
        </div>
    )
}

export default Content
