import { PropsWithChildren, useEffect, useRef } from 'react'
import { IoArrowForward } from 'react-icons/io5'
import { ParticipantsList } from '../interfaces/participants.interface'

type ManualInscriptionFieldProps = PropsWithChildren<{
    onContinue: (list: ParticipantsList) => void,
    defaultValue?: ParticipantsList
}>

const ManualInscriptionField = ({ children, onContinue, defaultValue }: ManualInscriptionFieldProps) => {

    const inputRef = useRef<HTMLTextAreaElement>(null)

    const listFromValue = () => {
        if (!inputRef.current) return
        if (inputRef.current.value.trim().length <= 1) return
        const newNames = inputRef.current.value
            .split('\n')
            .map(name => {
                const n = name.trim().split(' ')
                return n.length ? [n[0], n.slice(1).join(' ')] : []
            })
            .filter(participant => participant[0].length)
        // setNames(newNames)
        return newNames
    }

    const handleContinue = () => {
        const list = listFromValue()
        if (list) onContinue(list)
    }

    useEffect(() => {
        if (defaultValue) {
            inputRef.current!.value = defaultValue.map(participant => participant.join(' ')).join('\n')
        }else{
            inputRef.current!.value = ''
        }
    }, [defaultValue])

    return (
        <>
            <div
                className="relative transition-all flex flex-col items-center justify-center w-full md:min-w-xs lg:min-w-sm p-3 sm:p-4 md:p-5 rounded-3xl sm:rounded-4xl bg-white/75 backdrop-blur-md"
            >
                {children}
                <textarea
                    ref={inputRef}
                    // onKeyDown={(e) => {
                    //     if (e.key === 'Enter' || e.shiftKey || e.key === 'Backspace' || e.key === 'Delete') listFromValue()
                    // }}
                    // onBlur={() => listFromValue()}
                    placeholder="Enter participants (one per line)"
                    className="w-full p-3 focus:border-none border-2 border-dashed border-gray-300 rounded-2xl h-64 focus:outline-none focus:ring-3 focus:ring-indigo-500"
                />
                {/* {!!names.length && <>
                    <div className="absolute bottom-3 right-3 font-bold bg-indigo-400 rounded-full text-white py-1 px-2 flex justify-center items-center border-4 border-white">
                        {names.length}
                    </div>
                </>
                } */}
            </div>
            <div className='mt-5 text-center lg:text-end'>
                <button
                    onClick={handleContinue}
                    className='py-3 justify-between grow sm:grow-0 px-10 rounded-xl inline-flex items-center bg-indigo-500 text-white hover:bg-indigo-600'
                >
                    Continue &nbsp; <IoArrowForward size={25} />
                </button>
            </div>
        </>
    )
}

export default ManualInscriptionField