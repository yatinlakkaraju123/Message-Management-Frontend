import React, { createContext, useContext, useState } from 'react'
import { getUnreadMessageCount } from '../../apis/messageClients'
import {  vendorUserId } from '../utils/auth'
import { getUnReadMessagesVendor } from '../../apis/vendorApiImpl'
export const NotificationContextVendor = createContext()

const NotificationsContextVendorProvider = ({children})=> {
    const [messageCount,setMessageCount] = useState(0)
       const [messages,setMessages] = React.useState([])
    const fetchUnReadMessages = async()=>{
                try {
                    const response = await getUnReadMessagesVendor(vendorUserId)
                    // console.log(response.data)
                    setMessages(response.data)
                } catch (error) {
                    console.log(error)
                }
          }
          const fetchMessageCount = async () => {
              try {
                const response = await getUnreadMessageCount(vendorUserId);
                setMessageCount(response.data);
              } catch (error) {
                console.log(error);
              }
            };
  return (
    <NotificationContextVendor.Provider value={{messageCount,fetchMessageCount,messages,fetchUnReadMessages}}>
        {children}
    </NotificationContextVendor.Provider>
  )
}

export default NotificationsContextVendorProvider
