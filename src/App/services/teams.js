import api from '@/shared/utils/api'

const baseUrl = '/api/teams/members'

const getTeamMembers = async () => {
    const response = await api.get(baseUrl)

    return response
}

export default { getTeamMembers }

