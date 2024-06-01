import api from '@/shared/utils/api'

const baseUrl = '/api/teams/'

const getTeamMembers = async () => {
    const response = await api.get(`${baseUrl}/members`)

    return response
}

const createTeam = async (teamPayload) => {
    try {
        const response = await api.post(baseUrl, teamPayload)
        return response
    } catch (error) {
        console.error('Error creating team:', error);
        throw error
    }
}

const getTeamNames = async () => {
    const response = await api.get(`${baseUrl}/teamNames`)

    return response
}

export default { getTeamMembers, createTeam, getTeamNames }

