import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import projectService from '@/App/services/projects'
import { color } from '@/shared/utils/styles';
import Color from 'color';

import { MenuItem,
        Select,
        Box,
        FormControl,
        InputLabel,
        Paper,
        Grid,
        Typography
    } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

const Dashboard = () => {

    const { t } = useTranslation("translations")

    const [projects, setProjects] = useState([])
    const [tickets, setTickets] = useState([])
    const [selectedProject, setSelectedProject] = useState('')
    const [types, setTypes] = useState([])
    const [typesChartKey, setTypesChartKey] = useState(0)
    const [priorities, setPriorities] = useState([])
    const [statuses, setStatuses] = useState([])
    const [assignees, setAssignees] = useState([])

    const colors = [
        Color(color.third).string(),
        Color(color.third).darken(0.25).string(),
        Color(color.third).darken(0.50).string(),
        Color(color.third).darken(0.75).string()
    ]

    useEffect(() => {
        projectService
            .getUserProjects()
            .then(projects => {
                setProjects(projects)})
    }, [])

    useEffect(() => {
        if (selectedProject) {
            projectService
                .getProjectById(selectedProject.id)
                .then(project => {
                    setTickets(project.tickets)
                })
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

    const getPrioritiesBarChartData = () => {
        const mapping = { 1: t('dashboard.low'), 2: t('dashboard.normal'), 3: t('dashboard.high'), 4: t('dashboard.critical') }
        const priorities = tickets.map(ticket =>
            ticket.ticket_histories
                .reduce((max, ticket) => (ticket.id > max.id ? ticket : max), ticket.ticket_histories[0])
                .priorityId
        )

        const countOccurrences = priorities.reduce((acc, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
        }, {});

        const data = Object.keys(mapping).map((key) => ({
            id: parseInt(key, 10),
            value: countOccurrences[key] || 0,
            label: mapping[key]
        })); 

        console.log(data)

        setPriorities(data)
    }

    const getTypesPieChartData = () => {
        const mapping = { 1: "bug", 2: "feature", 3: "task", 4: "improvement" }
        const types = tickets.map(ticket =>
            ticket.typeId
        )
        
        const countOccurrences = types.reduce((acc, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
        }, {});

        const data = Object.keys(countOccurrences).map((key) => ({
            id: parseInt(key, 10),
            value: countOccurrences[key],
            label: mapping[key]
        }));

        setTypes(data)
        setTypesChartKey((prevKey) => prevKey + 1)
    }

    const getStatusesBarChartData = () => {
        const mapping = { 1: t('dashboard.open'), 2: t('dashboard.assigned'), 3: t('dashboard.closed') }
        const statuses = tickets.map(ticket =>
            ticket.ticket_histories
                .reduce((max, ticket) => (ticket.id > max.id ? ticket : max), ticket.ticket_histories[0])
                .statusId
        )

        const countOccurrences = statuses.reduce((acc, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
        }, {});

        const data = Object.keys(mapping).map((key) => ({
            id: parseInt(key, 10),
            value: countOccurrences[key] || 0,
            label: mapping[key]
        })); 

        console.log(data)

        setStatuses(data)
    }

    const getAsigneesPieChartData = () => {
        const getLatestTicketHistory = (ticketHistories) =>
            ticketHistories.reduce((latest, history) => (history.id > latest.id ? history : latest), ticketHistories[0]);
            
        const assignees = tickets
            .map(ticket => getLatestTicketHistory(ticket.ticket_histories))
            .filter(latestHistory => latestHistory.employee !== null)
            .map(latestHistory => `${latestHistory.employee.user.name} ${latestHistory.employee.user.surname}`);

        const uniqueNames = [...new Set(assignees)]

        console.log(assignees)
        console.log(uniqueNames)

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
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                    <Paper sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                            <BarChart
                                xAxis={[{ 
                                    scaleType: 'band', 
                                    data: [t('dashboard.low'), t('dashboard.normal'), t('dashboard.high'), t('dashboard.critical')],
                                    colorMap: {
                                        type: 'ordinal',
                                        colors: colors
                                    }
                                }]}
                                series={[
                                    { data: priorities.map(priority => priority.value) }
                                ]}
                            />
                        </Box>
                        <Box sx={{ bgcolor: `${color.third}`, padding: 1, width: '100%' }}>
                        <Typography variant="body2" align="center" color="white">
                            Tickets by Priority
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
                            />
                        </Box>
                        <Box sx={{ bgcolor: `${color.third}`, padding: 1, width: '100%' }}>
                        <Typography variant="body2" align="center" color="white">
                            Tickets by Type
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
                                    data: [t('dashboard.open'), t('dashboard.assigned'), t('dashboard.closed')],
                                    colorMap: {
                                        type: 'ordinal',
                                        colors: colors
                                    } 
                                }]}
                                series={[
                                    { data: statuses.map(status => status.value) }
                                ]}
                            />
                        </Box>
                        <Box sx={{ bgcolor: `${color.third}`, padding: 1, width: '100%' }}>
                        <Typography variant="body2" align="center" color="white">
                            Tickets by Status
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
                                        data: assignees,
                                        innerRadius: 50,
                                        outerRadius: 120,
                                        paddingAngle: 5,
                                        cornerRadius: 5,
                                        cx: 150,
                                        cy: 150
                                    }
                                ]}
                            />
                        </Box>
                        <Box sx={{ bgcolor: `${color.third}`, padding: 1, width: '100%' }}>
                        <Typography variant="body2" align="center" color="white">
                            Tickets by Person
                        </Typography>
                        </Box>
                    </Paper>
                    </Grid>
                </Grid>
                </Box>
        </Box>
    )
}

export default Dashboard