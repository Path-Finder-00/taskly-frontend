import api from '@/shared/utils/api'

const baseUrl = '/api/organizations'

const getOrganization = async () => {
    const response = await api.get(baseUrl)

    return response
};

const getOrganizationByTeamId = async (teamId) => {
    try {
        const url = `${baseUrl}/${teamId}`;
        const response = await api.get(url);
        return response;
    } catch (error) {
        console.error('Error fetching organizations by team id: ', error);
        throw error;
    } 
};

const getTeamsByOrganizationId = async (organizationId) => {
    try {
        const url = `${baseUrl}/teams/${organizationId}`;
        const response = await api.get(url);
        return response;
    } catch (error) {
        console.error('Error fetching teams by organization id: ', error);
        throw error;
    }
};

const getUsersInOrganization = async () => {
    try {
        const url = `${baseUrl}/users`;
        const response = await api.get(url);
        return response;
    } catch (error) {
        console.error('Error fetching all users for organization: ', error);
        throw error;
    }
}

export default { getOrganization, getOrganizationByTeamId, getTeamsByOrganizationId, getUsersInOrganization }

