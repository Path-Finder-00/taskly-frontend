import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
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
} from '@mui/material'
import projectService from '@/App/services/projects';


import { sizes, color, font } from '@/shared/utils/styles';

const ProjectDetails = () => {
    const mockPersonnelData = [
        { name: 'Jan Kowalski', email: 'jankowalski@email.com', role: 'Developer' },
        { name: 'Jan Kowalski', email: 'jankowalski@email.com', role: 'Developer' },
        { name: 'Jan Kowalski', email: 'jankowalski@email.com', role: 'Developer' },
        { name: 'Jan Kowalski', email: 'jankowalski@email.com', role: 'Developer' },
        { name: 'Jan Kowalski', email: 'jankowalski@email.com', role: 'Developer' },
    ];

    const mockTicketData = [
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
        { title: 'Aesthetics Please', submitter: 'Jan Kowalski', developer: 'Demo Dev', status: 'Open', created: '26/04/2023 11:12:38 PM' },
    ];

    const { t } = useTranslation("translations")
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (projectId) {
            projectService.getProjectById(projectId)
                .then(data => {
                    setProject(data);
                })
                .catch(err => {
                    console.error('Error fetching project:', err);
                });
        }
    }, [projectId]);

    if (!project) {
        return <div>Loading project details...</div>;
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Box sx={{ width: '50%', marginRight: '0.5%', boxShadow: 3, mb: 2 }}>
                    <Paper>
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
                                        <TableCell>{t('users.name')}</TableCell>
                                        <TableCell>{t('users.email')}</TableCell>
                                        <TableCell>{t('users.role')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mockPersonnelData.map((row) => (
                                        <TableRow key={row.email}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.role}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
                <Box sx={{ width: '50%', marginLeft: '0.5%', boxShadow: 3, mb: 2 }}>
                    <Paper>
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
                                        <TableCell>{t('tickets.title')}</TableCell>
                                        <TableCell>{t('tickets.submitter')}</TableCell>
                                        <TableCell>{t('tickets.developer')}</TableCell>
                                        <TableCell>{t('tickets.status')}</TableCell>
                                        <TableCell>{t('tickets.created')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mockTicketData.map((ticket) => (
                                        <TableRow key={ticket.title}>
                                            <TableCell>{ticket.title}</TableCell>
                                            <TableCell>{ticket.submitter}</TableCell>
                                            <TableCell>{ticket.developer}</TableCell>
                                            <TableCell>{ticket.status}</TableCell>
                                            <TableCell>{ticket.created}</TableCell>
                                        </TableRow>
                                    ))}
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