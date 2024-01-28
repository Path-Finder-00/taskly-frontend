import { Link } from 'react-router-dom'

import { Item, ItemText } from './Styles'

const MenuItem = ({ text, endpoint }) => {

    return (
        <Item>
            <Link to="/">
                <ItemText>{text}</ItemText>
            </Link>
        </Item>
    )
}

export default MenuItem