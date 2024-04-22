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
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import { color } from '@/shared/utils/styles';
import Filter from '@/shared/components/Filter';
import ticketsService from '@/App/services/tickets';

const MyTickets = () => {

    const [tickets, setTickets] = useState([
        {
            "id": 2,
            "title": "Update Documentation",
            "projectName": "Project Delta",
            "name": "Alice",
            "surname": "Smith",
            "priority": "Low",
            "status": "In Progress",
            "type": "Task",
            "createdAt": "2024-04-12"
        },
        {
            "id": 3,
            "title": "Refactor Core Module",
            "projectName": "Project Epsilon",
            "name": "Bob",
            "surname": "Johnson",
            "priority": "High",
            "status": "Open",
            "type": "Improvement",
            "createdAt": "2024-04-11"
        },
        {
            "id": 4,
            "title": "Add New Features",
            "projectName": "Project Zeta",
            "name": "Carol",
            "surname": "Brown",
            "priority": "Medium",
            "status": "Closed",
            "type": "Feature",
            "createdAt": "2024-04-10"
        },
        {
            "id": 5,
            "title": "Fix Logout Issue",
            "projectName": "Project Theta",
            "name": "James",
            "surname": "Wilson",
            "priority": "High",
            "status": "In Review",
            "type": "Bug",
            "createdAt": "2024-04-09"
        },
        {
            "id": 6,
            "title": "Optimize Database Queries",
            "projectName": "Project Iota",
            "name": "Jane",
            "surname": "Doe",
            "priority": "High",
            "status": "Open",
            "type": "Enhancement",
            "createdAt": "2024-04-08"
        },
        {
            "id": 7,
            "title": "Improve Security Protocols",
            "projectName": "Project Kappa",
            "name": "Aaron",
            "surname": "Lee",
            "priority": "Urgent",
            "status": "Open",
            "type": "Task",
            "createdAt": "2024-04-07"
        },
        {
            "id": 8,
            "title": "Upgrade Server Hardware",
            "projectName": "Project Lambda",
            "name": "Eva",
            "surname": "Green",
            "priority": "Medium",
            "status": "Planned",
            "type": "Upgrade",
            "createdAt": "2024-04-06"
        },
        {
            "id": 9,
            "title": "Refactor Authentication System",
            "projectName": "Project Mu",
            "name": "Dan",
            "surname": "Abrams",
            "priority": "Low",
            "status": "In Progress",
            "type": "Improvement",
            "createdAt": "2024-04-05"
        },
        {
            "id": 10,
            "title": "Enhance Data Analytics",
            "projectName": "Project Nu",
            "name": "Mia",
            "surname": "Wong",
            "priority": "Medium",
            "status": "Testing",
            "type": "Feature",
            "createdAt": "2024-04-04"
        },
        {
            "id": 11,
            "title": "Streamline User Interface",
            "projectName": "Project Xi",
            "name": "Oliver",
            "surname": "Twist",
            "priority": "High",
            "status": "Deployed",
            "type": "UI Task",
            "createdAt": "2024-04-03"
        },
        {
            "id": 12,
            "title": "Solve Memory Leak",
            "projectName": "Project Omicron",
            "name": "Lily",
            "surname": "Evans",
            "priority": "Critical",
            "status": "Open",
            "type": "Bug",
            "createdAt": "2024-04-02"
        }
    ]);
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
                console.log(tickets)
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

    return(
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
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('tickets.title')}</TableCell>
                                <TableCell>{t('tickets.projectName')}</TableCell>
                                <TableCell>{t('tickets.developer')}</TableCell>
                                <TableCell>{t('tickets.priority')}</TableCell>
                                <TableCell>{t('tickets.status')}</TableCell>
                                <TableCell>{t('tickets.type')}</TableCell>
                                <TableCell>{t('tickets.created')}</TableCell>
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
                        <NavigateBeforeIcon/>
                    </Button>
                    <Button variant="contained" onClick={() => navigate('/tickets/createTicket')} sx={{ maxWidth: '400px', width: '30%', height: '40px' }}>
                        {t('tickets.addTicket')}
                    </Button>
                    <Button disabled={isNextDisabled} onClick={handlePageChangeForward} variant="contained" sx={{ maxWidth: '133px', width: '10%', height: '40px' }} >
                        <NavigateNextIcon/>
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default MyTickets