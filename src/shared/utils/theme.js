import { createTheme } from '@mui/material/styles'

import { sizes, color, mixin } from './styles'

export const theme = createTheme({
    components: {
        MuiToolbar: {
            styleOverrides: {
                root: {
                    height: sizes.topbarHeight,
                    minHeight: sizes.topbarHeight
                }
            }
        }
    }
})

export const mainTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: color.mainBackground,
                    background: color.third,
                    '&:hover': {
                        background: mixin.lighten(color.third, 0.15)
                    }
                }
            }
        }
    }
})