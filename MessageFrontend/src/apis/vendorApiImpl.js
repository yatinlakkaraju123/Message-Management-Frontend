import { apiClient } from "./apiClient";

export const retrieveVendorTransactionId = async()=>{
    return apiClient.get('/effigo/api/messagemanagement/vendor-transactions')
}

export const retriveVendors = async(lot_id)=>{
    return apiClient.get(`/effigo/api/messagemanagement/vendors/tid/${lot_id}`)
}
export const submitMessage = async(file,message,suppliers)=>{
    const formData = new FormData()
    const fileType = file.type || 'application/octet-stream';

    const blob = new Blob([file], { type: fileType },file.name);
    console.log("fileType:",fileType)
    formData.append('message', new Blob([JSON.stringify(message)], { type: "application/json" }));
    formData.append('suppliers', new Blob([JSON.stringify({ supplierUserId: suppliers })], { type: "application/json" }));
    formData.append('file',blob)
//   formData.append('message', (message));
    console.log("formdata:",formData)
    console.log(blob)
//  formData.append('suppliers', JSON.stringify({ supplierUserId: suppliers }));
    return apiClient.post('/effigo/api/messagemanagement/messages',formData)
}

export const retrieveVendorMessages = async(vendorUserId)=>{
    return apiClient.get(`/effigo/api/messagemanagement/vendor/messages/view/${vendorUserId}`)
}

export const retrieveVendorMessageInboxViews = async(vendorUserId)=>{
    return apiClient.get(`effigo/api/messagemanagement/vendor/messages/view/inbox/${vendorUserId}`)
}

export const createVendorReply = async(msgId,messageObject,file,fileName,userId)=>{
    const formData = new FormData()
    const fileType = file.type || 'application/octet-stream'
    const blob = new Blob([file],{type:fileType},file.name)
    formData.append('message', new Blob([JSON.stringify(messageObject)], { type: "application/json" }));
    formData.append('file',blob)
    formData.append('filename',fileName)
    formData.append('userId',userId)
    return apiClient.post(`/effigo/api/messagemanagement/reply/${msgId}`,formData)
}