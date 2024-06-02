import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
} from '@mui/material';

import Filter from '@/shared/components/Filter';
import { usePermissions } from '@/shared/components/Permissions';
import projectService from '@/App/services/projects';
import userService from '@/App/services/users';

import { color } from '@/shared/utils/styles';

const MyProjects = () => {
    const [filter, setFilter] = useState('');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterCount, setFilterCount] = useState(0)
    const permissions = usePermissions();

    const { t } = useTranslation('translations');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const userId = sessionStorage.getItem('loggedTasklyAppUserId');
                const user = await userService.getUserById(userId);

                if (permissions.includes('seeAllProjects')){
                    const data = await projectService.getProjectsByOrgId();
                    const projectsData = data.map(project => ({
                        project: {
                            id: project.id,
                            name: project.name,
                            description: project.description
                        }
                    }));
                    setProjects(projectsData);
                } else if (permissions.includes('seeAllProjectsInTeam')) {
                    const data = await projectService.getProjectsByTeamId();
                    const projectsData = data.map(project => ({
                        project: {
                            id: project.id,
                            name: project.name,
                            description: project.description
                        }
                    }));
                    setProjects(projectsData);
                } else {
                    const fetchedProjects = await projectService.getUserProjectsWithRoles();
                    setProjects(fetchedProjects);
                }

            } catch (err) {
                console.error("Error fetching projects: ", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        const filteredCount = (Array.isArray(projects) ? projects : []).filter(project =>
            project.project.name.toLowerCase().includes(filter.toLowerCase())
        ).length;
        setFilterCount(filteredCount)
    }, [projects, filter]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleNavigateToProjectDetails = (projectId) => {
        navigate(`/projects/projectDetails/${projectId}`);
    };

    const handleNavigateToEditProject = (projectId) => {
        navigate(`/projects/editProject/${projectId}`);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3, height: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingBottom: '20px'
                }}
            >
                { permissions.includes('createProject') && <Button variant="contained" onClick={() => navigate('/projects/createProject')} sx={{ maxWidth: '400px', width: '30%', height: '40px' }}>
                    {t('projects.create')}
                </Button> }
            </Box>
            <Box sx={{ width: '100%', boxShadow: 3 }}>
                <Box sx={{ backgroundColor: `${color.third}`, color: `${color.mainBackground}`, p: 2 }}>
                    <Typography variant="h6" component="div">
                        {t('projects.yourProjects')}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        {t('projects.subtitle')}
                    </Typography>
                </Box>
                <TableContainer component={Paper} elevation={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                        <Filter handleFilterChange={handleFilterChange} />
                    </Box>
                    { loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '300px' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                            {t('projects.name')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                            {t('projects.description')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                            {t('projects.action')}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterCount !== 0 ? projects.filter(project => project.project.name.toLowerCase().includes(filter.toLowerCase())).map((project) => (
                                    <TableRow key={project.project.id}>
                                        <TableCell component="th" scope="row">
                                            {project.project.name}
                                        </TableCell>
                                        <TableCell>
                                            {project.project.description}
                                        </TableCell>
                                        <TableCell align="right">
                                            { (permissions.includes('editProject') || project.role === 1) && <Button variant="contained" color="primary" onClick={() => handleNavigateToEditProject(project.project.id)}>{t('projects.manage')}</Button> }
                                            <Button variant="outlined" color="primary" onClick={() => handleNavigateToProjectDetails(project.project.id)} sx={{ ml: 1 }}>{t('projects.details')}</Button>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow key={0}>
                                        <TableCell colSpan={3} align="center">
                                            {t('projects.noProject')}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
            </Box>
        </Box>
    );
};

export default MyProjects;
