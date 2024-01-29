import styled from 'styled-components';
import { sizes, color, font } from '@/shared/utils/styles';

export const Sidebar = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 5px;
    top: ${sizes.topbarHeight}px;
    height: 100vh;
    left: 0;
    width: ${sizes.sidebarWidth}px;
    padding: 30px 16px 24px;
    background: ${color.sidebar};
    border-right: 1px solid ${color.recessedBackground}
`;

export const MenuItem = styled.div`
    position: relative;
    padding: 8px 12px;
    border-radius: 3px;
    &:hover { background: ${color.third}; color: ${color.mainBackground} }
    ${font.size(20)};
    ${font.regular};
    text-decoration: none;
    color: ${color.textDark};

    &.active {
        color: ${color.mainBackground};
        background: ${color.third};
        box-shadow: 4px 4px lightgrey;
    }
`;