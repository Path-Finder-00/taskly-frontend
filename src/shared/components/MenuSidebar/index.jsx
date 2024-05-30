import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

import { ListItem, ListItemText, List, Toolbar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

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

    function RenderMenuItem({ text, path }) {
        const navigate = useNavigate();
        const location = useLocation();
        const isActive = location.pathname.includes(path);
    
        return (
            <StyledListItem button active={isActive ? 1 : 0} onClick={() => navigate(path)}>
                <ListItemText primary={text} />
            </StyledListItem>
        );
    }

    return(
        <StyledBox variant="permanent">
            <Toolbar />
            <List>
                <RenderMenuItem text={t('sidebar.dashboard')} path="/dashboard" />
                <RenderMenuItem text={t('sidebar.myProjects')} path="/projects" />
                <RenderMenuItem text={t('sidebar.myTickets')} path="/tickets" />
                <RenderMenuItem text={t('sidebar.userProfile')} path="/profile/" />
                <RenderMenuItem text={t('sidebar.createTicket')} path="/createTicket" />
                { permissions.includes('createUser') && <RenderMenuItem text={t('sidebar.createUser')} path="/users/createUser" /> }
                { permissions.includes('createTeam') && <RenderMenuItem text={t('sidebar.createTeam')} path="/teams/createTeam" /> }
                { permissions.includes('seeAllUsers') && <RenderMenuItem text={t('sidebar.userList')} path="/users/userList" /> }
            </List>
        </StyledBox>
    )
}

export default MenuSidebar