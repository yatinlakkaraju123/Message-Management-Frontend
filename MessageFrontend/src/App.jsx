

import './App.css'
import '@fontsource/roboto/300.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/vendor/Navbar';
import MessageStatus from './components/client/MessageStatus';
import ViewMessages from './components/client/ViewMessages';
import VendorStatus from './components/vendor/VendorStatus';
import VendorView from './components/vendor/VendorView';
import VendorHome from './components/vendor/VendorHome';
import ClientHome from './components/client/ClientHome';

function App() {
  return (
    <>
<Navbar/>
<Routes>

<Route path='/VendorHome' element={<VendorHome/>}></Route>
<Route path='/ClientHome' element={<ClientHome />}></Route>
      <Route path='/status' element={<MessageStatus />}></Route>
      <Route path='/view' element={<ViewMessages />}></Route>
      <Route path='/vendorstatus' element={<VendorStatus/>}/>
      <Route path='/vendorview' element={<VendorView/>}/>
</Routes>
    </>
  )
}


export default App
