import styled from 'styled-components';

import { color } from '@/shared/utils/styles';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
`;

export const Canvas = styled.div`
    flex: 1;
    border: 1px solid ${color.recessedBackground};
    padding: 30px;
`;