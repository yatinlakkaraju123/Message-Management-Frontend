

import './App.css'
import '@fontsource/roboto/300.css';
import Content from './components/client/SubmitMessage';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/vendor/Navbar';
import MessageStatus from './components/client/MessageStatus';
import ViewMessages from './components/client/ViewMessages';
import VendorStatus from './components/vendor/VendorStatus';
import VendorView from './components/vendor/VendorView';

function App() {
  return (
    <>
<Navbar/>
<Routes>
<Route path='/' element={<Content />}></Route>
      <Route path='/status' element={<MessageStatus />}></Route>
      <Route path='/view' element={<ViewMessages />}></Route>
      <Route path='/vendorstatus' element={<VendorStatus/>}/>
      <Route path='/vendorview' element={<VendorView/>}/>
</Routes>
    </>
  )
}


export default App
