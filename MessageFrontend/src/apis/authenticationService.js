import { apiClient } from "./apiClient";

export const retrieveJwtToken = (username,password)=>{
    return apiClient.post('/authenticate',{
        username,password
    })

}