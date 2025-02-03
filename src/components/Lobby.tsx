import { useState } from "react"
import { useParticipantsStore } from "../store/participantsStore"
import FilePicker from "./FilePicker"
import ParticipantsPreview from "./ParticipantsPreview"
import { ParticipantsList } from "../interfaces/participants.interface"
import { FaPeopleGroup } from "react-icons/fa6"

const Lobby = () => {

    const { setParticipants } = useParticipantsStore()

    const [fileLoaded, setFileLoaded] = useState(false);
    const [participantsToReview, setParticipantsToReview] = useState<ParticipantsList>();

    return (
        <>
            {
                fileLoaded ?
                    <ParticipantsPreview
                        changeFile={() => setFileLoaded(false)}
                        handleContinue={() => {
                            setParticipants(participantsToReview || []);
                            setFileLoaded(false)
                        }}
                        participants={participantsToReview || []}
                        file={new File([], 'file.xlsx')}
                    />
                    :
                    <div className="px-3">
                        <h2 className='text-3xl text-center font-extrabold mb-5 text-gray-800'>
                            Load participants <FaPeopleGroup className="inline ms-1 " size={40} />
                        </h2>
                        <FilePicker
                            onLoadSuccess={(participants) => {
                                setParticipantsToReview(participants)
                                setFileLoaded(true)
                            }}
                        />
                    </div>
            }
        </>
    )
}

export default Lobby