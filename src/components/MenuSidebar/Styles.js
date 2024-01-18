import styled from 'styled-components';
import { sizes, color } from '@/shared/utils/styles';

export const Sidebar = styled.div`
    position: fixed;
    top: ${sizes.topbarHeight}px;
    height: 100vh;
    left: 0;
    width: ${sizes.sidebarWidth}px;
    padding: 0 16px 24px;
    background: ${color.sidebar};
    border-right: 1px solid ${color.recessedBackground}
`;