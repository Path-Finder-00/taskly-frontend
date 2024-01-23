import { useState } from 'react'

import { StyledSelect, SelectedValue, Placeholder } from './Styles.js'

const Select = () => {

    return (
        <StyledSelect>
            <SelectedValue>
                <Placeholder>Tutaj powinna być wartość</Placeholder>
            </SelectedValue>
        </StyledSelect>
    )
}

export default Select;