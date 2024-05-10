import api from '@/shared/utils/api'

const baseUrl = '/api/teams/members'
const createTeamUrl = '/api/teams/'

const getTeamMembers = async () => {
    const response = await api.get(baseUrl)

    return response
}

const createTeam = async (teamPayload) => {
    try {
        const response = await api.post(createTeamUrl, teamPayload)
        return response
    } catch (error) {
        console.error('Error creating team:', error);
        throw error
    }
}

export default { getTeamMembers, createTeam }

