import MenuSidebar from './MenuSidebar'
import MenuTopbar from './MenuTopbar'
import Select from '@/shared/components/Select'

import { ProjectCanvas } from './Styles'

const Project = () => {
    return (
        <ProjectCanvas>
            <MenuTopbar />
            <MenuSidebar />
            <Select />
        </ProjectCanvas>
    )
}

export default Project