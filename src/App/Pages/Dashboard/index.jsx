import { useEffect, useState } from 'react'

import Select from '@/shared/components/Select'
import { DashboardCanvas } from './Styles'
import projectService from '@/App/services/projects'

const Dashboard = () => {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        projectService
            .getUserProjects()
            .then(projects => {
                setProjects(projects)})
    }, [])

    return (
        <DashboardCanvas>
            <Select options={projects} displayAttribute='name' />
        </DashboardCanvas>
    )
}

export default Dashboard