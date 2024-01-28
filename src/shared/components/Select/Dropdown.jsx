import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown, Options, Option } from './Styles'

const SelectDropdown = forwardRef(({ options, displayAttribute, handleDropdownState, handleOptionChange }, ref) => {

    const { t } = useTranslation("translations")

    const selectOption = option => {
        handleDropdownState()
        handleOptionChange(option)
    }

    return (
        <Dropdown ref={ref}>
            <Options>
                {options ? options.map(option => (
                    <Option
                        key={option.id}
                        onClick={() => selectOption(option)}
                    >
                        {option[displayAttribute]}
                    </Option>
                )) : <Option
                        key={'empty'}
                        onClick={() => null}
                    >
                        {t('dropdown.empty')}
                    </Option>
                }
            </Options>
        </Dropdown>
    )
})

SelectDropdown.displayName = 'SelectDropdown'

export default SelectDropdown