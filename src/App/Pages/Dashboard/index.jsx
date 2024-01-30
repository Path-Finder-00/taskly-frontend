import { useEffect, useState } from 'react'

import Select from '@/shared/components/Select'
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
        <Select options={projects} displayAttribute='name' />
    )
}

export default Dashboard