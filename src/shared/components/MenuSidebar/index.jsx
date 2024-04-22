import { useTranslation } from 'react-i18next'
// import { NavLink } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom';
import { ListItem, ListItemText, List, Toolbar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// import { Sidebar, MenuItem } from './Styles'
import { sizes, color, font } from '@/shared/utils/styles';

const MenuSidebar = () => {

    const { t } = useTranslation("translations")

    const StyledBox = styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: sizes.sidebarWidth,
        padding: '30px 16px 0 16px',
        background: color.sidebar
    }))

    const StyledListItem = styled(ListItem)(({ theme, active }) => ({
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
        // const isActive = location.pathname.includes(path);
        const isActive = location.pathname === path;
    
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
                <RenderMenuItem text={t('sidebar.roleAssignments')} path="/roles" />
                <RenderMenuItem text={t('sidebar.projectUsers')} path="/users" />
                <RenderMenuItem text={t('sidebar.myProjects')} path="/projects" />
                <RenderMenuItem text={t('sidebar.myTickets')} path="/tickets" />
                <RenderMenuItem text={t('sidebar.userProfile')} path="/profile" />
                <RenderMenuItem text={t('sidebar.createTicket')} path="/tickets/createTicket" />
            </List>
        </StyledBox>
        // <Sidebar>
            // {renderMenuItem(t('sidebar.dashboard'), '/dashboard')}
            // {renderMenuItem(t('sidebar.roleAssignments'), '/roles')}
            // {renderMenuItem(t('sidebar.projectUsers'), '/users')}
            // {renderMenuItem(t('sidebar.myProjects'), '/projects')}
            // {renderMenuItem(t('sidebar.myTickets'), '/tickets')}
            // {renderMenuItem(t('sidebar.userProfile'), '/profile')}
        // </Sidebar>
    )
}

// const renderMenuItem = (text, path) => {

//     const menuItemProps = { as: NavLink, end: true, to: `${path}`}

//     return (
//         <MenuItem {...menuItemProps}>
//             {text}
//         </MenuItem>
//     )
// }

export default MenuSidebar