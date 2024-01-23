import styled from 'styled-components';
import { color, font } from '@/shared/utils/styles';

export const Item = styled.div`
    position: relative;
    display: flex;
    padding: 8px 12px;
    border-radius: 3px;
    &:hover { background: ${color.third}; color: ${color.mainBackground} }
`;

export const ItemText = styled.div`
    padding-top: 2px;
    ${font.size(20)};
    ${font.regular};
`;