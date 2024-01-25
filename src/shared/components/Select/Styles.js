import styled from 'styled-components';
import { color, font, styleUtils } from '@/shared/utils/styles';

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
    color: ${color.textDark};
`

export const Dropdown = styled.div`
    position: absolute;
    top: 100%;
    left: -1px;
    ${font.size(18)};
    border-radius: 0 0 2px 2px;
    background: ${color.mainBackground};
    width: 100%;
    border: 1px solid ${color.textDark};
`

export const Options = styled.div`
    max-height: 200px;
    ${styleUtils.scrollableY}
`

export const Option = styled.div`
    padding: 5px 5px 5px 10px;
    word-break: break-word;
    &:hover { background: ${color.third}; color: ${color.mainBackground} }
`