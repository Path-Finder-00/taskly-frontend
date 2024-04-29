import api from '@/shared/utils/api'

const baseUrl = '/api/tickets'

const getMyTickets = async () => {
    const response = await api.get(baseUrl)

    return response
}

const createTicket = async (ticketPayload) => {
    try {
        const response = await api.post(baseUrl, ticketPayload)
        return response
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error
    }
}

const getTicketById = async (ticketId) => {
    try{
       const url = `${baseUrl}/${ticketId}`;
       const response = await api.get(url)
       console.log(response)
       return response; 
    } catch (error) {
        console.error('Error fetching ticket details:', error);
        throw error;
    }
}

export default { getMyTickets, createTicket, getTicketById }

