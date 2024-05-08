import api from '@/shared/utils/api'

const baseUrl = '/api/users'

const createUser = async (userPayload) => {
    try {
        const response = await api.post(baseUrl, userPayload)
        return response
    } catch (error) {
        console.error('Error creating user:', error);
        throw error
    }
}

export default { createUser }

