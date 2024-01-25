import { Dropdown, Options, Option } from './Styles'

const SelectDropdown = ({ options, handleDropdownState, handleOptionChange }) => {

    const selectOption = option => {
        handleDropdownState()
        handleOptionChange(option)
    }

    return (
        <Dropdown>
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
}

export default SelectDropdown