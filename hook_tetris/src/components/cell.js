import React from 'react';
import {StyledCell} from './styles/styled_cell';
import {TETROMINOS} from '../tetrominos';

const Cell = ({type}) => (
     <StyledCell type={type} color={TETROMINOS[type].color}/>
)

export default Cell;