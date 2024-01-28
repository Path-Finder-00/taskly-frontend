import { useEffect, useState, useRef } from 'react'
import Dropdown from './Dropdown'
import { StyledSelect, SelectedValue, Placeholder } from './Styles.js'

const Select = ({ options, displayAttribute }) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')

    const handleDropdownState = () => {
        setDropdownOpen(!isDropdownOpen)
    }

    const handleOptionChange = (option) => {
        setSelectedOption(option[displayAttribute])
    }

    const selectRef = useRef()
    const dropdownRef = useRef()

    useEffect(() => {  
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !dropdownRef.current?.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
    }, [isDropdownOpen, dropdownRef, selectRef])

    return (
        <StyledSelect>
            <SelectedValue onClick={handleDropdownState} >
                {!selectedOption && <Placeholder>Tutaj powinna być wartość</Placeholder>}
                {selectedOption}
            </SelectedValue>

            {isDropdownOpen &&
                <Dropdown 
                    options={options}
                    displayAttribute={displayAttribute}
                    handleDropdownState={handleDropdownState}
                    handleOptionChange={handleOptionChange} 
                    ref={dropdownRef}
                />
            }
        </StyledSelect>
    )
}

export default Select;