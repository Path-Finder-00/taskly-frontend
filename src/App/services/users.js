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

const getUserById = async (userId) => {
    try {
        const url = `${baseUrl}/${userId}`;
        const response = await api.get(url)
        return response
    } catch (error) {
        console.log('Error fetching user:'. error)
        throw error
    }
}

const editUser = async (userId, userPayload) => {
    try {
        const url = `${baseUrl}/${userId}`;
        const response = await api.put(url, userPayload)
        return response
    } catch (error) {
        console.error('Error editing user:', error);
        throw error
    }
}

export default { createUser, getUserById, editUser }

