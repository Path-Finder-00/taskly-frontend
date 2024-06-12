import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router';
import Filter from '@/shared/components/Filter'
import roleService from '@/App/services/roles';
import teamService from '@/App/services/teams';
import projectService from '@/App/services/projects';
import { useSnackbar } from '@/shared/components/Snackbar';
import { color } from '@/shared/utils/styles';
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
    FormHelperText,
    Select,
    MenuItem
} from '@mui/material'


const CreateProject = () => {

    const navigate = useNavigate();
    const { openSnackbar } = useSnackbar();

    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [selectedMember, setSelectedMember] = useState('')
    const [filter, setFilter] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [teamList, setTeamList] = useState([]);
    const [roles, setRoles] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [nameError, setNameError] = useState('');
    const [descError, setDescError] = useState('');
    const { t } = useTranslation("translations")

    const filterCount = teamList.filter(member =>
        member.name.toLowerCase().includes(filter.toLowerCase()) ||
        member.email.toLowerCase().includes(filter.toLowerCase()) ||
        member.role.toLowerCase().includes(filter.toLowerCase())
    ).length;

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleAddMemberClick = () => {
        const memberToAdd = teamMembers.find((member) =>
            member.employee.id === selectedMember
        );

        if (memberToAdd && !teamList.some(member => member.id === memberToAdd.employee.id)) {
            setTeamList([
                ...teamList,
                {
                    id: memberToAdd.employee.id,
                    user_id: memberToAdd.employee.userId,
                    name: `${memberToAdd.name} ${memberToAdd.surname}`,
                    email: memberToAdd.email,
                    role: selectedRole.role,
                    role_id: selectedRole.id
                }
            ]);
        }
    };

    const handleCreateProjectClick = async () => {
        const isNameValid = validateName();
        const isDescriptionValid = validateDescription();

        if (!isNameValid || !isDescriptionValid) {
            return;
        }
        const projectPayload = {
            name: projectName,
            description: projectDescription,
            employees: teamList.map(member => ({
                id: member.id,
                user_id: member.user_id,
                role_id: member.role_id
            }))
        };

        try {
            await projectService.createProject(projectPayload);
            openSnackbar(t('projects.creationSuccess'), 'success');
            navigate('/projects', { replace: true })
        } catch (error) {
            console.error('Error creating project:', error)
            openSnackbar(t('projects.creationError'), 'error');
        }
    };

    const isEmpty = (value) => {
        if (!value.trim()) {
            return t('projects.fieldEmpty')
        }
        return '';
    }

    const validateName = () => {
        let errorMessage = isEmpty(projectName);
        if (!errorMessage && projectName.length > 80) {
            errorMessage = t('projects.nameLengthError');
        }
        setNameError(errorMessage)
        return !errorMessage
    }

    const validateDescription = () => {
        let errorMessage = isEmpty(projectDescription);
        if (!errorMessage && projectDescription.length > 150) {
            errorMessage = t('projects.descLengthError');
        }
        setDescError(errorMessage)
        return !errorMessage
    }

    useEffect(() => {
        roleService.getRoles()
            .then(data => {
                setRoles(data)
            })
            .catch(err => {
                console.error('Error fetching roles:', err)
            })
        teamService.getTeamMembers()
            .then(data => {
                setTeamMembers(data)
            })
            .catch(err => {
                console.error('Error fetching members:', err)
            })

    }, []);

    return (
        <Grid container spacing={2} sx={{ m: 1 }}>
            <Grid item xs={4}>
                <Paper style={{ height: '100%', width: '100%' }} elevation={0}>
                    <Typography variant="h4" sx={{ color: `${color.textDark}`, marginBottom: 5 }}>
                        {t('projects.createNew')}
                    </Typography>
                    <FormControl error={!!nameError} sx={{ width: '100%', marginBottom: 3 }} size="medium">
                        <InputLabel>{t('projects.name')}</InputLabel>
                        <OutlinedInput
                            error={!!nameError}
                            onChange={(e) => setProjectName(e.target.value)}
                            label={t('projects.name')}
                        />
                        {nameError && <FormHelperText>{nameError}</FormHelperText>}
                    </FormControl>
                    <TextField
                        error={!!descError}
                        helperText={descError}
                        onChange={(e) => setProjectDescription(e.target.value)}
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
                            {teamMembers.map((member) => (
                                <MenuItem key={member.employee.id} value={member.employee.id}>
                                    {`${member.name} ${member.surname}`}
                                </MenuItem>
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
                                <MenuItem key={role.id} value={role}> {role.role} </MenuItem>
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
                                            member.email.toLowerCase().includes(filter.toLowerCase()) ||
                                            member.role.toLowerCase().includes(filter.toLowerCase()))
                                        .map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell component="th" scope="row">
                                                    {member.name}
                                                </TableCell>
                                                <TableCell>
                                                    {member.email}
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
                        <Button variant="contained" sx={{ width: '100%', mt: 2 }}
                            onClick={handleCreateProjectClick}
                        >
                            {t('projects.create')}
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default CreateProject;
