import { create } from "zustand"
import { devtools } from "zustand/middleware";

type ConfigStore = {
    timer: number,
    randomMilisecondsTime: number,

    setTimer: (time: number) => void,
    setRandomMilisecondsTime: (time: number) => void,
    resetRoundStatus: VoidFunction
}

const initialState = {
    timer: 10,
    randomMilisecondsTime: 500,
}

export const useConfigStore = create<ConfigStore>()(
    devtools(
        (set) => ({
            ...initialState,

            setTimer: (timer) => timer > 4 && set({ timer }),
            setRandomMilisecondsTime: (randomMilisecondsTime) => set({ randomMilisecondsTime }),
            resetRoundStatus: () => set(initialState)
        })
    )
)