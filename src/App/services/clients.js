import api from '@/shared/utils/api'

const baseUrl = '/api/clients'

const getClientByUserId = async (userId) => {
    try {
        const url = `${baseUrl}/${userId}`;
        const response = await api.get(url);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching client:', error);
        throw error;
    } 
};

export default { getClientByUserId }

