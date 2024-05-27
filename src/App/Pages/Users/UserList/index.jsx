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
import organizationsService from '@/App/services/organizations'

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const usersNumberRef = useRef(0);
    const [filter, setFilter] = useState('');
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);

    const { t } = useTranslation("translations");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await organizationsService.getUsersInOrganization()
                    .then(users => {
                        setUsers(users)
                    })
                
                usersNumberRef.current = users.length
            } catch (err) {
                console.error("Error fetching data: ", err);
            }
        };

        fetchData();
    }, []);

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
        navigate(`/editUser/${userId}`);
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
                    <Table aria-label="simple table" sx={{ width: "100%" }}>
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
                                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4}}>
                                                <Button onClick={() => handleNavigateToUserDetails(user.id)}>
                                                    <InfoIcon />
                                                </Button>
                                                <Button onClick={() => handleNavigateToUserEdit(user.id)}>
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