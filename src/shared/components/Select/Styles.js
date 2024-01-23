import styled from 'styled-components';
import { color, font } from '@/shared/utils/styles';

export const StyledSelect = styled.div`
    position: relative;
    border-radius: 2px;
    ${font.size(18)};
    width: 40%;
    border: 1px solid ${color.textDark};
    background: ${color.mainBackground};
`;

export const SelectedValue = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px 5px 5px 10px;
`

export const Placeholder = styled.div`
    color: ${color.textDark}
`