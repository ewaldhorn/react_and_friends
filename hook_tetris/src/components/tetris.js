import React, { useState } from 'react';
import Stage from './stage';
import Display from './display';
import StartButton from './start_button';
import ReactVersion from './react_version';
import { StyledTetrisWrapper, StyledTetris } from './styles/styled_tetris';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { createStage, checkCollision } from '../game_helpers';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    const movePlayer = direction => {
        if (!checkCollision(player, stage, { x: direction, y: 0 })) {
            updatePlayerPos({ x: direction, y: 0 });
        }
    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    }

    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) { // left
                movePlayer(-1);
            } else if (keyCode === 39) { // right
                movePlayer(1);
            } else if (keyCode === 40) { // down
                dropPlayer();
            } else if (keyCode === 38) { // up
                playerRotate(stage, 1);
            }
        }
    }

    return (
        <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? <Display gameOver='{gameOver}' text='Game Over' /> :
                        (<div>
                            <Display text='Score' />
                            <Display text='Rows' />
                            <Display text='Level' />
                        </div>)}
                    <StartButton callback={startGame} />
                    <ReactVersion />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;