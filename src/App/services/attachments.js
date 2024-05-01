import api from '@/shared/utils/api'

const baseUrl = '/api/attachments'

const uploadFile = async (formData) => {
    try {
        const response = await api.post(baseUrl, formData);
        return response;
    } catch (error) {
        console.error('Error while uploading file:', error);
        throw error;
    }
}

export default { uploadFile }

