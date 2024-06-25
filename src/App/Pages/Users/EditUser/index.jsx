import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from '@/shared/components/Snackbar';
import { usePermissions } from '@/shared/components/Permissions';
import { color } from '@/shared/utils/styles';
import {
    Grid,
    Box,
    Typography,
    Button,
    OutlinedInput,
    FormControl,
    Select,
    MenuItem,
    FormHelperText,
    InputLabel,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    CircularProgress
} from '@mui/material'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import technologiesService from '@/App/services/technologies';
import organizationsService from '@/App/services/organizations';
import projectsService from '@/App/services/projects';
import usersService from '@/App/services/users';
import employmentHistoriesService from '@/App/services/employment_histories';


const EditUser = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();
    const { openSnackbar } = useSnackbar();
    const permissions = usePermissions();
    const userId = useParams().userId;
    const { t } = useTranslation("translations")
    const [user, setUser] = useState(null);
    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [technologies, setTechnologies] = useState([]);
    const [teams, setTeams] = useState([]);
    const [projects, setProjects] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [teamError, setTeamError] = useState('');
    const [projectError, setProjectError] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSubmit = async () => {
        const isNameValid = validateName();
        const isSurnameValid = validateSurname();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        let formValid = isNameValid && isSurnameValid && isEmailValid && isPhoneValid && isPasswordValid;

        setTeamError('');
        setProjectError('');

        if (!user.is_client) {
            if (!user.team) {
                setTeamError(t('projects.fieldEmpty'));
                formValid = false;
            }
        } else {
            if (!user.project) {
                setProjectError(t('projects.fieldEmpty'));
                formValid = false;
            }
        }
        if (formValid) {
            try {
                await usersService.editUser(userId, user)
                openSnackbar(t('users.editingSuccess'), 'success');
                navigate(`/profile/${userId}`, { replace: true });
            } catch (error) {
                if (error && error === "Email exists") {
                    openSnackbar(t('users.emailExistsError'), 'error');
                } else {
                    console.error('Error creating user:', error)
                    openSnackbar(t('users.creationError'), 'error');
                }
            }
        }
    };

    const handleChange = (prop) => (event) => {
        const { type, value, checked, options } = event.target;
        if (type === 'checkbox') {
            if (prop === 'is_client') {
                setUser(user => ({
                    ...user,
                    [prop]: checked,
                    admin: checked ? false : user.admin,
                    team_lead: checked ? false : user.team_lead,
                    team: checked ? '' : user.team,
                    technologies: checked ? [] : user.technologies,
                    role: checked ? '' : user.role
                }))
            } else {
                setUser({ ...user, [prop]: type === 'checkbox' ? checked : value });
            }
        } else if (type === 'select-multiple') {
            const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
            setUser({ ...user, [prop]: selectedOptions });
        } else {
            setUser({ ...user, [prop]: value });
            if (prop === 'email') {
                validateEmail();
            }
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validateName = () => {
        if (user.name.trim() === '') {
            setNameError(t('projects.fieldEmpty'));
            return false;
        } else if (user.name.length > 40) {
            setNameError(t('users.nameTooLong'));
            return false;
        }
        setNameError('');
        return true;
    }

    const validateSurname = () => {
        if (user.surname.trim() === '') {
            setSurnameError(t('projects.fieldEmpty'));
            return false;
        } else if (user.surname.length > 40) {
            setSurnameError(t('users.surnameTooLong'));
            return false;
        }
        setSurnameError('');
        return true;
    }

    const validateEmail = () => {
        if (!user.email.trim()) {
            setEmailError(t('projects.fieldEmpty'));
            return false;
        }
        if (!emailRegex.test(user.email.toLowerCase())) {
            setEmailError(t('users.emailInvalid'));
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePhone = () => {
        if (!user.phone.trim()) {
            setPhoneError(t('projects.fieldEmpty'));
            return false;
        }
        if (!parsePhoneNumberFromString(user.phone)) {
            setPhoneError(t('users.phoneInvalid'));
            return false;
        }
        setPhoneError('');
        return true;
    };

    const validatePassword = () => {
        if (user.password.length > 0 && user.password.length < 8) {
            setPasswordError(t('users.passwordTooShort'));
            return false;
        }
        setPasswordError('');
        return true;
    }

    const renderTechnologyNames = (selectedIds) => {
        const selectedTechnologies = technologies.filter(tech => selectedIds.includes(tech.id));
        return selectedTechnologies.map(tech => tech.technology).join(', ');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await usersService.getUserById(userId)
                const organization = await organizationsService.getOrganization()
                if (userData.accessId === 5) { // Check if user is a client
                    const projectsData = await projectsService.getProjectsByOrgId(organization.id)
                    setProjects(projectsData)
                    const clientProjects = await projectsService.getProjectByUserId(userId)
                    const clientProject = clientProjects.filter(project => project.employee_project.to === null)[0]
                    setUser(
                        {
                            password: '',
                            name: userData.name,
                            surname: userData.surname,
                            email: userData.email,
                            phone: userData.phone,
                            project: clientProject.id,
                            is_client: true,
                            organization: organization.id
                        }
                    )
                } else {
                    const employmentHistoriesData = await employmentHistoriesService.getEmploymentHistoriesByUserId(userId)

                    const technologiesData = await technologiesService.getTechnologies()
                    setTechnologies(technologiesData)

                    const teamsData = await organizationsService.getTeamsByOrganizationId(organization.id)
                    setTeams(teamsData)

                    setUser(
                        {
                            password: '',
                            name: userData.name,
                            surname: userData.surname,
                            email: userData.email,
                            phone: userData.phone,
                            technologies: userData.employee.technologies.map(tech => tech.id),
                            team: employmentHistoriesData.length !== 0 ? employmentHistoriesData[employmentHistoriesData.length - 1].team.id : '',
                            is_client: false,
                            organization: organization.id,
                            team_lead: userData.accessId === 2,
                            admin: userData.accessId === 1
                        }
                    )
                }
            } catch (err) {
                console.error("Error fetching data: ", err);
            } finally {
                setLoading(false)
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
        <Box sx={{ width: '100%', boxShadow: 3 }} >
            <Box sx={{ backgroundColor: `${color.third}`, color: `${color.mainBackground}`, p: 2 }}>
                <Typography variant="h6" component="div">
                    {t('users.editUser')}
                </Typography>
            </Box>
            <Grid container spacing={4} sx={{ p: 2 }}>
                <Grid item md={6}>
                    <FormControl fullWidth error={!!nameError}>
                        <InputLabel htmlFor="name">{t('users.name')}</InputLabel>
                        <OutlinedInput
                            error={!!nameError}
                            id="name"
                            value={user.name}
                            onChange={handleChange('name')}
                            label={t('users.name')}
                            disabled={!permissions.includes("editUserInTeam") && !permissions.includes("editAnyUser")}
                        />
                        {nameError && <FormHelperText>{nameError}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth error={!!surnameError}>
                        <InputLabel htmlFor="surname">{t('users.surname')}</InputLabel>
                        <OutlinedInput
                            error={!!surnameError}
                            id="surname"
                            value={user.surname}
                            onChange={handleChange('surname')}
                            label={t('users.surname')}
                            disabled={!permissions.includes("editUserInTeam") && !permissions.includes("editAnyUser")}
                        />
                        {surnameError && <FormHelperText>{surnameError}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth error={!!emailError}>
                        <InputLabel htmlFor="email">{t('users.email')}</InputLabel>
                        <OutlinedInput
                            error={!!emailError}
                            id="email"
                            value={user.email}
                            onChange={handleChange('email')}
                            label={t('users.email')}
                            disabled={!permissions.includes("editUserInTeam") && !permissions.includes("editAnyUser")}
                        />
                        {emailError && <FormHelperText>{emailError}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth error={!!passwordError}>
                        <InputLabel htmlFor="password">{t('users.password')}</InputLabel>
                        <OutlinedInput
                            error={!!passwordError}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={user.password}
                            onChange={handleChange('password')}
                            label={t('users.password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {passwordError && <FormHelperText>{passwordError}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth error={!!phoneError}>
                        <InputLabel htmlFor="phone">{t('users.phone')}</InputLabel>
                        <OutlinedInput
                            error={!!phoneError}
                            id="phone"
                            value={user.phone}
                            onChange={handleChange('phone')}
                            label={t('users.phone')}
                            disabled={!permissions.includes("editUserInTeam") && !permissions.includes("editAnyUser")}
                        />
                        {phoneError && <FormHelperText>{phoneError}</FormHelperText>}
                    </FormControl>
                </Grid>
                {user.is_client && (
                    <Grid item md={6}>
                        <FormControl fullWidth error={!!projectError}>
                            <InputLabel id="project-label">{t('dashboard.project')}</InputLabel>
                            <Select
                                labelId="project-label"
                                id="project"
                                value={user.project}
                                onChange={handleChange('project')}
                                label={t('dashboard.project')}
                                disabled={!permissions.includes("editUserInTeam") && !permissions.includes("editAnyUser")}
                            >
                                {projects?.map((projects) => (
                                    <MenuItem
                                        key={projects.id}
                                        value={projects.id}
                                    >
                                        {projects.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {projectError && <FormHelperText>{projectError}</FormHelperText>}
                        </FormControl>
                    </Grid>
                )}
                {!user.is_client && (
                    <Grid item md={6}>
                        <FormControl fullWidth error={!!teamError}>
                            <InputLabel id="team-label">{t('teams.team')}</InputLabel>
                            <Select
                                labelId="team-label"
                                id="team"
                                value={user.team}
                                onChange={handleChange('team')}
                                label={t('teams.team')}
                                disabled={!permissions.includes("editUserInTeam") && !permissions.includes("editAnyUser")}
                            >
                                {teams?.map((team) => (
                                    <MenuItem
                                        key={team.id}
                                        value={team.id}
                                    >
                                        {team.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {teamError && <FormHelperText>{teamError}</FormHelperText>}
                        </FormControl>
                    </Grid>
                )}
                {!user.is_client && (
                    <Grid item md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="technologies-label">{t('users.technologies')}</InputLabel>
                            <Select
                                labelId="technologies-label"
                                id="technologies"
                                multiple
                                value={user.technologies}
                                onChange={handleChange('technologies')}
                                renderValue={renderTechnologyNames}
                                label={t('users.technologies')}
                            >
                                {technologies.map((technology) => (
                                    <MenuItem key={technology.id} value={technology.id}>
                                        {technology.technology}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )}
                {!user.is_client && (
                    <Grid item md={6}>
                    </Grid>
                )}
                {!user.is_client && (
                    <Grid item md={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={user.admin}
                                    onChange={handleChange('admin')}
                                    name="admin"
                                    color="primary"
                                    disabled={(!permissions.includes("editUserInTeam") && !permissions.includes("editAnyUser")) || !permissions.includes("createHighAccessUser")}
                                />
                            }
                            label={t('users.admin')}
                        />
                    </Grid>
                )}
                {!user.is_client && (
                    <Grid item md={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={user.team_lead}
                                    onChange={handleChange('team_lead')}
                                    name="team_lead"
                                    color="primary"
                                    disabled={(!permissions.includes("editUserInTeam") && !permissions.includes("editAnyUser")) || !permissions.includes("createHighAccessUser")}
                                />
                            }
                            label={t('teams.teamLead')}
                        />
                    </Grid>
                )}
                <Grid item md={6}>
                    <Button
                        onClick={() => navigate(-1)}
                        sx={{
                            display: 'flex'
                        }}
                    >
                        <KeyboardReturnIcon />
                    </Button>
                </Grid>
                <Grid item md={6}>
                    <Button variant="contained" onClick={handleSubmit} sx={{ width: '100%' }}>
                        {t('tickets.submit')}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default EditUser
