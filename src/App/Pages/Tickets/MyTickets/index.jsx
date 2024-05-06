import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react'

import {
    Box,
    Typography,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import { color } from '@/shared/utils/styles';
import Filter from '@/shared/components/Filter';
import ticketsService from '@/App/services/tickets';

const MyTickets = () => {

    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(0);
    const ticketsNumberRef = useRef(0);
    const [filter, setFilter] = useState('');
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);

    const { t } = useTranslation("translations");
    const navigate = useNavigate();

    useEffect(() => {
        ticketsService.getMyTickets()
            .then(data => {
                setTickets(tickets.concat(data))
                ticketsNumberRef.current = tickets.length
            })
            .catch(err => {
                console.error('Error fetching tickets:', err);
            });
    }, []);

    useEffect(() => {
        // Ensure we don't run this on initial render unless necessary
        const count = tickets.filter(ticket =>
            ticket.title.toLowerCase().includes(filter.toLowerCase()) ||
            ticket.projectName.toLowerCase().includes(filter.toLowerCase())
        ).length;

        ticketsNumberRef.current = count;

        console.log(tickets)

        const maxPage = Math.ceil(ticketsNumberRef.current / 10) - 1;
        console.log("Max page " + maxPage)
        console.log("Page " + page)
        if (page > maxPage) {
            setPage(maxPage > 0 ? maxPage : 0);
        } else {
            // Update button states based on current page and filtered tickets count
            setIsPrevDisabled(page <= 0);
            setIsNextDisabled(page >= maxPage);
        }
        console.log("Filtered Tickets Count:", ticketsNumberRef.current);  // Logs the updated count

    }, [filter, tickets, page]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        // ticketsNumberRef.current = tickets.filter(ticket => 
        //     ticket.title.toLowerCase().includes(updatedFilter.toLowerCase()) ||
        //     ticket.projectName.toLowerCase().includes(updatedFilter.toLowerCase())
        // ).length
        // console.log(ticketsNumberRef)
    }

    const handlePageChangeForward = () => {
        setPage(current => current + 1)
    }

    const handlePageChangeBackward = () => {
        setPage(current => current - 1)
    }

    const handleNavigateToTicketDetails = (ticketId) => {
        navigate(`/tickets/ticketDetails/${ticketId}`);
    };

    const handleNavigateToTicketEdit = (ticketId) => {
        navigate(`/tickets/editTicket/${ticketId}`);
    };

    return (
        <Box sx={{ width: '100%', marginLeft: '0.5%', boxShadow: 3, mb: 2 }}>
            <Paper>
                <Box display="flex" justifyContent="space-between" sx={{ p: 2, mt: 5, backgroundColor: `${color.third}`, color: `${color.mainBackground}` }}>
                    <Box>
                        <Typography variant="h6" gutterBottom component="div">
                            {t('tickets.allMyTickets')}
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ ml: 2 }}>
                            {t('tickets.allMyTicketsInfo')}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Filter handleFilterChange={handleFilterChange} color={color.mainBackground} />
                    </Box>
                </Box>
                <TableContainer sx={{ width: "100%" }}>
                    <Table aria-label="simple table" sx={{ width: "100%" }}>
                        <TableHead>
                            <TableRow >
                                <TableCell width="25%">{t('tickets.title')}</TableCell>
                                <TableCell width="15%">{t('tickets.projectName')}</TableCell>
                                <TableCell width="15%">{t('tickets.developer')}</TableCell>
                                <TableCell width="10%">{t('tickets.priority')}</TableCell>
                                <TableCell width="10%">{t('tickets.status')}</TableCell>
                                <TableCell width="10%">{t('tickets.type')}</TableCell>
                                <TableCell width="15%">{t('tickets.created')}</TableCell>
                                <TableCell width="5%">{t('tickets.actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ticketsNumberRef !== 0 ? tickets.filter(ticket =>
                                ticket.title.toLowerCase().includes(filter.toLowerCase()) ||
                                ticket.projectName.toLowerCase().includes(filter.toLowerCase())
                            ).map((ticket) => {
                                return (
                                    <TableRow key={ticket.id}>
                                        <TableCell>{ticket.title}</TableCell>
                                        <TableCell>{ticket.projectName}</TableCell>
                                        <TableCell>{ticket.name} {ticket.surname}</TableCell>
                                        <TableCell>{ticket.priority}</TableCell>
                                        <TableCell>{ticket.status}</TableCell>
                                        <TableCell>{ticket.type}</TableCell>
                                        <TableCell>{ticket.createdAt}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4}}>
                                                <Button onClick={() => handleNavigateToTicketDetails(ticket.id)}>
                                                    <InfoIcon />
                                                </Button>
                                                <Button onClick={() => handleNavigateToTicketEdit(ticket.id)}>
                                                    <EditIcon />
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            }).slice(0 + page * 10, 10 + page * 10) :
                                <TableRow key={0}>
                                    <TableCell>
                                        {t('tickets.noTickets')}
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="space-between" sx={{ p: 2, mt: 5 }}>
                    <Button disabled={isPrevDisabled} variant="contained" onClick={handlePageChangeBackward} sx={{ maxWidth: '133px', width: '10%', height: '40px' }} >
                        <NavigateBeforeIcon />
                    </Button>
                    <Button variant="contained" onClick={() => navigate('/tickets/commentsAttachments/19')} sx={{ maxWidth: '400px', width: '30%', height: '40px' }}>
                        {t('tickets.addTicket')}
                    </Button>
                    <Button disabled={isNextDisabled} onClick={handlePageChangeForward} variant="contained" sx={{ maxWidth: '133px', width: '10%', height: '40px' }} >
                        <NavigateNextIcon />
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default MyTickets