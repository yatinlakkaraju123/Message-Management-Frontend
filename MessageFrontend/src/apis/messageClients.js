import { apiClient } from "./apiClient";

export const retrieveAllCategories = async()=>{
    return apiClient.get('/effigo/api/messagemanagement/client/allCategories')
}