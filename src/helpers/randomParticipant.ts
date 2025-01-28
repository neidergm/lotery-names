import { ParticipantsList } from "../interfaces/participants.interface"

export const randomParticipant = (list: ParticipantsList) => {

    const randomIndex = Math.floor(Math.random() * list.length)
    return list[randomIndex]

}
