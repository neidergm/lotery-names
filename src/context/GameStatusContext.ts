import  { createContext, useContext } from 'react';

export interface GameStatusContextProps {
    gameIsStarted: boolean;
    gameIsPaused: boolean;

    startGame: (status: boolean) => void;
    pauseGame: (paused: boolean) => void;
}

const GameStatusContext = createContext<GameStatusContextProps | undefined>(undefined);

export const useGameStatus = (): GameStatusContextProps => {
    const context = useContext(GameStatusContext);
    if (!context) {
        throw new Error('useGameStatus must be used within a GameStatusProvider');
    }
    return context;
};

export default GameStatusContext;
