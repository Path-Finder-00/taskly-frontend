import { createGlobalStyle } from 'styled-components'

import { color, font } from '@/shared/utils/styles'

export default createGlobalStyle`
    body {
        color: ${color.textDark};
        ${font.size(16)};
        ${font.regular};
        background: ${color.supplementaryBackground};
    }
`;