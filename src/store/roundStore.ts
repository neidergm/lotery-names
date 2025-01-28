import { create } from "zustand"
import { RoundStatus } from "../interfaces/round.interface";
import { devtools } from "zustand/middleware";

type RoundStore = {
    roundIsStarted: boolean;
    roundIsPaused: boolean;
    roundIsCompleted: boolean;

    setRoundStatus: (status: RoundStatus) => void;
    resetRoundStatus: VoidFunction
}

const initialState = {
    roundIsPaused: false,
    roundIsStarted: false,
    roundIsCompleted: false
}

export const useRoundStore = create<RoundStore>()(
    devtools(
        (set) => ({
            ...initialState,
            setRoundStatus: (status) => {
                if (status === RoundStatus.STARTED) {
                    set({ roundIsStarted: true, roundIsPaused: false, roundIsCompleted: false })
                } else if (status === RoundStatus.PAUSED) {
                    set({ roundIsPaused: true })
                } else if (status === RoundStatus.COMPLETED) {
                    set({ roundIsPaused: false, roundIsStarted: false, roundIsCompleted: true })
                }
            },
            resetRoundStatus: () => set(initialState)
        })
    )
)