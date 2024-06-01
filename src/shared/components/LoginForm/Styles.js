import styled from 'styled-components'

import { font, color, mixin } from '@/shared/utils/styles'

export const StyledLoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: fit-content;
    width: 350px;
    margin: auto;
    padding: 20px;
    justify-content: center;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: #ffffff;
`;

export const StyledInputWrapper = styled.div`
    margin-bottom: 20px;
    width: calc(100% - 20px);
`;

export const StyledInputField = styled.input`
    width: calc(100% - 20px); 
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #cccccc;
    background-color: #f0f0f0;
    font-size: 16px;
`;

export const StyledSigninInfo = styled.div`
    text-align: center;
`;


