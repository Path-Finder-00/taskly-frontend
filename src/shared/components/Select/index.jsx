import { useState } from 'react'

import { StyledSelect, SelectedValue, Placeholder, Dropdown } from './Styles.js'

const Select = ({ options }) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')

    const handleDropdownState = () => {
        setDropdownOpen(!isDropdownOpen)
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
    }

    return (
        <StyledSelect>
            <SelectedValue onClick={handleDropdownState} >
                {!selectedOption && <Placeholder>Tutaj powinna być wartość</Placeholder>}
                {selectedOption && true}
            </SelectedValue>

            {isDropdownOpen && (
                <Dropdown 
                    options={options}
                    handleDropdownState={handleDropdownState}
                    handleOptionChange={handleOptionChange} 
                />
            )}
        </StyledSelect>
    )
}

export default Select;