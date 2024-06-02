import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom';
import { color } from '@/shared/utils/styles';
import Filter from '@/shared/components/Filter'
import { useSnackbar } from '@/shared/components/Snackbar';
import projectService from '@/App/services/projects';
import roleService from '@/App/services/roles';
import teamService from '@/App/services/teams';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
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
    Select,
    MenuItem,
    FormHelperText,
    CircularProgress 
} from '@mui/material'


const EditProject = () => {

    const { t } = useTranslation("translations")
    const navigate = useNavigate();

    const [selectedMember, setSelectedMember] = useState('')
    const [filter, setFilter] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [teamList, setTeamList] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [nameError, setNameError] = useState('');
    const [descError, setDescError] = useState('');
    const [memberError, setMemberError] = useState('');
    const [loading, setLoading] = useState(true);

    const { projectId } = useParams();
    const { openSnackbar } = useSnackbar();

    const filterCount = teamList.filter(member =>
        member.name.toLowerCase().includes(filter.toLowerCase()) ||
        member.email.toLowerCase().includes(filter.toLowerCase()) ||
        member.role.toLowerCase().includes(filter.toLowerCase())
    ).length;

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleAddMemberClick = () => {
        const memberToAdd = teamMembers.find((member) =>
            member.employee.id === selectedMember
        );

        if (memberToAdd) {
            if (!teamList.some(member => member.id === memberToAdd.employee.id)) {
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
            } else {
                setMemberError(t('projects.memberAlreadyInProject'))
            }
        } else {
            setMemberError(t('projects.memberNotSelected'))
        }
    };

    const handleRemoveMemberClick = (memberToRemove) => {
        setTeamList(teamList.filter(member => member.id !== memberToRemove));
    };

    const handleRoleChange = (memberId, newRoleId) => {
        const role = roles.find(role => role.id === newRoleId)
        setTeamList(teamList.map(member =>
            member.id === memberId ? { ...member, role: role.role, role_id: role.id } : member
        ));
    };

    const handleSubmit = async () => {
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
            await projectService.editProject(projectId, projectPayload);
            openSnackbar(t('projects.editingSuccess'), 'success');
            navigate(`/projects/projectDetails/${projectId}`, { replace: true } )
        } catch (error) {
            console.error('Error creating project:', error)
            openSnackbar(t('projects.editingError'), 'error');
        }
    }

    const isEmpty = (value) => {
        if (!value.trim()) {
            return t('projects.fieldEmpty')
        }
        return '';
    }

    const validateName = () => {
        const errorMessage = isEmpty(projectName);
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
        const fetchRolesAndProject = async () => {
            try {
                const rolesData = await roleService.getRoles();
                setRoles(rolesData);
                if (projectId) {
                    const projectData = await projectService.getProjectById(projectId);
                    setProjectName(projectData.name);
                    setProjectDescription(projectData.description);
                    if (projectData.employees) {
                        const mappedMembers = projectData.employees.map(emp => {
                            const role = rolesData.find(role => role.id === emp.employee_project.roleId);
                            return {
                                id: emp.id,
                                name: `${emp.user.name} ${emp.user.surname}`,
                                email: emp.user.email,
                                role: role ? role.role : '',
                                user_id: emp.userId,
                                role_id: emp.employee_project.roleId
                            };
                        });
                        setTeamList(mappedMembers);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false)
            }
        };
        teamService.getTeamMembers()
            .then(data => {
                setTeamMembers(data)
            })
            .catch(err => {
                console.error('Error fetching members:', err)
            })
        fetchRolesAndProject();
    }, [projectId]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '300px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container spacing={2} sx={{ m: 1 }}>
            <Grid item xs={4}>
                <Paper style={{ height: '100%', width: '100%' }} elevation={0}>
                    <Typography variant="h4" sx={{ color: `${color.textDark}`, marginBottom: 5 }}>
                        {t('projects.edit')}
                    </Typography>
                    <FormControl error={!!nameError} sx={{ width: '100%', marginBottom: 3 }} size="medium">
                        <InputLabel>{t('projects.name')}</InputLabel>
                        <OutlinedInput
                            error={!!nameError}
                            onChange={(e) => setProjectName(e.target.value)}
                            label={t('projects.name')}
                            value={projectName}
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
                        value={projectDescription}
                    />
                    <Typography variant="h6" sx={{ color: `${color.textDark}`, marginTop: 8, marginBottom: 3 }}>
                        {t('projects.selectMember')}
                    </Typography>
                    <FormControl error={!!memberError} sx={{ width: '100%' }} size="medium">
                        <InputLabel id="select-team-member-label">{t('projects.teamMember')}</InputLabel>
                        <Select
                            labelId="select-team-member-label"
                            id="select-team-member"
                            value={selectedMember}
                            onChange={(event) => setSelectedMember(event.target.value)}
                            label={t('projects.teamMember')}
                            error={!!memberError}
                        >
                            {teamMembers.map((member) => (
                                <MenuItem key={member.employee.id} value={member.employee.id}>
                                    {`${member.name} ${member.surname}`}
                                </MenuItem>
                            ))}
                        </Select>
                        {memberError && <FormHelperText>{memberError}</FormHelperText>}
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
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('users.role')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('projects.action')}
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
                                                <TableCell>
                                                    <InputLabel id={`select-role-label-${member.id}`}></InputLabel>
                                                    <Select
                                                        labelId={`select-role-label-${member.id}`}
                                                        id={`select-role-${member.id}`}
                                                        value={member.role_id}
                                                        onChange={(event) => handleRoleChange(member.id, event.target.value)}
                                                        label={t('projects.role')}
                                                    >
                                                        {roles.map((role) => (
                                                            <MenuItem key={role.id} value={role.id}> {role.role} </MenuItem>
                                                        ))}
                                                    </Select>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <PersonRemoveOutlinedIcon
                                                        onClick={() => handleRemoveMemberClick(member.id)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )) :
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
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
                            onClick={handleSubmit}
                        >
                            {t('projects.edit')}
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default EditProject;
