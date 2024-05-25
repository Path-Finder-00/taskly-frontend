import api from '@/shared/utils/api'

const baseUrl = '/api/organizations'

const getOrganizationsId = async () => {
    const response = await api.get(baseUrl)

    return response
}

const getOrganizationByTeamId = async (teamId) => {
    try {
        const url = `${baseUrl}/${teamId}`;
        const response = await api.get(url);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching employment histories:', error);
        throw error;
    } 
};

export default { getOrganizationsId, getOrganizationByTeamId }

