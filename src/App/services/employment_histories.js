import api from '@/shared/utils/api'

const baseUrl = '/api/employment_histories'

const getEmploymentHistoriesByUserId = async (userId) => {
    try {
        const url = `${baseUrl}/${userId}`;
        const response = await api.get(url);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching employment histories:', error);
        throw error;
    } 
};

export default { getEmploymentHistoriesByUserId }

