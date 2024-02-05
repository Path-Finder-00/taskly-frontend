import styled from 'styled-components'

import { font, color, mixin } from '@/shared/utils/styles'

export const StyledButtonBig = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 40%;
    vertical-align: middle;
    line-height: 1;
    padding: 0 ${props => (props.iconOnly ? 9 : 12)}px;
    white-space: nowrap;
    border-radius: 25px;
    transition: all 0.1s;
    appearance: none;
    ${font.size(22)};
    color: ${color.mainBackground};
    background: ${color.third};
    &:hover {
        background: ${mixin.lighten(color.third, 0.15)};
    }
    &:active {
        background: ${mixin.darken(color.third, 0.1)};
    }    
    cursor: pointer;
    user-select: none;
`;
