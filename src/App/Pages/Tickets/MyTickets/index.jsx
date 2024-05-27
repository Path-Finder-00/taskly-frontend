import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'

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
                setTickets(data)
                ticketsNumberRef.current = tickets.length
            })
            .catch(err => {
                console.error('Error fetching tickets:', err);
            });
    }, [tickets]);

    useEffect(() => {
        const count = tickets.filter(ticket =>
            ticket.title.toLowerCase().includes(filter.toLowerCase()) ||
            ticket.projectName.toLowerCase().includes(filter.toLowerCase())
        ).length;

        ticketsNumberRef.current = count;

        const maxPage = Math.ceil(ticketsNumberRef.current / 10) - 1;
        if (page > maxPage && maxPage !== -1) {
            setPage(maxPage > 0 ? maxPage : 0);
        } else {
            setIsPrevDisabled(page <= 0);
            setIsNextDisabled(page >= maxPage);
        }

    }, [filter, tickets, page]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
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
                            <TableRow>
                                <TableCell width="25%">
                                    <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                        {t('tickets.title')}
                                    </Typography>
                                </TableCell>
                                <TableCell width="15%">
                                    <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                        {t('tickets.projectName')}
                                    </Typography>
                                </TableCell>
                                <TableCell width="15%">
                                    <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                        {t('tickets.developer')}
                                    </Typography>
                                </TableCell>
                                <TableCell width="10%">
                                    <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                        {t('tickets.priority')}
                                    </Typography>
                                </TableCell>
                                <TableCell width="10%">
                                    <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                        {t('tickets.status')}
                                    </Typography>
                                </TableCell>
                                <TableCell width="10%">
                                    <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                        {t('tickets.type')}
                                    </Typography>
                                </TableCell>
                                <TableCell width="15%">
                                    <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                        {t('tickets.created')}
                                    </Typography>
                                </TableCell>
                                <TableCell width="5%">
                                    <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                        {t('tickets.actions')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ticketsNumberRef.current !== 0 ? tickets.filter(ticket =>
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
                                        <TableCell>{new Date(ticket.createdAt).toLocaleString('pl-PL')}</TableCell>
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
                                    <TableCell colSpan={8} align="center">
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
                    <Button variant="contained" onClick={() => navigate('/createTicket/')} sx={{ maxWidth: '400px', width: '30%', height: '40px' }}>
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