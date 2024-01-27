import { Item, ItemText } from './Styles'

const MenuItem = ({ text }) => {

    return (
        <Item>
            <ItemText>{text}</ItemText>
        </Item>
    )
}

export default MenuItem