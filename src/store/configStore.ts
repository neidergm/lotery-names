import { create } from "zustand"
import { devtools, persist } from "zustand/middleware";
import { ParticipantsStyle } from "../interfaces/config.interface";

type ConfigStore = {
    timer: number,
    randomMilisecondsTime: number,
    participantsAnimationSpeed: number,
    participantsStyle: ParticipantsStyle,
    sound: boolean,
    showList: boolean,

    setTimer: (time: number) => void,
    setShowList: (show: boolean) => void,
    setRandomMilisecondsTime: (time: number) => void,
    setParticipantsAnimationDuration: (time: number) => void,
    resetRoundStatus: VoidFunction
    setSound: (sound: boolean) => void,
    setParticipantsStyle: (style: ParticipantsStyle) => void,
}

const initialState = {
    timer: 10,
    randomMilisecondsTime: 0.5,
    participantsAnimationSpeed: 2,
    participantsStyle: ParticipantsStyle.INLINE,
    sound: true,
    showList: true,
}

// TODO
// Config to show names list item with name up and last name down or viceverse, or inline 
// Config to set name and lasta name size
// Config names list animation speed
// Config sound

export const useConfigStore = create<ConfigStore>()(
    devtools(
        persist(
            (set) => ({
                ...initialState,

                setTimer: (timer) => timer > 4 && set({ timer }),
                setRandomMilisecondsTime: (randomMilisecondsTime) => set({ randomMilisecondsTime }),
                setParticipantsAnimationDuration: (speed) => set({ participantsAnimationSpeed: speed }),
                setParticipantsStyle: (style) => set({ participantsStyle: style }),
                setSound: (sound) => set({ sound }),
                setShowList: (show) => set({ showList: show }),

                resetRoundStatus: () => set(initialState)
            })
            ,
            {
                name: "config-store"
            }
        )
    )
)