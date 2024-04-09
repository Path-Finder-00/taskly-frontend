import api from '@/shared/utils/api'

const baseUrl = '/api/roles'

const getRoles = async () => {
    const response = api.get(baseUrl)

    return response
}

export default { getRoles }

