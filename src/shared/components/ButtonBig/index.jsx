import { StyledButtonBig } from './Styles'

const ButtonBig = ({ onClick, text }) => {

    return (
        <StyledButtonBig onClick={onClick}>
            {text}
        </StyledButtonBig>
    )
}

export default ButtonBig