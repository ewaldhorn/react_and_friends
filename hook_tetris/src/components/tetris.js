import React, { useState } from 'react';
import Stage from './stage';
import Display from './display';
import StartButton from './start_button';
import ReactVersion from './react_version';
import { StyledTetrisWrapper, StyledTetris } from './styles/styled_tetris';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { createStage } from '../game_helpers';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    const movePlayer = direction => {
        updatePlayerPos({x: direction, y:0});
    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({x:0, y:1, collided: false});
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keycode }) => {
        if (!gameOver) {
            if (keycode === 37) {
                movePlayer(-1);

            } else if (keycode === 39) {
                movePlayer(1);
            } else if (keycode === 40) {
                dropPlayer();
            }
        }
    }

    return (
        <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={event => move(event)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? <Display gameOver='{gameOver}' text='Game Over' /> :
                        (<div>
                            <Display text='Score' />
                            <Display text='Rows' />
                            <Display text='Level' />
                        </div>)}
                    <StartButton onClick={startGame}/>
                    <ReactVersion />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;