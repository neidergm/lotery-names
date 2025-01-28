// create participanst store

import { create } from "zustand"
import { Participant, ParticipantsList } from "../interfaces/participants.interface";

type ParticipantsStore = {
    participants: ParticipantsList;
    currentWinner?: Participant | null;
   
    setParticipants: (participants: ParticipantsList) => void;
    setCurrentWinner: (participant?: Participant | null) => void;
    // addParticipant: (name: string) => void;
    // removeParticipant: (name: string) => void;
    // clearParticipants: () => void;
}

const generateNames = (count: number) => {
    const baseNames = [
        "María García", "Juan Rodríguez", "Ana Martínez", "Carlos López",
        "Laura Sánchez", "José González", "Carmen Pérez", "Miguel Fernández"
    ];

    const result = [];
    for (let i = 0; i < count; i++) {
        result.push({ name: `${i + 1} - ${baseNames[i % baseNames.length]}` });
    }
    return result;
};



export const useParticipantsStore = create<ParticipantsStore>((set) => ({
    participants: generateNames(20),

    setParticipants: (participants) => set({ participants }),
    setCurrentWinner: (participant) => set({ currentWinner: participant }),

    // addParticipant: (name) => set((state) => ({ participants: [...state.participants, name] })),
    // removeParticipant: (name) => set((state) => ({ participants: state.participants.filter((n) => n !== name) })),
    // clearParticipants: () => set({ participants: [] }),
}))



