import { useTranslation } from 'react-i18next'
import { NavLink, useResolvedPath } from 'react-router-dom'

import { Sidebar, MenuItem, ItemText } from './Styles'

const MenuSidebar = () => {
    const match = useResolvedPath()

    const { t } = useTranslation("translations")

    return(
        <Sidebar>
            {renderMenuItem(match, t('sidebar.dashboard'), '/dashboard')}
            {renderMenuItem(match, t('sidebar.roleAssignments'), '/dashboard')}
            {renderMenuItem(match, t('sidebar.projectUsers'), '/dashboard')}
            {renderMenuItem(match, t('sidebar.myProjects'), '/dashboard')}
            {renderMenuItem(match, t('sidebar.myTickets'), '/dashboard')}
            {renderMenuItem(match, t('sidebar.userProfile'), '/dashboard')}
        </Sidebar>
    )
}

const renderMenuItem = (match, text, path) => {
    const isImplemented = !!path

    const menuItemProps = isImplemented
        ? { as: NavLink, exact: true, to: `${match.pathname}${path}`}
        : { as: 'div' }

    return (
        <MenuItem {...menuItemProps}>
            <ItemText>{text}</ItemText>
        </MenuItem>
    )
}

export default MenuSidebar