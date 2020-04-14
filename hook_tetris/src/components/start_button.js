import React from 'react';
import {StyledStartButton} from './styles/styled_start_button';

const StartButton = ({callback}) => (
    <StyledStartButton onClick={callback}>
        Start Game
    </StyledStartButton>
)

export default StartButton;