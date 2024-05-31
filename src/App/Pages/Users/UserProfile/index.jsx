import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {
    Box,
    Typography,
    TableContainer,
    Paper,
    Table,
    Grid,
    TableRow,
    TableCell,
    Chip,
    TableBody,
    Button,
    CircularProgress
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import usersService from '@/App/services/users';
import employmentHistoriesService from '@/App/services/employment_histories';
import employeeProjectsService from '@/App/services/employee_projects';
import organizationsService from '@/App/services/organizations';

const UserProfile = () => {
    const { userId: userIdParam } = useParams();
    const userId = userIdParam ?? sessionStorage.getItem('loggedTasklyAppUserId');

    const { t } = useTranslation('translations');
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [technologies, setTechnologies] = useState([]);
    const [employmentHistories, setEmploymentHistories] = useState([]);
    const [employeeProjects, setEmployeeProjects] = useState([]);
    const [organization, setOrganization] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleNavigateToProfileEdit = (userId) => {
        navigate(`/profile/editUser/${userId}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const userData = await usersService.getUserById(userId);
                setUser(userData);
                setTechnologies(userData.employee.technologies);
                const employmentHistoriesData = await employmentHistoriesService.getEmploymentHistoriesByUserId(userId);
                setEmploymentHistories(employmentHistoriesData);
                const employeeProjectsData = await employeeProjectsService.getEmployeeProjectsByUserId(userId);
                setEmployeeProjects(employeeProjectsData);
                const organizationData = await organizationsService.getOrganization();
                setOrganization(organizationData);
            } catch (err) {
                console.error('Error fetching data: ', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '300px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ margin: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper sx={{ p: 2, marginBottom: 2 }}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>{t('users.personal')}</Typography>
                            <Button onClick={() => handleNavigateToProfileEdit(userId)}>
                                <EditIcon />
                            </Button>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>{t('users.name')}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>{t('users.surname')}</TableCell>
                                        <TableCell>{user.surname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>{t('users.email')}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>{t('users.phone')}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    {/* Do not render Skills if user is not an employee */}
                    {user.accessId !== 5 && (
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>{t('users.skills')}</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {technologies.map(technology => (
                                    <Chip key={technology.id} label={technology.technology} />
                                ))}
                            </Box>
                        </Paper>
                    )}
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ p: 2 }}>
                        {user.accessId !== 5 ? (
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>{t('users.jobDetails')}</Typography>
                        ) : (
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>{t('users.details')}</Typography>
                        )}
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>{t('users.id')}</TableCell>
                                        <TableCell>{user.id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>{t('organizations.organization')}</TableCell>
                                        <TableCell>{organization.name}</TableCell>
                                    </TableRow>
                                    {user.accessId !== 5 && (
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>{t('users.jobHistory')}</TableCell>
                                            <TableCell>
                                                {employmentHistories.map(eh => (
                                                    <div key={eh.id}>
                                                        {new Date(eh.since).toLocaleDateString()} - {eh.to ? new Date(eh.to).toLocaleDateString() : t('users.present')}
                                                        <br />
                                                        {t('teams.team')}: {eh.team ? eh.team.name : 'No Team'}
                                                        <p />
                                                    </div>
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>{t('users.projectHistory')}</TableCell>
                                        <TableCell>
                                            {employeeProjects.map(ep => (
                                                <div key={ep.id}>
                                                    {new Date(ep.since).toLocaleDateString()} - {ep.to ? new Date(ep.to).toLocaleDateString() : t('users.present')}
                                                    <br />
                                                    {t('projects.name')}: {ep.project.name ? ep.project.name : '-'}
                                                    <p />
                                                </div>
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserProfile;
