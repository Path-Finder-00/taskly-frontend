import api from '@/shared/utils/api'

const baseUrl = '/api/projects'

const getUserProjects = async () => {
    const response = api.get(baseUrl)

    return response
}

const getUserProjectsWithRoles = async () => {
    const response = api.get(`${baseUrl}/projectsWithRoles`)

    return response
}

const getProjectById = async (projectId) => {
    try {
        const url = `${baseUrl}/${projectId}`
        const response = await api.get(url)
        return response
    } catch (error) {
        console.error('Error fetching project details:', error)
        throw error
    } 
}

const getProjectsByTeamId = async (teamId) => {
    try {
        const url = `${baseUrl}/availableProjectsByTeamId/${teamId}`;
        const response = await api.get(url);
        return response;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error;
    } 
};

const getProjectsByOrgId = async (orgId) => {
    try {
        const url = `${baseUrl}/availableProjectsByOrganizationId/${orgId}`;
        const response = await api.get(url);
        return response;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error;
    } 
};

const createProject = async (projectPayload) => {
    try {
        const response = await api.post(baseUrl, projectPayload)
        return response
    } catch (error) {
        console.error('Error creating project:', error)
        throw error
    }
}

const getProjectTickets = async (projectId) => {
    try {
        const url = `${baseUrl}/projectTickets/${projectId}`
        const response = await api.get(url)
        return response
    } catch (error) {
        console.error('Error while getting tickets for given project: ', error)
        throw error
    }
}

const editProject = async (projectId, projectPayload) => {
    try {
        const url = `${baseUrl}/${projectId}`;
        const response = await api.put(url, projectPayload)
        return response
    } catch (error) {
        console.error('Error editing project:', error);
        throw error
    }
}

export default { getUserProjects, getUserProjectsWithRoles, getProjectById, createProject, getProjectsByTeamId, getProjectsByOrgId, editProject, getProjectTickets }
