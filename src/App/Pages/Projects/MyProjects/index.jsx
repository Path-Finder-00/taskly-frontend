import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

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
} from '@mui/material'

import Filter from './Filter'
import projectService from '@/App/services/projects'

import { sizes, color, font } from '@/shared/utils/styles';

const Projects = () => {

    const [filter, setFilter] = useState('')
    const [projects, setProjects] = useState([])
    const filterCount = projects.length

    const { t } = useTranslation("translations")

    useEffect(() => {
        projectService
            .getUserProjects()
            .then(projects => {
                setProjects(projects)})
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }
    
    return (
        <Box sx={{ flexGrow: 1, p: 3, height: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingBottom: '20px'
                }}
            >
                <Typography variant="h4" sx={{ color: `${color.textDark}`}}>
                    {t('projects.title')}
                </Typography>
                <Button variant="contained" sx={{ maxWidth: '400px', width: '30%', height: '40px' }}>
                    {t('projects.create')}
                </Button>
            </Box>
            <Box sx={{ width: '100%', boxShadow: 3  }} >
                <Box sx={{ backgroundColor: `${color.third}`, color: `${color.mainBackground}`, p: 2 }}>
                <Typography variant="h6" component="div">
                    {t('projects.yourProjects')}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {t('projects.subtitle')}
                </Typography>
                </Box>
                <TableContainer component={Paper} elevation={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                        <Filter handleFilterChange={handleFilterChange} />
                    </Box>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6" sx={{ color: `${color.textDark}`}}>
                                        {t('projects.name')}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6" sx={{ color: `${color.textDark}`}}>
                                        {t('projects.description')}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" sx={{ color: `${color.textDark}`}}>
                                        {t('projects.action')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterCount !== 0 ? projects.filter(project => project.name.toLowerCase().includes(filter.toLowerCase())).map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell component="th" scope="row">
                                        {project.name}
                                    </TableCell>
                                    <TableCell>
                                        {project.description}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="primary">{t('projects.manage')}</Button>
                                        <Button variant="outlined" color="primary" sx={{ ml: 1 }}>{t('projects.details')}</Button>
                                    </TableCell>
                                </TableRow>
                                )) :
                                <TableRow key={0}>
                                    <TableCell>
                                        {t('projects.noProject')}
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default Projects