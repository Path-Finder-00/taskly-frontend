import api from '@/shared/utils/api'

const baseUrl = '/api/tickets'

const getMyTickets = async () => {
    const response = await api.get(baseUrl)

    return response
}

export default { getMyTickets }

