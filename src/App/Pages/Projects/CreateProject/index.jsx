import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
    Grid,
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
    InputLabel,
    OutlinedInput,
    FormControl,
    TextField,
    List,
    ListItem,
    ListItemText,
    Select,
    MenuItem
} from '@mui/material'

import { sizes, color, font } from '@/shared/utils/styles';
import Filter from './Filter'
import roleService from '@/App/services/roles';
const CreateProject = () => {

    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [selectedMember, setSelectedMember] = useState('')
    const [filter, setFilter] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [teamList, setTeamList] = useState([]);
    const [roles, setRoles] = useState([]);

    const { t } = useTranslation("translations")
    const filterCount = teamList.filter(member =>
        member.name.toLowerCase().includes(filter.toLowerCase()) ||
        // member.email.toLowerCase().includes(filter.toLowerCase()) ||
        member.role.toLowerCase().includes(filter.toLowerCase())
    ).length;
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };
    const handleAddMemberClick = () => {
        const isAlreadyAdded = teamList.some(member => member.name === selectedMember);
        if (selectedMember && selectedRole && !isAlreadyAdded) {
            setTeamList([...teamList, { name: selectedMember, role: selectedRole }]);
        }
    };
    useEffect(() => {
        roleService.getRoles()
            .then(data => {
                setRoles(data)
            })
            .catch(err => {
                console.error('Error fetching roles:', err)
            })

    }, []);
    return (
        <Grid container spacing={2} sx={{ m: 1 }}>
            <Grid item xs={4}>
                <Paper style={{ height: '100%', width: '100%' }} elevation={0}>
                    <Typography variant="h4" sx={{ color: `${color.textDark}`, marginBottom: 5 }}>
                        {t('projects.createNew')}
                    </Typography>
                    <FormControl sx={{ width: '100%', marginBottom: 3 }} size="medium">
                        <InputLabel>{t('projects.name')}</InputLabel>
                        <OutlinedInput
                            onChange={setProjectName}
                            label={t('projects.name')}
                        />
                    </FormControl>
                    <TextField
                        onChange={setProjectDescription}
                        label={t('projects.description')}
                        multiline
                        rows={5}
                        variant="outlined"
                        fullWidth
                    />
                    <Typography variant="h6" sx={{ color: `${color.textDark}`, marginTop: 8, marginBottom: 3 }}>
                        {t('projects.selectMember')}
                    </Typography>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="select-team-member-label">{t('projects.teamMember')}</InputLabel>
                        <Select
                            labelId="select-team-member-label"
                            id="select-team-member"
                            value={selectedMember}
                            onChange={(event) => setSelectedMember(event.target.value)}
                            label={t('projects.teamMember')}
                        >
                            {['Dwight Schrute', 'Pamela Beesly', 'Jim Halpert'].map((person) => (
                                <MenuItem key={person} value={person}>{person}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography variant="h6" sx={{ color: `${color.textDark}`, marginTop: 3, marginBottom: 3 }}>
                        {t('projects.selectRole')}
                    </Typography>
                    <FormControl sx={{ width: '100%', marginBottom: 5 }}>
                        <InputLabel id="select-role-label">{t('projects.role')}</InputLabel>
                        <Select
                            labelId="select-role-label"
                            id="select-role"
                            value={selectedRole}
                            onChange={(event) => setSelectedRole(event.target.value)}
                            label={t('projects.role')}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.role}> {role.role} </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" sx={{ width: '100%', height: '40px' }} onClick={handleAddMemberClick}>
                        {t('projects.add')}
                    </Button>
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Paper style={{ height: '100%', width: '100%' }} elevation={0}>
                    <Box sx={{ boxShadow: 3, display: 'flex', flexDirection: 'column', mr: 2 }}>
                        <Box sx={{ backgroundColor: `${color.third}`, color: `${color.mainBackground}`, p: 2 }}>
                            <Typography variant="h6" component="div">
                                {t('projects.projectTeamMembers')}
                            </Typography>
                        </Box>
                        <TableContainer component={Paper} elevation={0} sx={{ width: '100%', height: '100%' }}>
                            <Box sx={{ display: 'flex', p: 2 }}>
                                <Filter handleFilterChange={handleFilterChange} />
                            </Box>
                            <Table aria-label="simple table" sx={{ width: '100%' }}>
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
                                        <TableCell align="right">
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('users.role')}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filterCount !== 0 ? teamList
                                        .filter(member =>
                                            member.name.toLowerCase().includes(filter.toLowerCase()) ||
                                            // member.email.toLowerCase().includes(filter.toLowerCase()) ||
                                            member.role.toLowerCase().includes(filter.toLowerCase()))
                                        .map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell component="th" scope="row">
                                                    {member.name}
                                                </TableCell>
                                                <TableCell>
                                                    {/* {member.email} */}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {member.role}
                                                </TableCell>
                                            </TableRow>
                                        )) :
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                {t('projects.noProjectTeamMembers')}
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box sx={{ mr: 2 }}>
                        <Button variant="contained" sx={{ width: '100%', mt: 2 }}>
                            {t('projects.create')}
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>

    )
}

export default CreateProject