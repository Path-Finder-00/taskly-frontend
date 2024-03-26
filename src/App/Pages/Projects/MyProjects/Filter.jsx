import { useTranslation } from 'react-i18next'

import { 
    OutlinedInput,
    FormControl,
    InputAdornment,
    InputLabel
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Filter = ({ handleFilterChange }) => {

    const { t } = useTranslation("translations")

    return (
        <FormControl sx={{ m: 0.5, width: '35ch' }} variant="outlined" size="small">
            <InputLabel>{t('projects.search')}</InputLabel>
            <OutlinedInput
                onChange={handleFilterChange}
                label={t('projects.search')}
                endAdornment={
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}

export default Filter