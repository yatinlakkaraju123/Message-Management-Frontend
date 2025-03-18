import { apiClient } from "./apiClient";

export const retrieveVendorTransactionId = async()=>{
    return apiClient.get('/effigo/api/messagemanagement/transaction-id')
}