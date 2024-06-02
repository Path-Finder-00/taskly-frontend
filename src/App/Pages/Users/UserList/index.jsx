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
    TableBody,
    CircularProgress
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import { color } from '@/shared/utils/styles';
import Filter from '@/shared/components/Filter';
import { usePermissions } from '@/shared/components/Permissions';
import organizationsService from '@/App/services/organizations';
import teamsService from '@/App/services/teams';

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [usersInTeam, setUsersInTeam] = useState([]);
    const [teamNames, setTeamNames] = useState([]);
    const [page, setPage] = useState(0);
    const usersNumberRef = useRef(0);
    const [filter, setFilter] = useState('');
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [loading, setLoading] = useState(true)

    const { t } = useTranslation("translations");
    const permissions = usePermissions();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await organizationsService.getUsersInOrganization()
                setUsers(users)

                const teamNames = await teamsService.getTeamNames()
                setTeamNames(teamNames)
                
            } catch (err) {
                console.error("Error fetching data: ", err);
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, []);

    useEffect(() => {
        usersNumberRef.current = users.length
    }, [users]);

    useEffect(() => {
        if (permissions.includes('editAnyUser')) {
            const usersIds = users.map(user => user.id)
            setUsersInTeam(usersIds)
        } else if (permissions.includes('editUserInTeam')) {
            teamsService.getTeamMembers()
                .then(members => {
                    const membersIds = members.map(member => {
                        if (member.accessId !== 1) {
                            return member.id
                        }
                    })
                    setUsersInTeam(membersIds)
                })
        } else {
            setUsersInTeam([])
        }
    }, [users, permissions])

    useEffect(() => {
        const count = users.filter(user =>
            user.name.toLowerCase().includes(filter.toLowerCase()) ||
            user.surname.toLowerCase().includes(filter.toLowerCase()) ||
            user.email.toLowerCase().includes(filter.toLowerCase()) ||
            user.phone.toLowerCase().includes(filter.toLowerCase())
        ).length;

        usersNumberRef.current = count;

        const maxPage = Math.ceil(usersNumberRef.current / 10) - 1;
        if (page > maxPage && maxPage !== -1) {
            setPage(maxPage > 0 ? maxPage : 0);
        } else {
            setIsPrevDisabled(page <= 0);
            setIsNextDisabled(page >= maxPage);
        }

    }, [filter, users, page]);

    const teamName = (id) => {
        return teamNames.filter(teamName => teamName.id === id)[0]?.teamName
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handlePageChangeForward = () => {
        setPage(current => current + 1)
    }

    const handlePageChangeBackward = () => {
        setPage(current => current - 1)
    }

    const handleNavigateToUserDetails = (userId) => {
        navigate(`/profile/${userId}`);
    };

    const handleNavigateToUserEdit = (userId) => {
        navigate(`/profile/editUser/${userId}`);
    };
    
    return (
        <Box sx={{ width: '100%', marginLeft: '0.5%', boxShadow: 3, mb: 2 }}>
            <Paper>
                <Box display="flex" justifyContent="space-between" sx={{ p: 2, mt: 5, backgroundColor: `${color.third}`, color: `${color.mainBackground}` }}>
                    <Box>
                        <Typography variant="h6" gutterBottom component="div">
                            {t('users.allUsersInOrg')}
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ ml: 2 }}>
                            {t('users.allUsersInOrgInfo')}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Filter handleFilterChange={handleFilterChange} color={color.mainBackground} />
                    </Box>
                </Box>
                <TableContainer sx={{ width: "100%" }}>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '300px' }}>
                            <CircularProgress />
                        </Box>
                    ) : ( <Table aria-label="simple table" sx={{ width: "100%" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell width="25%">
                                        <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                            {t('users.name')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell width="15%">
                                        <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                            {t('users.surname')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell width="15%">
                                        <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                            {t('users.email')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell width="10%">
                                        <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                            {t('users.phone')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell width="20%">
                                        <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                            {t('teams.team')}
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
                                {usersNumberRef !== 0 ? users.filter(user =>
                                    user.name.toLowerCase().includes(filter.toLowerCase()) ||
                                    user.surname.toLowerCase().includes(filter.toLowerCase()) ||
                                    user.email.toLowerCase().includes(filter.toLowerCase()) ||
                                    user.phone.toLowerCase().includes(filter.toLowerCase())
                                ).map((user) => {
                                    return (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.surname}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                            <TableCell>
                                                {(user.accessId !== 5 && teamNames) && teamName(user.id)}
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4}}>
                                                    <Button onClick={() => handleNavigateToUserDetails(user.id)}>
                                                        <InfoIcon />
                                                    </Button>
                                                    <Button disabled={!usersInTeam.includes(user.id)} onClick={() => handleNavigateToUserEdit(user.id)}>
                                                        <EditIcon />
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }).slice(0 + page * 10, 10 + page * 10) :
                                    <TableRow key={0}>
                                        <TableCell>
                                            {t('users.noUsers')}
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                <Box display="flex" justifyContent="space-between" sx={{ p: 2, mt: 5 }}>
                    <Button disabled={isPrevDisabled} variant="contained" onClick={handlePageChangeBackward} sx={{ maxWidth: '133px', width: '10%', height: '40px' }} >
                        <NavigateBeforeIcon />
                    </Button>
                    <Button disabled={isNextDisabled} onClick={handlePageChangeForward} variant="contained" sx={{ maxWidth: '133px', width: '10%', height: '40px' }} >
                        <NavigateNextIcon />
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default UserList
