// Navbar.js
import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link } from "react-router-dom";
import { getUnreadMessageCount } from "../../apis/messageClients";
import { userId } from "../utils/auth";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [messageCount, setMessageCount] = React.useState(0);
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [notifications, setNotifications] = React.useState([
    "New order received",
    "Server maintenance scheduled",
    "New message from client",
  ]);

  // Handle menu open and close
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fetch unread messages count
  const fetchMessageCount = async () => {
    try {
      const response = await getUnreadMessageCount(userId);
      setMessageCount(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchMessageCount();
  }, [messageCount]);

  // Toggle sidebar
  const toggleDrawer = (status) => () => {
    setOpenSidebar(status);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
      <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none" }}>
        <Toolbar>
          {/* Navbar Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black" }}>
            {/* Add your title or logo */}
          </Typography>

          {/* Notifications Icon with Sidebar */}
          <IconButton size="large" aria-label="notifications" onClick={toggleDrawer(true)} sx={{ color: "black" }}>
            <Badge badgeContent={messageCount} color="error">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          {/* Message Icon */}
          <Link to="/view">
            <IconButton size="large" aria-label="messages" sx={{ color: "black" }}>
              <MessageIcon />
            </IconButton>
          </Link>

          {/* Account Icon */}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ color: "black" }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Notification Sidebar Drawer */}
      <Drawer
        anchor="right"
        open={openSidebar}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 500 }, // Sidebar width
        }}
      >
        <List>
          <ListItem>
            <ListItemText
              primary="Notifications"
              primaryTypographyProps={{ variant: "h6", fontWeight: "bold" }}
            />
          </ListItem>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={notification} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No new notifications" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
}
