import React from 'react';
import Stage from './stage';
import Display from './display';
import StartButton from './start_button';
import { createStage } from '../game_helpers';
import { StyledTetrisWrapper, StyledTetris} from './styles/styled_tetris';

const Tetris = () => {

    return (
        <StyledTetrisWrapper>
            <StyledTetris>
                <Stage stage={createStage()} />
                <aside>
                    <div>
                        <Display text='Score' />
                        <Display text='Rows' />
                        <Display text='Level' />
                    </div>
                    <StartButton />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;