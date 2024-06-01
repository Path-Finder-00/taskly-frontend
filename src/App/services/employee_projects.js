import api from '@/shared/utils/api'

const baseUrl = '/api/employee_projects'

const getEmployeeProjectsByUserId = async (userId) => {
    try {
        const url = `${baseUrl}/${userId}`;
        const response = await api.get(url);
        return response;
    } catch (error) {
        console.error('Error fetching employee projects:', error);
        throw error;
    } 
};

export default { getEmployeeProjectsByUserId }

