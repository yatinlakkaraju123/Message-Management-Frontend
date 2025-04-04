

import './App.css'
import '@fontsource/roboto/300.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/vendor/VendorNavbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewMessages from './components/client/ViewMessages';
import VendorStatus from './components/vendor/VendorStatus';
import VendorView from './components/vendor/VendorView';
import VendorHome from './components/vendor/VendorHome';
import ClientHome from './components/client/ClientHome';
import MessageStatus from './components/client/MessageStatus';
import UnReadMessages from './components/client/UnReadMessages';
import NotificationsContextProvider from './components/contexts/NotificationsContext';
import NotificationsContextVendorProvider from './components/contexts/NotificationContextVendor';
import AuthProvider from './security/Auth';
import { useEffect } from 'react';
import { useAuth } from './security/Auth';
function App() {
  
  return (
    <>
    <AuthProvider>
<NotificationsContextProvider>
  <NotificationsContextVendorProvider>
  <ToastContainer />
<Routes>
<Route path='/ClientHome' element={<ClientHome />}></Route>
      <Route path='/status' element={<MessageStatus />}></Route>
      <Route path='/view' element={<ViewMessages />}></Route>
      <Route path="/unreadMessages" element={<UnReadMessages/>}></Route>
      <Route path='/VendorHome' element={<VendorHome/>}></Route>
      <Route path='/vendorstatus' element={<VendorStatus/>}/>
      <Route path='/vendorview' element={<VendorView/>}/>

</Routes>
</NotificationsContextVendorProvider>
</NotificationsContextProvider>
</AuthProvider>
    </>
  )
}


export default App
