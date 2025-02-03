import { IoArrowForward, IoClose } from "react-icons/io5"
import { ParticipantsList } from "../interfaces/participants.interface";

type ParticipantsPreviewProps = {
    participants: ParticipantsList;
    file: File;
    changeFile: () => void;
    handleContinue: () => void;
}

const ParticipantsPreview = ({ participants, handleContinue, file, changeFile }: ParticipantsPreviewProps) => {

    const continueButton = <button
        onClick={handleContinue}
        className='py-3 justify-between grow sm:grow-0 px-10 font-extrabold rounded-xl inline-flex items-center bg-gray-700 text-white hover:bg-gray-900'
    >
        Continue &nbsp; <IoArrowForward size={25} />
    </button>
    
    return (
        <div className='flex flex-col items-center'>
            <div className='w-full max-w-screen xl:max-w-2xl'>
                <div className="transition-all flex grow gap-10 items-center justify-between p-4 rounded-2xl text-white bg-gray-700/50 ">
                    <h2>
                        <span className='text-sm bg-green-500/50 text-green-300 px-3 py-1 rounded-md me-3'>
                            Selected file
                        </span>
                        <span className='font-semibold'>{file.name}</span>
                    </h2>
                    <button
                        className="p-1 rounded-full bg-red-400/70 text-white hover:bg-red-400"
                        onClick={changeFile}
                    >
                        <IoClose size={20} />
                    </button>
                </div>
                <div className='bg-gray-100 rounded-2xl p-4 mt-5 min-h-64'>
                    <div className='flex justify-between items-center flex-wrap gap-5'>
                        <h3 className='text-xl sm:text-3xl font-extrabold text-gray-700'>{participants?.length} PARTICIPANTS</h3>
                        {continueButton}
                    </div>
                    <div className='mt-3 sm:columns-2 sm:max-h-96 sm:overflow-y-auto'>
                        {participants?.map((participant, index) => (
                            <div key={index} className='px-2 py-1 rounded-md'>
                                <span className='font-extrabold text-gray-500'>{index + 1} - </span>
                                <span>{participant[0]} </span>
                                <span>{participant[1]}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex sm:hidden mt-5">
                        {continueButton}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParticipantsPreview