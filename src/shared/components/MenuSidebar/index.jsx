import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

import { ListItem, ListItemText, List, Toolbar, Box, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import BugReportIcon from '@mui/icons-material/BugReport';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreateIcon from '@mui/icons-material/Create';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleIcon from '@mui/icons-material/People';

import { sizes, color, font } from '@/shared/utils/styles';

import { usePermissions } from '@/shared/components/Permissions';

const MenuSidebar = () => {

    const { t } = useTranslation("translations")
    const permissions = usePermissions()

    const StyledBox = styled(Box)(() => ({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'fixed',
        width: sizes.sidebarWidth,
        minWidth: sizes.sidebarWidth,
        padding: '30px 16px 0 16px',
        background: color.sidebar
    }))

    const StyledListItem = styled(ListItem)(({ active }) => ({
        position: 'relative',
        padding: '8px 12px',
        borderRadius: '3px',
        '&:hover': {
            background: color.third,
            color: color.mainBackground,
        },
        fontSize: font.size,
        fontWeight: font.regular,
        textDecoration: 'none',
        color: color.textDark,
        ...(active && {
            color: color.mainBackground,
            background: color.third,
            boxShadow: '4px 4px lightgrey',
        }),
    }));

    function RenderMenuItem({ text, path, Icon }) {
        const navigate = useNavigate();
        const location = useLocation();
        const isActive = location.pathname.includes(path);
    
        return (
            <StyledListItem button active={isActive ? 1 : 0} onClick={() => navigate(path)}>
                <ListItemText primary={text} />
                {Icon && <ListItemIcon><Icon /></ListItemIcon>}
            </StyledListItem>
        );
    }

    return(
        <StyledBox variant="permanent">
            <Toolbar />
            <List>
                <RenderMenuItem text={t('sidebar.dashboard')} Icon={DashboardIcon} path="/dashboard" />
                <RenderMenuItem text={t('sidebar.myProjects')} Icon={FolderIcon} path="/projects" />
                <RenderMenuItem text={t('sidebar.myTickets')} Icon={BugReportIcon} path="/tickets" />
                <RenderMenuItem text={t('sidebar.userProfile')} Icon={AccountBoxIcon} path="/profile/" />
                <RenderMenuItem text={t('sidebar.createTicket')} Icon={CreateIcon} path="/createTicket" />
                { permissions.includes('createUser') && <RenderMenuItem text={t('sidebar.createUser')} Icon={PersonAddIcon} path="/users/createUser" /> }
                { permissions.includes('createTeam') && <RenderMenuItem text={t('sidebar.createTeam')} Icon={GroupAddIcon} path="/teams/createTeam" /> }
                { permissions.includes('seeAllUsers') && <RenderMenuItem text={t('sidebar.userList')} Icon={PeopleIcon} path="/users/userList" /> }
            </List>
        </StyledBox>
    )
}

export default MenuSidebar