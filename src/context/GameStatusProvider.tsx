import { ReactNode, useState } from "react";
import GameStatusContext from "./GameStatusContext";

export const GameStatusProvider = ({ children }: { children: ReactNode }) => {
    const [gameIsPaused, pauseGame] = useState<boolean>(false);
    const [gameIsStarted, startGame] = useState<boolean>(false);

    return (
        <GameStatusContext.Provider value={{
            gameIsPaused,
            gameIsStarted,
            pauseGame,
            startGame,
        }}>
            {children}
        </GameStatusContext.Provider>
    );
};
