import api from '@/shared/utils/api'

const baseUrl = '/api/priorities'

const getPriorities = async () => {
    const response = await api.get(baseUrl)

    return response
}

export default { getPriorities }

