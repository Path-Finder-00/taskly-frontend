import api from '@/shared/utils/api'

const baseUrl = '/api/comments'

const getTicketComments = async (ticketId) => {
    const response = api.get(`${baseUrl}/${ticketId}`)

    return response
}

const createComment = async (ticketId, commentText) => {
    const commentData = { comment: commentText }
    try {
        const response = await api.post(`${baseUrl}/${ticketId}`, commentData);
        return response
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error
    }
}

export default { getTicketComments, createComment }

