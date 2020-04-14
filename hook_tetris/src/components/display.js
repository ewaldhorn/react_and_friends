import React from 'react';
import {StyledDisplay} from './styles/styled_display';

const Display = ({gameOver, text}) => (
    <StyledDisplay gameOver={gameOver}>
        {text}
    </StyledDisplay>
)

export default Display;