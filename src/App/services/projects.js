import api from '@/shared/utils/api'

const baseUrl = '/api/projects'

const getUserProjects = async () => {
    const response = api.get(baseUrl)

    return response
}
const getProjectById = async (projectId) => {
  try {
      const url = `${baseUrl}/${projectId}`;
      const response = api.get(url);
      console.log(response);
      return response;
  } catch (error) {
      console.error('Error fetching project details:', error);
      throw error;
  }
};

export default { getUserProjects, getProjectById }

