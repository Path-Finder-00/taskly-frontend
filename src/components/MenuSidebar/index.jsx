import { useTranslation } from 'react-i18next'
import { Sidebar } from './Styles'
import MenuItem from './MenuItem'

const MenuSidebar = () => {

    const { t } = useTranslation("translations")

    return(
        <Sidebar>
            <MenuItem text={t('sidebar.dashboard')} />
            <MenuItem text={t('sidebar.roleAssignments')} />
            <MenuItem text={t('sidebar.projectUsers')} />
            <MenuItem text={t('sidebar.myProjects')} />
            <MenuItem text={t('sidebar.myTickets')} />
            <MenuItem text={t('sidebar.userProfile')} />
        </Sidebar>
    )
}

export default MenuSidebar