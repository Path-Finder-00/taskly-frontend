import api from '@/shared/utils/api'

const baseUrl = '/api/ticket_histories'

const getTicketHistoryById = async (ticketId) => {
    try{
        const url = `${baseUrl}/${ticketId}`;
        const response = await api.get(url)
        return response; 
    } catch (error) {
        console.error('Error fetching ticket details:', error);
        throw error;
    }
}

export default { getTicketHistoryById }

