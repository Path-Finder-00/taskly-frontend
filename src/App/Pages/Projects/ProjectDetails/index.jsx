import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { color } from '@/shared/utils/styles';
import projectService from '@/App/services/projects';
import roleService from '@/App/services/roles';
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
    TableBody,
    CircularProgress
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';

const ProjectDetails = () => {

    const { t } = useTranslation("translations")
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [projectMembers, setProjectMembers] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleNavigateToTicketDetails = (ticketId) => {
        navigate(`/tickets/ticketDetails/${ticketId}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roles = await roleService.getRoles()
                setRoles(roles)
                const project = await projectService.getProjectById(projectId)
                setProject(project);
                setProjectMembers(project.employees);
                setTickets(project.tickets)
            } catch (error) {
                console.error("Error while fetching project details: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [projectId]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '300px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box my={4}>
            <Box sx={{ width: '100%', boxShadow: 3 }}>
                <Box sx={{ backgroundColor: `${color.third}`, color: `${color.mainBackground}`, p: 2 }}>
                    <Typography variant="h6" component="div">
                        {t('projects.projectDetails')}
                    </Typography>
                </Box>
                <Paper sx={{ p: 8, mb: 6, borderRadius: '4px' }}>
                    <Box display="flex" justifyContent="space-between">
                        <Box>
                            <Typography variant="subtitle1" sx={{ color: `${color.textLight}` }}>{t('projects.name')}</Typography>
                            <Typography variant="h6" component="div" sx={{ ml: 2, color: `${color.textDark}` }}>{project?.name}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" sx={{ color: `${color.textLight}` }}>{t('projects.projectDescription')}</Typography>
                            <Typography variant="h6" component="div" sx={{ ml: 2, color: `${color.textDard}` }}>{project?.description}</Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <Box sx={{ width: '49.5%', boxShadow: 3, mb: 2, height: 'auto' }}>
                    <Paper elevation={0} >
                        <Box sx={{ backgroundColor: `${color.third}`, color: `${color.mainBackground}`, p: 2 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                {t('projects.projectPersonnel')}
                            </Typography>
                            <Typography variant="subtitle1" component="div" sx={{ ml: 2 }}>
                                {t('projects.projectPersonnelInfo')}
                            </Typography>
                        </Box>
                        <TableContainer component={Paper} elevation={0}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('users.name')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('users.email')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('users.role')}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {projectMembers.map((projectMember) => (
                                        <TableRow key={projectMember.id}>
                                            <TableCell>{`${projectMember.user.name} ${projectMember.user.surname}`}</TableCell>
                                            <TableCell>{projectMember.user.email}</TableCell>
                                            <TableCell>{roles.find(role => role.id === projectMember.employee_project.roleId)?.role || ''}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
                <Box sx={{ width: '49.5%', boxShadow: 3, mb: 2, height: 'auto' }}>
                    <Paper elevation={0} >
                        <Box sx={{ backgroundColor: `${color.third}`, color: `${color.mainBackground}`, p: 2 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                {t('projects.projectTickets')}
                            </Typography>
                            <Typography variant="subtitle1" component="div" sx={{ ml: 2 }}>
                                {t('projects.projectTicketsInfo')}
                            </Typography>
                        </Box>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('tickets.title')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('tickets.submitter')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('tickets.developer')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('tickets.status')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('tickets.created')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('tickets.actions')}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tickets.length !== 0 ? tickets.map((ticket) => {
                                        const latestHistory = ticket.ticket_histories[0];
                                        const developer = projectMembers.find((member) => member.id === latestHistory.employeeId);
                                        const submitter = projectMembers.find((member) => member.userId === ticket.user_tickets[0].userId);
                                        return (
                                            <TableRow key={ticket.id}>
                                                <TableCell>{ticket.title}</TableCell>
                                                <TableCell>{submitter ? `${submitter.user.name} ${submitter.user.surname}` : t('tickets.noSubmitter')}</TableCell>
                                                <TableCell>{developer ? `${developer.user.name} ${developer.user.surname}` : t('tickets.noDeveloper')}</TableCell>
                                                <TableCell>{latestHistory.status.status}</TableCell>
                                                <TableCell>{new Date(ticket.createdAt).toLocaleString('pl-PL')}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                                                        <Button onClick={() => handleNavigateToTicketDetails(ticket.id)}>
                                                            <InfoIcon />
                                                        </Button>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }) :
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">
                                                {t('tickets.noTickets')}
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}

export default ProjectDetails
