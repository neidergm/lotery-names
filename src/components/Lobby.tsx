import { useEffect, useState } from "react"
import { useParticipantsStore } from "../store/participantsStore"
import FilePicker from "./FilePicker"
import ParticipantsPreview from "./ParticipantsPreview"
import { LoadedMethod, ParticipantsList } from "../interfaces/participants.interface"
import { FaPeopleGroup } from "react-icons/fa6"
import ManualInscriptionField from "./ManualInscriptionField"
import { FaRegHandPointDown } from "react-icons/fa"
import Modal from "./Modal"
import { IoWarningOutline } from "react-icons/io5"

const Lobby = () => {

    const { setParticipants, setLoadedMethod, setParticipantsReady, loadedMethod, participants } = useParticipantsStore()

    const [fileLoaded, setFileLoaded] = useState(false);
    const [participantsToReview, setParticipantsToReview] = useState<ParticipantsList>();
    const [error, setError] = useState(Boolean);

    const handleContinue = (method: LoadedMethod = "file", list = participantsToReview) => {

        if (!list || list.length < 3) {
            return setError(true)
        }

        setParticipants(list || [])
        setParticipantsReady(true)
        setLoadedMethod(method)
        setFileLoaded(false)
    }

    useEffect(() => {
        if (participants.length > 0) {
            if (loadedMethod === "file") {
                setFileLoaded(true);
            }
            setParticipantsToReview(participants);
        }
    }, [])

    return (
        <>
            <Modal
                title="Number of participants"
                isOpen={error}
                icon={<IoWarningOutline className="text-red-500" size={24} />}
                iconBgColor="bg-red-100"
                onClose={() => setError(false)}
            >
                <p className="text-sm text-gray-500">The number of participants is not sufficient, it is necessary to have at least <b>3</b> participants</p>
            </Modal>
            {
                fileLoaded ?
                    <ParticipantsPreview
                        changeFile={() => {
                            setFileLoaded(false);
                            setParticipantsToReview([])
                        }}
                        handleContinue={handleContinue}
                        participants={participantsToReview || []}
                        file={new File([], 'file.xlsx')}
                    />
                    :
                    <div className="flex gap-10 xl:gap-16 sm:gap-14 justify-center flex-col lg:flex-row mt-5">
                        <div>
                            <FilePicker
                                onLoadSuccess={(p) => {
                                    setParticipantsToReview(p)
                                    setFileLoaded(true)
                                }}
                            >
                                <h2 className='text-gray-200 sm:pb-4 pt-1 sm:pt-0 text-lg lg:text-2xl text-center font-extrabold mb-3'>
                                    Upload participants <FaPeopleGroup className="inline ms-1 " size={32} />
                                </h2>
                            </FilePicker>
                        </div>
                        <div className="lg:border-r border-t border-white/40 relative border-dashed ">
                            <div className="absolute bg-white rounded-3xl px-2 text-gray-800 font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-10 flex justify-center items-center">
                                OR
                            </div>
                        </div>
                        <div>
                            <ManualInscriptionField
                                defaultValue={fileLoaded ? undefined : participantsToReview}
                                onContinue={l => handleContinue("manual", l)}
                            >
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