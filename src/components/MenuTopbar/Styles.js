import styled from 'styled-components';
import { sizes, color } from '@/shared/utils/styles';

export const Topbar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: ${sizes.topbarHeight}px;
    width: 100%;
    padding: 0 16px;
    background: ${color.sidebar};
    border-bottom: 1px solid ${color.recessedBackground}
`;