import { create } from "zustand"
import { RoundStatus } from "../interfaces/round.interface";



type RoundStore = {
    roundIsStarted: boolean;
    roundIsPaused: boolean;
    roundIsCompleted: boolean;

    setRoundStatus: (status: RoundStatus) => void;
}

export const useGameStore = create<RoundStore>()((set) => ({
    roundIsPaused: false,
    roundIsStarted: false,
    roundIsCompleted: false,

    setRoundStatus: (status) =>
        set({
            roundIsStarted: status === RoundStatus.STARTED,
            roundIsPaused: status === RoundStatus.PAUSED,
            roundIsCompleted: status === RoundStatus.COMPLETED
        })

}))