

import './App.css'
import '@fontsource/roboto/300.css';
import Content from './components/client/Content'
import Navbar from './components/vendor/Navbar'
import ViewMessages from './components/client/ViewMessages';
import MessageStatus from './components/client/MessageStatus';

function App() {

  return (
    <>
 <Navbar />
 {/* <Content/> */}
 <MessageStatus/>
    </>
  )
}

export default App
