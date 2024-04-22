import api from '@/shared/utils/api'

const baseUrl = '/api/types'

const getTypes = async () => {
    const response = await api.get(baseUrl)

    return response
}

export default { getTypes }

