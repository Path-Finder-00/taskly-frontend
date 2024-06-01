import api from '@/shared/utils/api'

const baseUrl = '/api/technologies'

const getTechnologies = async () => {
    const response = await api.get(baseUrl)

    return response
}

export default { getTechnologies }

