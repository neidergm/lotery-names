import { PropsWithChildren, useRef, useState } from 'react'
import { IoArrowForward } from 'react-icons/io5'

type ManualInscriptionFieldProps = PropsWithChildren

const ManualInscriptionField = ({ children }: ManualInscriptionFieldProps) => {
    const [names, setNames] = useState<string[]>([])

    const inputRef = useRef<HTMLTextAreaElement>(null)

    const listFromValue = () => {
        if (!inputRef.current) return
        const newNames = inputRef.current.value
            .split('\n')
            .map(name => name.trim())
            .filter(name => name.length > 0)

        setNames(newNames)
    }

    const handleContinue = () => {
        console.log('Continue')
    }

    return (
        <>
            <div
                className="relative transition-all flex flex-col items-center justify-center w-full lg:min-w-md xl:max-w-xl p-2 sm:p-5 rounded-3xl sm:rounded-4xl bg-white backdrop-blur-md"
            >
                {children}
                <textarea
                    ref={inputRef}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.shiftKey || e.key === 'Backspace') listFromValue()
                    }}
                    onBlur={() => listFromValue()}
                    placeholder="Enter participants (one per line)"
                    className="w-full p-3 focus:border-none border-2 border-dashed border-gray-200 rounded-2xl bg-white min-h-60 h-64 focus:outline-none focus:ring-3 focus:ring-indigo-500"
                />
                {!!names.length && <>
                    <div className="absolute bottom-3 right-3 font-bold bg-indigo-400 rounded-full text-white py-1 px-2 flex justify-center items-center border-4 border-white">
                        {names.length}
                    </div>
                </>
                }
            </div>
            {names.length > 0 &&
                <div className='mt-5 text-end'>
                    <button
                        onClick={handleContinue}
                        className='py-3 justify-between grow sm:grow-0 px-10 font-extrabold rounded-xl inline-flex items-center bg-indigo-500 text-white hover:bg-indigo-600'
                    >
                        Continue &nbsp; <IoArrowForward size={25} />
                    </button>
                </div>
            }
        </>
    )
}

export default ManualInscriptionField