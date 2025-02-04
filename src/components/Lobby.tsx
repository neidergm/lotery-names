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
                    <div className="flex gap-10 2xl:gap-16 sm:gap-12 justify-center flex-col md:flex-row mt-5">
                        <div>
                            <FilePicker
                                onLoadSuccess={(p) => {
                                    setParticipantsToReview(p)
                                    setFileLoaded(true)
                                }}
                            >
                                <h2 className='text-gray-200 sm:pb-4 pt-1 sm:pt-0 text-lg lg:text-2xl text-center  font-poetsen mb-3'>
                                    Upload participants <FaPeopleGroup className="inline ms-1 " size={32} />
                                </h2>
                            </FilePicker>
                        </div>
                        <div className="md:border-r border-t border-white/40 relative border-dashed  font-poetsen">
                            <div className="absolute bg-white rounded-3xl px-2 text-gray-800 font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-10 flex justify-center items-center">
                                OR
                            </div>
                        </div>
                        <div>
                            <ManualInscriptionField
                                defaultValue={fileLoaded ? undefined : participantsToReview}
                                onContinue={l => handleContinue("manual", l)}
                            >
                                <h2 className='text-lg sm:pb-4 pt-2 sm:pt-0 lg:text-2xl text-center font-poetsen mb-3 text-gray-700'>
                                    Manual inscription <FaRegHandPointDown className="inline ms-1 " size={32} />
                                </h2>
                            </ManualInscriptionField>
                        </div>
                    </div>
            }


            <div className="border-t-4 rounded-4xl border-gray-100/20 my-20"></div>

            <div className="container md:max-w-4xl mx-auto mb-8 ">

                <div className="text-center">
                    <div className="bg-white/50 backdrop-blur-sm rounded-4xl p-6 mb-6 mt-10">
                        <h2 className="text-4xl font-poetsen font-extrabold text-gray-800 mb-3">
                            Get Started
                        </h2>
                        <h2 className="text-gray-700 text-center text-md font-semibold my-10">
                            RaffleNG is a free web application designed to randomly select winners from a list of participants. Perfect for contests, giveaways, and fair selection processes.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200 mt-10">
                            <div className="p-4 text-gray-700 bg-gray-100/20 rounded-2xl">
                                <h3 className="text-2xl font-poetsen font-bold text-indigo-500 mb-4">Excel Upload</h3>
                                <p>Upload your participant list using an Excel file for quick setup</p>

                                <p className="underline mt-2">File can have one or two columns</p>

                                <div className="overflow-hidden rounded-lg mt-4">
                                    <table className="text-left rounded-2xl w-full text-gray-400">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="p-2 border-r border-white">Name</th>
                                                <th className="p-2 ">Last Name (optional)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-gray-100">
                                                <td className="px-2 border-r border-white">Participant name</td>
                                                <td className="px-2 ">Participant last name</td>
                                            </tr>
                                            <tr className="bg-gray-100">
                                                <td className="px-2 border-r border-white">Others...</td>
                                                <td className="px-2 ">Others...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="p-4 text-gray-700 bg-gray-100/20 rounded-2xl">
                                <h3 className="text-2xl mb-4 text-indigo-500 font-poetsen font-bold">Manual Entry</h3>
                                <p>Enter participants manually one by one or paste a list</p>
                                <p className="underline mt-2">At least 3 participants</p>

                                <div className="overflow-hidden rounded-lg mt-4">
                                    <div className="bg-gray-100 text-gray-400 text-left p-3">
                                        <p>Participant One</p>
                                        <p>Participant Two</p>
                                        <p>Participant Tree</p>
                                        <p>Participant ...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lobby