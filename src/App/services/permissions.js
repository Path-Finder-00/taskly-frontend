import api from '@/shared/utils/api'

const baseUrl = '/api/permissions'

const getPermissions = async () => {
    const response = await api.get(baseUrl)

    return response
}

export default { getPermissions }

