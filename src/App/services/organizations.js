import api from '@/shared/utils/api'

const baseUrl = '/api/organizations'

const getOrganizations = async () => {
    const response = await api.get(baseUrl)

    return response
}

export default { getOrganizations }

