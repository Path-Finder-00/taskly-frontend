import { useState } from 'react'
import Dropdown from './Dropdown'
import { StyledSelect, SelectedValue, Placeholder } from './Styles.js'

const Select = () => {

    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')

    const handleDropdownState = () => {
        setDropdownOpen(!isDropdownOpen)
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const options = [ {value: 'option1'}, {value: 'option2'} ]

    return (
        <StyledSelect>
            <SelectedValue onClick={handleDropdownState} >
                {!selectedOption && <Placeholder>Tutaj powinna być wartość</Placeholder>}
                {selectedOption && true}
            </SelectedValue>

            {isDropdownOpen &&
                <Dropdown 
                    options={options}
                    handleDropdownState={handleDropdownState}
                    handleOptionChange={handleOptionChange} 
                />
            }
        </StyledSelect>
    )
}

export default Select;