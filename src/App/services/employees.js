import api from '@/shared/utils/api'

const baseUrl = '/api/employees'

const getEmployeesInOrganization = async () => {
    const url = `${baseUrl}/all`;
    const response = await api.get(url)

    return response
}

export default { getEmployeesInOrganization }

