import api from '@/shared/utils/api'

const baseUrl = '/api/employees'

// const getEmployeeById = async (employeeId) => {
//     try {
//         const url = `${baseUrl}/${employeeId}`;
//         const response = await api.get(url)
//         console.log(response)
//         return response;
//     } catch (error) {
//         console.error('Error fetching Employee details:', error);
//         throw error;
//     }
// }

const getEmployeesInOrganization = async () => {
    const url = `${baseUrl}/all`;
    const response = await api.get(url)

    return response
}

export default { getEmployeesInOrganization }

