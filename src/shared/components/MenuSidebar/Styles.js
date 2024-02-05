import styled from 'styled-components';

import { sizes, color, font } from '@/shared/utils/styles';

export const Sidebar = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: auto;
    width: ${sizes.sidebarWidth}px;
    padding: 30px 16px 0 16px;
    background: ${color.sidebar};
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