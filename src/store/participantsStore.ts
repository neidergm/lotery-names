
import { create } from "zustand"
import { LoadedMethod, Participant, ParticipantsList } from "../interfaces/participants.interface";

type ParticipantsStore = {
    loadedMethod: LoadedMethod;
    participants: ParticipantsList;
    currentWinner?: Participant | null;
    participantsReady: boolean;

    setParticipants: (participants: ParticipantsList) => void;
    setCurrentWinner: (participant?: Participant | null) => void;
    setLoadedMethod: (method: LoadedMethod) => void;
    setParticipantsReady: (ready: boolean) => void;
}

// const generateNames = (count: number) => {
//     const baseNames = [
//         "María García", "Juan Rodríguez", "Ana Martínez", "Carlos López",
//         "Laura Sánchez", "José González", "Carmen Pérez", "Miguel Fernández"
//     ];

//     const result = [];
//     for (let i = 0; i < count; i++) {
//         result.push([`${i + 1} - ${baseNames[i % baseNames.length]}`]);
//     }
//     return result;
// };



export const useParticipantsStore = create<ParticipantsStore>()((set) => ({
    participants: [],
    loadedMethod: "file",
    participantsReady: false,

    setParticipants: (participants) => set({ participants }),
    setCurrentWinner: (participant) => set({ currentWinner: participant }),
    setLoadedMethod: (method) => set({ loadedMethod: method }),
    setParticipantsReady: (ready) => set({ participantsReady: ready }),

    // addParticipant: (name) => set((state) => ({ participants: [...state.participants, name] })),
    // removeParticipant: (name) => set((state) => ({ participants: state.participants.filter((n) => n !== name) })),
    // clearParticipants: () => set({ participants: [] }),
}))


