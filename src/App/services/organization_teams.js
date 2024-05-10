import api from '@/shared/utils/api'

const baseUrl = '/api/organization_teams'

const getTeamsByOrganizationId = async (organizationId) => {
    try {
        const url = `${baseUrl}/${organizationId}`;
        const response = await api.get(url);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error;
    } 
};

export default { getTeamsByOrganizationId }

