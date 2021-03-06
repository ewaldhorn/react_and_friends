import { useState, useCallback } from 'react';
import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../game_helpers';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const rotate = (matrix, direction) => {
        // transpose rows to columns
        const rotatedTetromino = matrix.map((_, index) => matrix.map(col => col[index]));

        // now reverse each row to get a rotated matrix
        if (direction > 0) return rotatedTetromino.map(row => row.reverse());

        return rotatedTetromino.reverse;
    }

    const playerRotate = (stage, direction) => {
        // make a 'deep' copy of our player
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);

        // check we don't go outside the play area because of rotation
        const posX = clonedPlayer.pos.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, stage, {x:0,y:0})) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1: -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -direction);
                clonedPlayer.pos.x = posX;
                return;
            }
        }


        setPlayer(clonedPlayer);
    }

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided
        }));
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false
        });
    }, [])

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}