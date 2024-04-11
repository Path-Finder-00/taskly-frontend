import api from '@/shared/utils/api'

const baseUrl = '/api/projects'

const getUserProjects = async () => {
    const response = api.get(baseUrl)

    return response
}

const getProjectById = async (projectId) => {
  try {
      const url = `${baseUrl}/${projectId}`;
      const response = await api.get(url);
      console.log(response);
      return response;
  } catch (error) {
      console.error('Error fetching project details:', error);
      throw error;
  }
};

const createProject = async (projectPayload) => {
    try {
        const response = await api.post(baseUrl, projectPayload);
        return response;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}

export default { getUserProjects, getProjectById, createProject}

