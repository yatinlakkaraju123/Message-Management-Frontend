import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Badge } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MessageIcon from '@mui/icons-material/Message';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { getUnreadMessageCount } from '../../apis/messageClients';
import { userId } from '../utils/auth';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [messageCount,setMessageCount] =React.useState(0)
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const fetchMessageCount = async()=>{
    try {
      const response = await getUnreadMessageCount(userId)
      setMessageCount(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(()=>{
    fetchMessageCount()
  },[messageCount])
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'white' }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
      <Toolbar>
      {/* Title or logo can be placed here */}
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
        {/* Navbar Title */}
      </Typography>
      {/* Notifications Icon */}
      <Link to="/unreadMessages"><IconButton size="large" aria-label="notifications" sx={{ color: 'black' }}>
        <Badge badgeContent={messageCount} color='error'>

        <NotificationsNoneIcon />

        </Badge>
      </IconButton></Link>
     <Link to="/view"> <IconButton size="large" aria-label="notifications" sx={{ color: 'black' }}>
<MessageIcon/>      </IconButton></Link>
      {/* Account Icon */}
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        sx={{ color: 'black' }}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
      </Menu>
    </Toolbar>
      </AppBar>
    </Box>
  );
}
