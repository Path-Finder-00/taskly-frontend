import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router';
import { sizes, color, font } from '@/shared/utils/styles';
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
} from '@mui/material'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import organizationsService from '@/App/services/organizations';
import teamsService from '@/App/services/teams';


const CreateTeam = () => {
    const navigate = useNavigate();

    const { t } = useTranslation("translations")
    const [team, setTeam] = useState({
        name: ""
    });
    const [nameError, setNameError] = useState('');

    const handleSubmit = async () => {
        const isNameValid = validateName();
        let formValid = (isNameValid);

        if (formValid) {
            // console.log(team)
            try {
                const response = await teamsService.createTeam(team)
                navigate(`/dashboard`, { replace: true });
                console.log(response)
            } catch (error) {
                console.error('Error creating ticket:', error)
            }
        }
    };

    const validateName = () => {
        if (team.name.trim() === '') {
            setNameError(t('projects.fieldEmpty'));
            return false;
        } else if (team.name.length > 40) {
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
            .getOrganizationsId()
            .then(organizationId => {
                setTeam({...team, organization: organizationId})
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
                            label="name"
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