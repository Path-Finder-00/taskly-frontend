import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

import projectService from '@/App/services/projects'
import { color } from '@/shared/utils/styles';
import { usePermissions } from '@/shared/components/Permissions';
import Color from 'color';

import { MenuItem,
        Select,
        Box,
        FormControl,
        InputLabel,
        Paper,
        Grid,
        Typography,
        CircularProgress 
    } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

const Dashboard = () => {

    const { t } = useTranslation("translations")
    const navigate = useNavigate();

    const [projects, setProjects] = useState([])
    const [tickets, setTickets] = useState([])
    const [selectedProject, setSelectedProject] = useState('')
    const [types, setTypes] = useState([])
    const [typesChartKey, setTypesChartKey] = useState(0)
    const [priorities, setPriorities] = useState([])
    const [statuses, setStatuses] = useState([])
    const [assignees, setAssignees] = useState([])
    const [loading, setLoading] = useState(true)
    // const [permissions, setPermissions] = useState([]);
    const permissions = usePermissions();

    const colors = [
        Color(color.third).string(),
        Color(color.third).darken(0.25).string(),
        Color(color.third).darken(0.50).string(),
        Color(color.third).darken(0.75).string()
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (permissions.includes('seeAllProjects')){
                    const projectsData = await projectService.getProjectsByOrgId();
                    setProjects(projectsData);
                } else if (permissions.includes('seeAllProjectsInTeam')) {
                    const projectsData = await projectService.getProjectsByTeamId();
                    setProjects(projectsData);
                } else {
                    const userProjects = await projectService.getUserProjects()
                    setProjects(userProjects)
                }
            } catch (error) {
                console.error("Error while fetching users's projects: ", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [permissions])

    useEffect(() => {
        if (projects.length > 0) {
            const fetchData = async () => {
                try {
                    const projectsTickets = await projectService.getProjectTickets(projects[0].id)
                    setTickets(projectsTickets)
                    setSelectedProject(projects[0])
                } catch (error) {
                    console.error("Error while fetching project's tickets data: ", error)
                }
            }
            fetchData()
        }
    }, [projects])

    useEffect(() => {
        if (selectedProject) {
            const fetchData = async () => {
                try {
                    const projectsTickets = await projectService.getProjectTickets(selectedProject.id)
                    setTickets(projectsTickets)
                } catch (error) {
                    console.error("Error while fetching selected project's tickets data: ", error)
                }
            }
            fetchData()
        }
    }, [selectedProject])

    useEffect(() => {
        if (tickets.length > 0) {
            getTypesPieChartData()
            getPrioritiesBarChartData()
            getStatusesBarChartData()
            getAsigneesPieChartData()
        } else {
            setPriorities([])
            setTypes([])
            setStatuses([])
            setAssignees([])
        }
    }, [tickets])

    const handleSelectChange = async (event) => {
        setSelectedProject(event.target.value)
    }
    
    const handleChartClick = async (filterAttribute, attributeId) => {
        navigate(`/projects/projectTickets/${selectedProject.id}`, {
            state: { filterAttribute, attributeId }
        })
    }

    const getPrioritiesBarChartData = () => {
        const mapping = { "Niski": t('dashboard.low'), "Średni": t('dashboard.medium'), "Wysoki": t('dashboard.high'), "Krytyczny": t('dashboard.critical') }
        const priorities = tickets.map(ticket =>
            ticket.priority
        )

        const countOccurrences = priorities.reduce((acc, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
        }, {})

        const data = Object.keys(mapping).map((key) => ({
            id: key,
            value: countOccurrences[key] || 0,
            label: mapping[key]
        })); 

        setPriorities(data)
    }

    const getTypesPieChartData = () => {
        const types = tickets.map(ticket =>
            ticket.type
        )
        
        const countOccurrences = types.reduce((acc, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
        }, {});

        const data = Object.entries(countOccurrences).map(([label, value], index) => ({
            id: index,
            value,
            label
        }))

        setTypes(data)
        setTypesChartKey((prevKey) => prevKey + 1)
    }

    const getStatusesBarChartData = () => {
        const mapping = { "Nowy": t('dashboard.open'), "Przypisany": t('dashboard.assigned'), "W trakcie": t('dashboard.inProgress'), "Oceniany": t('dashboard.underReview'), "Zamknięty": t('dashboard.closed') }

        const statuses = tickets
            .map(ticket => ticket.status)

        const countOccurrences = statuses.reduce((acc, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
        }, {});

        const data = Object.keys(mapping).map((key) => ({
            id: key,
            value: countOccurrences[key] || 0,
            label: mapping[key]
        })); 

        setStatuses(data)
    }

    const getAsigneesPieChartData = () => {

        const assignees = tickets
            .filter(ticket => ticket.name !== null && ticket.surname !== null)
            .map(ticket => ticket.name + " " + ticket.surname)

        const countOccurrences = assignees.reduce((acc, name) => {
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {})

        const data = Object.entries(countOccurrences).map(([label, value], index) => ({
            id: index,
            value,
            label
        }))

        setAssignees(data)
    }

    return (
        <Box>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <FormControl sx={{ width: '40%', maxWidth: '600px'}} >
                    <InputLabel id="project-select-label">{t('dashboard.project')}</InputLabel>
                    <Select 
                        labelId="project-select-label"
                        id="project-select"
                        value={selectedProject}
                        label="project"
                        onChange={handleSelectChange}
                    >
                        {projects.map((project) => (
                            <MenuItem
                                key={project.id}
                                value={project}
                            >
                                {project.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                { loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '300px' }}>
                        <CircularProgress />
                    </Box>
                ) : ( <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                                    <BarChart
                                        xAxis={[{ 
                                            scaleType: 'band', 
                                            data: [t('dashboard.low'), t('dashboard.medium'), t('dashboard.high'), t('dashboard.critical')],
                                            colorMap: {
                                                type: 'ordinal',
                                                colors: colors
                                            }
                                        }]}
                                        series={[
                                            { data: priorities.map(priority => priority.value) }
                                        ]}
                                        slotProps={{
                                            noDataOverlay: { message: t('dashboard.noData')}
                                        }}
                                        onItemClick={(event, d) => handleChartClick('priorities', priorities[d.dataIndex].id)}
                                    />
                                </Box>
                                <Box sx={{ bgcolor: `${color.third}`, padding: 1, width: '100%' }}>
                                    <Typography variant="body1" align="center" color="white">
                                        {t('dashboard.priorities')}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                                    <PieChart
                                        key={typesChartKey}
                                        colors={colors}
                                        series={[
                                            {
                                                data: types,
                                                innerRadius: 50,
                                                outerRadius: 120,
                                                paddingAngle: 5,
                                                cornerRadius: 5,
                                                cx: 150,
                                                cy: 150
                                            }
                                        ]}
                                        slotProps={{
                                            noDataOverlay: { message: t('dashboard.noData')}
                                        }}
                                        onItemClick={(event, d) => handleChartClick('types', types[d.dataIndex].label)}
                                    />
                                </Box>
                                <Box sx={{ bgcolor: `${color.third}`, padding: 1, width: '100%' }}>
                                    <Typography variant="body1" align="center" color="white">
                                        {t('dashboard.types')}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                                    <BarChart
                                        colors={colors}
                                        xAxis={[{ 
                                            scaleType: 'band', 
                                            data: [t('dashboard.open'), t('dashboard.assigned'), t('dashboard.inProgress'), t('dashboard.underReview'), t('dashboard.closed')],
                                            colorMap: {
                                                type: 'ordinal',
                                                colors: colors
                                            } 
                                        }]}
                                        series={[
                                            { data: statuses.map(status => status.value) }
                                        ]}
                                        slotProps={{
                                            noDataOverlay: { message: t('dashboard.noData')}
                                        }}
                                        onItemClick={(event, d) => handleChartClick('statuses', statuses[d.dataIndex].id)}
                                    />
                                </Box>
                                <Box sx={{ bgcolor: `${color.third}`, padding: 1, width: '100%' }}>
                                    <Typography variant="body1" align="center" color="white">
                                        {t('dashboard.statuses')}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                                    <PieChart
                                        colors={colors}
                                        series={[
                                            {
                                                id: 'assignees',
                                                data: assignees,
                                                innerRadius: 50,
                                                outerRadius: 120,
                                                paddingAngle: 5,
                                                cornerRadius: 5,
                                                cx: 150,
                                                cy: 150
                                            }
                                        ]}
                                        slotProps={{
                                            noDataOverlay: { message: t('dashboard.noData')}
                                        }}
                                        onItemClick={(event, d) => handleChartClick('assignees', assignees[d.dataIndex].label)}
                                    />
                                </Box>
                                <Box sx={{ bgcolor: `${color.third}`, padding: 1, width: '100%' }}>
                                    <Typography variant="body1" align="center" color="white">
                                        {t('dashboard.persons')}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    )
}

export default Dashboard;
