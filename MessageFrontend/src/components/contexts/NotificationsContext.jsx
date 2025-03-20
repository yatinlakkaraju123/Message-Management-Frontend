import React, { createContext, useContext, useState } from 'react'
import { getUnReadMessages,getUnreadMessageCount } from '../../apis/messageClients'
import { userId } from '../utils/auth'
export const NotificationContext = createContext()

const NotificationsContextProvider = ({children})=> {
    const [messageCount,setMessageCount] = useState(0)
       const [messages,setMessages] = React.useState([])
    const fetchUnReadMessages = async()=>{
                try {
                    const response = await getUnReadMessages(userId)
                    // console.log(response.data)
                    setMessages(response.data)
                } catch (error) {
                    console.log(error)
                }
          }
          const fetchMessageCount = async () => {
              try {
                const response = await getUnreadMessageCount(userId);
                setMessageCount(response.data);
                console.log("count:",response.data)
              } catch (error) {
                console.log(error);
              }
            };
  return (
    <NotificationContext.Provider value={{messageCount,fetchMessageCount,messages,fetchUnReadMessages}}>
        {children}
    </NotificationContext.Provider>
  )
}

export default NotificationsContextProvider
