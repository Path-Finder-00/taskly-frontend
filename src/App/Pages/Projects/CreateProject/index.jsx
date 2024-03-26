import { useState } from 'react'
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

const CreateProject = () => {

    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [selectedMember, setSelectedMember] = useState('')
    const [selectedRole, setSelectedRole] = useState('')

    const { t } = useTranslation("translations")

    return (
        <Grid container spacing={2} sx={{ m: 1 }}>
            <Grid item xs={4}>
                <Paper style={{ height: '100%', width: '100%' }} elevation={0} >
                    <Typography variant="h4" sx={{ color: `${color.textDark}`, marginBottom: 5}}>
                        {t('projects.createNew')}
                    </Typography>
                    <FormControl sx={{ width: '100%', marginBottom: 3 }} size="medium" >
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
                    <Typography variant="h6" sx={{ color: `${color.textDark}`, marginTop: 8, marginBottom: 3}}>
                        {t('projects.selectMember')}
                    </Typography>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="select-team-member-label">{t('projects.teamMember')}</InputLabel>
                        <Select
                            labelId="select-team-member-label"
                            id="select-team-member"
                            value={selectedMember}
                            onChange={(event) => setSelectedMember(event.target.value)}
                            label={t('project.teamMember')}
                        >
                            {['Dwight Schrute', 'Pamela Beesly', 'Jim Halpert'].map((person) => (
                                <MenuItem key={person} value={person}>{person}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography variant="h6" sx={{ color: `${color.textDark}`, marginTop: 3, marginBottom: 3}}>
                        {t('projects.selectRole')}
                    </Typography>
                    <FormControl sx={{ width: '100%', marginBottom: 5 }}>
                        <InputLabel id="select-role-label">{t('projects.role')}</InputLabel>
                        <Select
                            labelId="select-role-label"
                            id="select-role"
                            value={selectedRole}
                            onChange={(event) => setSelectedRole(event.target.value)}
                            label={t('project.role')}
                        >
                            {['PM', 'Developer', 'Graphic Designer'].map((role) => (
                                <MenuItem key={role} value={role}>{role}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" sx={{ width: '100%', height: '40px' }}>
                        {t('projects.add')}
                    </Button>
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Paper style={{ height: '100%', width: '100%' }} elevation={0}>
                    
                </Paper>
            </Grid>
        </Grid>
    )
}

export default CreateProject