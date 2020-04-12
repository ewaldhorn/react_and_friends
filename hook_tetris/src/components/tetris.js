import React, { useState } from 'react';
import Stage from './stage';
import Display from './display';
import StartButton from './start_button';
import { StyledTetrisWrapper, StyledTetris } from './styles/styled_tetris';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player] = usePlayer();
    const [stage, setStage] = useStage(player);

    return (
        <StyledTetrisWrapper>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? <Display gameOver="{gameOver}" text="Game Over" /> :
                        (<div>
                            <Display text='Score' />
                            <Display text='Rows' />
                            <Display text='Level' />
                        </div>)}
                    <StartButton />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;