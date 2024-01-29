import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { Sidebar, MenuItem } from './Styles'

const MenuSidebar = () => {

    const { t } = useTranslation("translations")

    return(
        <Sidebar>
            {renderMenuItem(t('sidebar.dashboard'), '/dashboard')}
            {renderMenuItem(t('sidebar.roleAssignments'), '/roles')}
            {renderMenuItem(t('sidebar.projectUsers'), '/users')}
            {renderMenuItem(t('sidebar.myProjects'), '/projects')}
            {renderMenuItem(t('sidebar.myTickets'), '/tickets')}
            {renderMenuItem(t('sidebar.userProfile'), '/profile')}
        </Sidebar>
    )
}

const renderMenuItem = (text, path) => {

    const menuItemProps = { as: NavLink, end: true, to: `${path}`}

    return (
        <MenuItem {...menuItemProps}>
            {text}
        </MenuItem>
    )
}

export default MenuSidebar