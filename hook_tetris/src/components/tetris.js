import React, { useState } from 'react';
import Stage from './stage';
import Display from './display';
import StartButton from './start_button';
import ReactVersion from './react_version';
import { StyledTetrisWrapper, StyledTetris } from './styles/styled_tetris';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { createStage, checkCollision } from '../game_helpers';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const movePlayer = direction => {
        if (!checkCollision(player, stage, { x: direction, y: 0 })) {
            updatePlayerPos({ x: direction, y: 0 });
        }
    }

    const startGame = () => {
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        // increase level and speed when player has cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }
        // now check for collisions etc.
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

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                // down key released
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
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

    useInterval(() => {
        drop();

    }, dropTime)

    return (
        <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? <Display gameOver='{gameOver}' text='Game Over' /> :
                        (<div>
                            <Display text={`Score: ${score}`} />
                            <Display text={`Rows: ${rows}`} />
                            <Display text={`Level: ${level}`} />
                        </div>)}
                    <StartButton callback={startGame} />
                    <ReactVersion />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;