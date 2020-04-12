import {useState} from 'react';
import {createStage} from '../game_helpers';

export const useStage = () => {
    const [stage, setStage] = useState(createStage());

    return [stage, setStage];
}