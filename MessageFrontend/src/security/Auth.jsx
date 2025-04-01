import React, { useEffect } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { retrieveJwtToken } from '../apis/authenticationService'
import { apiClient } from '../apis/apiClient'
export const defaultAuthContext = createContext()
export const useAuth =() => useContext(defaultAuthContext)
function AuthProvider({children}) {

    const login = async()=>{
        try {
            const response = await retrieveJwtToken("default","123456")
            if(response.status===200){
                const token = response.data.token
                const jwtToken = `Bearer ${token}`;
                apiClient.interceptors.request.use((config) => {
                    
                    config.headers.Authorization = jwtToken;
                    return config;
                  });
                  console.log(jwtToken)
                  return true
            }
            else{
                    return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }
    // useEffect(()=>{
    //         login()
    // },[])
  return (
    <defaultAuthContext.Provider value={{login}}>
        {children}
    </defaultAuthContext.Provider>
  )
}
export default AuthProvider
