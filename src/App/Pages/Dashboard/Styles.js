import styled from 'styled-components'

import { sizes, color } from '@/shared/utils/styles'

const leftPadding = sizes.sidebarWidth + 50
const topPadding = sizes.topbarHeight + 30

// TODO: Change the media settings

export const DashboardCanvas = styled.div`
    padding: ${topPadding}px 50px 10px ${leftPadding}px;
    background: ${color.supplementaryBackground};

    @media (max-width: 1100px) {
        padding: 25px 20px 50px ${leftPadding}px;
    }

    @media (max-width: 999px) {
        padding-left: ${leftPadding - 20 - sizes.sidebarWidth}px;
    }
`