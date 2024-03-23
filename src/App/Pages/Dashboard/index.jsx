import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import projectService from '@/App/services/projects'
import { MenuItem, Select, Box, FormControl, InputLabel } from '@mui/material'

const Dashboard = () => {

    const { t } = useTranslation("translations")

    const [projects, setProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState('')

    useEffect(() => {
        projectService
            .getUserProjects()
            .then(projects => {
                setProjects(projects)})
    }, [])

    const handleChange = (event) => {
        setSelectedProject(event.target.value)
    }

    return (
        <Box>
            <FormControl sx={{ width: '40%', maxWidth: '600px'}} >
                <InputLabel id="project-select-label">{t('dashboards.project')}</InputLabel>
                <Select 
                    labelId="project-select-label"
                    id="project-select"
                    value={selectedProject}
                    label="project"
                    onChange={handleChange}
                >
                    {projects.map((project) => (
                        <MenuItem
                            key={project['name']}
                            value={project['name']}
                        >
                            {project['name']}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default Dashboard