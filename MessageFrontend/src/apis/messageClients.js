import { apiClient } from "./apiClient";

export const retrieveAllCategories = async()=>{
    return apiClient.get('/effigo/api/messagemanagement/client/allCategories')
}
export const createReply = async(msgId,messageObject,file,fileName,userId)=>{
    const formData = new FormData()
    const fileType = file.type || 'application/octet-stream'
    const blob = new Blob([file],{type:fileType},file.name)
    formData.append('message', new Blob([JSON.stringify(messageObject)], { type: "application/json" }));
    formData.append('file',blob)
    formData.append('filename',fileName)
    formData.append('userId',userId)
    return apiClient.post(`/effigo/api/messagemanagement/reply/${msgId}`,formData)
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
export const retrieveTransactionIds = async()=>{
    return apiClient.get('/effigo/api/messagemanagement/client/allTransactions')
}

export const retrieveSuppliers = async(lot_id)=>{
    return apiClient.get(`/effigo/api/messagemanagement/client/suppliers/tid/${lot_id}`)
}

export const retrieveBusinessUnits = async()=>{
    return apiClient.get('/effigo/api/messagemanagement/client/businessUnits')
}

export const retrieveProjects = async()=>{
    return apiClient.get('/effigo/api/messagemanagement/client/projects')
}


export const retrieveMessagesViews = async(userId)=>{
    return apiClient.get(`/effigo/api/messagemanagement/messages/view/${userId}`)
}

export const retrieveMessageInboxViews = async(userId)=>{
    return apiClient.get(`effigo/api/messagemanagement/messages/view/inbox/${userId}`)
}

export const downloadFile = async(fileName)=>{
    return apiClient.get(`/effigo/api/messagemanagement/client/download/${fileName}`)
}

export const updateFile = async(fileName,file)=>{
    const formData = new FormData()
    formData.append('file',file)
    return apiClient.post(`/effigo/api/messagemanagement/client/update/${fileName}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })

}

export const getUnreadMessageCount = async(userId)=>{
    return apiClient.get(`/effigo/api/messagemanagement/unreadMessagesCount/user/${userId}`)
}
export const getUnReadMessages = async(userId)=>{
    return apiClient.get(`effigo/api/messagemanagement/unreadMessages/user/${userId}`)
}

export const readMessage = async(messageId,userId)=>{
    return apiClient.post(`/effigo/api/messagemanagement/readUnreadMessage/message/${messageId}/user/${userId}`)
}

export const retrieveAllRepliesForMessage = async(messageId)=>{
    return apiClient.get(`/effigo/api/messagemanagement/client/replyView/${messageId}`)
}

