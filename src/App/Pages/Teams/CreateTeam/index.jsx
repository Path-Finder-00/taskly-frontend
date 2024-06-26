import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router';
import { useSnackbar } from '@/shared/components/Snackbar';
import { color } from '@/shared/utils/styles';
import {
    Grid,
    Box,
    Typography,
    Button,
    OutlinedInput,
    FormControl,
    FormHelperText,
    InputLabel,
} from '@mui/material'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import organizationsService from '@/App/services/organizations';
import teamsService from '@/App/services/teams';


const CreateTeam = () => {
    const navigate = useNavigate();

    const { t } = useTranslation("translations")
    const [team, setTeam] = useState({
        name: "",
        organization: 0
    });
    const [nameError, setNameError] = useState('');
    const { openSnackbar } = useSnackbar();

    const handleSubmit = async () => {
        const isNameValid = validateName();
        let formValid = (isNameValid);

        if (formValid) {
            try {
                await teamsService.createTeam(team)
                openSnackbar(t('teams.creationSuccess'), 'success');
                navigate(`/dashboard`, { replace: true });
            } catch (error) {
                console.error('Error creating team:', error)
                openSnackbar(t('teams.creationError'), 'error');
            }
        }
    };

    const validateName = () => {
        if (team.name.trim() === '') {
            setNameError(t('projects.fieldEmpty'));
            return false;
        } else if (team.name.length > 50) {
            setNameError(t('teams.nameTooLong'));
            return false;
        }
        setNameError('');
        return true;
    }

    const handleChange = (prop) => (event) => {
        const { value } = event.target;
        setTeam({ ...team, [prop]: value });
    };

    useEffect(() => {
        organizationsService
            .getOrganization()
            .then(organization => {
                setTeam({...team, organization: organization.id})
            })
    }, []);

    return (
        <Box sx={{ width: '100%', boxShadow: 3 }} >
            <Box sx={{ backgroundColor: `${color.third}`, color: `${color.mainBackground}`, p: 2 }}>
                <Typography variant="h6" component="div">
                    {t('teams.newTeam')}
                </Typography>
                <Typography variant="subtitle1" component="div" sx={{ ml: 2 }}>
                    {t('teams.newTeamInfo')}
                </Typography>
            </Box>
            <Grid container spacing={4} sx={{ p: 2 }}>
                <Grid item md={12}>
                    <FormControl fullWidth error={!!nameError}>
                        <InputLabel htmlFor="name">{t('teams.name')}</InputLabel>
                        <OutlinedInput
                            error={!!nameError}
                            id="name"
                            value={team.name}
                            onChange={handleChange('name')}
                            label={t('teams.name')}
                        />
                        {nameError && <FormHelperText>{nameError}</FormHelperText>}
                    </FormControl>
                </Grid>
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

export default CreateTeam