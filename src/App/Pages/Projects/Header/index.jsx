import { useTranslation } from 'react-i18next'

import ButtonBig from '@/shared/components/ButtonBig'
import Title from '@/shared/components/Title'
import { StyledHeader } from './Styles'

const Header = () => {

    const { t } = useTranslation("translations")

    const handleClick = () => {
        console.log("Dziala")
    }
    
    return (
        <StyledHeader>
            <Title text={ t('projects.title') } />
            <ButtonBig onClick={handleClick} text={ t('projects.create') } />
        </StyledHeader>
    )
}

export default Header