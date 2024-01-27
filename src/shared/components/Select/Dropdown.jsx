import { forwardRef } from 'react'
import { Dropdown, Options, Option } from './Styles'

const SelectDropdown = forwardRef(({ options, handleDropdownState, handleOptionChange }, ref) => {

    const selectOption = option => {
        handleDropdownState()
        handleOptionChange(option)
    }

    return (
        <Dropdown ref={ref}>
            <Options>
                {options.map(option => (
                    <Option
                        key={option.value}
                        onClick={() => selectOption(option)}
                    >
                        {option.value}
                    </Option>
                ))}
            </Options>
        </Dropdown>
    )
})

SelectDropdown.displayName = 'SelectDropdown'

export default SelectDropdown