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
    color: ${color.textDark}
`

export const Dropdown = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    border-radius: 0 0 4px 4px;
    background: #fff;
    width: 100%;
`

export const Options = styled.div`
    max-height: 200px;
    ${styleUtils.scrollableY}
`

export const Option = styled.div`
    padding: 8px 14px;
    word-break: break-word;
    &:hover { background: ${color.third}; color: ${color.mainBackground} }
`