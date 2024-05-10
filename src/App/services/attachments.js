import api from '@/shared/utils/api'

const baseUrl = '/api/attachments'

const getTicketAttachments = async (ticketId) => {
    const response = api.get(`${baseUrl}/all/${ticketId}`)

    return response
}

const getAttachment = async (ticketId, name) => {
    try {
        const response = await api.get(`${baseUrl}/${ticketId}/${name}`, null, { 'Content-Type': 'application/json' }, 'blob');
    
        const fileUrl = URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error(error);
        // Handle the error
      }
}

const uploadFile = async (ticketId, formData) => {
    try {
        const response = await api.post(`${baseUrl}/${ticketId}`, formData, {'Content-Type': 'multipart/form-data'});
        return response;
    } catch (error) {
        console.error('Error while uploading file:', error);
        throw error;
    }
}

export default { getTicketAttachments, getAttachment, uploadFile }

