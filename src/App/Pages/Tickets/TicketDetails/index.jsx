import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
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
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { color } from '@/shared/utils/styles';
import Filter from '@/shared/components/Filter';
import ticketsService from '@/App/services/tickets';
import statusesService from '@/App/services/statuses';
import prioritiesService from '@/App/services/priorities';
import projectsService from '@/App/services/projects';
import typesService from '@/App/services/types';
import ticketHistoriesService from '@/App/services/ticket_histories';

const TicketDetails = () => {

    const { t } = useTranslation("translations");
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [types, setTypes] = useState([]);
    const [projects, setProjects] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [ticketHistory, setTicketHistory] = useState([]);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [page, setPage] = useState(0);
    const ticketsNumberRef = useRef(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ticketData = await ticketsService.getTicketById(ticketId);
                setTicket(ticketData);

                if (ticketData.projectId) {
                    const projectData = await projectsService.getProjectById(ticketData.projectId);
                    setProjects(projectData);
                    setEmployees(projectData.employees)
                }

                const statusesData = await statusesService.getStatuses();
                setStatuses(statusesData);

                const prioritiesData = await prioritiesService.getPriorities();
                setPriorities(prioritiesData);

                const typesData = await typesService.getTypes();
                setTypes(typesData);

                const historyData = await ticketHistoriesService.getTicketHistoryById(ticketId);
                setTicketHistory(historyData)
            } catch (err) {
                console.error("Error fetching data: ", err);
            }
        };

        fetchData();
    }, [ticketId]);

    useEffect(() => {
        ticketsNumberRef.current = ticketHistory.length - 1;

        const maxPage = Math.ceil(ticketsNumberRef.current / 2) - 1;
        if (page > maxPage && maxPage !== -1) {
            setPage(maxPage > 0 ? maxPage : 0);
        } else {
            setIsPrevDisabled(page <= 0);
            setIsNextDisabled(page >= maxPage);
        }
    }, [ticketHistory, page]);

    const getEmployeeNameById = (id) => {
        const employeeHistory = employees.find(e => e.id === id)
        if (employeeHistory) {
            return `${employeeHistory?.user.name} ${employeeHistory?.user.surname}`
        }
        else {
            return "-"
        }
    }

    const getStatusNameById = (id) => {
        const status = statuses.find(s => s.id === id);
        return status?.status
    };

    const getPriorityNameById = (id) => {
        const priority = priorities.find(p => p.id === id);
        return priority?.priority
    };

    const handlePageChangeForward = () => {
        setPage(current => current + 1)
    }

    const handlePageChangeBackward = () => {
        setPage(current => current - 1)
    }

    const handleNavigateToTicketEdit = (ticketId) => {
        navigate(`/tickets/editTicket/${ticketId}`);
    };

    const handleNavigateToCommentsAttachments = (ticketId) => {
        navigate(`/tickets/commentsAttachments/${ticketId}`);
    };
    
    if (!ticket) {
        return <div>{t('tickets.loading')}</div>
    }

    return (
        <Box sx={{ marginLeft: '0.5%' }}>
            <Paper>
                <Box display="flex" justifyContent="space-between" sx={{ p: 2, mt: 5, backgroundColor: `${color.third}`, color: `${color.mainBackground}` }}>
                    <Box>
                        <Typography variant="h6" gutterBottom component="div">
                            {t('tickets.details')}
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ ml: 2 }}>
                            <Box display='flex' sx={{ gap: 2 }}>
                                <Button variant="contained" onClick={() => navigate('/tickets')}>
                                    {t('tickets.backToList')}
                                </Button>
                                <Button variant="contained" onClick={() => handleNavigateToTicketEdit(ticket.id)}>
                                    {t('tickets.edit')}
                                </Button>
                                <Button variant="contained" onClick={() => handleNavigateToCommentsAttachments(ticket.id)}>
                                    {t('tickets.comments')}
                                </Button>
                            </Box>
                        </Typography>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ maxWidth: "20%", wordWrap: "break-word" }}>
                                    <Typography variant="h6">
                                        {t('tickets.title')}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ ml: 2, color: `${color.textDark}`, wordBreak: 'break-word' }} >
                                        {ticket.title}
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ maxWidth: "80%", wordWrap: "break-word", }}>
                                    <Typography variant="h6">
                                        {t('tickets.description')}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ ml: 2, color: `${color.textDark}`, wordBreak: 'break-word' }} >
                                        {ticket.description}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">
                                        {t('tickets.developer')}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ ml: 2, color: `${color.textDark}` }} >
                                        {getEmployeeNameById(ticket.ticket_histories[ticket.ticket_histories.length - 1].employeeId)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        {t('tickets.submitter')}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ ml: 2, color: `${color.textDark}` }} >
                                        {ticket.user_tickets[ticket.user_tickets.length - 1].user.name} {ticket.user_tickets[ticket.user_tickets.length - 1].user.surname}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">
                                        {t('dashboard.project')}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ ml: 2, color: `${color.textDark}` }} >
                                        {projects?.name || 'Project name not found'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        {t('tickets.priority')}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ ml: 2, color: `${color.textDark}` }} >
                                        {/* {priorities.find(priority => priority.id === ticket.ticket_histories[0].priorityId)?.priority || 'Priority not found'} */}
                                        {getPriorityNameById(ticket.ticket_histories[ticket.ticket_histories.length - 1].priorityId)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">
                                        {t('tickets.status')}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ ml: 2, color: `${color.textDark}` }} >
                                        {/* {statuses.find(status => status.id === ticket.ticket_histories[0].statusId)?.status || 'Status not found'} */}
                                        {getStatusNameById(ticket.ticket_histories[ticket.ticket_histories.length - 1].statusId)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        {t('tickets.type')}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ ml: 2, color: `${color.textDark}` }} >
                                        {types.find(type => type.id === ticket.typeId)?.type || 'Type not found'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">
                                        {t('tickets.created')}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ ml: 2, color: `${color.textDark}` }} >
                                        {new Date(ticket.createdAt).toLocaleString('pl-PL')}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        {t('tickets.updated')}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ ml: 2, color: `${color.textDark}` }} >
                                        {new Date(ticket.ticket_histories[0].createdAt).toLocaleString('pl-PL')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Paper>
                <Box display="flex" justifyContent="space-between" sx={{ p: 2, mt: 2, backgroundColor: `${color.third}`, color: `${color.mainBackground}` }}>
                    <Box>
                        <Typography variant="h6" gutterBottom component="div">
                            {t('tickets.history')}
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ ml: 2 }}>
                            {t('tickets.historyInfo')}
                        </Typography>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>{t('tickets.property')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{t('tickets.oldValue')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{t('tickets.newValue')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{t('tickets.dateChanged')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ticketHistory.map((history, idx, array) => {
                                // compare and look for the changes between current and next record, if there's no next record return null
                                const nextHistory = array[idx + 1]; 
                                if (!nextHistory) return null;
                                const changes = [];
                                if (history.employeeId !== nextHistory.employeeId) {
                                    changes.push(
                                        <TableRow key={`employee-${history.id}`}>
                                            <TableCell>{t('tickets.developer')}</TableCell>
                                            <TableCell>{getEmployeeNameById(history.employeeId)}</TableCell>
                                            <TableCell>{getEmployeeNameById(nextHistory.employeeId)}</TableCell>
                                            <TableCell>{new Date(nextHistory.createdAt).toLocaleString('pl-PL')}</TableCell>
                                        </TableRow>
                                    );
                                }
                                if (history.statusId !== nextHistory.statusId) {
                                    changes.push(
                                        <TableRow key={`status-${history.id}`}>
                                            <TableCell>{t('tickets.status')}</TableCell>
                                            <TableCell>{getStatusNameById(history.statusId)}</TableCell>
                                            <TableCell>{getStatusNameById(nextHistory.statusId)}</TableCell>
                                            <TableCell>{new Date(nextHistory.createdAt).toLocaleString('pl-PL')}</TableCell>
                                        </TableRow>
                                    );
                                }
                                if (history.priorityId !== nextHistory.priorityId) {
                                    changes.push(
                                        <TableRow key={`priority-${history.id}`}>
                                            <TableCell>{t('tickets.priority')}</TableCell>
                                            <TableCell>{getPriorityNameById(history.priorityId)}</TableCell>
                                            <TableCell>{getPriorityNameById(nextHistory.priorityId)}</TableCell>
                                            <TableCell>{new Date(nextHistory.createdAt).toLocaleString('pl-PL')}</TableCell>
                                        </TableRow>
                                    );
                                }
                                return changes;
                            }).slice(0 + page * 2, 2 + page * 2)}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="space-between" sx={{ p: 2, mt: 1 }}>
                    <Button disabled={isPrevDisabled} variant="contained" onClick={handlePageChangeBackward}>
                        <NavigateBeforeIcon />
                    </Button>
                    <Typography>Page: {page + 1}</Typography>
                    <Button disabled={isNextDisabled} onClick={handlePageChangeForward} variant="contained">
                        <NavigateNextIcon />
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default TicketDetails