import api from '@/shared/utils/api'

const baseUrl = '/api/statuses'

const getStatuses = async () => {
    const response = await api.get(baseUrl)

    return response
}

export default { getStatuses }

