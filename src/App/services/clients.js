import api from '@/shared/utils/api'

const baseUrl = '/api/clients'

const getClientByUserId = async (userId) => {
    try {
        const url = `${baseUrl}/${userId}`;
        const response = await api.get(url);
        return response;
    } catch (error) {
        console.error('Error fetching client:', error);
        throw error;
    } 
};

const getClientsInOrganization = async () => {
    const url = `${baseUrl}/all`;
    const response = await api.get(url)

    return response
}

export default { getClientByUserId, getClientsInOrganization }

