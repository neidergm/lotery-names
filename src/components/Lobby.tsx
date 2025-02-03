import { useState } from "react"
import { useParticipantsStore } from "../store/participantsStore"
import FilePicker from "./FilePicker"
import ParticipantsPreview from "./ParticipantsPreview"
import { ParticipantsList } from "../interfaces/participants.interface"
import { FaPeopleGroup } from "react-icons/fa6"
import ManualInscriptionField from "./ManualInscriptionField"
import { FaRegHandPointDown } from "react-icons/fa"

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
                    <div className="flex gap-10 xl:gap-16 sm:gap-14 justify-center flex-col lg:flex-row ">
                        <div>
                            <FilePicker
                                onLoadSuccess={(participants) => {
                                    setParticipantsToReview(participants)
                                    setFileLoaded(true)
                                }}
                            >
                                <h2 className='text-gray-200 sm:pb-4 pt-1 sm:pt-0 text-lg lg:text-2xl text-center font-extrabold mb-3'>
                                    Upload participants <FaPeopleGroup className="inline ms-1 " size={32} />
                                </h2>
                            </FilePicker>
                        </div>
                        <div className="max-h-64 lg:border-r border-t border-white/40 relative border-dashed ">
                            <div className="absolute bg-white rounded-3xl px-2 text-gray-800 font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-10 flex justify-center items-center">
                                OR
                            </div>
                        </div>
                        <div>
                            <ManualInscriptionField>
                                <h2 className='text-lg sm:pb-4 pt-2 sm:pt-0 lg:text-2xl text-center font-extrabold mb-3 text-gray-700'>
                                    Manual inscription <FaRegHandPointDown className="inline ms-1 " size={32} />
                                </h2>
                            </ManualInscriptionField>
                        </div>
                    </div>
            }
        </>
    )
}

export default Lobby